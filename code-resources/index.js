let t0 = performance.now();
const surahGallery = document.getElementById('surahGalleryId');
const surahLoader = document.getElementById('surahLoaderSectionId');
let theEntireQuranWithArabicTextAndAudio ;
let theEntireQuranWithEnglishTranslation ;
let theEntireQuranWithAudio ;
async function callFromApi (passedUrl) {
    const response = await fetch(passedUrl);
    const jsonResponse = await response.json();
    return jsonResponse.data.surahs;
}
async function dataIsLoaded () {
    console.log(theEntireQuranWithArabicTextAndAudio);
    console.log(theEntireQuranWithEnglishTranslation);
    let t1 = performance.now();
    console.log((t1-t0)/1000 + 'sec');
}
function loadInitialContent () {
    surahGallery.innerHTML='';
    theEntireQuranWithArabicTextAndAudio.forEach(surahContent => {
        let individualSurahDiv = document.createElement('div');
        individualSurahDiv.innerHTML = `
            <strong>${surahContent.number}</strong>
            <small>Surah</small>
            <h4 class='nameOfTheSurah d-flex justify-content-between'>
                <span>${surahContent.englishName}</span>
                <span class='arabicNameOfTheSurah'>${surahContent.name}</span>    
            </h4>
            <h6>${surahContent.englishNameTranslation}</h6>
            <h6>${surahContent.revelationType}</h6>
        `;
        surahGallery.appendChild(individualSurahDiv);
        individualSurahDiv.addEventListener('click', () => {
            surahGallery.style.display='none';
            surahLoader.innerHTML='';
            let surahToShowAyahsDiv = document.createElement('div');
            let surahToShowHederDiv = document.createElement('div');
            surahToShowHederDiv.innerHTML=`
                <h3>${surahContent.name}</h3>
                <h4>${surahContent.englishName}</h4>
            `;
            surahToShowHederDiv.style.textAlign='center';
            surahToShowHederDiv.style.marginBottom='4rem';
            surahLoader.appendChild(surahToShowHederDiv);
            surahContent.ayahs.forEach(ayah => {
                let currentAyahDiv = document.createElement('div');
                currentAyahDiv.innerHTML=`
                    <h3>${ayah.text}</h3>
                `;
                currentAyahDiv.style.textAlign='right';
                currentAyahDiv.style.margin='2rem 0';
                surahToShowAyahsDiv.appendChild(currentAyahDiv);
            });
            surahLoader.appendChild(surahToShowAyahsDiv);
            surahLoader.style.padding='5rem'
            surahLoader.style.display='block';
        })
    });
}
async function loadAllSurahs () {
    theEntireQuranWithArabicTextAndAudio = await callFromApi('HTTPS://api.alquran.cloud/v1/quran/ar.alafasy');
    loadInitialContent();
    theEntireQuranWithEnglishTranslation = await callFromApi('HTTPS://api.alquran.cloud/v1/quran/en.asad');
    dataIsLoaded();
}
loadAllSurahs();