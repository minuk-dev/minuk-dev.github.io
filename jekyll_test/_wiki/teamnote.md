---
layout  : wiki
title   : algorithm teamnote
summary : 
date    : 2020-08-08 00:10:21 +0900
lastmod : 2020-08-17 18:41:06 +0900
tags    : [algorithm, teamnote]
draft   : false
parent  : 
---

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

## Segment Tree (Range Update) & Index Tree (Point Update)
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
      if (s & 1) retval = min(retval, node[s++]);
      if (e & ~1) retval = min(retval, node[e--]);
      s >>= 1;
      e >>= 1;
    }
    if (s == e) retval = min(retval, node[s]);
    return retval;
  }
};


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

## KMP
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
    for (int i=1,j=0;i<n;i++){
        int bit = n >> 1;
        for (;j>=bit;bit>>=1) j -= bit;
        j += bit;
        if (i < j) swap(a[i],a[j]);
    }
    for (int len=2;len<=n;len<<=1){
        double ang = 2*M_PI/len*(invert?-1:1);
        base wlen(cos(ang),sin(ang));
        for (int i=0;i<n;i+=len){
            base w(1);
            for (int j=0;j<len/2;j++){
                base u = a[i+j], v = a[i+j+len/2]*w;
                a[i+j] = u+v;
                a[i+j+len/2] = u-v;
                w *= wlen;
            }
        }
    }
    if (invert) {
        for (int i=0;i<n;i++) a[i] /= n;
    }
}
/* Fast Multiply Using FFT */
void multiply(const vector<int> &a,const vector<int> &b,vector<int> &res) {
    vector <base> fa(a.begin(), a.end()), fb(b.begin(), b.end());
    int n = 1;
    while (n < max(a.size(),b.size())) n <<= 1;
    fa.resize(n); fb.resize(n);
    fft(fa,false); fft(fb,false);
    for (int i=0;i<n;i++) fa[i] *= fb[i];
    fft(fa,true);
    res.resize(n);
    for (int i=0;i<n;i++) res[i] = int(fa[i].real()+(fa[i].real()>0?0.5:-0.5));
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
class NetworkFlow {
private:
  struct edge {
    int dest, invi, fl;
  };

  int vn;
  vi lv;
  const static int INF = numeric_limits<int>::max();
  vector< vector<edge> > edges;

public:
  NetworkFlow (int n)
    : vn(n), lv(vn), edges(vn)
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

    for (auto &e : edges[s]) {
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