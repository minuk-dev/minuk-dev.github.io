---
layout  : wiki
title   : Modern C++ Design Pattern/Chatper 6. 어댑터
summary : 
date    : 2020-04-07 20:44:17 +0900
lastmod : 2020-04-09 23:32:38 +0900
tags    : 
---
## Adapter Pattern

- We use a example case, drawiing geometric shape.
```cpp
    struct Point
    {
      int x, y;
    };
    
    struct Line{
      Point start, end;
    };
    
    struct VectorObject
    {
      virtual std::vector<Line>::iterator begin() = 0;
      virtual std::vector<Line>::iterator end() = 0;
    };
    
    struct VectorRectangle : VectorObject
    {
      VectorRectangle(int x, int y, int width, int height)
      {
        lines.emplace_back(Line{ Point{x, y}, Point{x + width, y} });
        lines.emplace_back(Line{ Point{x + width, y}, Point {x + width, y + height} });
        lines.emplace_back(Line{ Point{x,y}, Point{x, y + height} });
        lines.emplace_back(Line{ Point{ x, y + height }, Point {x + width, y + height} });
      }
     
      std::vecotr<Line>::iterator begin() override {
        return lines.begin();
      }
      std::vector<Line>::iterator end() override {
        return lines.end();
      }
    
    private:
      std::vector<Line> lines;
    };
    
    void DrawPoints(CPaintDC& dc,
      std::vector<Point>::iterator start,
      std::vector<Point>::iterator end)
    {
      for (auto i = start; i != end; ++i)
        dc.SetPixel(i->x, i->y , 0);
    }
```

## Adapter

- Let's draw a few rectangles.

```cpp
    vector<shared_ptr<VectorObject>> vectorObjects{
      make_shared<VectorRectangle>(10, 10, 100, 100),
      make_shared<VectorRectangle>(30, 30, 60, 60)
    }
    
    struct LineToPointAdapter
    {
      typedef vector<Point> Points;
    
      LineToPointAdapter(Line& line);
      
      virtual Points::iterator begin() { return points.begin(); }
      virtual Points::iterator end() { return points.end(); }
    private:
      Points points;
    };
    
    LineToPointAdapter::LineToPointAdapter(Line& line)
    {
      int left = min(line.start.x, line.end.x);
      int right = max(line.start.x, line.end.x);
      int top = min(line.start.y, line.end.y);
      int bottom = max(line.start.y, line.end.y);
      int dx = right - left;
      int dy = line.end.y - line.start.y;
    
      if (dx == 0)
      {
        for (int y = top; y <= bottom; ++y)
        {
          points.emplace_back(Point{ left, y });
        }
      }
      else if (dy == 0)
      {
        for (int x = left; x <= right; ++x)
        {
          points.emplace_back(Point{ x, top });
        }
      }
    }
    
    
    for (auto& obj : vectorObjects)
    {
      for (auto& line : *obj)
      {
        LineToPointAdapter lpo{ line };
        DrawPoints(dc, lpo.begin(), lpo.end());
      }
    }
```

## Temporary Adapter

- How about above method is called in every display update despite no change?
    - One of the solutions is to use cache.

        ```cpp
        vector<Point> points;
        for (auto& o : vectorObjects)
        {
          for (auto& l : *o)
          {
            LineToPointAdapter lpo{ l };
            for (auto& p : lp)
              points.push_back(p);
          }
        }
        ```

    - Of course, this solution cause another problem. That is original vectorOjbects is changed.
        ```cpp
        struct Point
        {
          int x, y;
          friend std:: size_t hash_value(const POint& obj)
          {
            std::size_t send = 0x825C696F;
            boost::hash_combine(seed, obj.x);
            boost::hash_combine(seed, obj.y);
            return seed;
          }
        };
        
        struct Line
        {
          Point start, end;
          friend std::size_t hash_value(const Line& obj)
          {
            std::size_t seed = 0x719E6B16;
            boost::hash_combine(seed, obj.start);
            boost::hash_combine(seed, obj.end);
            return seed;
          }
        };
        
        static map<size_t, Points> cache;
        
        virtual Points::iterator begin() { return cache[line_hash].begin(); }
        virtual Points::iterator end() { return cache[line_hash].end(); }
        
        LineToPointCachingAdapter(Line& line){
          static boost::hash<Line> hash;
          line_hash = hash(line);
          if (cache.find(line_hash) != cache.end())
            return;
        
          Points points;
        
          /* before code */
          /* remove before cached point */
          cache[line_hash] = points;
        }
        ```

