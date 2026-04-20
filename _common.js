// カイゼンガイド 共通JS
// 言語切替の永続化のみ。ページ遷移は通常のリンクで。
(function() {
  // Language dictionaries (shared)
  const i18n = {
    ja: {
      brand: "カイゼンガイド",
      brandSub: "現場改善の入り口",
      copyright: "© 2026 カイゼンガイド",
      backToHome: "もくじに戻る",
      nextChapter: "次の章へ",
      nextChapterSoon: "次の章へ(近日公開)"
    },
    en: {
      brand: "Kaizen Guide",
      brandSub: "Entry to shop floor improvement",
      copyright: "© 2026 Kaizen Guide",
      backToHome: "Back to contents",
      nextChapter: "Next chapter",
      nextChapterSoon: "Next chapter (Coming soon)"
    }
  };

  // Expose globally so each page can extend with page-specific strings
  window.kaizenI18n = i18n;
  window.kaizenCurrentLang = 'ja';

  window.kaizenApplyLang = function(lang) {
    window.kaizenCurrentLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      // look up from merged dict (page may have added entries)
      if (window.kaizenI18n[lang] && window.kaizenI18n[lang][key]) {
        el.innerHTML = window.kaizenI18n[lang][key];
      }
    });
    try { localStorage.setItem('kaizen-lang', lang); } catch (e) {}
  };

  window.kaizenInitLang = function() {
    let lang = 'ja';
    try {
      const saved = localStorage.getItem('kaizen-lang');
      if (saved === 'en' || saved === 'ja') lang = saved;
    } catch (e) {}
    window.kaizenApplyLang(lang);
  };
})();
