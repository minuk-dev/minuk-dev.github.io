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

function showAllHistory(container, show) {
  var hist = getHistory();
  if (show) {
    container.innerHTML = hist.slice(0, hist.length-3).map(h=> `<li class="breadcrumb-item">[[${h}]]{${h.slice(0, 10)}}</li>`).join('\n');

    convertWikiLink(container);
  } else {
    container.innerHTML = '...';
  }
}

function displayHistory(container) {
  try {
    var maxLength = 3;
    if (container) {
      var hist = getHistory();
      
      container.innerHTML = '<nav aria-label="breadcrumb"><ol class="breadcrumb">'
        + (hist.length > 3 ? '<li style="cursor:pointer;" class="hidden-history">...</li>' : "")
        + hist.slice(-3).map(h =>`<li class="breadcrumb-item">[[${h}]]{${h.slice(0, 10)}}</li>`).join('\n');
        + '</ol></nav>';

    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  var hist = document.querySelector('.wiki-history');
  displayHistory(hist);
  if (hist) convertWikiLink(hist);
  document.querySelector('.hidden-history').addEventListener('click', (event) => {
    event.stopPropagation();
    showAllHistory(document.querySelector('.hidden-history'), true);
  });
  document.querySelector('html').addEventListener('click', () => {
    showAllHistory(document.querySelector('.hidden-history'), false);
  })
});
