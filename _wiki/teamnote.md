---
layout  : wiki
title   : teamnote
summary : 알고리즘 문풀용 팀노트
date    : 2020-08-08 00:10:21 +0900
lastmod : 2022-02-09 21:59:48 +0900
tags    : [algorithm, teamnote]
draft   : false
parent  : algorithm
---

## C++ IO
```cpp
#define FASTIO() do{ cin.tie(0); cout.tie(0); ios_base::sync_with_stdio(false); } while(0)
```

## Binary Search
 * 1 차이로 문제를 틀리는 일이 빈번해서, 틀리지 않게 자주 쓰이는 폼 정리
```cpp
int s = 0, e = n -1;
while (s <= e) {
  int m = (s + e) / 2;
  if (array[m] == x) {
    // 위치 m 에서 x를 찾음
  }
  if (array[m] < x) s = m + 1;
  else e = m -1;
}
```

```cpp
int k = 0;
for (int i = n / 2; i >= 1; i /= 2) {
  while (k + i < n && array[k +i] <= x) k += i;
}

if (array[k] == x) {
  // 위치 k 에서 x를 찾음.
}
```

```cpp
int x = -1;
for (int b = z; b >= 1; b /= 2) {
  while (!valid(x + b)) x += b;
}
int k = x + 1;
/* valid(x) : true when x >= k, false when x < k */
```

## 좌표 압축
```cpp
vector<int> C; /* C 에다가 좌표들 넣기 */
sort(C.begin(), c.end());
C.erase(unique(C.begin(), C.end()), C.end());

/* 오리지널 좌표(P) -> 압축된 좌표(D) */
int d = distance(C.begin(), lower_bound(C.begin(), C.end(), P));
/* 압축된 좌표(D) -> 오리지널 좌표(P) */
int P = C[D];
```

## Index Tree
```cpp
#include <iostream>
#include <vector>
using namespace std;
#define IDX_SIZE (1 << 21)
#define IDX_BASE (IDX_SIZE >> 1)
/* min tree */
struct index_tree {
  int sz = IDX_SIZE, bs = IDX_BASE;
  int node[IDX_SIZE];

  void update(int x, int v) {
    x |= bs;
    node[x] = v;
    while (x > 1) {
      x >>= 1;
      node[x] = min(node[x * 2], node[x * 2 + 1]);
    }
  }

  int query(int s, int e) {
    s |= bs;
    e |= bs;
    int retval = 1e9;
    while (s < e) {
      if (s % 2 == 1) retval = min(retval, node[s++]);
      if (e % 2 == 0) retval = min(retval, node[e--]);
      s >>= 1;
      e >>= 1;
    }
    if (s == e) retval = min(retval, node[s]);
    return retval;
  }
};


```

## Segment Tree (Range Update)
```cpp
#include <iostream>
#include <vector>
using namespace std;
using lld = long long;
#define SEG_SIZE 1 << 18
struct node_t {
  lld value, lazy;
};

/* sum tree */
struct seg_tree {
  node_t node[4 * SEG_SIZE];

  lld build(lld* d, lld idx, lld s, lld e) {
    if (s == e) return node[idx].value = d[s];
    return node[idx].value = build(d, idx * 2, s, (s + e) / 2) + build(d, idx * 2 + 1, (s + e) / 2 + 1, e);
  }

  void update_lazy(lld idx, lld s, lld e) {
    if (node[idx].lazy != 0) {
      node[idx].value += (e - s + 1) * node[idx].lazy;
      if (s != e) {
        node[idx * 2].lazy += node[idx].lazy;
        node[idx * 2 + 1].lazy += node[idx].lazy;
      }
      node[idx].lazy = 0;
    }
  }

  lld update_range(lld idx, lld diff, lld s, lld e, lld l, lld r) {
    update_lazy(idx, s, e);
    if (r < s || l > e) return node[idx].value;
    if (l <= s && e <= r) {
      node[idx].lazy += diff;
      update_lazy(idx, s, e);
      return node[idx].value;
    }
    return node[idx].value =
      update_range(idx * 2, diff ,s, (s + e) / 2, l, r) + update_range(idx * 2 + 1, diff, (s + e) / 2 + 1, e, l, r);
  }

  lld query(lld idx, lld s, lld e, lld l, lld r) {
    update_lazy(idx, s, e);
    if (r < s || l > e) return 0;
    if (l <= s && e <= r) return node[idx].value;
    return query(idx * 2, s, (s + e)/ 2, l, r) + query(idx * 2 + 1, (s + e) / 2 + 1, e, l, r);
  }
}seg;

#define scl(N) scanf("%lld", &(N))

int main () {
  lld N, M, K;
  scl(N), scl(M), scl(K);
  for (lld i = 1; i <= N; i++) {
    lld a;
    scl(a);
    seg.update_range(1, a, 1, N, i, i);
  }

  for (lld i = 0; i < M + K; i ++) {
    lld a, b, c;
    lld d;
    scl(a);
    if (a == 1) {
      scl(b), scl(c), scl(d);
      seg.update_range(1, d, 1, N, b, c);
    } else {
      scl(b), scl(c);
      printf("%lld\n", seg.query(1, 1, N, b, c));
    }
  }
  return 0;
}
```

