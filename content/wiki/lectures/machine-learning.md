---
layout  : wiki
title   : 2022 1학기 머신러닝
summary : 2022 1학기 머신러닝
date    : 2022-03-06 16:12:45 +0900
lastmod : 2022-03-06 21:09:34 +0900
tags    : [lectures]
draft   : false
parent  : lectures
---

## Python Tutorial

```python
y = 2.5
print(type(y)) # <class 'float'>
```

```python
t, f = True, False
print(t and f)
print(t or f)
print(not t)
```

```python
hello = 'hello'
world = 'world'
print(hello, len(hello)) # hello 5
print('{} {} {}'.format(hello, world, 12)) # hello world 12
```

```python
s = 'hello'
print(s.capitalize()) # Hello
print(s.upper()) # HELLO
print(s.rjust(7)) # rjust : Right-justify, "  hello"
print(s.center(7)) # " hello "
print(s.replace('l', '(ell)')) # he(ell)(ell)o
```

```python
xs = [3, 1, 2]
print(xs, xs[-1]) # [3, 1, 2], 2
```

```python
xs.append('bar')
print(xs) # [3, 1, 'foo', 'bar']
x = xs.pop()
print(x, xs) # bar [3, 1, 'foo']
```

```python
nums = list(range(5))
print(nums)        # [0, 1, 2, 3, 4]
print(nums[2:4])   # [2, 3]
print(nums[:2])    # [2, 3, 4]
print(nums[:])     # [0, 1, 2, 3, 4]
print(nums[:-1])   # [0, 1, 2, 3]
nums[2:4] = [8, 9]
print(nums)        # [0, 1, 8, 9, 4]
```

### Lists
```python
animals = ['cat', 'dog', 'monkey']
for animal in animals:
  print(animal)

# cat
# dog
# monkey
```

```python
nums = [0, 1, 2, 3, 4]
squares = [x ** 2 for x in nums]
print(squares) # [0, 1, 4, 9, 16]
```

```python
nums = [0, 1, 2, 3, 4]
even_squares = [x ** 2 for x in nums if x % 2 == 0]
print(even_squares) # [0, 4, 16]
```

### Dictionaries
```python
d = {'cat': 'cute', 'dog': 'furry'}
print(d['cat']) # cute
print('cat' in d) # True
d['fish'] = 'wet'
print(d['fish'])
print(d.get('mongky', 'N/A')) # N/A
print(d.get('fish', 'N/A')) # wet
```

```python
d = { 'person': 2, 'cat': 4, 'spider': 8}
for animal, legs in d.items():
  print('A {} has {} legs'.format(animal, legs))
# A person has 2 legs
# A cat has 4 legs
# A spider has 8 legs
```

```python
nums = [0, 1, 2, 3, 4]
even_num_to_square = {x: x ** 2 for x in nums if x % 2 == 0}
print(even_num_to_square)
```

### Sets
```python
animals = {'cat', 'dog'}
print('cat' in animals)  # True
print('fish' in animals) # False
```

```python
animals.add('fish')
print('fish' in animals) # True
print(len(animals))      # 3
```

```python
animals = {'cat', 'dog', 'fish'}
for idx, animal in enumerate(animals):
  print('#{}: {}'.format(idx + 1, animal))
```

```python
from math import sqrt
print({int(sqrt(x)) for x in range(30)}) # 0, 1, 2, 3, 4, 5
```

### Tuples
```python
d = {(x, x + 1): x for x in range(10)}
t = (5, 6)
print(type(t))   # <class 'tuple'>
print(d[t])      # 5
print(d[(1, 2)]) # 1
```

### Functions
```python
def hello(name, loud=False):
  if loud:
    print('HELLO, {}'.format(name.upper()))
  else:
    print('Hello, {}'.format(name))

hello('Bob')
hello('Fred', loud=True)
```

### Classes
```python
class Greeter:
  def __init__(self, name):
    self.name = name
  def greet(self, loud=False):
    if loud:
      print('HELLO, {}'.format(self.name.upper()))
    else:
      print('Hello, {}'.format(self.name))

g = Greet('Fred')
g.greet()           # "Hello, Fred"
g.greet(loud=False) # "HELLO, FRED"
```

