/**
 *
 * @param {HTMLButtonElement} button
 * @returns {HTMLCollectionOf<HTMLElement>}
 */
function getSlides(button) {
  const parent = button.parentElement;
  /** @type HTMLDivElement */
  const slidesContainer = parent.getElementsByClassName("slide-elements")[0];
  return slidesContainer.children;
}

/**
 * @param {HTMLElement} prevElement
 * @param {HTMLElement} nextElement
 */
function setAttributes(prevElement, nextElement) {
  prevElement.removeAttribute(attribute);
  nextElement.setAttribute(attribute, true);
}

const attribute = "active";
/** @type HTMLDivElement | null */
let root = null;

/**
 * @param {HTMLDivElement} approot
 */
export default function InitializeSliderController(approot) {
  root = approot;
  setListeners();
}

function setListeners() {
  if (root === null) return;

  /** @type HTMLCollectionOf<HTMLButtonElement> */
  const nextButtons = root.getElementsByClassName("slidebutton next");
  /** @type HTMLCollectionOf<HTMLButtonElement> */
  const prevButtons = root.getElementsByClassName("slidebutton prev");

  for (let button of nextButtons) {
    button.addEventListener("mousedown", onNextSlide);
  }

  for (let button of prevButtons) {
    button.addEventListener("mousedown", onPrevSlide);
  }

}

/**
 * @param {MouseEvent} event
 */
function onNextSlide(event) {
  /** @type HTMLButtonElement @readonly */
  const button = event.target;
  const slides = getSlides(button);
  const slidesCount = slides.length;

  for (let i = 0; i < slidesCount; ++i) {
    const slide = slides[i];
    if (slide.hasAttribute(attribute)) {
      if (i === slidesCount - 1) {
        const nextSlide = slides[0];
        setAttributes(slide, nextSlide);
        break;
      }
      const nextSlide = slides[i + 1];
      setAttributes(slide, nextSlide);
      break;
    }
  }
}

/**
 * @param {MouseEvent} event
 */
function onPrevSlide(event) {
  /** @type HTMLButtonElement @readonly */
  const button = event.target;
  const slides = getSlides(button);
  const slidesCount = slides.length;

  for (let i = 0; i < slidesCount; ++i) {
    const slide = slides[i];
    if (slide.hasAttribute(attribute)) {
      if (i - 1 < 0) {
        const prevSlide = slides[slidesCount - 1];
        setAttributes(slide, prevSlide);
        break;
      }
      const prevSlide = slides[i - 1];
      setAttributes(slide, prevSlide);
      break;
    }
  }
}
