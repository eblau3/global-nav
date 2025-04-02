const globalNav = (element) => {
  /**
   * スクロール位置を固定
   */
  const fixScroll = () => {
    const target = document.body;
    const scrollPos = window.scrollY;
    
    target.dataset.scrollPos = scrollPos;
    target.style.position = 'fixed';
    target.style.top = `-${scrollPos}px`;
    target.style.left = '0';
    target.style.width = '100%';
  };

  /**
   * スクロール位置の固定を解除
   */
  const cancelFixScroll = () => {
    const target = document.body;
    if (target.style.position === 'fixed') {
      const scrollPos = Number(target.dataset.scrollPos || 0);
      
      target.style.position = 'static';
      target.style.top = '';
      target.style.left = '';
      target.style.width = '';
      window.scrollTo({ top: scrollPos, behavior: 'instant' });
    }
  };

  /**
   * ナビゲーションを閉じる
   */
  const closeNav = () => {
    modal.classList.remove(activeClassName);
    toggle.classList.remove(activeClassName);
    cancelFixScroll();
    modal.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  };

  /**
   * ナビゲーションを開く
   */
  const openNav = () => {
    fixScroll();
    modal.classList.add(activeClassName);
    toggle.classList.add(activeClassName);
    modal.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    modal.querySelector('a').focus();
  };

  const modal = element;
  const toggle = document.querySelector('.js-global-nav-toggle');
  const anchorLinks = modal.querySelectorAll('a[href^="#"]');
  const activeClassName = 'is-active';

  toggle.addEventListener('click', () => {
    if (toggle.classList.contains(activeClassName)) {
      closeNav();
    } else {
      openNav();
    }
  });

  if (anchorLinks.length > 0) {
    anchorLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeNav();
      });
    });
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('.js-global-nav');
  if (target) globalNav(target);
});