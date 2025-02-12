async function changeLanguage(lang) {
    localStorage.setItem('language', lang); 
    const langData = await fetchLanguageData(lang);
    updateContent(langData);
    
}

async function fetchLanguageData(lang) {
    const response = await fetch(`${lang}.json`);
    return response.json();
}

function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        // Check if the element has a nested span
        if (element.querySelector('span')) {
            const span = element.querySelector('span');
            const spanKey = span.getAttribute('data-i18n');
            const spanTranslation = langData[spanKey];
            const mainTranslation = langData[key];

            // Replace the placeholder in the main translation with the span's translation
            const fullTranslation = mainTranslation.replace(`{${spanKey}}`, `<span data-i18n="${spanKey}">${spanTranslation}</span>`);
            element.innerHTML = fullTranslation; 
        } else {
            element.innerHTML = langData[key]; 
        }
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const savedLang = localStorage.getItem("language") || "es"; 
    changeLanguage(savedLang); 
});
