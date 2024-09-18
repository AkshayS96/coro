(async() => {
    const app = document.createElement('div');
    app.id = 'search-extension-root';
    document.body.appendChild(app);

    const src = chrome?.runtime?.getURL('/react/main.js');
    await import(src);
})();