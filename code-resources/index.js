let couldDataBeFetched = false;
let theEntireQuranInAnArray = new Array();
const AyahOfSurahArabicClass = class{
    hizbQuarterOfTheAyah = 0;
    juzOfTheAyah = 0;
    manzilOfTheAyah = 0;
    numberOfTheAyahInTheEntireQuran = 0;
    numberOfTheAyahInTheSurah = 0;
    pageWhereTheAyahIsLocated = 0;
    rukuWhereTheAyahIsLocated = 0;
    sajdaNeededForTheAyah = false;
    arabicVerse = '-';
    englishTranslationOfTheVerse = '-';
    audioRecitationOfTheVerse ='-';
    constructor(hizbQuarter=0 , juz=0 , manzil=0 , positionOfTheAyahInTheQuran=0 , positionOfTheAyahInTheSurah=0 , pageNumber=0 , rukuNumber=0 , sajda=0 , engTranslatedVerse='-'){
        this.hizbQuarterOfTheAyah = hizbQuarter;
        this.juzOfTheAyah = juz;
        this.manzilOfTheAyah = manzil;
        this.numberOfTheAyahInTheEntireQuran = positionOfTheAyahInTheQuran;
        this.numberOfTheAyahInTheSurah = positionOfTheAyahInTheSurah;
        this.pageWhereTheAyahIsLocated = pageNumber;
        this.rukuWhereTheAyahIsLocated = rukuNumber;
        this.sajdaNeededForTheAyah = sajda;
        this.englishTranslationOfTheVerse = engTranslatedVerse;
        // this.arabicVerse = fetchFromAlQuranDotApi(`http://api.alquran.cloud/v1/ayah/${positionOfTheAyahInTheQuran}`,2);
        // this.audioRecitationOfTheVerse = fetchFromAlQuranDotApi(`http://api.alquran.cloud/v1/ayah/${positionOfTheAyahInTheQuran}/ar.alafasy`,3);
    }
}
const SurahClass = class {
    nameOfTheSurahInArabic = '-';
    nameOfTheSurahInEnglish = '-';
    englishNameTranslationOfTheSurah = '-';
    placeOfRevelation = '-';
    positionOfTheSurahInTheQuran = 0;
    numberOfAyahsOfTheSurah = 0;
    ayahsArrayOfTheSurah = new Array();
    constructor(nameInArabic='-' , nameInEnglish='-' , englishNameTranslation='-' , placeWhereRevealed='-' ,  positionInTheQuran=0 , numberOfAyahs=0 , ayahsOfTheSurah){
        this.nameOfTheSurahInArabic = nameInArabic;
        this.nameOfTheSurahInEnglish = nameInEnglish;
        this.englishNameTranslationOfTheSurah = englishNameTranslation;
        this.placeOfRevelation=placeWhereRevealed;
        this.positionOfTheSurahInTheQuran = positionInTheQuran;
        this.numberOfAyahsOfTheSurah = numberOfAyahs;
        ayahsOfTheSurah.forEach(ayah => {
            const currentAyah = new AyahOfSurahArabicClass(ayah.hizbQuarter , ayah.juz , ayah.manzil , ayah.number , ayah.numberInSurah , ayah.page , ayah.ruku , ayah.sajda , ayah.text);
            this.ayahsArrayOfTheSurah.push(currentAyah);
        });
    }
}
const fetchFromAlQuranDotApi = (passedFetchingUrl='' , decisionMaker=0) => {
    couldDataBeFetched = false;
    try{
        const request = new XMLHttpRequest();
        request.open('GET', passedFetchingUrl, false);  // `false` makes the request synchronous
        request.send(null);
        if (request.status === 200) {
            const jsonInformation = JSON.parse(request.response);
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
        else{
            couldDataBeFetched = false;
        }
    }
    catch(error){
        const isOnlineOrOffline = window.navigator.onLine;
        if(isOnlineOrOffline===false){
            alert('Check Your Internet Connection')
        }
        else if(couldDataBeFetched===false){
            alert('Al Quran Server is Down Now!');
        }
        else{
            alert('Something Went Wrong!');
        }
        couldDataBeFetched=false;
        console.log(error);
        return;
    }
}
fetchFromAlQuranDotApi('http://api.alquran.cloud/v1/quran/en.asad',1);
console.log(theEntireQuranInAnArray);