var vkBridgeCallbacks = {};

vkBridge.send('VKWebAppInit');

// Подписка на событие-результат
vkBridge.subscribe(vkBridgeEventsListener);

function vkBridgeEventsListener(e) {
    var detail = e.detail
    var data = detail.data;
    if (data) {
        var id = data.request_id;
        var callback = this.vkBridgeCallbacks[id];
        if (callback) {
            var response = {
                'callback_id': callback.data.request_id,
                'response': {
                    'status': data.status,
                    'data': data.detail,
                    'error': data.error
                }
            };

            console.log("vkBridge response =");
            console.log(response);

            VKUnity.sendMessage(callback, JSON.stringify(response));
        }
    }
}

function checkAd() {
    console.log("checkAd");
    this.vkBridgeCallbacks["o1"] = "hello";
    vkBridge.send("VKWebAppCheckNativeAds", { "ad_format": "reward", "request_id": "o1" });
}

function showAd() {
    console.log("showAd");
    this.vkBridgeCallbacks["o2"] = "how";
    vkBridge.send("VKWebAppShowNativeAds", { "ad_format": "reward", "request_id": "o2" });
}