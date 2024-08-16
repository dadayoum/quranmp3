const apiUrl = 'https://mp3quran.net/api/v3/';
const reciters = 'reciters'


async function getReciters (){

    
     const res = await fetch(`${apiUrl}${reciters}`)

    const data = await res.json();

    //console.log(data.reciters)
    chooseReciter.innerHTML =`<option value="">إختر قارىء</option>`  
data.reciters.forEach(reciter => {
    const chooseReciter = document.querySelector("#chooseReciter");
  
    chooseReciter.innerHTML +=`<option value="${reciter.id}">${reciter.name}</option>`

chooseReciter.addEventListener('change',(e) =>{
    getMoshaf(e.target.value)
})
    
    });


}

async function getMoshaf(reciter) {
    const res = await fetch(`${apiUrl}${reciters}?language=ar&reciter=${reciter}`);
    const data = await res.json()
    const moshafs = data.reciters[0].moshaf
    //console.log(moshafs)
     chooseMoshaf.innerHTML =`<option value="">إختر رواية</option>`
    moshafs.forEach(moshaf =>{
        const chooseMoshaf = document.querySelector('#chooseMoshaf')

       
        chooseMoshaf.innerHTML +=`<option value="${moshaf.id}" data-server="${moshaf.server}" data-surahliste="${moshaf.surah_list}">${moshaf.name}</option>`
        chooseMoshaf.addEventListener('change', (e) =>{
            const selectMoshaf = chooseMoshaf.options[chooseMoshaf.selectedIndex]
            //console.log(selectMoshaf)
            const surahServer = selectMoshaf.dataset.server
            const surahListe =  selectMoshaf.dataset.surahliste
           console.log(surahServer)

            getSurah(surahServer,surahListe);

        })

    })
    
}
async function getSurah(surahServer,surahListe) {
    const chooseSurah = document.querySelector('#chooseSourah')
    const res = await  fetch(`https://mp3quran.net/api/v3/suwar`);
    const data = await res.json()

    surahListe = surahListe.split(',')

   // console.log(surahListe)

    surahNames = data.suwar
    //console.log(surahNames.name)
     chooseSurah.innerHTML =`<option value="">إخترسورة</option>`
    surahListe.forEach(surah =>{
        const surahPad = surah.padStart(3,"0")
        surahNames.forEach(surahName =>{
          
            if(surahName.id == surah){
                chooseSurah.innerHTML +=`<option value="${surahServer}${surahPad}.mp3">${surahName.name}</option> `


            }
        })
    })
    chooseSurah.addEventListener('change',(e) =>{
        const selectSourah = chooseSurah.options[chooseSurah.selectedIndex]
        getPlay(selectSourah.value)
    })





    
}

function getPlay(surahPlayerMp3){
const audioPlayer = document.querySelector(".audioplayer")
audioPlayer.src=surahPlayerMp3;
surahPlayerMp3.play
}
 function playLive(channel){

    if(Hls.isSupported()) {
        var video = document.getElementById('videoPlayer');
        var hls = new Hls();
        hls.loadSource(`${channel}`);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
          video.play();
      });
     }
     // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
     // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
     // This is using the built-in support of the plain video element, without using hls.js.
      
 }




getReciters();

