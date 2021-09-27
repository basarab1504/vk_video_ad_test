console.log("helloooooooo");

vkBridge.send('VKWebAppInit');

// Подписка на событие-результат
vkBridge.subscribe((e) => {
    console.log(e);
});