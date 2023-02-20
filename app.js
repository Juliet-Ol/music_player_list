const music = new Audio('fallingdown.mp3');
// music.play();



// create Array

let songs = [
    {
        id:'1',
        songName:`fallingdown
         <div class="subtitle"> Justin</div>`,
        poster:"image/fallingdown.jpg"
        
    },
    {
        id:'2',
        songName:`Just_The_Way_You_Ar
         <div class="subtitle"> Bruno</div>`,
        poster:"image/matt-botsford-OKLqGsCT8qs-unsplash.jpg"
    },
    {
        id:'3',
        songName:`John_Legend_One_Last_Dance
         <div class="subtitle"> John Legend</div>`,
        poster:"image/matt-botsford-OKLqGsCT8qs-unsplash.jpg"
        
    },
    {
        id:'4',
        songName:`SHAKIRA_BZRP_MUSIC_SESSIONS_53_FRENCH_VERSION_
         <div class="subtitle"> Shakira </div>`,
        poster:"image/matt-botsford-OKLqGsCT8qs-unsplash.jpg"
    }

]

Array.from(document.getElementsByClassName('menu_song')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    
    element.getElementsByTagName('h5')[0].innerHTML =songs[i].songName;
    // console.log(arr[0])
})

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click',()=>{
    if (music.paused || music.currentTime <=0){
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
})

const makeAllPlays = () =>{    
    Array.from(document.getElementsByClassName('playlistPlay')).forEach((element)=>{    
        element.classList.add('bi-play-circle-fill');
        element.classList.remove('bi-pause-circle-fill');

    })

}

let index = 0;

Array.from(document.getElementsByClassName('playlistPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.h5 = `${index}.mp3`;
        
        music.play()
    })
})