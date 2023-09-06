(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');
  const openBtn = document.querySelector(".menu-toggle");
  const closeBtn = document.querySelector(".menu-toggle-mobil");
  const toggleMenu = (e) => {
    e.stopImmediatePropagation()
  
    if (openMenuBtn.getAttribute('aria-expanded') === 'false') {
      openBtn.classList.add('hidden');
      closeBtn.classList.remove('hidden');
    }
     if (openMenuBtn.getAttribute('aria-expanded') === 'true') {
       openBtn.classList.remove('hidden');
       closeBtn.classList.add('hidden');
    }
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    const mopen = mobileMenu.classList.toggle('is-open');
    const scrollLockMethod = !isMenuOpen
      ? 'disableBodyScroll'
      : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);
  };
  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();

const pathName = document.location.pathname
if (pathName.includes('index')) {
  const page = document.querySelectorAll(".home")
  page.forEach(el => {
      el.classList.add('current')
    });;
  
} else if (pathName.includes('shopping')) {
  const pages = document.querySelectorAll(".shopping");
  pages.forEach(el => {
      el.classList.add('current')
    });;
}



