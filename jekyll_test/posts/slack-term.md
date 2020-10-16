---
title: slack terminal에서 사용하기
date: 2020-07-03T22:00:00+09:00
draft: false
---

# slack 을 terminal에서 사용하기

## Slack 이란 ?
 * Slack 의 공식 문구 : Slack is where work flows. ... 이하 생략
 * 회사~(나는 회사를 다녀본적이 없지만 듣기로는)~, IT 동아리 등 여러 곳에서 업무나 자료공유, 대화 등을 하기 위한 메신저
 * 주로 활동하는 동아리들(교내 동아리, 군내 동아리)에서 사용하고 있다.

## 내가 느끼는 불편한점
 * 주로 작업하는 곳이 부대 내이다보니, 매번 브라우저를 통해서 로그인 하는게 불편했다.
 * 그래서 생각한게, ssh 로 접속할때 tmux 에다가 띄울수 있으면 어떨까? 그냥 slack이 terminal version만 있으면 되는데
 
## 삽질 시작
### sclack
 * slack 을 terminal에서 사용하려고 googling 해보니 나온 프로젝트에서 상대적으로 가장 최근이였다.
 * 이걸로 하면 되겠지? 라고 생각하고 작업했으나 무수히 많은 에러가 나왔고, 직접 고쳐보려고 시도도 해보았으나 실패했다.

### slack-term
 * 오래된 프로젝트이지만, 아직 동작하는 것 같았다.
 * 하지만 legacy token 을 필요로 하는것 같아서, 여러 삽질을 했다.
 * 그런데, github repository 의 wiki 페이지에 어떻게 하는지 생각보다 자세히 나와있었다.
 * 그래서 method1 을 적용한 결과 잘 적용된다.
 * 세팅법 : https://github.com/erroneousboat/slack-term/wiki

## 여러개의 workspace를 띄워보자
 * 기본 기능으로는 workspace 를 1개밖에 못띄운다. 그런데 주로 들어갈 slack 이 2개이다. tmux 를 사용하기로 했다.
 * config 파일을 직접적으로 지정할수 있으니, 이걸 서로 다른 config 를 가리키도록 했다.
 * 겸사겸사 어짜피 자주 사용할꺼나 tmuxinator를 사용해서 자동화하기로 했다.
 * 그래서 나온 설정파일이다.
 
```yml
# ~/.tmuxinator/slack.yml

name: slack
root: ~/tools

windows:
  - {동아리 이름}: ./slack-term -config /home/lmu/.config/slack-term/{동아리 이름}.config
  - {동아리 이름}: ./slack-term -config /home/lmu/.config/slack-term/{동아리 이름}.config
```

## 의문점
 * 누군가 메시지를 보내도 잘 표시될까?
 * 옆에 `*`가 뜨면서 잘 표시되었고 터미널(alacritty)도 빨간색으로 잘 깜빡이면서 메시지가 왔다는걸 알려주고 있었다. 크롬 알림보다는 가독성이 나쁘지만, 이건 이것대로 개발하는데 방해하지 않는다는 면에서 괜찮은것 같다.
 * ![slack.png](/posts/images/slack.png)

## 결론 및 교훈점
 * 터미널에서도 슬랙을 쓸수 있다.
 * github star 개수는 괜히 있는게 아니다.
 * 잘만든 프로젝트는 4년전이 마지막 커밋이여도 동작한다. (물론 이건 slack이 api 설계를 잘해서 유지된것도 있겠지만)

## 반전
 * 사용하는 모든 slack을 추가하려고 하니 app 개수가 최대라고 한다!!!
 * free plan의 경우 app개수가 최대 10개로 한정되어 있었다. ㅠ 물론 내가 편하면 좋지만 다른 사람들이 생산성을 위해 추가한 app 보다 내 우선순위가 더 높지는 않다.
 * 과감하게 app을 지우는 방향으로 선택했다.
 * 그리고 생각해보면 app 없이 slack의 내용을 가져올 수는 없을 것 같다. 그러니 안된다고 봐야한다.

## 새로운 결론
 * 무료플렌의 한계에 봉착했다.
