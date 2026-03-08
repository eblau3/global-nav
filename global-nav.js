/**
 * グローバルナビゲーションの制御
 * @param {HTMLElement} element - 開閉トリガーとなるボタン要素
 */
const initializeGlobalNav = (element) => {
  // 状態管理用の共通クラス名
  const MODAL_ACTIVE_CLASS = 'is-active';

  // 要素のキャッシュ
  const toggleButton = element;
  const modal = document.querySelector('.js-global-nav');
  const anchorLinks = modal.querySelectorAll('a[href^="#"]');

  /**
   * 背景スクロールの固定
   * モーダル背面でのスクロールを防止し、現在の位置を保持します。
   */
  const lockScroll = () => {
    const scrollPosition = window.scrollY;

    Object.assign(document.body.style, {
      position: "fixed",
      top: `-${scrollPosition}px`,
      width: "100%",
      overflowY: "scroll", // スクロールバー消失によるガタつきを防止
    });
  };

  /**
   * 背景スクロールの解除
   * 固定を解き、元のスクロール位置へ復元します。
   */
  const unlockScroll = () => {
    const scrollPosition = parseInt(document.body.style.top || "0", 10) * -1;

    Object.assign(document.body.style, {
      position: "",
      top: "",
      width: "",
      overflowY: "",
    });
    window.scrollTo(0, scrollPosition);
  };

  /**
   * ナビゲーションを開く
   */
  const openModal = () => {
    lockScroll();
    modal.classList.add(MODAL_ACTIVE_CLASS);
    toggleButton.classList.add(MODAL_ACTIVE_CLASS);
    
    // アクセシビリティ属性の更新
    modal.setAttribute('aria-hidden', 'false');
    toggleButton.setAttribute('aria-expanded', 'true');
    
    // 最初のリンクにフォーカスを移動（キーボード操作対応）
    const firstLink = modal.querySelector('a');
    if (firstLink) firstLink.focus();
  };

  /**
   * ナビゲーションを閉じる
   */
  const closeModal = () => {
    modal.classList.remove(MODAL_ACTIVE_CLASS);
    toggleButton.classList.remove(MODAL_ACTIVE_CLASS);
    unlockScroll();
    
    // アクセシビリティ属性の更新
    modal.setAttribute('aria-hidden', 'true');
    toggleButton.setAttribute('aria-expanded', 'false');
    
    // トリガーボタンにフォーカスを戻す
    toggleButton.focus();
  };

  // --- イベントリスナーの設定 ---

  // 開閉ボタンのクリックイベント
  toggleButton.addEventListener('click', () => {
    if (toggleButton.classList.contains(MODAL_ACTIVE_CLASS)) {
      closeModal();
    } else {
      openModal();
    }
  });

  // Escキーが押された際、モーダルが開いていれば閉じる
  window.addEventListener("keydown", (event) => {
    if (event.key === 'Escape' && toggleButton.classList.contains(MODAL_ACTIVE_CLASS)) {
      closeModal();
    }
  });

  // ページ内リンク（アンカー）クリック時に自動で閉じる
  if (anchorLinks.length > 0) {
    anchorLinks.forEach(anchorlink => {
      anchorlink.addEventListener('click', () => closeModal());
    });
  }
};

/**
 * DOMコンテンツの読み込み完了後に初期化を実行
 */
window.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('.js-global-nav-toggle');
  if (target) {
    initializeGlobalNav(target);
  }
});