function moveToTag(tagName) {
    let tagElem = document.getElementById(tagName);
    let yOffset = -100;
    const y = tagElem.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
    tagElem.style.border = "thick solid var(--accent)";
}
