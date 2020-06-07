function isValidLocalStorage() {
  return localStorage.md98wiki === "true";
}

function initLocalStorage() {
  try {
    localStorage.md98wiki = "true";
    localStorage.md98wikiData = JSON.stringify([]);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

function getHistory() {
  try {
    if (isValidLocalStorage()) {
      return JSON.parse(localStorage.md98wikiData);
    } else {
      return [];
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}

function pushHistory(wikilink) {
  try {
    if (!isValidLocalStorage()) {
      initLocalStorage();
    }

    var originalHistory = getHistory();
    var beforeIdx = originalHistory.indexOf(wikilink);
    if (beforeIdx > -1) originalHistory.splice(beforeIdx, 1);
    originalHistory.push(wikilink);
    localStorage.md98wikiData = JSON.stringify(originalHistory);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

function displayHistory() {
  try {
    var maxLength = 3;
    var container = document.querySelector('.wiki-history');
    if (container) {
      var data = getHistory();
      container.innerHTML = '<nav aria-label="breadcrumb"><ol class="breadcrumb">'
        + (data.length > 3 ? "..." : "")
        + data.slice(-3).map(h =>`<li class="breadcrumb-item">[[${h}]]</li>`).join('\n');
        + '</ol></nav>'
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  displayHistory();
  var hist = document.querySelector('.wiki-history');
  if (hist) convertWikiLink(hist);
});
