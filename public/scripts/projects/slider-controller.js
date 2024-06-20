/**
 *
 * @param {HTMLButtonElement} button
 * @returns {HTMLCollectionOf<HTMLImageElement>}
 */
function getSlides(button) {
  const parent = button.parentElement;
  /** @type HTMLDivElement */
  const slidesContainer = parent.getElementsByClassName("slide-elements")[0];
  return slidesContainer.children;
}

/**
 * @param {HTMLImageElement} prevElement
 * @param {HTMLImageElement} nextElement
 */
function setAttributes(prevElement, nextElement) {
  prevElement.removeAttribute(attribute);
  nextElement.setAttribute(attribute, true);
}

const attribute = "active";
/** @type HTMLDivElement | null */
let root = null;
const slideChangeInterval = 10000;

/**
 * @param {HTMLDivElement} approot
 */
export default function InitializeSliderController(approot) {
  root = approot;
  setListeners();
  setSlidersAutoChange();
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

function setSlidersAutoChange() {
  /** @type HTMLCollectionOf<HTMLDivElement> */
  const slideContainers = root.getElementsByClassName("slide-elements");
  for (let slideContainer of slideContainers) {
    setSliderAutoChange(slideContainer);
  }
}

/**
 * @param {HTMLDivElement} slideContainer
 */
function setSliderAutoChange(slideContainer) {
  /** @type HTMLCollectionOf<HTMLImageElement> */
  const slides = slideContainer.children;
  updateSliderBackgroundFromSlides(slides);

  setInterval(() => {
    nextSlide(slides);
  }, slideChangeInterval);
}

/**
 * @param {MouseEvent} event
 */
function onNextSlide(event) {
  /** @type HTMLButtonElement @readonly */
  const button = event.target;
  const slides = getSlides(button);
  nextSlide(slides);
}

/**
 * @param {MouseEvent} event
 */
function onPrevSlide(event) {
  /** @type HTMLButtonElement @readonly */
  const button = event.target;
  const slides = getSlides(button);
  prevSlide(slides);
}

/**
 * @param {HTMLCollectionOf<HTMLImageElement>} slides
 */
function nextSlide(slides) {
  const slidesCount = slides.length;

  for (let i = 0; i < slidesCount; ++i) {
    const slide = slides[i];
    if (slide.hasAttribute(attribute)) {
      if (i === slidesCount - 1) {
        const nextSlide = slides[0];
        setAttributes(slide, nextSlide);
        updateSliderBackgroundFromSlide(nextSlide);
        break;
      }
      const nextSlide = slides[i + 1];
      setAttributes(slide, nextSlide);
      updateSliderBackgroundFromSlide(nextSlide);
      break;
    }
  }
}

/**
 * @param {HTMLCollectionOf<HTMLImageElement>} slides
 */
function prevSlide(slides) {
  const slidesCount = slides.length;

  for (let i = 0; i < slidesCount; ++i) {
    const slide = slides[i];
    if (slide.hasAttribute(attribute)) {
      if (i - 1 < 0) {
        const prevSlide = slides[slidesCount - 1];
        setAttributes(slide, prevSlide);
        updateSliderBackgroundFromSlide(prevSlide);
        break;
      }
      const prevSlide = slides[i - 1];
      setAttributes(slide, prevSlide);
      updateSliderBackgroundFromSlide(prevSlide);
      break;
    }
  }
}

/**
 *
 * @param {HTMLCollectionOf<HTMLImageElement>} slides
 */
function updateSliderBackgroundFromSlides(slides) {
  /** @type HTMLImageElement | null */
  let currentSlide = null;

  for (let slide of slides) {
    if (slide.hasAttribute(attribute)) {
      currentSlide = slide;
      break;
    }
  }

  if (currentSlide === null) return;

  updateSliderBackgroundFromSlide(currentSlide);
}

/**
 * @param {HTMLImageElement} slide
 */
function updateSliderBackgroundFromSlide(slide) {
  /** @type HTMLDivElement */
  const sliderShow = slide.parentElement;
  /** @type HTMLDivElement */
  const container = sliderShow.parentElement;

  const url = slide.src;
  container.style.backgroundImage = `url(\'${url}\')`;
}
