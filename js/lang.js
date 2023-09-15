window.addEventListener('DOMContentLoaded', (event) => {
  const dropdown = document.querySelector('.dropdown-content');
  const currentLangDesktop = document.querySelector('#selected-lang');
  const currentLangMobile = document.querySelector('#selected-lang-mobile');
  let translations;

  // Загрузка JSON файла
  fetch('lang/lang.json')
    .then(response => response.json())
    .then(data => {
      translations = data;
      // Если есть язык в sessionStorage, то используем его, иначе русский
      const savedLang = sessionStorage.getItem('selectedLang') || 'RU';
      updateTranslations(savedLang);
      if (typeof setLanguage === 'function') {
        setLanguage(savedLang);
      }
      currentLangDesktop.textContent = savedLang;
      currentLangMobile.textContent = savedLang;
    });

  // Добавляем обработчик события на все ссылки с атрибутом data-lang
  const langLinks = document.querySelectorAll('[data-lang]');
  langLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      const lang = event.target.getAttribute('data-lang');
      if (lang) {
        currentLangDesktop.textContent = lang;
        currentLangMobile.textContent = lang;
        updateTranslations(lang);
        if (typeof setLanguage === 'function') {
          setLanguage(lang);
        }
        // Сохраняем выбранный язык в sessionStorage
        sessionStorage.setItem('selectedLang', lang);
      }
    });
  });

  // Функция для обновления контента на странице
  function updateTranslations(lang) {
    if (translations) {
      for (const key in translations[lang]) {
        const elements = document.querySelectorAll(`[data-key="${key}"]`);
        elements.forEach(element => {
          element.innerHTML = translations[lang][key];
        });
      }

      const links = document.querySelectorAll('a[data-href]');
      links.forEach(link => {
        const linkKey = link.getAttribute('data-href');
        if (translations[lang][linkKey]) {
          link.href = translations[lang][linkKey];
        }
      });
    }
  }
});
