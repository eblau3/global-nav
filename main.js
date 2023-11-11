const globalNav = (element) => {
  const fixScroll = () => {
    const target = document.querySelector('body');
    const scrollPos = window.scrollY;
    target.style.position = 'fixed';
    target.style.top = `-${scrollPos}px`;
    target.style.left = '0';
  };

  const cancelFixScroll = () => {
    const target = document.querySelector('body');
    const fixedPos = Number(target.style.top.replace(/px|-/g, ''));
    target.style.position = 'static';
    window.scrollTo(0, fixedPos);
  };

  const toggleClass = (el) => el && el.classList.toggle('is-active');

  const toggle = element;
  const modal = document.querySelector('.js-global-nav');

  toggle.addEventListener('click', () => {
    if(toggle.classList.contains('is-active')) {
      toggleClass(modal);
      toggleClass(toggle);
      cancelFixScroll();
    } else {
      fixScroll();
      toggleClass(toggle);
      toggleClass(modal);
    };
  });
};

window.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('.js-global-nav-toggle');
  if(target) globalNav(target);
});