/** @type HTMLDivElement */
const root = document.getElementById('root');

window.addEventListener('load', async () => {
    /** @type HTMLButtonElement */
    const homeBtn = document.getElementById('aboutBtn');
    const response = await fetch('/about', {
        method: 'GET'
    });

    const html = await response.text();
    root.innerHTML = html;
    homeBtn.setAttribute('onSection', true);
})