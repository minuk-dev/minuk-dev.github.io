---
layout  : wiki
title   : 케라스 창시자에게 배우는 딥러닝 책 공부
summary : 어디까지 읽었는지, 추가적으로 기억할만한거 정리
date    : 2021-08-22 16:04:33 +0900
lastmod : 2021-08-22 23:23:45 +0900
tags    : [keras]
draft   : false
parent  : "Book Review"
---

## 1. 딥러닝이란 무엇인가?
### 1.1 인공지능과 머신러닝, 딥러닝
### 1.2 딥러닝 이전: 머신러닝의 간략한 역사
 * 확률적 모델링
 * 초창기 신경망
 * 서포트 벡터 머신
 * 결정 트리, 랜덤 포레스트, 그래디언트 부스팅 머신
 * 신경망
 * 최근 동향 : 그래디언트 부스팅(구조적인 데이터), 딥러닝 (이미지 데이터)

### 1.3 왜 딥러닝일까? 왜 지금일까?
 * 하드웨어 발전
 * 활성화 함수 : ReLU
 * 가중치 초기화 방법 : Xavier 초기화 Glorot 초기화
 * 최적화 방법 : RMSProp, Adam


## 2. 신경망의 수학적 구성요소

```python
from keras.datasets import mnist
(train_images, train_labels), (test_imagese, test_labels) = mnist.load_data()

from keras import models
from keras import layers

network = models.Sequential()
network.add(layers.Dense(512, activation='relu', input_shape=(28 * 28,)))
network.add(layers.Dense(10, activation='softmax'))
network.compile(optimizer='rmsprop',
                loss='categorical_crossentropy',
                metrics=['accuracy'])

train_images = train_images.reshape((train_images.shape[0], 28 * 28))
train_images = train_images.astype('float32') / 255
test_images = test_images.reshape((test_images.shape[0], 28 * 28))
test_images = test_images.astype('float32') / 255

from keras.utils import to_categorical
train_labels = to_categorical(train_labels)
test_labels = to_categorical(test_labels)

network.fit(train_images, train_labels, ephocs=5, batch_size=128)
test_loss, test_acc = network.evaluate(test_images, test_labels)
print('test_acc:', test_acc)
```

### 2.2 신경망을 위한 데이터 표현
 * 스칼라(0D 텐서)
```python
import numpy as np
x = np.array(12)
```

 * 벡터(1D 텐서)
```python
x = np.array([12, 3, 6, 14, 7])
```

 * 행렬(2D 텐서)
```python
x = np.array([[5, 78, 2, 34, 0],
              [6, 79, 3, 35, 1],
              [7, 80, 4, 36, 2]])
```

 * 핵심속성:
   * 축의 개수(랭크) : ndim
   * 크기(shape)
   * 데이터 타입(dtype)

 * 이미지 출력

```python
digit = train_images[4]

import matplotlib.pyplot as plt
plt.imshow(digit, cmap=plt.cm.binary)
plt.show()
```

 * 텐서의 실제 사례:
   * 벡터 데이터 : (sample, features) 크기의 2D 텐서
   * 시계열 데이터 또는 시퀀스(sequence) 데이터 : (samples, timesteps, features)
   * 이미지 : (samples, height, width, channels) 또는 (samples, channels, height, width) 크기의 4D 텐서
   * 동영상 : (samples, frames, height, width, channels) 또는 (samples, frames, channels, height, width) 크기의 5D 텐서

 * 브로드캐스팅:
   * 큰 텐서의 ndim에 맞도록 작은 텐서에 (브로드캐스팅 축이라고 부르는) 축이 추가된다.
   * 작은 텐서가 새 축을 따라서 큰 텐서의 크기에 맞도록 반복된다.

### 신경망의 엔진: 그레디언트 기반 최적화
 * 텐서 연산의 변화율: 그레디언트
 * 확률적 경사 하강법
 * 변화율 연결: 역전파 알고리즘

