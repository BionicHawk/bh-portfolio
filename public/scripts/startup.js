//@ts-check

window.addEventListener('load', async () => {
    /** @type {HTMLElement | null} */
    const homeBtn = document.getElementById('aboutBtn');
    /** @type {HTMLElement | null} */
    const root = document.getElementById('root');

    console.log(root);

    homeBtn?.setAttribute('onSection', 'true');

    root?.addEventListener('load', () => {
        console.log(`Root changed at ${Date.now()}`)
    })
})
