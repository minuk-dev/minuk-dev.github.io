
## 이유
- jekyll 로 빌드하기 힘들다.
	- 일단 내가 ruby 에 친숙하지 않아서, 에러 메시지가 나올때마다 좀 막막하다.
	- 솔직히 먼가 advanced 한 기능을 쓰지는 않기는하지만, 가끔씩 필요한 기능을 직접 만들고 싶다는 니즈가 있는데, jekyll 기반에서는 조금 어렵다고 판단했다.
- github page 가 더이상 jeykll 을 강제하지 않는다.
	- 이건 너무 구닥다리 이야기이기는 한데, 과거에는 github page 에서 공직적으로 지원하는 github page builder 가 jekyll 밖에 없었다.
	- 물론, 이건 지금도 비슷하긴 하지만, 이제는 github action 을 통해서 artifact 만 업로드하면 page 로 만들기 쉬워졌다.
	- 과거 hugo 에서 jekyll 로 넘어왔던 가장 큰 이유가 사라진것이다.
- 더이상 컴퓨터로만 위키하지 않고, 모바일, ipad 로도 한다. 이건 내가 환경이 바뀌어서 그런건데, 길가면서도 메모하고 싶을때가 있고, 그렇다. 근데 이걸 하기에는 vimwiki 만을 고집하기는 어렵다. 그래서 obsidian 으로 넘어왔다.
	- 이 과정 자체는  [Obsidian github 동기화 세팅하기(iOS 자동화, 단축어 활용)](https://clarit7.github.io/obsidian_sync_setting/) 를 많이 참조했다.
	- vimwiki 의 단점이 image 업로드나 렌더링이 불편하다였는데 해당 부분이 자연스럽게 해소된게 있다.
	- 모바일에서는 [iSH Shell](https://apps.apple.com/kr/app/ish-shell/id1436902243) 을 사용해서 hugo 를 렌더링하고 본다.
		- 이거 자세하게는 iSH shell 에서 mount 명령어를 사용해서 하는 방법으로 했는데, 뭔가
			```bash
			mount -t ios website /mnt
			```
			이런 류의 명령어를 쳤었다.

## 과정
- 솔직히 막막하다... 너무 커스텀을 많이 해두어서...
- 일단 hugo 에서 jekyll 로 넘어올때의 commit 을 봐보자.
	- https://github.com/minuk-dev/minuk-dev.github.io/tree/5630fca1452dfaa97d1a25e4e9f91d50d2d58d56/src
- content 폴더 내에 wiki 를 넣고, layout 을 설정해주자
- 