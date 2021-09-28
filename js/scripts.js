var NetworkCallbacks = {
    __callbacks: {},

    addCallback: function (method, callback) {
        if (this.__callbacks[method] === void (0)) {
            this.__callbacks[method] = [];
        }

        this.__callbacks[method].push(callback);
        VK.addCallback(method, callback);
    },

    removeCallback: function (method, callback) {
        var
            l = this.__callbacks[method] || [],
            i = l.indexOf(callback);

        i > -1 && l.splice(i, 1);
        VK.removeCallback(method, callback);
        return this;
    },

    replaceCallback: function (method, callback) {
        var callbacks = this.getCallbacks(method);

        if (
            callbacks &&
            callbacks.length
        ) {
            this.clearCallbacks(method);
        }

        this.addCallback(method, callback);
    },

    getCallbacks: function (method) {
        var handlers = this.__callbacks[method] || [];

        if (handlers.length) {
            return handlers;
        } else {
            return false;
        }
    },

    clearCallbacks: function (method) {
        if (method in this.__callbacks) {
            this.__callbacks[method] = [];
        }
    },

    trigger: function (method, data) {
        var
            handlers = this.__callbacks[method] || [],
            i,
            event_data = {};

        if (handlers.length) {
            for (i = 0; i < handlers.length; i++) {
                // чтобы один обработчик не мог попортить данные в других обработчиках
                // делаем их копию
                event_data = $.extend(true, {}, data);
                try {
                    if (
                        handlers[i](event_data, this) === false ||
                        event.isDefaultPrevented()
                    ) {
                        break;
                    }
                } catch (ex) {
                    window.console && window.console.log && window.console.log(ex);
                }
            }
        }

        return this;
    }
};

vkBridge.send('VKWebAppInit');

// Подписка на событие-результат
vkBridge.subscribe(eventListener);

function vkBridgeEventsListener(e) {
    var id = e.detail.data.request_id;
    var
        callbacks = NetworkCallbacks.getCallbacks(id),
        callback;

    if (
        callbacks &&
        callbacks.length
    ) {
        for (var i = 0; i < callbacks.length; i++) {
            callback = callbacks[i];

            if (callback) {
                callback(JSON.stringify(e));
            }
        }
        NetworkCallbacks.clearCallbacks(id);
    }
}

function checkAd() {
    console.log("checkAd");
    NetworkCallbacks.addCallback("o1", (arg) => { console.log(arg) });
    vkBridge.send("VKWebAppCheckNativeAds", { "ad_format": "reward", "request_id": "o1" });
}

function showAd() {
    console.log("showAd");
    NetworkCallbacks.addCallback("o2", (arg) => { console.log(arg) });
    vkBridge.send("VKWebAppShowNativeAds", { "ad_format": "reward", "request_id": "o2" });
}