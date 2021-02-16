let couldDataBeFetched = false;
let theEntireQuranInAnArray = new Array();

async function getJsonDataFromApiByFetching (passedFetchingUrl) {
    try{
        return (await fetch(passedFetchingUrl)).json();
    }
    catch (error) {
        const isOnlineOrOffline = window.navigator.onLine;
        if(isOnlineOrOffline===false){
            alert('Check Your Internet Connection');
        }
        else if(couldDataBeFetched===false){
            alert('Al Quran Server is Down Now!');
        }
        else{
            alert('Something Went Wrong!');
        }
        couldDataBeFetched=false;
        console.log(error);
    }
}

async function fetchFromAlQuranDotApi (passedFetchingUrl='' , decisionMaker=0) {
    couldDataBeFetched = false;
    const jsonInformation = await getJsonDataFromApiByFetching(passedFetchingUrl);
    if(decisionMaker === 1){
        const entireInformationOfTheQuran = jsonInformation.data.surahs;
        entireInformationOfTheQuran.forEach(surah => {
            const currentSurah = new SurahClass(surah.name , surah.englishName , surah.englishNameTranslation , surah.revelationType , surah.number , surah.ayahs.length , surah.ayahs);
            theEntireQuranInAnArray.push(currentSurah);
        });
    }
    else if(decisionMaker === 2){
        console.log(jsonInformation);
    }
    else if(decisionMaker === 3){
        console.log(jsonInformation);
    }
    couldDataBeFetched = true;
}

document.addEventListener('DOMContentLoaded' , fetchFromAlQuranDotApi('http://api.alquran.cloud/v1/quran/en.asad',1));
console.log(theEntireQuranInAnArray);
// setInterval(console.log(theEntireQuranInAnArray),20000);
// const addSurahsToSurahGallery = () => {
//     const surahGallery = document.getElementById('surahGalleryId');

// }
