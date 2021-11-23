var vkBridgeCallbacks = {};

vkBridge.send('VKWebAppInit');

function checkAd() {
    vkBridge.send("VKWebAppCheckNativeAds", { "ad_format": "reward", "request_id": "o1" }).then(data => {
        console.log("FINE");
        console.log(data);
    }).catch(error => {
        console.log("ERROR");
        console.log(error);
    });
}

function showAd() {
    vkBridge.send("VKWebAppShowNativeAds", { "ad_format": "reward", "request_id": "o2" }).then(data => {
        console.log("FINE");
        console.log(data);
    }).catch(error => {
        console.log("ERROR");
        console.log(error);
    });
}