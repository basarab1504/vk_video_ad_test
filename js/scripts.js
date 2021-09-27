console.log("helloooooooo");

vkBridge.send('VKWebAppInit');

// Подписка на событие-результат
bridge.subscribe((e) => {
    console.log(e);
});