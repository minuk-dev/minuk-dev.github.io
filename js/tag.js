function getParam(sname) {
    let params = location.search.substr(location.search.indexOf("?") + 1);
    let sval = "";
    params = params.split("&");
    for (let i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
  return decodeURIComponent(sval);
}

function moveToTag(tagName) {
    let tagElem = document.getElementById(tagName);
    let yOffset = -100;
    const y = tagElem.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
    tagElem.style.border = "thick solid var(--accent)";
}
