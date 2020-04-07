---
layout  : wiki
title   : Docker Volume
summary : 
date    : 2020-04-07 20:21:35 +0900
lastmod : 2020-04-07 23:58:24 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# # [1.](https://www.joinc.co.kr/w/man/12/docker/Guide/DataWithContainer#toc) 데이터 볼륨

도커는 하나의 이미지로 부터 여러 컨테이너를 만들기 위해서

**Union File system**

을 사용한다. 유니온 파일 시스템은 원본 이미지에 변경된 내용(diff)를 추가하는 방식이므로, 다른 컨테이너에서 사용 할 수 없다. 애플리케이션에 따라서는 데이터를 다른 컨테이너와 공유 하거나 혹은 호스트에서 접근 할 수 있어야 하는 경우가 있는데, 이때 데이터 볼륨을 사용한다. 데이터 볼륨은 **호스트의 파일 시스템**을 컨테이너에서 마운트 하는 방식으로 사용한다. 아래와 같은 특징이 있다.

- 데이터 볼륨은 호스트 운영체제의 파일 시스템을 사용한다. [AUFS](https://www.joinc.co.kr/w/man/12/docker/aufs)와 Overlay 파일시스템 같은 유니온 파일 시스템은 (ext4같은)네이티브 파일시스템위에 올라가기 때문에 아무래도 성능이 떨어진다. 데이터 볼륨으로 이런 단점을 극복 할 수 있다.
- 데이터 볼륨은 재사용 가능하며, 컨테이너들 간에 공유 할 수 있다.
- 데이터 볼륨은 호스트에서 직접 접근 할 수 있다.
- 데이터 볼륨은 컨테이너가 삭제되도 계속 유지된다. 기본적으로 컨테이너와 독립적으로 운영되기 때문이다.

데이터 볼륨은 컨테이너의 주기와는 독립적으로 작동하며, 데이터를 유지(persist data)하기 위해서 사용한다. 도커는 컨테이너를 삭제 할 때, 자동으로 볼륨을 삭제하지 않는다. 더 이상 사용하지 않는 볼륨 **gargabe collect** 해줘야 한다.

# [2.](https://www.joinc.co.kr/w/man/12/docker/Guide/DataWithContainer#toc) 데이터 볼륨 추가

도커 컨테이너를 만들 때(docker run), **`-v`** 옵션을 이용해서 컨테이너에 데이터 볼륨을 추가 할 수 있다.

**`-v`**뒤에 마운트할 볼륨을 나열하면 된다. 하나의 데이터 볼륨을 포함하는 컨테이너를 만들어보자.

    docker run --name web -i -t -v /webapp ubuntu /bin/bash

컨테이너에 **`/webapp`** 디렉토리가 만들어진다. 이 디렉토리는 호스트의 파일 시스템과 마운트된다. 마운트 경로는 **`docker inspect`**로 확인 할 수 있다.

    docker inspect web

/webapp 디렉토리가 **Source**에 설정된 디렉토리에 마운트됐다. /webapp에 파일을 쓰면 **Source**디렉토리에 파일이 만들어지는 걸 확인 할 수 있다.

"-v"를 여러 개 이용해서 하나 이상의 데이터 볼륨을 만들 수 있다.

# [3.](https://www.joinc.co.kr/w/man/12/docker/Guide/DataWithContainer#toc) 호스트 디렉토리를 디렉토리로 설정

호스트의 특정 디렉토리를 컨테이너로 마운트 할 수도 있다.

    docker run -i -t -v /src/webapp:/dst/webapp ubuntu /bin/bash

호스트 디렉토리 **/src/webapp** 을 컨테이너 디렉토리 **/dst/webapp** 로 마운트 한다. 호스트 디렉토리와 컨테이너 디렉토리는 반드시**완전경로(full path)**이어야 한다.

호스트 디렉토리에 있는 파일을 컨테이너에서 읽을 수 있기 때문에, 테스트등에 유용하게 사용 할 수 있다. 볼륨은 기본적으로 읽기&쓰기 모드로 마운트되지만, 읽기 전용으로 마운트 할 수도 있다.

    docker run -i -t -v /src/webapp:/dst/webapp:ro ubuntu /bin/bash

# [4.](https://www.joinc.co.kr/w/man/12/docker/Guide/DataWithContainer#toc) 볼륨의 공유

컨테이너가 가지고 있는 볼륨을 다른 컨테이너와 공유 할 수도 있다. 다른 컨테이너와 공유하려면 볼륨에 이름(Name)이 있어야한다. 도커에서 제공하는 네임드 데이터 볼륨 컨테이너(Named data volume container)를 이용해서 공유 할 수 있다. **joincapp**라는 이름의 볼륨을 만들어서 공유하기로 했다.

    docker create -v /joincapp --name joincapp ubuntu /bin/true8103966e331a20c707708cd70f62698fb6335f8baaf5881457a754686210e1b4

반환 하는 값은 볼륨 컨테이너의 ID로 /var/lib/docker/containers/<conainer_id>에서 확인 할 수 있다. 컨테이너의 설정 정보는 config.json 이 가지고 있다.

    cat config.json | json_pp { "State" : { "Restarting" : false, "OOMKilled" : false, "Running" : false, "ExitCode" : 0, "StartedAt" : "0001-01-01T00:00:00Z", "FinishedAt" : "0001-01-01T00:00:00Z", "Pid" : 0, "Paused" : false, "Error" : "" }, "AppArmorProfile" : "", "ResolvConfPath" : "", "HostsPath" : "", "Image" : "07f8e8c5e66084bef8f848877857537ffe1c47edd01a93af27e7161672ad0e95", "Created" : "2015-05-13T07:24:32.524168199Z", "Volumes" : { "/joincapp" : "/var/lib/docker/vfs/dir/1d709224a3642c60b0a2c3ec3842357065461185797c6c14daad939846648635" },....

주요 값들을 살펴보자.

- Volumes : 컨테이너가 사용하는 볼륨의 목록을 가지고 있다. 앞서 만든 /joincapp 볼륨을 확인할 수 있다. /joincapp 에서 작업한 내용들은 이 경로에 저장된다.
- ID : 컨테이너의 아이디
- Name : 컨테이너 이름
- VolumesRW : 읽기/쓰기가 가능한 볼륨의 목록을 가지고 있다. /joincapp은 true로 설정된다.

이렇게 만든 볼륨 컨테이너는 **--volumes-from**을 이용해서 공유할 수 있다.

    # docker run -it --volumes-from joincapp ubuntu /bin/bash

/joincapp 디렉토리 밑에서 작업을 해보자. Volumes 설정의 디렉토리에 작업내용이 반영되는 걸 확인할 수 있을 거다. 사실상 Volumes 설정된 디렉토리를 컨테이너들이 공유하는 거라고 보면 된다.

도커는 사용하지 않는 볼륨컨테이너에 대한 가비지 컬랙션 기능을 제공하지 않는다. 메뉴얼하게 직접 삭제해야 한다. 관리 애플리케이션을 만들어야 한다는 이야기.

도커의 볼륨 컨테이너는 좋은 기능이긴 하지만 호스트에 종속적이다. 개인이 사용할 때는 문제가 없지만, 도커 기반의 클라우드 인프라를 구축 할 경우 문제가 될 수 있다. 원격에 볼륨을 만들어서 마운트 후 사용하는 등의 방법을 사용해야 한다. NFS나 iSCSI등을 활용 하면 되겠다. 서비스 하기에는 iSCSI가 더 적당할 것 같다.

# [5.](https://www.joinc.co.kr/w/man/12/docker/Guide/DataWithContainer#toc) 호스트 파일을 마운트하기

**-v** 옵션으로 호스트 파일을 마운트 할 수도 있다.

    docker run --rm -it -v ~/.bash_history:/root/.bash_history ubuntu /bin/bash

위 예제에서는 호스트에 있는 .bash_history 파일을 컨테이너의 /root/.bash_history로 마운트 했다. 이제 컨테이너에서 수행한 쉘 커맨드들은 호스트의 히스토리 파일에 쌓인다.

# [6.](https://www.joinc.co.kr/w/man/12/docker/Guide/DataWithContainer#toc) 백업, 복구, 마이그레이션

또 다른 유용한 기능으로 백업,복구,마이그레이션이 있다. --volumes-from 옵션을 이용해서 마운트된 볼륨을 백업할 수 있다.

    docker run --volumes-from dbdata -v /backup:/backup \ ubuntu tar cvzf /backup/backup.tar.gz /dbdata

- --volumes-from 으로 dbdata를 컨테이너에
- 로컬의 /backup을 컨테이너의 /backup으로 마운트 한다.
- tar 명령을 이용해서 /dbdata 볼륨을 /backup/backup.tar.gz으로 백업한다.

복구하는 방법이다.

    # docker run --volumes-from dbdata2 -v /backup:/backup ubuntu \ tar xvzf /backup/backup.tar.gz

- dbdata2 볼륨으로 컨테이너를 실행한다. 복구한 파일의 정보는 dbdata2 볼륨에 저장돼서 다른 컨테이너에서 사용 할 수 있다.
- 로컬의 /backup을 컨테이너의 /backup으로 마운트 한다.
- tar 명령을 이용해서 backup.tar.gz의 압축을 푼다.

복구한 데이터 볼륨으로 컨테이너를 실행했다.

    # docker run --volumes-from dbdata2 -it ubuntu /bin/bash

# [7.](https://www.joinc.co.kr/w/man/12/docker/Guide/DataWithContainer#toc) 볼륨 명령어들

## [7.1.](https://www.joinc.co.kr/w/man/12/docker/Guide/DataWithContainer#toc) 볼륨 만들기

**docker volume create**

명령으로 볼륨을 만들 수 있다.

    $ docker volume create --name hellohello

volume은 /var/lib/docker/volumes/hello 밑예 만뜰어찐따. insepct로 확인 할 수 있다.

12345678910$ docker volume inspect hello[ { "Name": "hello", "Driver": "local", "Mountpoint": "/var/lib/docker/volumes/hello/_data", "Labels": {}, "Scope": "local" }]

이렇게 만든 볼륨은 다른 컨테이너에서 마운트해서 사용 할 수 있다.

    $ docker run -it -v hello:/world ubuntu /bin/bash

## [7.2.](https://www.joinc.co.kr/w/man/12/docker/Guide/DataWithContainer#toc) 볼륨 목록 확인

**docker volume ls**

명령으로 전체 볼륨 목록을 확인할 수 있다.

    $ docker volume lsDRIVER VOLUME NAMElocal ec75c47aa8b8c61fdabcf37f89dad44266841b99dc4b48261a4757e70357ec06local f73e499de345187639cdf3c865d97f241216c2382fe5fa67555c64f258892128local tmp_data

## [7.3.](https://www.joinc.co.kr/w/man/12/docker/Guide/DataWithContainer#toc) 볼륨 삭제

**docker volume rm**

명령으로 볼륨을 지울 수 있다.

    docker volume rm ec75c47aa8b8c61fdabcf37f89dad44266841b99dc4b48261a4757e70357ec06

**docker volume prune**

명령으로 사용하지 않는 모든 볼륨을 지울 수 있다.

## [7.4.](https://www.joinc.co.kr/w/man/12/docker/Guide/DataWithContainer#toc) 볼륨 정보 확인

**docker volume inspect**

로 볼륨의 상세 정보를 확인 할 수 있다.

    $ docker volume inspect 3414f529824e3947152367a8c6dddb0c9f2c751dfcb82876bb4b612bf9fa9c49[ { "Name": "3414f529824e3947152367a8c6dddb0c9f2c751dfcb82876bb4b612bf9fa9c49", "Driver": "local", "Mountpoint": "/var/lib/docker/volumes/3414f529824e3947152367a8c6dddb0c9f2c751dfcb82876bb4b612bf9fa9c49/_data", "Labels": null, "Scope": "local" }]

# [8.](https://www.joinc.co.kr/w/man/12/docker/Guide/DataWithContainer#toc) 참고

- [도커를 위한 파일 시스템 구성](https://www.joinc.co.kr/w/man/12/docker/InfrastructureForDocker/storage)
