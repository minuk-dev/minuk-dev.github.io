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
    var now = 1
    var perPage = 10
    var itemList = document.querySelectorAll(".recent > .item")
    var maxNumber = Math.ceil(itemList.length / perPage)
    var pageNumberElem = document.querySelector("#pageNumber")
    var prevBtn = document.querySelector("#prev-item")
    var nextBtn = document.querySelector("#next-item")
    function displayItem(page) {
        for (var i = 0; i < itemList.length; i += 1) {
            if (Math.floor(i / perPage) + 1 === now ) {
                itemList[i].style.display = "inherit"
            } else {
                itemList[i].style.display = "none"
            }
        }
        if (now == 1) prevBtn.parentElement.classList.add("disabled")
        else if (now == maxNumber) nextBtn.parentElement.classList.add("disabled")
        else {
            prevBtn.parentElement.classList.remove("disabled")
            nextBtn.parentElement.classList.remove("disabled")
        }
        pageNumberElem.innerText = `${page} / ${maxNumber}`
    }
    displayItem(now)
    prevBtn.addEventListener('click', () => {
        now -= 1
        now = now > 0 ? now : 1
        displayItem(now)
    })
    nextBtn.addEventListener('click', () => {
        now += 1
        now = now > maxNumber ? maxNumber : now
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
document.addEventListener('DOMContentLoaded', activateWikiLog)
document.addEventListener('DOMContentLoaded', activateCodeCopyBtn)
