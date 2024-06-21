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
/** @type HTMLDivElement | null */
let fullscreenElement = null;
const slideChangeInterval = 10000;

/**
 * @param {HTMLDivElement} approot
 */
export default function InitializeSliderController(approot) {
  root = approot;
  fullscreenElement = document.getElementById('fsch-image');
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
    const slides = getSlides(button);

    for (let slide of slides) {
      slide.addEventListener('mousedown', showFullscreenImage)
    }
  }

  for (let button of prevButtons) {
    button.addEventListener("mousedown", onPrevSlide);
  }
  
  const imageContainer = fullscreenElement.querySelector("#image");
  /** @type HTMLButtonElement */
  const closeButton = imageContainer.querySelector("button");

  fullscreenElement.addEventListener("mousedown", closeButton);
  closeButton.addEventListener("mousedown", closeFullScreen);
}

/** @param {MouseEvent} event */
function closeFullScreen(event) {
  fullscreenElement.style.display = "none";
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
  let currentSlide = getCurrentSlide(slides);
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

/**
 * @param {HTMLCollectionOf<HTMLImageElement>} slides
 * @returns {HTMLImageElement | null}
 */
function getCurrentSlide(slides) {
  for (let slide of slides) {
    if (slide.hasAttribute(attribute)) {
      return slide;
    }
  }
  return null;
}

/**
 * @param {MouseEvent} event 
 */
function showFullscreenImage(event) {
  /** @type HTMLImageElement */
  const slide = event.target;
  const src = slide.src;
  /** @type HTMLDivElement */
  const imageContainer = fullscreenElement.querySelector("#image");
  imageContainer.style.backgroundImage = `url(${src})`;
  fullscreenElement.style.display = "flex";
}