## Segment Tree - Coloring Version
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#define SIZE 200000
#define sci(N) scanf("%d", &(N))
using namespace std;
using lld = long long;
struct rect {
    int x1, x2, y1, y2;
}data[SIZE], data2[SIZE];

vector<int> cx;
vector<int> cy;
struct seg_tree {
  struct node_t {
    lld sum, cnt;
  } node[SIZE * 8];

  void update(int idx, int val, int s, int e, int l, int r) {
    if (s > r || e < l) return;
    if (l <= s && e <= r) {
      node[idx].cnt += val;
      if (node[idx].cnt > 0) node[idx].sum = (cy[e + 1] - cy[s]);
        else {
          if (idx >= SIZE * 4) node[idx].sum = 0;
          else node[idx].sum = node[idx * 2].sum + node[idx * 2 + 1].sum;
        }
      } else {
        update(idx * 2, val, s, (s + e)/ 2, l, r);
        update(idx * 2 + 1, val, (s + e)/ 2 + 1, e, l, r);
        if (idx >= SIZE * 4) node[idx].sum = 0;
        else node[idx].sum = node[idx * 2].sum + node[idx * 2 + 1].sum;

        if (node[idx].cnt > 0) node[idx].sum = (cy[e + 1] - cy[s]);
      }
    }

  lld value() {
    return node[1].sum;
  }
} seg;
int N;
int main () {
  sci(N);
  cx.resize(2 * N);
  cy.resize(2 * N);
  for (int i = 0; i < N; ++ i) {
    sci(data[i].x1), sci(data[i].x2), sci(data[i].y1), sci(data[i].y2);
    cx[i * 2] = data[i].x1;
    cx[i * 2 + 1] = data[i].x2;
    cy[i * 2] = data[i].y1;
    cy[i * 2 + 1] = data[i].y2;
    data2[i].x1 = data[i].x1;
    data2[i].x2 = data[i].x2;
    data2[i].y1 = data[i].y1;
    data2[i].y2 = data[i].y2;
  }
  sort(cy.begin(), cy.end());
  cy.erase(unique(cy.begin(), cy.end()), cy.end());
  sort(cx.begin(), cx.end());
  cx.erase(unique(cx.begin(), cx.end()), cx.end());
  sort(data, data + N, [](const rect& a, const rect& b)-> bool {
    return a.x1 == b.x1 ? a.x2 < b.x2 : a.x1 < b.x1;
  });
  sort(data2, data2 + N, [](const rect& a, const rect& b)-> bool {
    return a.x2 == b.x2 ? a.x1 < b.x1 : a.x2 < b.x2;
  });

  int acur = 0, scur = 0;
  int length = cx.size();
  int maxCuttingLine = cy.size();
  lld result = 0;
  for (int i = 0; i < length - 1; ++ i) {
    while (acur < N && data[acur].x1 <= cx[i]) {
      int cy1 = distance(cy.begin(), lower_bound(cy.begin(), cy.end(), data[acur].y1));
      int cy2 = distance(cy.begin(), lower_bound(cy.begin(), cy.end(), data[acur].y2));
      seg.update(1, 1, 0, maxCuttingLine - 1, cy1, cy2-1);
      acur ++;
    }

    while (scur < N && data2[scur].x2 <= cx[i]) {
      int cy1 = distance(cy.begin(), lower_bound(cy.begin(), cy.end(), data2[scur].y1));
      int cy2 = distance(cy.begin(), lower_bound(cy.begin(), cy.end(), data2[scur].y2));
      seg.update(1, -1, 0, maxCuttingLine - 1, cy1, cy2-1);
      scur ++;
    }
    result += seg.value() * (cx[i + 1] - cx[i]);
  }
  printf("%lld", result);
  return 0;
}
```

## Merge-Sort Tree
- 백준 7469번 참고
- 큰거 개수 쿼리

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#define SIZE (1 << 17)
using namespace std;
using vi = vector<int>;

struct merge_sort_tree {
    vi node[SIZE * 2];
    void add(int x, int v) {
        x |= SIZE;
        node[x].push_back(v);
    }
    void build() {
        for (int i = SIZE - 1; i > 0; -- i) {
            merge(node[i * 2], node[i * 2 + 1], node[i]);
        }
    }

    void merge(vi& l, vi& r, vi& p) {
        p.resize(l.size() + r.size());
        int il = 0, ir = 0, ip = 0;
        int ll = l.size(), lr = r.size();
        while (il < ll && ir < lr) {
            if (l[il] < r[ir]) {
                p[ip] = l[il];
                il ++;
                ip ++;
            } else {
                p[ip] = r[ir];
                ir ++;
                ip ++;
            }
        }
        while (il < ll) {
            p[ip] = l[il];
            il ++;
            ip ++;
        }
        while (ir < lr) {
            p[ip] = r[ir];
            ir ++;
            ip ++;
        }
    }

    int query(int l, int r, int k) {
        l |= SIZE;
        r |= SIZE;
        int ret = 0;
        while (l <= r) {
            if (l % 2 == 1) {
                ret += distance(upper_bound(node[l].begin(), node[l].end(), k), node[l].end());
                l ++;
            }
            if (r % 2 == 0) {
                ret += distance(upper_bound(node[r].begin(), node[r].end(), k), node[r].end());
                r --;
            }
            l /= 2;
            r /= 2;
        }

        return ret;
    }
} mt;

int main () {
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= n; ++ i) {
        int a;
        cin >> a;
        mt.add(i, a);
    }
    mt.build();

    for (int i = 0; i < m; ++ i) {
        int a, b, c;
        cin >> a >> b >> c;
        int x = -1e9, z= 1e9;
        for (int t = z; t >= 1; t /= 2) {
            while (mt.query(a, b, x + t) >  b - a + 1 - c) x += t;
        }
        int k = x + 1;
        cout << k << "\n";
    }
    return 0;
}
```

