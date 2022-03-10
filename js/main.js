const convertWikiLink = (elem) => {
  elem.innerHTML = elem.innerHTML.replace(/((\[\[([^(\]\])]+?)\]\])\{(.+?)\})/g, (_a, _b, _c, matching, display) => {
    if(display === "_index") {
      display = "Front Page"
      matching = ""
    }
    return `<a href="/wiki/${matching.replace(/[()]/g, '')}">${display}</a>`
  })
  elem.innerHTML = elem.innerHTML.replace(/\[\[(.+?)\]\]/g, (_, matching) => {
    var display = matching
    if(display === "_index") {
      display = "Front Page"
      matching = ""
    }
    return `<a href="/wiki/${matching.replace(/[()]/g, '')}">${display}</a>`
  })
}
const activateWikiLink = () => {
  const content = document.querySelector('.content')
  if (content)
    convertWikiLink(content)
  const parent = document.querySelector('.parent-doc')
  if (parent)
    convertWikiLink(parent)
}

/* Copy Btn */
const activateCodeCopyBtn = () => {
    if (navigator && navigator.clipboard) {
        document.querySelectorAll('pre > code').forEach((codeBlock) => {
            const button = document.createElement('button')
            button.className = 'copy-code-button'
            button.type = 'button'
            button.innerText = 'Copy'

            button.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(codeBlock.innerText)
                    button.blur()
                    button.innerText = 'Copied!'
                    setTimeout(function () {
                        button.innerText = 'Copy'
                    }, 2000)
                } catch (err) {
                    button.innerText = 'Error'
                }
            })

            const pre = codeBlock.parentNode
            if (pre.parentNode.classList.contains('highlight')) {
                const highlight = pre.parentNode
                highlight.parentNode.insertBefore(button, highlight)
            } else {
                pre.parentNode.insertBefore(button, pre)
            }
        })
    } else {
        console.error("no support clipboard")
    }
}

/* Wiki log pagination */
const activateWikiLog = () => {
    let now = 1
    const perPage = 10
    const itemList = document.querySelectorAll(".recent > .item")
    const maxNumber = Math.ceil(itemList.length / perPage)
    const pageNumberElem = document.querySelector("#pageNumber")
    const prevBtn = document.querySelector("#prev-item")
    const nextBtn = document.querySelector("#next-item")

    if (itemList.length === 0)
        return
    const displayItem = (page) => {
        for (let i = 0; i < itemList.length; i += 1) {
            itemList[i].style.display = Math.floor(i / perPage) + 1 === now ?
                "inherit" :
                "none"
        }
        prevBtn.classList.remove("btn-disabled")
        nextBtn.classList.remove("btn-disabled")

        if (now == 1)
            prevBtn.classList.add("btn-disabled")
        if (now == maxNumber)
            nextBtn.classList.add("btn-disabled")

        pageNumberElem.innerText = `${page} / ${maxNumber}`
    }
    displayItem(now)
    prevBtn.addEventListener('click', () => {
        now = now - 1 > 0 ? now - 1 : 1
        displayItem(now)
    })
    nextBtn.addEventListener('click', () => {
        now = now + 1 > maxNumber ? maxNumber : now + 1
        displayItem(now)
    })
    // TODO : Modal Dialog
    pageNumberElem.addEventListener('click', () => {
        try {
            var tmp = Number(prompt('Page : ', now))
            now = tmp < 1 || tmp > maxNumber ? now : tmp
        } catch (err) {
            console.error(err)
        }
        displayItem(now)
    })
}

const isValidLocalStorage = () => {
    return localStorage.md98wiki === "true"
}

const initLocalStorage = () => {
    try {
        localStorage.md98wiki = "true"
        localStorage.md98wikiData = JSON.stringify([])
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

const getHistory = () => {
    try {
        if (isValidLocalStorage()) {
            return JSON.parse(localStorage.md98wikiData)
        } else {
            return []
        }
    } catch (err) {
        console.error(err)
        return []
    }
}

const pushHistory = (name, url) => {
    try {
        if (!isValidLocalStorage()) {
            initLocalStorage()
        }

        const originalHistory = getHistory()
        const beforeHistory = originalHistory.filter(hist => hist.url===url)
        if (beforeHistory.length != 0) {
            const beforeIdx = originalHistory.indexOf(beforeHistory[0])
            if (beforeIdx > -1) originalHistory.splice(beforeIdx, 1)
        }
        originalHistory.push({name, url})
        localStorage.md98wikiData = JSON.stringify(originalHistory)

        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

const showAllHistory = (container, show) => {
    const hist = getHistory()
    if (show) {
        container.innerHTML = `<ul class="wiki-history-all-list">
        ${hist.slice(0, hist.length).map(h=> `<li class="wiki-history-item"><a href="${h.url}">${h.name}</a></li>`).join('\n')}
        </ul>`
        convertWikiLink(container)
    } else {
        container.innerHTML = '...'
    }
}

const clearHistory = () => {
    try {
        delete localStorage.md98wiki
    } catch (err) {
        console.error(err)
    }
}

const displayHistory = (container) => {
    try {
        const maxLength = 3
        if (container) {
            const hist = getHistory()
            if (hist.length === 0) {
                container.remove()
                return false
            }
            container.innerHTML = `
          ${hist.length > maxLength ? '<button class="wiki-history-hidden btn btn-primary">See all</button>' : ""}
        <ul class="wiki-history-list">
          ${hist.slice(- maxLength).map(h =>
              `<li class="wiki-history-item">
            <a href="${h.url}">${h.name.slice(0, 10)}</a>
          </li>`).join('\n')
          }
        </ul>`

        }
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}
const activateWikiHistory = () => {
    const hist = document.querySelector('.wiki-history')
    if (!hist)
        return
    displayHistory(hist)

    const clearHistoryBtn = document.querySelector('.wiki-history-clear')
    clearHistoryBtn.addEventListener('click', () => {
        clearHistory()
        displayHistory(hist)
    })


    hist.addEventListener('click', (event) => {
        event.stopPropagation()
        showAllHistory(hist, true)
    })
}

const getParam = (sname) => {
    let params = location.search.substring(0, location.search.indexOf("?") + 1)
    let sval = ""
    params = params.split("&")
    for (let i = 0; i < params.length; i++) {
        temp = params[i].split("=")
        if ([temp[0]] == sname)
            sval = temp[1]
    }
  return decodeURIComponent(sval)
}

const moveToTag = (tagName) => {
    let tagElem = document.getElementById(tagName)
    let yOffset = -100
    const y = tagElem.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({top: y, behavior: 'smooth'})
    tagElem.style.border = "thick solid var(--accent)"
}

document.addEventListener('DOMContentLoaded', activateWikiLink)
document.addEventListener('DOMContentLoaded', activateWikiLog)
document.addEventListener('DOMContentLoaded', activateWikiHistory)
document.addEventListener('DOMContentLoaded', activateCodeCopyBtn)
