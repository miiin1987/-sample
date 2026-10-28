// ==========================================================
// ゆるり | 頭ほぐし専門サロン ランディングページ
// JavaScript
// ==========================================================


// ----------------------------------------------------------
// ヘッダー: スクロール時に影をつける
// ----------------------------------------------------------
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 10);
}, { passive: true });


// ----------------------------------------------------------
// ハンバーガーメニュー
// ----------------------------------------------------------
const hamburger    = document.getElementById('hamburger');
const mobileMenu   = document.getElementById('mobileMenu');
const mobileLinks  = document.querySelectorAll('.mobile-menu__link');

// メニューの開閉を切り替える関数
function toggleMenu(open) {
  hamburger.classList.toggle('is-open', open);
  mobileMenu.classList.toggle('is-open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
  // メニューが開いている間はページのスクロールを禁止
  document.body.style.overflow = open ? 'hidden' : '';
}

// ハンバーガーボタンのクリック
hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.contains('is-open');
  toggleMenu(!isOpen);
});

// メニュー内のリンクをクリックしたら閉じる
mobileLinks.forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

// メニュー外クリックで閉じる
document.addEventListener('click', (e) => {
  if (
    hamburger.classList.contains('is-open') &&
    !hamburger.contains(e.target) &&
    !mobileMenu.contains(e.target)
  ) {
    toggleMenu(false);
  }
});


// ----------------------------------------------------------
// スムーズスクロール（アンカーリンク）
// CSS の scroll-behavior: smooth と組み合わせてヘッダー分オフセット
// ----------------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    // ダミーリンク（href="#"）は何もしない
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const offset = document.getElementById('header').offsetHeight + 8;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});


// ----------------------------------------------------------
// スクロールアニメーション（Intersection Observer）
// .fade-in クラスの要素が画面内に入ったら .is-visible を付与する
// data-delay 属性（ミリ秒）で遅延を指定できる
// ----------------------------------------------------------
const fadeEls = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el    = entry.target;
    const delay = parseInt(el.dataset.delay || '0', 10);

    // 遅延後に is-visible を付与
    setTimeout(() => {
      el.classList.add('is-visible');
    }, delay);

    // 一度表示したら監視を外す（再アニメーションしない）
    fadeObserver.unobserve(el);
  });
}, {
  threshold:  0.12,               // 12% 見えたら発火
  rootMargin: '0px 0px -30px 0px' // 画面下端より少し手前で発火
});

fadeEls.forEach(el => fadeObserver.observe(el));


// ----------------------------------------------------------
// FAQアコーディオン
// ・クリックで開閉
// ・aria-expanded でアクセシブルに管理
// ----------------------------------------------------------
const faqButtons = document.querySelectorAll('.faq-item__q');

faqButtons.forEach(button => {
  button.addEventListener('click', () => {
    const isOpen  = button.getAttribute('aria-expanded') === 'true';
    const answerId = button.getAttribute('aria-controls');
    const answer   = document.getElementById(answerId);

    // いったん全て閉じる
    faqButtons.forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
      const id = btn.getAttribute('aria-controls');
      const a  = document.getElementById(id);
      if (a) a.classList.remove('is-open');
    });

    // 閉じていたものは開く（開いていたものはそのまま閉じる）
    if (!isOpen) {
      button.setAttribute('aria-expanded', 'true');
      if (answer) answer.classList.add('is-open');
    }
  });
});


// ----------------------------------------------------------
// 固定 LINE ボタンの表示制御
// ・ヒーローセクションが見えている間は非表示
// ・スクロールアウトしたら表示
// ----------------------------------------------------------
const fixedLine   = document.getElementById('fixedLine');
const heroSection = document.getElementById('hero');

const lineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // ヒーローが画面に見えているなら非表示、見えていないなら表示
    fixedLine.classList.toggle('is-visible', !entry.isIntersecting);
  });
}, {
  threshold: 0 // 少しでも見えなくなったら発火
});

lineObserver.observe(heroSection);