## KMP
- 문자열을 이루고 있는 최소 주기 : 문자열 길이가 N 일 때, N - pi[N - 1]

```cpp
#include <iostream>
#include <string.h>
#include <algorithm>
using namespace std;
#define SIZE 1000010

char T[SIZE], P[SIZE];
void kmp(char* h, int n, char* p, int* pi, int* retval) {
    int matched = 0;
    for(int i = 0; i < n; i ++) {
        while (matched > 0 && h[i] != p[matched])
            matched = pi[matched - 1];
        if (h[i] == p[matched]) {
            matched ++;
            retval[i] = matched;
        }
    }
}
int PI[SIZE], result[SIZE];
int main () {
    cin.getline(T, SIZE);
    cin.getline(P, SIZE);
    int n = strlen(T), m = strlen(P);

    kmp(P+1, m - 1, P, PI, PI + 1);
    kmp(T, n, P, PI, result);
    int c = 0;
    for (int i = 0; i < n; i ++)
        if (result[i] == m) c++;
    printf("%d\n", c);
    for (int i = 0; i < n; i ++) {
        if (result[i] == m) printf("%d ", i - m + 2);
    }

    return 0;
}
```

## Suffix Array
```cpp
#include <iostream>
#include <cstring>
#include <vector>
#include <algorithm>
using namespace std;

void suffix(const char* s, int *sa) {
  int n = strlen (s);
  vector<int> g(n+1), nextg(n+1);
  int base;

  auto cmp = [&s, &n, &g, &base](const int& a, const int& b) -> bool {
    return g[a] == g[b] ? g[a + base] < g[b + base] : g[a] < g[b];
  };

  for (int i = 0; i < n; i ++) {
    sa[i] = i;
    g[i] = s[i] - 'A';
  }

  g[n] = -1;
  for (base = 1; base <= n; base <<= 1) {
    sort (sa, sa + n, cmp);

    nextg[sa[0]] = 0;
    for (int i = 1; i < n; i ++) {
      if (cmp(sa[i - 1], sa[i])) {
        nextg[sa[i]] = nextg[sa[i-1]] + 1;
      } else {
        nextg[sa[i]] = nextg[sa[i-1]];
      }
    }

    for (int i = 0 ;i < n; i ++) {
      g[i] = nextg[i];
    }
  }
}

void lcp(const char* s, const int *sa, int* l) {
  int n = strlen(s);
  vector<int> r(n + 1);
  for (int i = 0; i < n; i ++)
    r[sa[i]] = i;

  for (int i = 0, k = 0; i < n; i++, k = max(k - 1, 0)) {
    if (r[i] == n -1) continue;
    for (int j = sa[r[i] + 1]; s[i + k] == s[j + k]; k ++)
      ;
    l[r[i]] = k;
  }
}

#define SIZE 1000010

char S[SIZE];
int SA[SIZE], L[SIZE];

int main () {
  scanf(" %s", S);
  int n = strlen(S);
  suffix(S, SA);
  lcp(S, SA, L);
  for (int i = 0; i < n; i ++) {
    printf("%d ", SA[i] + 1);
  }
  printf("\nx ");
  for (int i = 0; i < n -1; i ++) {
    printf("%d ", L[i]);
  }
  return 0;
}

```

## FFT
```cpp
#include <bits/stdc++.h>
#define sci(n) scanf("%d", &(n))
#define scl(n) scanf("%lld", &(n))
#define pri(n) printf("%d ", (n))
#define prl(n) printf("%lld ", (n))
using namespace std;
using lld = long long;
using pii = pair<lld, lld>;
using vi = vector<lld>;
using vvi = vector<vi>;
using vpii = vector<pii>;
using base = complex<double>;

/* Fast Fourier transform */
void fft(vector<base> &a, bool invert) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; ++ i) {
        int bit = n >> 1;
        for (; j >= bit; bit >>= 1) j -= bit;
        j += bit;
        if (i < j) swap(a[i], a[j]);
    }
    for (int len = 2; len <= n; len <<= 1){
        double ang = 2 * M_PI / len * (invert ? -1 : 1);
        base wlen(cos(ang), sin(ang));
        for (int i = 0; i < n; i += len){
            base w(1);
            for (int j = 0; j < len / 2; ++ j){
                base u = a[i + j], v = a[i + j + len / 2] * w;
                a[i + j] = u + v;
                a[i + j + len / 2] = u - v;
                w *= wlen;
            }
        }
    }
    if (invert) {
        for (int i = 0; i < n; ++ i) a[i] /= n;
    }
}
/* Fast Multiply Using FFT */
void multiply(const vector<int> &a, const vector<int> &b, vector<int> &res) {
    vector<base> fa(a.begin(), a.end()), fb(b.begin(), b.end());
    int n = 1;
    while (n < max(a.size(),b.size()))
      n <<= 1;
    n <<= 1;
    fa.resize(n);
    fb.resize(n);
    fft(fa, false);
    fft(fb, false);
    for (int i = 0; i < n; ++ i)
      fa[i] *= fb[i];
    fft(fa,true);
    res.resize(n);
    for (int i = 0; i < n; ++ i)
      res[i] = int(fa[i].real() + (fa[i].real() > 0 ? 0.5 :-0.5));
}

```

