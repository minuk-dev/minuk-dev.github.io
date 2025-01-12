const convertWikiLink = (elem) => {
  elem.innerHTML = elem.innerHTML.replace(
    /((\[\[([^(\]\])]+?)\]\])\{(.+?)\})/g,
    (_a, _b, _c, matching, display) => {
      if (display === "_index") {
        display = "Front Page";
        matching = "";
      }
      return `<a href="/wiki/${matching.replace(/[()]/g, "")}">${display}</a>`;
    },
  );
  elem.innerHTML = elem.innerHTML.replace(/\[\[(.+?)\]\]/g, (_, matching) => {
    var display = matching;
    if (display === "_index") {
      display = "Front Page";
      matching = "";
    }
    return `<a href="/wiki/${matching.replace(/[()]/g, "")}">${display}</a>`;
  });
};
const activateWikiLink = () => {
  const contents = document.querySelectorAll(".content");
  contents.forEach((content) => {
    if (content) convertWikiLink(content);
  })
  const parent = document.querySelector(".parent-doc");
  if (parent) convertWikiLink(parent);
};

/* Wiki log pagination */
const activateWikiLog = () => {
  let now = 1;
  const perPage = 10;
  const itemList = document.querySelectorAll(".recent > .item");
  const maxNumber = Math.ceil(itemList.length / perPage);
  const pageNumberElem = document.querySelector("#pageNumber");
  const prevBtn = document.querySelector("#prev-item");
  const nextBtn = document.querySelector("#next-item");

  if (itemList.length === 0) return;
  const displayItem = (page) => {
    for (let i = 0; i < itemList.length; i += 1) {
      itemList[i].style.display =
        Math.floor(i / perPage) + 1 === now ? "inherit" : "none";
    }
    prevBtn.classList.remove("btn-disabled");
    nextBtn.classList.remove("btn-disabled");

    if (now == 1) prevBtn.classList.add("btn-disabled");
    if (now == maxNumber) nextBtn.classList.add("btn-disabled");

    pageNumberElem.innerText = `${page} / ${maxNumber}`;
  };
  displayItem(now);
  prevBtn.addEventListener("click", () => {
    now = now - 1 > 0 ? now - 1 : 1;
    displayItem(now);
  });
  nextBtn.addEventListener("click", () => {
    now = now + 1 > maxNumber ? maxNumber : now + 1;
    displayItem(now);
  });
  // TODO : Modal Dialog
  pageNumberElem.addEventListener("click", () => {
    try {
      var tmp = Number(prompt("Page : ", now));
      now = tmp < 1 || tmp > maxNumber ? now : tmp;
    } catch (err) {
      console.error(err);
    }
    displayItem(now);
  });
};

const isValidLocalStorage = () => {
  return localStorage.md98wiki === "true";
};

const initLocalStorage = () => {
  try {
    localStorage.md98wiki = "true";
    localStorage.md98wikiData = JSON.stringify([]);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getParam = (sname) => {
  let params = location.search.substring(location.search.indexOf("?") + 1);
  let sval = "";
  params = params.split("&");
  for (let i = 0; i < params.length; i++) {
    temp = params[i].split("=");
    if ([temp[0]] == sname) sval = temp[1];
  }
  return decodeURIComponent(sval);
};

const moveToTag = (tagName) => {
  let tagElem = document.getElementById(tagName);
  let yOffset = -100;
  const y = tagElem.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
  tagElem.style.border = "thick solid #0A3b76";
};

document.addEventListener("DOMContentLoaded", activateWikiLink);
document.addEventListener("DOMContentLoaded", activateWikiLog);
