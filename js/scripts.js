var vkBridgeCallbacks = {};

vkBridge.send('VKWebAppInit');

function bridge (method, params, callback_id) {
      console.log("JS call VKBridge (" + method + ")");
      console.log(params);
      params["request_id"] = callback_id;
      vkBridge.send(method, params).then(data => {
        var response = {
          "callback_id": callback_id,
          "response": {
            "data": data.result,
            "error":
            {
              "error_type": data.error_type,
              "error_data": data.error_data,
            },
          }
        }
        console.log("vkBridge response =");
        console.log(JSON.stringify(response));
//         VKUnity.sendMessage('OnBridgeComplete', JSON.stringify(response));
      }).catch(data => {
        var response = {
          "callback_id": callback_id,
          "response": {
            "data": data.result,
            "error":
            {
              "error_type": data.error_type,
              "error_data": data.error_data,
            },
          }
        }
        console.log("vkBridge response =");
        console.log(JSON.stringify(response));
//         VKUnity.sendMessage('OnBridgeComplete', JSON.stringify(response));
      });
}

function checkAd() {
    bridge("VKWebAppCheckNativeAds", { "ad_format": "reward", "request_id": "o1" }, "o1");
//     vkBridge.send("VKWebAppCheckNativeAds", { "ad_format": "reward", "request_id": "o1" }).then(data => {
//         console.log("FINE");
//         console.log(data);
//     }).catch(error => {
//         console.log("ERROR");
//         console.log(error);
//     });
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