## LCA (Untested)
```cpp
#include <iostream>
#include <algorithm>
using namespace std;
#define SIZE (1 << 17)

int depth[SIZE];
int parent[17][SIZE];

int lca(int s, int e){
  if(depth[s] > depth[e]) swap(s, e);
  int dx = depth[e] - depth[s];
  for(int i = 0; i < 17; i++){
    if((dx >> i) & 1) e = parent[i][e];
  }
  for(int i = 16; i >= 0; i--){
    if(parent[i][s] != parent[i][e]){
      s = parent[i][s];
      e = parent[i][e];
    }
  }
  if(s == e) return s;
  return parent[0][s];
}

/* Must fill parent[0][idx] before use*/
void lca_build(int N) {
  for(int i = 1; i <= 16; i ++){
    for(int j = 1; j<= N; j ++){
      parent[i][j] = parent[i-1][parent[i-1][j]];
    }
  }
}
```

## Network Flow
```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
#define sci(N) scanf("%d", &(N))
#define INF 987654321
using namespace std;
class NetworkFlow {
  public:
    struct edge {
      int dest, invi, fl;
    };
    int vn;
    vector<int> lv, work;
    vector<vector<edge>> edges;

  public:
    NetworkFlow (int n)
      : vn(n), lv(vn), edges(vn), work(vn)
    {}

    void addEdge(int s, int d, int f) {
      edge x{ d, (int)edges[d].size(), f};
      edge y{ s, (int)edges[s].size(), 0};

      edges[s].push_back(x);
      edges[d].push_back(y);
    }

    bool bfsv(int s, int d)
    {
      int i;
      int nv, nlv;

      fill(lv.begin(), lv.end(), 0);

      lv[s] = 1;
      queue<int> q;
      q.push(s);

      while (!q.empty()){
        nv = q.front();
        q.pop();
        nlv = lv[nv];

        for (const auto& e: edges[nv]) {
          if (e.fl > 0 && lv[e.dest] == 0) {
            lv[e.dest] = nlv + 1;
            q.push(e.dest);
            if (e.dest == d) return true;
          }
        }
      }
      return false;
    }

    int flowing(int s, int d, int f) {
      if (s == d) return f;
      int nf;

      for (int &i = work[s]; i < edges[s].size(); ++ i) {
        auto& e = edges[s][i];
        if (e.fl > 0 && lv[e.dest] == lv[s] +1) {
          nf = flowing(e.dest, d, min(f, e.fl));
          if (nf > 0) {
            edge &ei = edges[e.dest][e.invi];
            e.fl -= nf;
            ei.fl += nf;
            return nf;
          }
        }
      }
      return 0;
    }

    int solve (int s, int d) {
      int res = 0;
      int nres;
      while (bfsv(s, d)) {
        fill(work.begin(), work.end(), 0);
        while (true) {
          nres = flowing(s, d, INF);
          if (nres == 0) break;
          res += nres;
        }
      }

      return res;
    }
};
```

## MCMF
```cpp
#include <iostream>
#include <vector>
#include <stack>
#include <queue>
#include <algorithm>

#define INF 987654321
using namespace std;
struct MCMF {
  struct edge_t {
    int t, inv, fl, dist;
  };

  int vn;
  vector<int> lv, work, dst, h;
  vector<bool> inq, chk;
  vector<vector<edge_t>> edges;

  MCMF(int n): vn(n), edges(vn), work(vn), dst(vn), inq(vn), chk(vn), h(vn) {}

  void addEdge(int s, int d, int dist, int c) {
    edge_t x { d, (int) edges[d].size(), c, dist};
    edge_t y { s, (int) edges[s].size(), 0, -dist};

    edges[s].push_back(x);
    edges[d].push_back(y);
  }

  void init(int s, int d) {
    dst.assign(vn, INF);
    h.assign(vn, INF);
    queue<int> q;
    q.push(s);

    while (!q.empty()) {
      int f = q.front();
      q.pop();
      inq[f] = false;

      for (const edge_t& e: edges[f]) {
        if (e.fl && h[e.t] > h[f] + e.dist) {
          h[e.t] = h[f] + e.dist;
          if (!inq[e.t]) {
            inq[e.t] = true;
            q.push(e.t);
          }
        }
      }
    }

    for (int i = 0; i < vn; ++ i) {
      for (auto& e: edges[i]) {
        if (e.fl) e.dist += h[i] - h[e.t];
      }
    }
    priority_queue<pair<int, int>> pq;
    pq.push({0, s});
    dst[s] = 0;

    while (!pq.empty()) {
      pair<int, int> f = pq.top();
      pq.pop();
      int cost = - f.first;
      int cur = f.second;

      if (dst[cur] - cost) continue;
      for (const auto& e: edges[cur]) {
        if (e.fl && dst[e.t] > dst[cur] + e.dist) {
          dst[e.t] = dst[cur] + e.dist;
          pq.push({- dst[e.t], e.t});
        }
      }
    }

    for (int i = 0; i < vn; ++ i) {
      dst[i] += h[d] - h[s];
    }
  }

  bool update() {
    int min_d = INF;
    for (int i = 0; i < vn; ++ i) {
      if (!chk[i]) continue;
      for (const edge_t& e : edges[i]) {
        if (e.fl && !chk[e.t])
          min_d = min(min_d, dst[i] + e.dist - dst[e.t]);
      }
    }
    if (min_d >= INF) return false;
    for (int i = 0; i < vn; ++ i) {
      if (!chk[i]) dst[i] += min_d;
    }
    return true;
  }

  int flowing(int s, int d, int fl) {
    chk[s] = true;
    if (s == d) return fl;

    int nf;
    for (int &i = work[s]; i < edges[s].size(); ++ i) {
      edge_t& e = edges[s][i];
      if (!chk[e.t] && dst[e.t] == dst[s] + e.dist && e.fl) {
        int ret = flowing(e.t, d, min(fl, e.fl));
        if (ret) {
          e.fl -= ret;
          edges[e.t][e.inv].fl += ret;
          return ret;
        }
      }
    }

    return 0;
  }

  pair<int, int> solve(int s, int e) {
    int cost = 0, dist = 0;
    init(s, e);
    do {
      int tmp;
      work.assign(vn, 0);
      chk.assign(vn, false);
      while (true) {
        tmp = flowing(s, e, INF);
        if (tmp == 0) break;

        cost += dst[e] * tmp;
        dist += tmp;
        chk.assign(vn, false);
      }
    } while (update());
    return {cost, dist};
  }
};
```

