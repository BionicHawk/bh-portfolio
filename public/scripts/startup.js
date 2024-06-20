window.addEventListener('load', async () => {
    /** @type HTMLButtonElement */
    const homeBtn = document.getElementById('aboutBtn');
    /** @type HTMLDivElement */
    const root = document.getElementById('root');

    console.log(root);

    homeBtn.setAttribute('onSection', true);

    root.addEventListener('load', () => {
        console.log(`Root changed at ${Date.now()}`)
    })
})
