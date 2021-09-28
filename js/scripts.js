var vkBridgeCallbacks = {};

vkBridge.send('VKWebAppInit');

// Подписка на событие-результат
vkBridge.subscribe(vkBridgeEventsListener);

function vkBridgeEventsListener(e) {
    var data = e.detail.data;
    if (data)
    {
        var id = data.request_id;
        var callback = this.vkBridgeCallbacks[id] || [];
        if (callback) {
            callback(JSON.stringify(e));
        }
    }
    // console.log(e);
}

function checkAd() {
    console.log("checkAd");
    this.vkBridgeCallbacks["o1"] = (arg) => { console.log(arg) };
    vkBridge.send("VKWebAppCheckNativeAds", { "ad_format": "reward", "request_id": "o1" });
}

function showAd() {
    console.log("showAd");
    this.vkBridgeCallbacks["o2"] = (arg) => { console.log(arg) };
    vkBridge.send("VKWebAppShowNativeAds", { "ad_format": "reward", "request_id": "o2" });
}