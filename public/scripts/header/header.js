// @ts-ignore
import InitializaSliderController from '/scripts/projects/slider-controller.js';

/** @type {HTMLDivElement | null} */
// @ts-ignore
const headerActions = document.getElementById("header-actions");

// header-actions

/** @type {HTMLButtonElement | null} */
// @ts-ignore
const aboutBtn = document.getElementById("aboutBtn");
/** @type {HTMLButtonElement | null} */
// @ts-ignore
const projectsBtn = document.getElementById("projectsBtn");
/** @type {HTMLButtonElement | null} */
// @ts-ignore
const contactBtn = document.getElementById("contactBtn");

function removeOnSectionProperty() {
    const prop = 'onSection';

    aboutBtn?.removeAttribute(prop);
    projectsBtn?.removeAttribute(prop);
    contactBtn?.removeAttribute(prop);
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
 * @param {HTMLElement} element 
 * @param {string} content 
 */
function replaceHTMLContent(element, content) {
    element.innerHTML = "";
    element.innerHTML = content;
}

/**
 * 
 * @param {MouseEvent} event 
 */
async function onSectionClick(event) {
    /** @type {HTMLButtonElement | null} */
    // @ts-ignore
    const element = event.target;
    /** @type {HTMLDivElement | null} */
    // @ts-ignore
    const root = document.getElementById('root');
    
    if (element === null || root === null)
        return;

    if (element.hasAttribute('onSection')) {
        return;
    }

    switch (element) {
        case aboutBtn:
            replaceHTMLContent(root, await fetchHTML('/about'));
            break;
        case projectsBtn:
            replaceHTMLContent(root, await fetchHTML('/projects'));
            InitializaSliderController(root);
            break;
        case contactBtn:
            replaceHTMLContent(root, await fetchHTML('/contact'));
            root.innerHTML = await fetchHTML('/contact');
            break;
        default:
            replaceHTMLContent(root, '<h1>Not found</h1>')
            break;
    }

    removeOnSectionProperty();

    element.setAttribute('onSection', 'true');
}

aboutBtn?.addEventListener('mousedown', onSectionClick);
projectsBtn?.addEventListener('mousedown', onSectionClick);
contactBtn?.addEventListener('mousedown', onSectionClick);