## Aho-Corasick
 * boj 9250

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <map>
#include <cstring>
#define FASTIO() do{cin.tie(0);cout.tie(0); ios_base::sync_with_stdio(false);}while(0)

using namespace std;

struct AhoCorasick {
  struct node_t {
    int fail;
    int end;
    map<char, int> children;
    char debug;
    node_t() : fail(0), end(0) {};
  };

  vector<node_t> nodes;
  AhoCorasick() :nodes(1){ }

  void appendToTrie(const char* data) {
    int cur = 0;
    int length = strlen(data);
    for (int i = 0; i < length; ++ i) {
      auto it = nodes[cur].children.find(data[i]);
      if (it != nodes[cur].children.end()) {
        cur = nodes[cur].children[data[i]];
      } else {
        nodes[cur].children[data[i]] = nodes.size();
        cur = nodes.size();
        node_t t;
        t.debug = data[i];
        nodes.push_back(t);
      }
    }
    nodes[cur].end ++;
  }

  void appendToTrie(string data) {
    appendToTrie(data.c_str());
  }

  void build() {
    queue<int> q;
    q.push(0);

    while (!q.empty()) {
      int f = q.front(); q.pop();
      node_t& parent = nodes[f];
      for (const auto& e: parent.children) {
        node_t& child = nodes[e.second];
        int fail = parent.fail;

        q.push(e.second);
        if (f == 0) continue;
        while (fail != 0 && nodes[fail].children.find(e.first) == nodes[fail].children.end())
          fail = nodes[fail].fail;
        if (nodes[fail].children.find(e.first) != nodes[fail].children.end())
          fail = nodes[fail].children[e.first];
        child.fail = fail;

         if (nodes[child.fail].end > 0)
         child.end ++;
      }
    }
  }

  bool contain(const char* heystack) {
    int matched = 0, leng = strlen(heystack);
    for (int i = 0; i < leng; ++ i) {
      while (matched > 0 && nodes[matched].children.find(heystack[i]) == nodes[matched].children.end())
        matched = nodes[matched].fail;
      if (nodes[matched].children.find(heystack[i]) != nodes[matched].children.end()) {
        matched = nodes[matched].children[heystack[i]];
        if (nodes[matched].end > 0)
          return true;
      }
    }
    return false;
  }

  void printTrie() {
    printTrie(nodes[0], 1);
  }
  void printTrie(const node_t& node, int depth) {
    for (const auto& e : node.children) {
      cout << e.second;
      for (int i = 0 ; i < depth; ++ i) cout << "-";
      cout << e.first <<  "\t\t fail : " << nodes[e.second].fail << "end : " << nodes[e.second].end << "\n";
      printTrie(nodes[e.second], depth + 1);
    } } void printNodes() {
      for (int i = 0; i < nodes.size(); ++ i) {
        cout << i << " - " << nodes[i].debug << "\n";
        for (const auto& e : nodes[i].children) {
          cout << "-----"<< e.first << ", " << e.second << "\n";
        }
      }
    }
};

