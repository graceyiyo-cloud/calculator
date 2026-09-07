(() => {
  const status = document.getElementById('appStatus');
  let offlineReady = false;
  let failed = false;

  function updateStatus() {
    status.textContent = offlineReady
      ? (navigator.onLine ? '已可離線使用 · 更新匯率需要網路' : '目前離線 · 使用已儲存或手動輸入的匯率')
      : (failed ? '離線功能尚未就緒，請連網後重新開啟。' : '正在準備離線功能…');
  }

  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
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
