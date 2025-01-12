---
layout  : wiki
title   : linux init 요약
date    : 2022-07-31 22:13:30 +0900
lastmod : 2022-07-31 22:17:08 +0900
tags    : [devops]
draft   : false
parent  : devops
---

- 참고 : https://steady-snail.tistory.com/272

```bash
#!/bin/bash
### BEGIN INIT INFO
# Provides:             startup.sh
# Required-Start:       $reboot
# Required-Stop:        $reboot
# Default-Start:        2 3 4 5
# Default-Stop:         0 1 6
# Short-Description:    Server init script
### END INIT INFO

case "$1" in
  start)
  # run as a specific user
  sudo -u <username> /foo/bar
  # TODO Something..

  ;;
  *)
  echo "Usage: $0 (start)"
  ;;
esac

exit 0
```

```bash
chmod 755 startup.sh
```

```bash
update-rc.d startup.sh defaults
```

```bash
update-rc.d -f startup.sh remove
```
