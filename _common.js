// カイゼンガイド 共通JS(5言語対応)
// ja(日本語) / en(English) / vi(Tiếng Việt) / id(Bahasa Indonesia) / my(မြန်မာ)
(function() {
  const languages = [
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'id', name: 'Bahasa', flag: '🇮🇩' },
    { code: 'my', name: 'မြန်မာ', flag: '🇲🇲' }
  ];

  // 共通辞書(5言語)
  const i18n = {
    ja: {
      brand: "カイゼンガイド",
      brandSub: "現場改善の入り口",
      copyright: "© 2026 カイゼンガイド",
      backToHome: "もくじに戻る",
      nextChapter: "次の章へ",
      nextChapterSoon: "次の章へ(近日公開)",
      tldrLabel: "ひとこと要約",
      chapters: "CHAPTERS"
    },
    en: {
      brand: "Kaizen Guide",
      brandSub: "Entry to shop floor improvement",
      copyright: "© 2026 Kaizen Guide",
      backToHome: "Back to contents",
      nextChapter: "Next chapter",
      nextChapterSoon: "Next chapter (Coming soon)",
      tldrLabel: "TL;DR",
      chapters: "CHAPTERS"
    },
    vi: {
      brand: "Hướng dẫn Kaizen",
      brandSub: "Cửa vào cải tiến hiện trường",
      copyright: "© 2026 Hướng dẫn Kaizen",
      backToHome: "Quay lại mục lục",
      nextChapter: "Chương tiếp theo",
      nextChapterSoon: "Chương tiếp theo (Sắp ra mắt)",
      tldrLabel: "Tóm tắt",
      chapters: "CÁC CHƯƠNG"
    },
    id: {
      brand: "Panduan Kaizen",
      brandSub: "Pintu masuk perbaikan lapangan",
      copyright: "© 2026 Panduan Kaizen",
      backToHome: "Kembali ke daftar isi",
      nextChapter: "Bab berikutnya",
      nextChapterSoon: "Bab berikutnya (Akan datang)",
      tldrLabel: "Ringkasan",
      chapters: "BAB-BAB"
    },
    my: {
      brand: "Kaizen လမ်းညွှန်",
      brandSub: "လုပ်ငန်းခွင် တိုးတက်မှု အစ",
      copyright: "© 2026 Kaizen လမ်းညွှန်",
      backToHome: "မာတိကာသို့ ပြန်သွားရန်",
      nextChapter: "နောက်အခန်း",
      nextChapterSoon: "နောက်အခန်း (မကြာမီ)",
      tldrLabel: "အကျဉ်းချုပ်",
      chapters: "အခန်းများ"
    }
  };

  window.kaizenI18n = i18n;
  window.kaizenLanguages = languages;
  window.kaizenCurrentLang = 'ja';

  window.kaizenApplyLang = function(lang) {
    if (!i18n[lang]) return;
    window.kaizenCurrentLang = lang;
    document.documentElement.lang = lang;

    // ドロップダウンボタンの表示を更新
    const btn = document.querySelector('.lang-current');
    if (btn) {
      const current = languages.find(l => l.code === lang);
      if (current) {
        btn.innerHTML = current.flag + ' ' + current.name;
      }
    }

    // 各option もハイライト
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    // i18n適用
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (i18n[lang] && i18n[lang][key]) {
        el.innerHTML = i18n[lang][key];
      }
    });

    try { localStorage.setItem('kaizen-lang', lang); } catch (e) {}

    // メニュー閉じる
    const menu = document.querySelector('.lang-menu');
    if (menu) menu.classList.remove('open');
  };

  window.kaizenInitLang = function() {
    // ドロップダウンUI を header に注入
    const switchContainer = document.querySelector('.lang-switch');
    if (switchContainer) {
      switchContainer.innerHTML = `
        <button class="lang-current" onclick="kaizenToggleMenu(event)">🇯🇵 日本語 ▾</button>
        <div class="lang-menu">
          ${languages.map(l => `
            <button class="lang-option" data-lang="${l.code}" onclick="kaizenApplyLang('${l.code}')">
              ${l.flag} ${l.name}
            </button>
          `).join('')}
        </div>
      `;
    }

    let lang = 'ja';
    try {
      const saved = localStorage.getItem('kaizen-lang');
      if (saved && i18n[saved]) lang = saved;
    } catch (e) {}
    window.kaizenApplyLang(lang);
  };

  window.kaizenToggleMenu = function(ev) {
    ev.stopPropagation();
    const menu = document.querySelector('.lang-menu');
    if (menu) menu.classList.toggle('open');
  };

  // クリックアウトで閉じる
  document.addEventListener('click', function(ev) {
    const menu = document.querySelector('.lang-menu');
    if (menu && menu.classList.contains('open')) {
      if (!ev.target.closest('.lang-switch')) {
        menu.classList.remove('open');
      }
    }
  });
})();