### Numpy
```python
import numpy as np
```

#### Arrays
```python
a = np.array([1, 2, 3])
print(type(a), a.shape, a[0], a[1], a[2]) # <class 'numpy.ndarray'> (3,) 1 2 3
a[0] = 5
print(a)                                  # [5 2 3]
b = np.array[[1, 2, 3], [4, 5, 6]])       # [[1 2 3] [4 5 6]]
print(b.shape)                            # (2, 3)
print(b[0, 0], b[0, 1], b[1, 0])          # 1 2 4
```

```python
a = np.zeros((2, 2))
print(a)
# [[0. 0.]
# [ 0. 0.]]
b = np.ones((1, 2))
print(b)
# [[1. 1.]]
c = np.full((2, 2), 7)
print(c)
# [[7 7]
#  [7 7]]
```

```python
d = np.eye(2) # Create a 2x2 identity matrix
print(d)
# [[1. 0.]
#  [0. 1.]]
```

```python
a = np.array([[1,2,3,4], [5,6,7,8], [9,10,11,12]])
b = a[:2, 1:3]
print(b)
# [[2 3]
#  [6 7]]

row_r1 = a[1, :]     # [5 6 7 8] (4,)
row_r2 = a[1:2, :]   # [[5 6 7 8]] (1, 4)
row_r3 = a[[1], :]   # [[5 6 7 8]] (1, 4)
col_r1 = a[:, 1]     # [2 6 10] (3,)
col_r2 = a[:, 1:2]   # [[ 2] [ 6] [10]] (3,1)
print(a[np.arange(4), b])  # range 를 np.array 타입으로 반환하는 함수 : np.arange
```

```python
a = np.array([[1,2], [3, 4], [5, 6]])
print(a[a > 2])
```

```python
x = np.array([1, 2])
y = np.array([1.0, 2.0])
z = np.array([1, 2], dtype=np.int64)

print(x.dtype, y.dtype, z.dtype) # int64 float64 int64
```

```python
x = np.array([[1,2],[3,4]], dtype=np.float64)
y = np.array([[5,6],[7,8]], dtype=np.float64)

print(x + y)
print(np.add(x, y))
print(x - y)
print(np.subtract(x, y))
print(x * y)
print(np.multiply(x, y))
print(x / y)
print(np.divide(x, y))
print(np.sqrt(x))
```

```python
v = np.array([9,10])
w = np.array([11, 12])
print(v.dot(w))
print(np.dot(v, w))
print(v @ w)
```

```python
x = np.array([[1,2],[3,4]])

print(np.sum(x))  # 10
print(np.sum(x, axis=0))  # [4 6]
print(np.sum(x, axis=1))  # [3 7]
```

```python
print(x)
# [[1 2]
#  [3 4]]
print(x.T)
# [[1 3
#  [2 4]]
```

```python
v = np.array([1, 0, 1])
vv = np.tile(v, (4, 1))
# [[1 0 1]
#  [1 0 1]
#  [1 0 1]
#  [1 0 1]]
```

```python
v = np.array([1,2,3])  # v has shape (3,)
w = np.array([4,5])    # w has shape (2,)

print(np.reshape(v, (3, 1)) * w)
# [[4 5]
#  [8 10]
#  [12 15]]
```

### Mathplotlib
```python
import matplotlib.pyplot as plt
x = np.arange(0, 3 *np.pi, 0.1)
y = np.sin(x)
plt.plot(x, y)
```

```python
y_sin = np.sin(x)
y_cos = np.cos(x)
plt.plot(x, y_sin)
plt.plot(x, y_cos)
plt.xlabel('x axis label')
plt.ylabel('y axis label')
plt.title('Sine and Cosine')
plt.legend(['Sine', 'Cosine'])
```

#### subplot
```python
x = np.arange(0, 3 * np.pi, 0.1)
y_sin = np.sin(x)
y_cos = np.cos(x)
plt.subplot(2, 1, 1)
plt.plot(x, y_sin)
plt.title('Sine')
plt.subplot(2, 1, 2)
plt.plot(x, y_cos)
plt.title('Cosine')
plt.show()
```