### 요약
 * 학습은 훈련 데이터 샘플과 그에 상응하는 타깃이 주어졌을 때 손실 함수를 최소화하는 모델 파라미터의 조합을 찾는 것을 의미한다.
 * 데이터 샘플과 타깃의 배치를 랜덤하게 뽑고 이 배치에서 손실에 대한 파라미터의 그래디언트를 계산함으로써 학습이 진행된다. 네트워크의 파라메터는 그래디언터의 반대방향으로 조금씩(학습률에 의해 정의도니 크기만큼) 움직인다.
 * 전체 학습 과정은 신경망이 미분 가능한 텐서 연산으로 연결되어 있기 때문에 가능하다. 현재 파라미터와 배치 데이터를 그래디언트 값에 매핑해 주는 그래디언트 함수를 구성하기 위해 미분의 연쇄 법칙을 사용한다.
 * 손실과 옵티마이저
 * 손실은 훈련하는 동안 최소화해야 할 양이므로 해결하려눈 문제의 성공을 측정하는데 사용한다.
 * 옵티마이저는 손실에 대한 그래디언트가 파라미터를 업데이트하는 정확한 방식을 정의한다.

## 3장 신경망 시작하기
### 3.1 신경망의 구조
 * 네트워크(또는 모델)를 구성하는 층
 * 입력 데이터와 그에 상응하는 타깃
 * 학습에 사용할 피드백 신호를 정의하는 손실 함수
 * 학습 진행방식을 결정하는 옵티마이저

### 3.2 케라스 소개
### 3.3 딥러닝 컴퓨터 셋팅
### 3.4 영화 리뷰 분류: 이진 분류 예제
```python
from keras.datasets import imdb
(train_data, train_labels), (test_data, test_labels) = imdb.load_data(num_words=10000)

import numpy as np
def vectorize_sequences(sequences, dimension=10000):
  results = np.zeros((len(sequences), dimension))
  for i, sequence in enumerate(sequences):
    results[i, sequence] = 1.
  return results

x_train = vectorize_sequences(train_data)
x_test = vectorize_sequences(test_data)

from keras import models
from keras import layers

model = models.Sequential()
model.add(layers.Dense(16, activation='relu', input_shape=(10000,)))
model.add(layers.Dense(16, activation='relu'))
model.add(layers.Dense(1, activation='sigmoid'))
model.compile(optimizer='rmsprop',
              loss='binary_crossentropy',
              metrics=['accuracy'])
# from keras import optimizers
# model.compile(optimizer=optimizers.RMSprop(lr=0.001), loss='binary_crossentropy', metrics=['accuracy'])

x_val = x_train[:10000]
partial_x_train = x_train[10000:]
y_val = y_train[:10000]
partial_y_train[10000;]

history = model.fit(partial_x_train, partial_y_train, epochs=20, batch_size=512, validation_data=(x_val, y_val))

# 훈련 검증 손실 그리기
import matplotlib.pyplot as plt

history_dict = history.history
loss = history_dict['loss']
val_loss = history_dict['val_loss']

epochs = range(1, len(loss) + 1)

plt.plot(epochs, loss, 'bo', label='Training loss')
plt.plot(epochs, val_loss, 'b', label='Validation loss')
plt.title('Training and validation loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()

plt.show()

# 훈련 검증 정확도 그리기
plt.clf()
acc = history_dict['acc']
val_acc = history_dict['val_acc']

plt.plot(epochs, acc, 'bo', label='Training acc')
plt.plot(epochs, val_acc, 'b', label='Validation acc')
plt.title('Training and validation accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()

plt.show()

model.predict(x_test)
```

### 정리
 * 원본 데이터를 신경망에 텐서로 주입하기 위해서 많은 전처리가 필요하다.
 * relu 활성화 함수
 * 이진 분류 문제에서 하나의 유닛과 sigmoid 활성화 함수를 가진 Dense 층으로 끝나야 한다.
 * 이진 분류 문제에서 이런 손실함수는 binary_crossentropy 이다.
 * rmsprop는 일반적으로 좋은 선택이다.
 * 훈련 데이터에서 과적합을 유의해야 한다.

### 3.5 뉴스기사 분류: 다중 분류 문제
 * 로이터 데이터셋

