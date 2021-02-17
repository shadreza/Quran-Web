let t0 = performance.now();
const surahGallery = document.getElementById('surahGalleryId');
const surahLoader = document.getElementById('surahLoaderSectionId');
const surahShowingSection = document.getElementById('chapterNameSectionId');
const loadingSpinner = document.getElementById('loadingSpinnerId');
let theEntireQuranWithArabicTextAndAudio ;
let theEntireQuranWithEnglishTranslation ;
let theEntireQuranWithAudio ;
surahShowingSection.style.display='none';
loadingSpinner.style.display='block';
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
    for (let i = 0; i < theEntireQuranWithArabicTextAndAudio.length; i++) {
        let surahContent = theEntireQuranWithArabicTextAndAudio[i];
        let surahTranslatedContent = theEntireQuranWithEnglishTranslation[i];
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
                <h4><small>surah   </small>${surahContent.englishName}</h4>
            `;
            surahToShowHederDiv.style.textAlign='center';
            surahToShowHederDiv.style.marginBottom='4rem';
            surahLoader.appendChild(surahToShowHederDiv);
            for (let i = 0; i < surahContent.ayahs.length; i++) {
                const ayah = surahContent.ayahs[i];
                const ayahTranslation = surahTranslatedContent.ayahs[i];
                let currentAyahDiv = document.createElement('div');
                currentAyahDiv.innerHTML=`
                    <hr>
                    <h2>${ayah.text}</h2>
                    <br>
                    <h6>${ayahTranslation.text}</h6>
                    <br>
                    <br>
                    <audio controls>
                        <source src="${ayah.audio}">
                    </audio>
                    <hr>
                `;
                currentAyahDiv.style.textAlign='right';
                currentAyahDiv.style.margin='3rem 0';
                surahToShowAyahsDiv.appendChild(currentAyahDiv);
            }
            surahLoader.style.padding='5rem'
            surahLoader.style.display='block';
            surahLoader.appendChild(surahToShowAyahsDiv);
        })
    }
}
async function loadAllSurahs () {
    if(localStorage.getItem('quranWithArabicTextAndAudio')==null || localStorage.getItem('quranWithEnglishTranslation')==null){
        theEntireQuranWithArabicTextAndAudio = await callFromApi('HTTPS://api.alquran.cloud/v1/quran/ar.alafasy');
        theEntireQuranWithEnglishTranslation = await callFromApi('HTTPS://api.alquran.cloud/v1/quran/en.asad');
        localStorage.setItem('quranWithArabicTextAndAudio',JSON.stringify(theEntireQuranWithArabicTextAndAudio));
        localStorage.setItem('quranWithEnglishTranslation',JSON.stringify(theEntireQuranWithEnglishTranslation));
    }
    else{
        theEntireQuranWithArabicTextAndAudio = JSON.parse(localStorage.getItem('quranWithArabicTextAndAudio'));
        theEntireQuranWithEnglishTranslation = JSON.parse(localStorage.getItem('quranWithEnglishTranslation'));
    }
    surahShowingSection.style.display='block';
    loadingSpinner.style.display='none';
    loadInitialContent();
    dataIsLoaded();
}
loadAllSurahs();