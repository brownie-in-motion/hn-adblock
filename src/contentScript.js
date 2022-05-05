const getPreferences = () =>
  new Promise((res) =>
    chrome.storage.sync.get(['preferences'], (data) => res(data.preferences))
  );

const pageLoad = () =>
  new Promise((res) => window.addEventListener('load', res));

(async () => {
  const [{ enable, renumber }] = await Promise.all([
    getPreferences(),
    pageLoad(),
  ]);

  if (!enable) return;

  [...(document.querySelector('table.itemList')?.rows ?? [])]
    .reduce((a, _r, i, rows) => (i % 3 ? a : [...a, rows.slice(i, i + 3)]), [])
    .filter((row) => row.length === 3)
    .filter(([title]) => !title.querySelector('td.votelinks'))
    .forEach((rows) => rows.forEach((row) => row.remove()));

  if (renumber) {
    document
      .querySelectorAll('span.rank')
      .forEach?.((s, i) => s.textContent && (s.textContent = `${i + 1}.`));
  }
})();
