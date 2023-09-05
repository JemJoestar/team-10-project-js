(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');
  const toggleMenu = (e) => {
    e.stopImmediatePropagation()
    console.log(openMenuBtn)
    console.log(closeMenuBtn)
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    const mopen = mobileMenu.classList.toggle('is-open');
    console.log("Menu is open: " + mopen)
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
if (pathName == '/index.html'&&'/team-10-project-js/index.html') {
  const page = document.querySelector("#home");
  page.classList.add('current');
} else {
  const page = document.querySelector("#shopping");
  page.classList.add('current');
}
