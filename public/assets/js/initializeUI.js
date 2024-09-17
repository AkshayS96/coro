(async() => {
    const app = document.createElement('div');
    app.id = 'search-extension-root';
    document.body.appendChild(app);

    const src = chrome?.runtime?.getURL('/react/index.js');
    await import(src);
})();