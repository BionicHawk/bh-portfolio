/**
 * @param {HTMLButtonElement} button
 * @returns {HTMLCollectionOf<HTMLImageElement> | null}
 */
function getSlides(button) {
  const parent = button.parentElement;
  /** @type {Element | undefined} */
  const slidesContainer = parent?.getElementsByClassName("slide-elements")[0];
  if (slidesContainer instanceof HTMLDivElement) {
    // @ts-ignore
    return slidesContainer.children;
  }
  return null;
}

/**
 * @param {HTMLImageElement} prevElement
 * @param {HTMLImageElement} nextElement
 */
function setAttributes(prevElement, nextElement) {
  prevElement.removeAttribute(attribute);
  nextElement.setAttribute(attribute, 'true');
}

const fullscreenElementId = 'fsch-image';
const fullscreenCloseButtonId = 'close-image';
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
  const fullscreenElementPrevent = document.getElementById(fullscreenElementId);
  fullscreenElement = fullscreenElementPrevent instanceof HTMLDivElement ? fullscreenElementPrevent : null;
  setListeners();
  setSlidersAutoChange();
}

function setListeners() {
  if (root === null) return;

  /** @type HTMLCollectionOf */
  const nextButtons = root.getElementsByClassName("slidebutton next");
  /** @type HTMLCollectionOf */
  const prevButtons = root.getElementsByClassName("slidebutton prev");

  for (let button of nextButtons) {
    if (button instanceof HTMLButtonElement) {
      button.addEventListener("mousedown", onNextSlide);
      const slides = getSlides(button);

      if (slides === null) return;
  
      for (let slide of slides) {
        slide.addEventListener('mousedown', showFullscreenImage)
      }
    }
  }

  for (let button of prevButtons) {
    button.addEventListener("mousedown", onPrevSlide);
  }
  
  const imageContainer = fullscreenElement?.querySelector("#image");
  
  if (!imageContainer) 
    return;

  const closeButton = imageContainer.querySelector("button");

  fullscreenElement?.addEventListener("mousedown", closeFullScreen);
  closeButton?.addEventListener("mousedown", closeFullScreen);
}

/** @param {MouseEvent} event */
function closeFullScreen(event) {
  /** @type {HTMLElement | null} */
  // @ts-ignore
  const target = event.target;
  if (!target) return;

  if (target.id === fullscreenCloseButtonId || target.id === fullscreenElementId)
    fullscreenElement?.removeAttribute("show");
}

function setSlidersAutoChange() {
    /** @type {HTMLCollectionOf<HTMLDivElement> | undefined}*/
    // @ts-ignore
  const slideContainers = root?.getElementsByClassName("slide-elements");
  if (slideContainers === undefined) 
    return;
  for (let slideContainer of slideContainers) {
    setSliderAutoChange(slideContainer);
  }
}

/**
 * @param {HTMLDivElement} slideContainer
 */
function setSliderAutoChange(slideContainer) {
  /** @type HTMLCollectionOf<HTMLImageElement> */
  // @ts-ignore
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
  /** @type {HTMLButtonElement | null} @readonly */
  // @ts-ignore
  const button = event.target;

  if (button === null)
    return;

  const slides = getSlides(button);
  
  if (slides === null)
    return;

  nextSlide(slides);
}

/**
 * @param {MouseEvent} event
 */
function onPrevSlide(event) {
  /** @type {HTMLButtonElement | null} @readonly */
  // @ts-ignore
  const button = event.target;

  if (button === null)
    return;

  const slides = getSlides(button);

  if (slides === null)
    return null;

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
  /** @type {HTMLDivElement} */
  // @ts-ignore
  const sliderShow = slide.parentElement;
  /** @type {HTMLDivElement} */
  // @ts-ignore
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
  /** @type {HTMLImageElement | null} */
  // @ts-ignore
  const slide = event.target;

  if (slide === null || fullscreenElement === null)
    return;

  const src = slide.src;
  /** @type {HTMLDivElement | null} */
  const imageContainer = fullscreenElement.querySelector("#image");

  if (imageContainer === null)
    return;

  imageContainer.style.backgroundImage = `url(${src})`;
  fullscreenElement.setAttribute("show", 'true');
}