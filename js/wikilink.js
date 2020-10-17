function convertWikiLink(elem) {
  elem.innerHTML = elem.innerHTML.replace(/((\[\[([^(\]\])]+?)\]\])\{(.+?)\})/g, (_a, _b, _c, matching, display) => {
    if(display === "_index") {
      display = "Front Page";
      matching = "";
    }
    return `<a href="/wiki/${matching.replace(/[()]/g, '')}">${display}</a>`;
  });
  elem.innerHTML = elem.innerHTML.replace(/\[\[(.+?)\]\]/g, (original, matching) => {
    var display = matching;
    if(display === "_index") {
      display = "Front Page";
      matching = "";
    }
    return `<a href="/wiki/${matching.replace(/[()]/g, '')}">${display}</a>`;
  });
}
;(function() {
  var content = document.querySelector('.content');
  if (content) convertWikiLink(content);
  var parent = document.querySelector('.parent-doc');
  if (parent) convertWikiLink(parent);
})();
