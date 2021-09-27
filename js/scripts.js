vkBridge.send('VKWebAppInit');

// Подписка на событие-результат
vkBridge.subscribe((e) => {
    console.log(e);
});

function checkAd() {
    console.log("checkAd");
    vkBridge.send("VKWebAppCheckNativeAds", { "ad_format": "reward" });
}

function showAd() {
    console.log("showAd");
    vkBridge.send("VKWebAppShowNativeAds", { "ad_format": "reward" });
}