int N, M;
string data;
int main () {
  FASTIO();
  AhoCorasick ah;
  cin >> N;
  for (int i = 0; i < N; ++ i) {
    cin >> data;
    ah.appendToTrie(data);
  }
  ah.build();
  //ah.printTrie();
  ///ah.printNodes();
  cin >> M;
  for (int i = 0; i < M; ++ i) {
    cin >> data;
    cout << (ah.contain(data.c_str()) ? "YES\n" : "NO\n");
  }

  return 0;
}
```

## Offline Query (Mo's Algorithm)

```cpp
#include <iostream>
#include <cmath>
#include <algorithm>
using namespace std;
#define SIZE 100100
#define NUM_SIZE 1000100
int N, M, sn;
using lld = long long;
lld data[SIZE];
lld cnt[NUM_SIZE];
struct query_t {
  int s, e, i;
} query[SIZE];
lld result[SIZE];
int main () {
  cin.tie(0);
  cout.tie(0);
  ios_base::sync_with_stdio(false);
  cin >> N;
  cin >> M;
  for (int i = 0; i < N; ++ i)
    cin >> data[i];
  for (int i = 0; i < M; ++ i) {
    cin >> query[i].s >> query[i].e;
    query[i].s --;
    query[i].e --;
    query[i].i = i;
  }
  sn = sqrt(N);
  sort(query, query + M, [](const query_t& a, const query_t& b) -> bool {
    return a.s / sn == b.s / sn ? a.e  < b.e : a.s / sn < b.s / sn;
  });

  int scur = 1, ecur = 0;
  lld cur_result = 0;
  for (int i = 0; i < M; ++ i) {
    int s = query[i].s, e = query[i].e;
    while (scur > s) {
      int idx = data[-- scur];
      cur_result -= cnt[idx] * cnt[idx] * idx;
      cnt[idx] ++;
      cur_result += cnt[idx] * cnt[idx] * idx;
    }
    while (scur < s) {
      int idx = data[scur ++];
      cur_result -= cnt[idx] * cnt[idx] * idx;
      cnt[idx] --;
      cur_result += cnt[idx] * cnt[idx] * idx;
    }

    while (ecur < e) {
      int idx = data[++ ecur];
      cur_result -= cnt[idx] * cnt[idx] * idx;
      cnt[idx] ++;
      cur_result += cnt[idx] * cnt[idx] * idx;
    }

    while (ecur > e) {
      int idx = data[ecur --];
      cur_result -= cnt[idx] * cnt[idx] * idx;
      cnt[idx] --;
      cur_result += cnt[idx] * cnt[idx] * idx;
    }
    result[query[i].i] = cur_result;
  }
  for (int i = 0; i < M; ++ i) {
    cout << result[i] << "\n";
  }
  return 0;
}
```

## Sliding Window DP
 * 원래 dp 식은 O(nm) 걸리는건데, deque를 활용해서 시간 줄이기
 * $$dp_0 = data_0$$
 * $$dp_i = max_{1 \le j \le max(i, k)} dp_{i-j} + data_i$$

```cpp
#include <iostream>
#include <deque>
#define SIZE 100100
#define FASTIO() do{ cin.tie(0); cout.tie(0); ios_base::sync_with_stdio(false); } while(0)
using namespace std;
using lld = long long;
deque<pair<lld, int>> dq;
lld dp[SIZE];
lld N, D;
lld data[SIZE];
int main () {
  FASTIO();
  cin >> N >> D;
  for (int i = 0; i < N; ++ i)
    cin >> data[i];

  lld result = data[0];
  for (int i = 1; i < N; ++ i) {
    result = max(data[i], result);
  }
  dp[0] = data[0];
  dq.push_back({dp[0], 0});
  for (int i = 1; i < N; ++ i) {
    while (!dq.empty() && dq.front().second < i - D) dq.pop_front();
    while (!dq.empty() && dq.back().first < dp[i - 1]) dq.pop_back();
    dq.push_back({dp[i - 1], i - 1});
    //cout << i << " : " << dq.front().first << "\n";
    dp[i] = max(0LL, dq.front().first) + data[i];
  }
  for (int i = 0; i < N; ++ i) {
    result = max(dp[i], result);
  }
  cout << result;
  return 0;
}
```

## ConvexhullTrick DP (cht)

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
#define FASTIO() do{ cin.tie(0); cout.tie(0); ios_base::sync_with_stdio(false); } while(0)
#define SIZE 100100
using lld = long long;
using pii = pair<lld, lld>;
int N;
lld A[SIZE], B[SIZE];
lld dp[SIZE];
struct line_t {
  lld a, b;
};
// dp[i] = min_{1 <= j < i} (a[i]b[j] + dp[j])

struct cht_t {
  int s = 0, e = 0;
  int idx[SIZE];
  line_t deq[SIZE];

  double cross(int a, int b) {
    return 1.0 * (deq[a].b - deq[b].b) / (deq[b].a - deq[a].a);
  }

  void insert(line_t v, int line_idx) {
    deq[e] = v;
    idx[e] = line_idx;
    while (s + 1 < e && cross(e - 2, e- 1) > cross (e - 1, e)) {
      deq[e - 1] = deq[e];
      idx[e - 1] = idx[e];
      e --;
    }
    e ++;
  }

  pii query(lld x) {
    int l = 0, r = e - 1;
    while (l < r) {
      int m = (l + r) / 2;
      if (cross(m, m + 1) <= x) l = m + 1;
      else r = m;
    }
    return {deq[l].a * x + deq[l].b, idx[l]};
  }
} cht;

int main () {
  FASTIO();
  cin >> N;
  for (int i = 0; i < N; ++ i) cin >> A[i];
  for (int i = 0; i < N; ++ i) cin >> B[i];

  dp[0] = 0;
  cht.insert(line_t{B[0], dp[0]}, 0);
  for (int i = 1; i < N; ++ i) {
    dp[i] = cht.query(A[i]).first;
    cht.insert(line_t{B[i], dp[i]}, i);
  }
  cout << dp[N - 1];
  return 0;
}
```

