(() => {
  const button = document.getElementById('installApp');
  const help = document.getElementById('installHelp');
  const status = document.getElementById('appStatus');
  const standalone = window.matchMedia('(display-mode: standalone)');
  let promptEvent;
  let offlineReady = false;
  let failed = false;

  function updateStatus() {
    button.hidden = standalone.matches || navigator.standalone === true;
    status.textContent = offlineReady
      ? (navigator.onLine ? '已可離線使用 · 更新匯率需要網路' : '目前離線 · 使用已儲存或手動輸入的匯率')
      : (failed ? '離線功能尚未就緒，請連網後重新開啟。' : '正在準備離線功能…');
  }

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    promptEvent = event;
  });
  window.addEventListener('appinstalled', () => {
    promptEvent = null;
    button.hidden = true;
    help.hidden = true;
  });
  button.addEventListener('click', async () => {
    if (promptEvent) {
      const pending = promptEvent;
      promptEvent = null;
      await pending.prompt();
      await pending.userChoice;
      return;
    }
    help.hidden = !help.hidden;
    button.setAttribute('aria-expanded', String(!help.hidden));
    help.textContent = location.protocol === 'file:' || !window.isSecureContext
      ? '請先將程式放到 HTTPS 網站，再用手機開啟網址安裝。直接開啟 HTML 檔案無法啟用完整安裝與離線功能。'
      : 'iPhone／iPad：用 Safari 開啟，點選「分享」→「加入主畫面」，若有「以 Web App 開啟」請開啟。Android：用 Chrome 開啟，在選單選擇「安裝應用程式」或「加到主畫面」。若在通訊軟體內，請先改用 Safari 或 Chrome 開啟。';
  });
  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  standalone.addEventListener('change', updateStatus);
  updateStatus();

  if ('serviceWorker' in navigator && window.isSecureContext && location.protocol !== 'file:') {
    navigator.serviceWorker.register('./sw.js').then(() => navigator.serviceWorker.ready).then(() => {
      offlineReady = true;
      updateStatus();
    }).catch(() => {
      failed = true;
      updateStatus();
    });
  } else {
    failed = true;
    updateStatus();
  }
})();