```python
from keras.datasets import reuters

(train_data, train_labels), (test_data, test_labels) = reuters.load_data(num_wors=10000)
word_index = reuters.get_word_index()
reverse_word_index = dict([(value, key) for (key, value) in word_index.items()])
decoded_newswire = ' '.join([reverse_word_index.get(i - 3, '?') for i in train_data[0]])

import numpy as np
def vectorize_sequences(sequences, dimension=10000):
  results = np.zeros((len(sequences), dimension))
  for i, sequence in enumerate(sequences):
    results[i, sequence] = 1.
  return results

x_train = vectorize_sequences(train_data)
x_test = vectorize_sequences(test_data)

def to_one_hot(labels, dimension=46):
  results = np.zeros((len(labels), dimension))
  for i, label in enumerate(labels):
    results[i, label] = 1.
  return results

one_hot_train_labels = to_one_hot(train_labels)
one_hot_test_labels = to_one_hot(test_labels)

from keras.utils.np_utils import to_categorical
one_hot_train_label = to_categorical(train_labels)
one_hot_test_labels = to_categorical(test_labels)

from keras import models
from keras import layers

model = models.Sequential()
model.add(layers.Dense(64, activation='relu', input_shape=(10000,)))
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dense(46, activation='softmax'))

model.compile(optimizer='rmsprop',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

x_val = x_train[:1000]
partial_x_train = x_train[1000:]

y_val = y_train[:1000]
partial_y_train = y_train[1000:]

history = model.fit(partial_x_train, partial_y_train, epochs=20, batch_size=512,
                    validation_data=(x_val, y_val))

# 훈련 검증 손실 그리기
import matplotlib.pyplot as plt

history_dict = history.history
loss = history_dict['loss']
val_loss = history_dict['val_loss']

epochs = range(1, len(loss) + 1)

plt.plot(epochs, loss, 'bo', label='Training loss')
plt.plot(epochs, val_loss, 'b', label='Validation loss')
plt.title('Training and validation loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()

plt.show()

# 훈련 검증 정확도 그리기
plt.clf()
acc = history_dict['acc']
val_acc = history_dict['val_acc']

plt.plot(epochs, acc, 'bo', label='Training acc')
plt.plot(epochs, val_acc, 'b', label='Validation acc')
plt.title('Training and validation accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()

plt.show()
```

### 정리
 * N 개의 클래스로 데이터 포인트를 분류하려면 네트워크의 마지막 Dense 층의 크기는 N이여야 한다.
 * 단일 레이블, 다중 분류 문제에서는 N개의 클래스에 대한 확률 분포를 출력하기 위해 softmax 활성화 함수를 사용해야한다.
 * 이런 문제에서는 항상 범주형 크로스엔트로피를 사용해야 한다.
 * 다중 분류에서 레이블을 다루는 두 가지 방법이 있다.:
   * 레이블을 범주형 인코딩(또는 원-핫 인코딩)으로 인코딩하고 ㅊategorical_crossentropy로 손실함수를 사용한다.
   * 레이블을 정수로 인코딩하고 sparse_categorical_crossentropy 손실 함수를 사용한다.
 * 많은 수의 범주를 분류할 때 중간층의 크기가 너무 ㅏㅈㄱ아 네트워크에 정보의 병목이 생기지 않도록 해야한다.

### 3.6 주택 가격 예측: 회귀 문제
 * 보스턴 주택 가격 데이터셋

```python
from keras.datasets import boston_housing

(train_data, train_targets), (test_data, test_targets) = boston_housing.load_data()

# 데이터 정규화
mean = train_data.mean(axis=0)
train_data -= mean
std = train_data.std(axis=0)
train_data /= std

test_data -= mean
test_data /= std

from keras import models
from keras import layers

def build_model():
  model = models.Sequential()
  model.add(layers.Dens(64, activation='relu', input_shape=(train_data.shape[1],)))
  model.add(layers.Dense(64, activation='relu'))
  model.compile(optimizer='rmsprop', loss='mse', metrics=['mae'])
  return model
```

 * K-Fold 검증을 사용한 훈련 검증