## 기하 알고리즘
### 교차점 검출
```cpp
#include <iostream>
#include <vector>
#define FASTIO() do{cin.tie(0);cout.tie(0);ios_base::sync_with_stdio(0);}while(0)
using lld = long long;
using namespace std;
struct vector_t : public pair<lld, lld> {
    lld& x;
    lld& y;
    vector_t() : x{first}, y{second}
    {};
    vector_t(lld f, lld s) : x{first}, y{second}
    {first = f; second = s;};
};

lld crossValue(const vector_t& a, const vector_t& b) {
  return a.x * b.y - b.x * a.y;
}

lld ccw(const vector_t& p1, const vector_t& p2, const vector_t& p3) {
  lld cv = crossValue({p1.x - p2.x, p1.y - p2.y}, {p3.x - p2.x, p3.y - p2.y});
  if (cv > 0) return 1;
  if (cv == 0) return 0;
  return -1;
}

bool isIntersect(vector_t p1, vector_t p2,
    vector_t q1, vector_t q2) {
    lld pq = ccw (p1, p2, q1) * ccw(p1, p2, q2);
    lld qp = ccw (q1, q2, p1) * ccw(q1, q2, p2);
    if (p1 > p2) swap(p1, p2);
    if (q1 > q2) swap(q1, q2);
    return (!pq && !qp) ? q1 <= p2 && p1 <= q2 : pq <= 0 && qp <= 0;
}
int main () {
  vector_t p1, p2, p3, p4;
  cin >> p1.x >> p1.y; cin >> p2.x >> p2.y;
  cin >> p3.x >> p3.y; cin >> p4.x >> p4.y;
  if (p1 > p2) swap(p1, p2);
  if (p3 > p4) swap(p3, p4);
  if (isIntersect(p1, p2, p3, p4)) {
    cout << "1\n";
    if (p1 == p3 && p2 != p4) {
      cout << p1.x << " " << p1.y;
    } else if (p1 == p4) {
      cout << p1.x << " " << p1.y;
    } else if (p2 == p3) {
      cout << p2.x << " " << p2.y;
    } else {
      lld A = (p2.y - p1.y);
      lld B = (p1.x - p2.x);
      lld E = (A * p1.x) + (B * p1.y);
      lld C = (p4.y - p3.y);
      lld D = (p3.x - p4.x);
      lld F = (C * p3.x) + (D * p3.y);
      lld DE = A * D - B * C;
      //printf("%lld %lld %lld %lld %lld %lld \n", A, B, C, D, E, F);
      if (DE == 0) return 0;
      long double x = (long double)((E * D) - (B * F)) / DE;
      long double y = (long double)((A * F) - (E * C)) / DE;
      cout.precision(20);
      cout << x << " " << y;
    }
  } else {
    cout << "0";
  }
  return 0;
}
```

## HLD

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
using lld = long long;
#define SIZE (1 << 18)
#define FASTIO() do{ cin.tie(0); cout.tie(0); ios_base::sync_with_stdio(false); } while(0)

struct node_t {
  lld value, lazy;
};

using vi = vector<int>;
vi edges[SIZE];
struct hld_tree {
    int sz[SIZE] = {0}, top[SIZE] ={0}, s[SIZE]={0}, e[SIZE]={0}, se_cnt = 0, depth[SIZE]={0};
    int parent[SIZE]={0};
    void build(int root) {
        depth[root] = 1;
        top[root] = root;
        parent[root] = 0;
        sz[0] = 0;
        dfs0(root);
        dfs1(root);
        dfs2(root);
    }
    vi g[SIZE];
    void dfs0(int v) {
        for (int& to: edges[v]) {
            if (parent[v] == to) continue;
            parent[to] = v;
            g[v].push_back(to);
            dfs0(to);
        }
    }
    void dfs1(int v) {
        sz[v] =1;
        for (auto&i : g[v]) {
            depth[i] = depth[v] + 1;
            dfs1(i);
            sz[v] += sz[i];
            if (sz[i] > sz[g[v][0]]) swap(i, g[v][0]);
        }
    }
    void dfs2(int v) {
        s[v] = ++ se_cnt;
        for(auto i : g[v]) {
            top[i] = i == g[v][0] ? top[v] : i;
            dfs2(i);
        }
        e[v] = se_cnt;
    }
} hld;

/* sum tree */
struct seg_tree {
  node_t node[4 * SIZE];

  lld build(lld* d, lld idx, lld s, lld e) {
    if (s == e) return node[idx].value = d[s];
    return node[idx].value = build(d, idx * 2, s, (s + e) / 2) + build(d, idx * 2 + 1, (s + e) / 2 + 1, e);
  }

  void update_lazy(lld idx, lld s, lld e) {
    if (node[idx].lazy != 0) {
      node[idx].value += (e - s + 1) * node[idx].lazy;
      if (s != e) {
        node[idx * 2].lazy += node[idx].lazy;
        node[idx * 2 + 1].lazy += node[idx].lazy;
      }
      node[idx].lazy = 0;
    }
  }

