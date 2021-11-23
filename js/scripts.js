var vkBridgeCallbacks = {};

vkBridge.send('VKWebAppInit');

// Подписка на событие-результат
// vkBridge.subscribe(vkBridgeEventsListener);

function vkBridgeEventsListener(e) {
    var detail = e.detail
    var data = detail.data;
    if (data) {
        var id = data.request_id;
        var callback = this.vkBridgeCallbacks[id];
        if (callback) {
            data.type = detail.type;
            var response = {
                'callback_id': data.request_id,
                'response': {
                    'status': detail.status,
                    'data': data,
                    'error': detail.error
                }
            };

            console.log("vkBridge response =");
            console.log(JSON.stringify(response));

            //             VKUnity.sendMessage(callback, JSON.stringify(response));
        }
    }
}

function bridge(method, params, callback_id) {
    console.log("JS call VKBridge (" + method + ")");

    params["request_id"] = callback_id;

    console.log(params);

    this.vkBridgeCallbacks[callback_id] = method;
    vkBridge.send(method, params);
}

function checkAd() {
    // bridge("VKWebAppCheckNativeAds", { "ad_format": "reward" }, "o1");
    vkBridge.send("VKWebAppCheckNativeAds", { ad_format: "reward" })
        .then(data => console.log(data.result))
        .catch(error => console.log(error));
}

function showAd() {
    console.log("showAd");
    // bridge("VKWebAppShowNativeAds", { "ad_format": "reward" }, "o2");
    vkBridge.send("VKWebAppShowNativeAds", { ad_format: "reward" })
        .then(data => console.log(data.result))
        .catch(error => console.log(error));
}