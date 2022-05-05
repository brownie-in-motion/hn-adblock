const getPreferences = () =>
  new Promise((res) =>
    chrome.storage.sync.get(['preferences'], (data) => res(data.preferences))
  );

const setPreferences = (preferences) =>
  new Promise((res) => chrome.storage.sync.set({ preferences }, res));

const pageLoad = () =>
  new Promise((res) => window.addEventListener('load', res));

(async () => {
  let [{ enable, renumber }] = await Promise.all([
    getPreferences(),
    pageLoad(),
  ]);

  // no preferences set yet
  if (enable === undefined) {
    await setPreferences({
      enable: false,
      renumber: false,
    });

    enable = false;
    renumber = false;
  }

  const enableButton = document.getElementById('enable');
  const renumberButton = document.getElementById('renumber');

  const resetButtons = () => {
    enableButton.textContent = enable ? 'Enabled' : 'Disabled';
    renumberButton.textContent = renumber
      ? 'Renumbering On'
      : 'Renumbering Off';
  };

  resetButtons();

  enableButton.addEventListener('click', async () => {
    enable = !enable;

    await setPreferences({
      enable,
      renumber,
    });

    resetButtons();
  });

  renumberButton.addEventListener('click', async () => {
    renumber = !renumber;

    await setPreferences({
      enable,
      renumber,
    });

    resetButtons();
  });
})();