  lld update_range(lld idx, lld diff, lld s, lld e, lld l, lld r) {
    update_lazy(idx, s, e);
    if (r < s || l > e) return node[idx].value;
    if (l <= s && e <= r) {
      node[idx].lazy += diff;
      update_lazy(idx, s, e);
      return node[idx].value;
    }
    return node[idx].value =
      update_range(idx * 2, diff ,s, (s + e) / 2, l, r) + update_range(idx * 2 + 1, diff, (s + e) / 2 + 1, e, l, r);
  }

  lld query(lld idx, lld s, lld e, lld l, lld r) {
    update_lazy(idx, s, e);
    if (r < s || l > e) return 0;
    if (l <= s && e <= r) return node[idx].value;
    return query(idx * 2, s, (s + e)/ 2, l, r) + query(idx * 2 + 1, (s + e) / 2 + 1, e, l, r);
  }
}seg;
int main () {
  lld N, C;
  //FASTIO();
  cin >> N >> C;
  for (int i = 0; i < N - 1; ++ i) {
      int x, y;
      cin >> x >> y;
      edges[x].push_back(y);
      edges[y].push_back(x);
  }
  hld.build(C);
  int Q;
  cin >> Q;
  for (int i = 0; i < Q; ++ i) {
      int q, a;
      cin >> q >> a;
      if (q == 1) {
          int cur = a;
          while (cur != 0) {
              seg.update_range(1, 1, 1, SIZE - 1, hld.s[hld.top[cur]], hld.s[cur]);
              cur = hld.parent[hld.top[cur]];
          }
      } else if (q == 2){
          cout << seg.query(1, 1, SIZE - 1, hld.s[a], hld.s[a]) * hld.depth[a] << "\n";
      }
  }
  return 0;
}
```

## 수학
## 소수 판별(Miller-Rabin)
 * unsigned long long 까지만 됨, 음수 안 넣게 조심!!

```cpp
#include <iostream>
#define scl(N) scanf("%lld", &(N))
using namespace std;
using lld = long long;
using ulld = unsigned long long;
using llld = __int128_t;
ulld fast_pow(ulld x, ulld y, ulld m){
  ulld r = 1;
  x %= m;
  while (y != 0){
    if(y % 2 == 1) r = (llld)r * x % m;
    x = (llld)x * x % m;
    y /= 2;
  }
  return r;
}
const ulld miller_rabin_prime[] = {
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37
};
bool isPrime(const ulld p) {
  ulld d = p - 1;
  for (int i = 0; i < 12; ++ i) {
    if (miller_rabin_prime[i] == p) return true;
    if (miller_rabin_prime[i] > p) return true;
    lld t = fast_pow(miller_rabin_prime[i], d, p);
    while (t == p - 1 && d % 2 == 0) {
      d /= 2;
      t = fast_pow(miller_rabin_prime[i], d, p);
    }
    if (t != 1) return false;
  }
  return true;
}
```

### 확장 유클리드 & 중국인의 나머지 정리
 * 확장 유클리드 : 자주 안쓰는데 가끔 구현하려고 보면 머리가 하얗게 되서 따로 적어둠.
 * 중국인의 나머지 정리: 나는 바보다 하는 마음가짐으로 다른 사람 구현체를 가져다 쓰기로 했다. 쓸수 있는 조건만 잘 기억해두자.

```cpp
lld ex_uc(lld a, lld b) {
  lld r, t, s, q, p, s1, s2, t1, t2;
  s1 = t2 = 1;
  t1 = s2 = 0;
  p = a;
  while (b != 0) {
    q = a / b;
    r = a % b;

    a = b;
    b = r;

    s = s1 - q * s2;
    s1 = s2;
    s2 = s;

    t = t1 - q * t2;
    t1 = t2;
    t2 = t;
  }

  if (t1 < 0) t1 += p;
  return t1;
}

lld china(lld a, lld b, lld ap, lld bp) {
  lld retval = 0;
  lld t1 = MOD / ap;
  lld t2 = MOD / bp;
  retval += (t1 * ex_uc(ap, t1 % ap)) % MOD * (a % MOD) % MOD;
  retval %= MOD;
  retval += (t2 * ex_uc(bp, t2 % bp)) % MOD * (b % MOD) % MOD;
  retval %= MOD;
  return retval;
}
```

### 조합 (뤼카의 정리 활용)

```cpp
lld comb(lld n, lld k, lld p, vi& fac, vi& inv, vi& finv) {
  if (fac.size() < p) {
    fac.resize(p);
    fac[0] = fac[1] = 1;
    inv[1] = 1;
    finv[0] = finv[1] = 1;
    for (lld i = 2; i < p; ++ i) {
      fac[i] = fac[i - 1] * i % p;
      inv[i] = (p - (p / i) * inv[p % i] % p) % p;
      finv[i] = finv[i - 1]  * inv[i] % p;
    }
  }
  lld t1, t2, retval = 1;
  while (n > 0 || k > 0) {
    t1 = n % p;
    t2 = k % p;
    if (t1 < t2) return 0;
    retval = retval * ((fac[t1] * finv[t2] % p) * finv[t1 - t2] % p) % p;
    n /= p;
    k /= p;
  }
  return retval;
}

/*
  vi fac, inv, finv;
  comb(n, k, p, fac, inv, finv);
 */
```
