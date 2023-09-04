import supportUkraine1 from '../../images/support-ukraine-1.1.png';
import supportUkraine1x from '../../images/support-ukraine-1.2.png';
import supportUkraine2 from '../../images/support-ukraine-2.1.png';
import supportUkraine2x from '../../images/support-ukraine-2.2.png';
import supportUkraine3 from '../../images/support-ukraine-3.1.png';
import supportUkraine3x from '../../images/support-ukraine-3.2.png';
import supportUkraine4 from '../../images/support-ukraine-4.1.png';
import supportUkraine4x from '../../images/support-ukraine-4.2.png';
import supportUkraine5 from '../../images/support-ukraine-5.1.png';
import supportUkraine5x from '../../images/support-ukraine-5.2.png';
import supportUkraine6 from '../../images/support-ukraine-6.1.png';
import supportUkraine6x from '../../images/support-ukraine-6.2.png';
import supportUkraine7 from '../../images/support-ukraine-7.1.png';
import supportUkraine7x from '../../images/support-ukraine-7.2.png';
import supportUkraine8 from '../../images/support-ukraine-8.1.png';
import supportUkraine8x from '../../images/support-ukraine-8.2.png';
import supportUkraine9 from '../../images/support-ukraine-9.1.png';
import supportUkraine9x from '../../images/support-ukraine-9.2.png';

import Swiper from 'swiper';

function foundsMarkup(founds) {
    const isRetina = window.devicePixelRatio > 1.1;
  
    const markup = founds
      .map((found, index) => {
        const foundIndex = String(index + 1).padStart(2, '0');
        const foundImage = isRetina ? found.retinaImg : found.img;
        return `
          <li class="found-item swiper-slide">
            <span class="found-index">${foundIndex}</span>
            <a href="${found.url}" target="_blank" class='found-item-link' crossorigin="anonymous" rel="noopener noreferrer nofollow" aria-label="${found.title}">
            <img class="found-img" src="${foundImage}" alt="${found.title}" loading="lazy">
            </a>
          </li>
        `;
      })
      .join('');
  
    return markup;
}

const founds = [
    {
      title: 'Save the Children',
      url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
      img: supportUkraine1,
      retinaImg: supportUkraine1x,
    },
    {
      title: 'UNITED24',
      url: 'https://u24.gov.ua/uk',
      img: supportUkraine2,
      retinaImg: supportUkraine2x,
    },
    {
      title: 'RAZOM',
      url: 'https://www.razomforukraine.org/',
      img: supportUkraine3,
      retinaImg: supportUkraine3x,
    },
    {
      title: 'Medicins Sans   Frontieres',
      url: 'https://www.msf.org/ukraine',
      img: supportUkraine4,
      retinaImg: supportUkraine4x,
    },
    {
      title: 'Project HOPE',
      url: 'https://www.projecthope.org/country/ukraine/',
      img: supportUkraine5,
      retinaImg: supportUkraine5x,
    },
  
    {
      title: 'International Medical   Corps',
      url: 'https://internationalmedicalcorps.org/country/ukraine/',
      img: supportUkraine6,
      retinaImg: supportUkraine6x,
    },
  
    {
      title: 'Action against   hunger',
      url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
      img: supportUkraine7,
      retinaImg: supportUkraine7x,
    },
    {
      title: 'World vision',
      url: 'https://www.wvi.org/emergencies/ukraine',
      img: supportUkraine8,
      retinaImg: supportUkraine8x,
    },
    {
      title: 'Serhiy Prytula Charity   Foundation',
      url: 'https://prytulafoundation.org/en',
      img: supportUkraine9,
      retinaImg: supportUkraine9x,
    },
];

const container = document.querySelector('.founds-list');
container.insertAdjacentHTML(
  'beforeend',
  foundsMarkup(founds)
);





const arrowButton = document.querySelector('.btn-arrow-down');
const arrowButtonUp = document.querySelector('.btn-arrow-up');
// const found = document.querySelector('.founds-container');



const swiper = new Swiper('.my-swiper', {
    direction: 'vertical',
    spaceBetween: 8,
    slidesPerView: 'auto',
  
    navigation: {
      nextEl: '.swiper-button-down',
      prevEl: '.swiper-button-top',
    },
  
    plugins: {
      scrollContainer: true,
    },
  });
  
  let activeSwiperEl = 5;
  
  arrowButton.addEventListener('click', () => {
    swiper.slideNext();
  
    if (
      container.children[activeSwiperEl].classList.contains('swiper-slide-active')
    ) {
      arrowButton.style.display = 'none';
      arrowButtonUp.style.display = 'block';
    }
  });
  
  arrowButtonUp.addEventListener('click', () => {
    swiper.slidePrev();
    if (container.children[0].classList.contains('swiper-slide-active')) {
      arrowButtonUp.style.display = 'none';
      arrowButton.style.display = 'block';
    }
  });




const foundsList = document.querySelector('.founds-list');
const intersectionObserver = new IntersectionObserver(function (entries) {
  if (entries[0].intersectionRatio <= 0) return;

  arrowButtonUp.style.display = 'block';
  arrowButton.style.display = 'none';
});

const intersectionObserver1 = new IntersectionObserver(function (entries) {
  if (entries[0].intersectionRatio <= 0) return;

  arrowButtonUp.style.display = 'none';
  arrowButton.style.display = 'block';
});

intersectionObserver.observe(foundsList.lastElementChild);
intersectionObserver1.observe(foundsList.firstElementChild);