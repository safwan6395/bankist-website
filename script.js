'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// //////////////////////////////////////////////////////

const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improve performance <button class="btn btn--close-cookie">Got it!</button>';

header.append(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

// styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.position = 'fixed';
message.style.display = 'absolute';
message.style.top = '91.7%';
message.style.zIndex = '999';
message.style.display = 'none';

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// setTimeout(() => message.style.display = 'none', 0)

// console.log(document.querySelector('.btn--scroll-to').getBoundingClientRect())

const section1 = document.querySelector('#section--1');

document
  .querySelector('.btn--scroll-to')
  .addEventListener('click', function () {
    const sec1coords = section1.getBoundingClientRect();

    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: sec1coords.top + window.scrollY,
    });

    // section1.scrollIntoView({ behavior: 'smooth' });
  });

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     console.log(id);

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);

    if (id === '#') return;

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// operations fucntionality
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  // Removing Active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// navigation hover effect
const hoverEffectOnLinks = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
const nav = document.querySelector('.nav');
// passing 'arguments' into Handler
nav.addEventListener('mouseover', hoverEffectOnLinks.bind(0.5));

nav.addEventListener('mouseout', hoverEffectOnLinks.bind(1));

// Sticky Navigation
// const sec1coords = section1.getBoundingClientRect()

// window.addEventListener('scroll', function() {

//   if (window.scrollY > sec1coords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky')
// })

// IntersectionObserver API

const sticky = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(sticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
});

// Lazy loading
const imgTargets = document.querySelectorAll('img[data-src]');

const lazyLoad = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  console.log(entry);

  // changing image source
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

// slider
const slider = function () {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const rightBtn = document.querySelector('.slider__btn--right');
  const leftBtn = document.querySelector('.slider__btn--left');
  const dotsContainer = document.querySelector('.dots');

  const maxSlide = slides.length - 1;
  let curSlide = 0;

  // slider.style.transform = 'scale(0.3) translate(-500px)';
  // slider.style.overflow = 'visible';

  // functions
  const goToSlide = function (slideNo) {
    slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translateX(${100 * (i - slideNo)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide) curSlide = 0;
    else curSlide++;

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide;
    else curSlide--;

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slideNo) {
    const dots = document.querySelectorAll('.dots__dot');

    dots.forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide='${slideNo}']`)
      .classList.add('dots__dot--active');
  };

  const initialization = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };

  initialization();
  // Event listeners
  rightBtn.addEventListener('click', nextSlide);
  leftBtn.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;

      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
// const randomNumbers = (min, max) => Math.floor(Math.random() * (++max - min));

// const randomColors = () => `rgb(${randomNumbers(0, 255)}, ${randomNumbers(0, 255)}, ${randomNumbers(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColors()

//   console.log(e.target)
// })

// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColors()
//   console.log(e.target)

//   // e.stopPropagation()
// })

// document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColors()
//   console.log(e.target)
// })
