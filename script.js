(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) i(t);
  new MutationObserver((t) => {
    for (const s of t)
      if (s.type === 'childList')
        for (const r of s.addedNodes)
          r.tagName === 'LINK' && r.rel === 'modulepreload' && i(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(t) {
    const s = {};
    return (
      t.integrity && (s.integrity = t.integrity),
      t.referrerPolicy && (s.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === 'use-credentials'
        ? (s.credentials = 'include')
        : t.crossOrigin === 'anonymous'
        ? (s.credentials = 'omit')
        : (s.credentials = 'same-origin'),
      s
    );
  }
  function i(t) {
    if (t.ep) return;
    t.ep = !0;
    const s = n(t);
    fetch(t.href, s);
  }
})();
document.addEventListener('DOMContentLoaded', () => {
  a(), c(), d();
});
function a() {
  document.body.classList.add('page-loaded');
  const o = document.querySelectorAll(
      '.animate-fade-in, .animate-slide-up, .animate-slide-in'
    ),
    e = new IntersectionObserver(
      (n) => {
        n.forEach((i) => {
          i.isIntersecting &&
            (i.target.classList.add(
              'opacity-100',
              'translate-y-0',
              'translate-x-0'
            ),
            e.unobserve(i.target));
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
  o.forEach((n) => {
    e.observe(n),
      n.classList.contains('animate-fade-in')
        ? n.classList.add('opacity-0', 'transition-opacity', 'duration-700')
        : n.classList.contains('animate-slide-up')
        ? n.classList.add(
            'opacity-0',
            'translate-y-8',
            'transition-all',
            'duration-700'
          )
        : n.classList.contains('animate-slide-in') &&
          n.classList.add(
            'opacity-0',
            'translate-x-4',
            'transition-all',
            'duration-700'
          );
  });
}
function c() {
  const o = document.getElementById('menu-toggle'),
    e = document.getElementById('mobile-menu'),
    n = document.getElementById('close-menu');
  if (!o || !e || !n) return;
  o.addEventListener('click', () => {
    e.classList.remove('hidden'),
      setTimeout(() => {
        e.classList.add('menu-open');
      }, 10),
      (document.body.style.overflow = 'hidden');
  }),
    n.addEventListener('click', t),
    e.querySelectorAll('a').forEach((s) => {
      s.addEventListener('click', t);
    }),
    document.addEventListener('click', (s) => {
      e.classList.contains('menu-open') &&
        !e.contains(s.target) &&
        s.target !== o &&
        !o.contains(s.target) &&
        t();
    });
  function t() {
    e.classList.remove('menu-open'),
      setTimeout(() => {
        e.classList.add('hidden');
      }, 300),
      (document.body.style.overflow = '');
  }
}
function d() {
  const o = document.querySelectorAll('.lazy-image');
  if ('IntersectionObserver' in window) {
    const e = new IntersectionObserver((n) => {
      n.forEach((i) => {
        if (i.isIntersecting) {
          const t = i.target;
          (t.src = t.dataset.src),
            t.addEventListener('load', () => {
              t.classList.add('loaded');
            }),
            e.unobserve(t);
        }
      });
    });
    o.forEach((n) => {
      e.observe(n);
    });
  } else
    o.forEach((e) => {
      (e.src = e.dataset.src), e.classList.add('loaded');
    });
}
window.addEventListener('scroll', () => {
  const o = window.pageYOffset,
    e = document.querySelector('.hero-image');
  e && (e.style.transform = `translateY(${o * 0.1}px)`);
});
