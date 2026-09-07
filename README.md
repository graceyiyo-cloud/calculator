# 換匯計算機

可安裝到 Android、iPhone 主畫面的 PWA，開啟時使用獨立視窗。保留換匯、手動匯率、消費紀錄與累積花費，首次連網載入完成後可離線使用；更新匯率需要網路。

## 上線

將本目錄所有網站檔案部署到支援 HTTPS 的靜態網站服務。可以使用此儲存庫的 GitHub Pages：

1. 將修改提交並推送到 GitHub。
2. 在儲存庫的 Settings → Pages 選擇 Deploy from a branch，選擇放置程式的分支與根目錄 `/ (root)`，儲存。
3. 部署完成後，以 Pages 顯示的 HTTPS 網址開啟。若沿用目前儲存庫名稱，預期路徑為 `https://graceyiyo-cloud.github.io/calculator/`，實際以上線結果為準。

本次修改不會自動推送或啟用 Pages。直接在手機開啟 HTML 檔案無法完成 PWA 安裝；手機連到電腦的普通 HTTP 區域網路網址也無法啟用 Service Worker。

## 手機安裝

- **Android**：使用 Chrome 開啟上線網址，再從 Chrome 選單選擇「安裝應用程式」或「加到主畫面」。
- **iPhone／iPad**：使用 Safari 開啟網址，選擇「分享」→「加入主畫面」。若有「以 Web App 開啟」選項，請保持開啟，再點「加入」。
- 第一次開啟請保持連網，等畫面顯示「已可離線使用」，之後可從主畫面離線開啟。

這是可安裝的網頁 App，沒有 APK 或 App Store 安裝包。

## 資料與更新

紀錄與手動匯率儲存在目前裝置／瀏覽器的 localStorage，沒有雲端同步。不同網址、不同裝置或安裝環境的資料不保證共用，清除網站資料會移除紀錄。原本在相同網址與瀏覽器中的資料使用既有儲存鍵，會繼續保留。

更新網站檔案時，請同步遞增 `sw.js` 的 `CACHE_NAME` 版本。新版本完成快取後，關閉所有此 App 的分頁與視窗，再重新開啟即可套用；不會清除 localStorage 記帳資料。

安裝參考：[PWA 安裝說明](https://web.dev/learn/pwa/installation)、[Apple iPhone 安裝說明](https://support.apple.com/en-euro/guide/iphone/iphea86e5236/ios)。
