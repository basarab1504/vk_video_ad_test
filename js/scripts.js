var vkBridgeCallbacks = {};

vkBridge.send('VKWebAppInit');

// Подписка на событие-результат
vkBridge.subscribe(vkBridgeEventsListener);

function vkBridgeEventsListener(e) {
    var detail = e.detail
    var data = detail.data;
    
    console.log("asn");

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
    params["request_id"] = callback_id;

    this.vkBridgeCallbacks[callback_id] = method;
    vkBridge.send(method, params);
}

function checkAd() {
    bridge("VKWebAppCheckNativeAds", { "ad_format": "reward" }, "o1");
}

function showAd() {
    console.log("showAd");
    bridge("VKWebAppShowNativeAds", { "ad_format": "reward" }, "o2");
}