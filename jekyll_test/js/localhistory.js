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

function pushHistory(name, url) {
  try {
    if (!isValidLocalStorage()) {
      initLocalStorage();
    }

    var originalHistory = getHistory();
    var beforeIdx = originalHistory.indexOf({name, url}); /* todo : it has bug, must use filter */
    if (beforeIdx > -1) originalHistory.splice(beforeIdx, 1);
    originalHistory.push({name, url});
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
    container.innerHTML = hist.slice(0, hist.length-3).map(h=> `<li class="breadcrumb-item"><a href="${h.url}">${h.name}</a></li>`).join('\n');

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
        + hist.slice(-3).map(h =>`<li class="breadcrumb-item"><a href="${h.url}">${h.name}</a></li>`).join('\n');
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
  let hidden_history = document.querySelector('.hidden-history');
  if (hidden_history !== null) {
    hidden_history.addEventListener('click', (event) => {
      event.stopPropagation();
      showAllHistory(hidden_history, true);
    });
    document.querySelector('html').addEventListener('click', () => {
      showAllHistory(hidden_history, false);
    });
  }
});