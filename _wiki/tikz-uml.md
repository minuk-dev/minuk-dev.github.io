---
layout  : wiki
title   : tikz-uml
summary : tikz-uml 예제 정리한 문서
date    : 2021-07-26 16:18:29 +0900
lastmod : 2021-07-26 16:46:02 +0900
tags    : [tikz, uml]
draft   : false
parent  : tikz
---

<script type="text/tikz">
  \usepackage{tikz-uml}
  \begin{tikzpicture}
    \begin{umlsystem}{System 1}
    \tikzset{every node/.append style={inner xsep=12ex,inner ysep=3em}}
    \end{umlsystem}
    \begin{umlsystem}[y=0.2]{System 2}
    \end{umlsystem} begin{umlsystem}{System 1}
  \end{tikzpicture}
</script>
