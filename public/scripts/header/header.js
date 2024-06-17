/** @type HTMLDivElement | null */
const headerActions = document.getElementById("header-actions");

// header-actions

/** @type HTMLButtonElement | null */
const aboutBtn = document.getElementById("aboutBtn");
/** @type HTMLButtonElement | null */
const projectsBtn = document.getElementById("projectsBtn");
/** @type HTMLButtonElement | null */
const contactBtn = document.getElementById("contactBtn");

function removeOnSectionProperty() {
    const prop = 'onSection';
    aboutBtn.removeAttribute(prop);
    projectsBtn.removeAttribute(prop);
    contactBtn.removeAttribute(prop);
}

/**
 * @param {string} route
 * @returns {Promise<string>}
 */
async function fetchHTML(route) {
    const response = await fetch(route, {
        method: 'GET'
    });

    return await response.text();
}

/**
 * 
 * @param {MouseEvent} event 
 */
async function onSectionClick(event) {
    /** @type HTMLButtonElement */
    const element = event.target;
    /** @type HTMLDivElement */
    const root = document.getElementById('root');
    let innerHTML = "";
    
    if (element.hasAttribute('onSection')) {
        return;
    }

    switch (element) {
        case aboutBtn:
            innerHTML = await fetchHTML('/about');
            break;
        case projectsBtn:
            innerHTML = await fetchHTML('/projects');
            break;
        case contactBtn:
            innerHTML = await fetchHTML('/contact');
            break;
        default:
            innerHTML = "<h1>Not found</h1>"
            break;
    }

    root.innerHTML = innerHTML;

    removeOnSectionProperty();

    element.setAttribute('onSection', true);
}

aboutBtn?.addEventListener('mousedown', onSectionClick);
projectsBtn?.addEventListener('mousedown', onSectionClick);
contactBtn?.addEventListener('mousedown', onSectionClick);