const globalNav = (el) => {
  /**
   * スクロール位置を固定
   */
  const fixScroll = () => {
    const bodyEl = document.body;
    const scrollPos = window.scrollY;
    
    bodyEl.dataset.scrollPos = scrollPos;
    bodyEl.style.position = 'fixed';
    bodyEl.style.top = `-${scrollPos}px`;
    bodyEl.style.left = '0';
    bodyEl.style.width = '100%';
  };

  /**
   * スクロール位置の固定を解除
   */
  const cancelFixScroll = () => {
    const bodyEl = document.body;
    if (bodyEl.style.position === 'fixed') {
      const scrollPos = Number(bodyEl;.dataset.scrollPos || 0);
      
      bodyEl.style.position = 'static';
      bodyEl.style.top = '';
      bodyEl.style.left = '';
      bodyEl.style.width = '';
      window.scrollTo({ top: scrollPos, behavior: 'instant' });
    }
  };

  /**
   * ナビゲーションを閉じる
   */
  const closeNav = () => {
    modalEl.classList.remove(NAV_ACTIVE_CLASS);
    toggleEl.classList.remove(NAV_ACTIVE_CLASS);
    cancelFixScroll();
    modalEl.setAttribute('aria-hidden', 'true');
    toggleEl.setAttribute('aria-expanded', 'false');
    toggleEl.focus();
  };

  /**
   * ナビゲーションを開く
   */
  const openNav = () => {
    fixScroll();
    modalEl.classList.add(NAV_ACTIVE_CLASS);
    toggleEl.classList.add(NAV_ACTIVE_CLASS);
    modalEl.setAttribute('aria-hidden', 'false');
    toggleEl.setAttribute('aria-expanded', 'true');
    modalEl.querySelector('a').focus();
  };

  const modalEl = el;
  const toggleEl = document.querySelector('.js-global-nav-toggle');
  const anchorLinkEls = modalEl.querySelectorAll('a[href^="#"]');
  const NAV_ACTIVE_CLASS = 'is-active';

  toggleEl.addEventListener('click', () => {
    if (toggleEl.classList.contains(NAV_ACTIVE_CLASS)) {
      closeNav();
    } else {
      openNav();
    }
  });

  if (anchorLinkEls.length > 0) {
    anchorLinkEls.forEach(link => {
      link.addEventListener('click', () => closeNav());
    });
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const globalNavEl = document.querySelector('.js-global-nav');
  if (globalNavEl) globalNav(globalNavEl);
});