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

    const originalHistory = getHistory();
    const beforeHistory = originalHistory.filter(hist => hist.url===url);
    if (beforeHistory.length != 0) {
      const beforeIdx = originalHistory.indexOf(beforeHistory[0]);
      if (beforeIdx > -1) originalHistory.splice(beforeIdx, 1);
    }
    originalHistory.push({name, url});
    localStorage.md98wikiData = JSON.stringify(originalHistory);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

function showAllHistory(container, show) {
  const hist = getHistory();
  if (show) {
    container.innerHTML = hist.slice(0, hist.length-3).map(h=> `<li class="breadcrumb-item"><a href="${h.url}">${h.name}</a></li>`).join('\n');

    convertWikiLink(container);
  } else {
    container.innerHTML = '...';
  }
}

function clearHistory() {
  try {
    delete localStorage.md98wiki;
  } catch (err) {
    console.error(err);
  }
}

function displayHistory(container) {
  try {
    const maxLength = 3;
    if (container) {
      const hist = getHistory();
      if (hist.length === 0) {
        container.remove();
        return false;
      }
      container.innerHTML = '<nav aria-label="breadcrumb"><ol class="breadcrumb">'
        + (hist.length > maxLength ? '<li style="cursor:pointer;" class="hidden-history">...</li>' : "")
        + hist.slice(- maxLength)
          .map(h =>
          `<li class="breadcrumb-item">
            <a href="${h.url}">${h.name.slice(0, 10)}</a>
          </li>`).join('\n');
        + '</ol></nav>';

    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const hist = document.querySelector('.wiki-history');
  displayHistory(hist);

  const clearHistoryBtn = document.querySelector('.wiki-history-clear');
  clearHistoryBtn.addEventListener('click', () => {
    clearHistory();
    displayHistory(hist);
  });


  const hidden_history = document.querySelector('.hidden-history');
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
