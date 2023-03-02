const music = new Audio ('fallingdown.mp3');
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
    },
    {

        id:'5',
        songName:`Shape_of_You_Ed_Sheeran_traduction_française_
        <div class="subtitle"> Ed_Sheeran </div>`,
        poster:"image/fallingdown.jpg"
    },
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

const makeAllBackgrounds = () =>{    
    Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{    
        element.style.background = "rgb(105, 105, 170. 0)";
        

    })

}


let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playlistPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `/music/${index}.mp3`;
        poster_master_play.src = `image/${index}.jpg`;
        music.play();
        let song_part = songs.filter((ele)=>{
            return ele.id == index;
        })
        song_part.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('ended', ()=> {
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');

        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[$(index-1)].style.background = "rgb(105, 105, 170. 0)";
    })
})

let currentStart = document.getElementById('currentStart')
let currentEnd = document.getElementById('currentEnd')
let seek = document.getElementById('seek')
let bar2 = document.getElementById('bar2')
let dot = document.getElementsByClassName('dot')[0];



music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur =  music.duration;

    let min = Math.floor(music_dur/60)
    let sec = Math.floor(music_dur%60)
    if (sec<10) {
        sec = `0${sec}`
    }

    currentEnd.innerText = `${min}:${sec}`
    let min1 = Math.floor(music_curr/60)
    let sec1 = Math.floor(music_curr%60)
    if (sec<10) {
        sec1 = `0${sec1}`
    }

    currentStart.innerText = `${min1}:${sec1}`

    let progressbar = parseInt((music.currentTime/music.duration)*100)
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended', ()=>{
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})

let vol_icon = document.getElementById('vol_icon')
let vol = document.getElementById('vol')
let vol_dot = document.getElementById('vol_dot')
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill')
        vol_icon.classList.add('bi-volume-mute-fill')
        vol_icon.classList.remove('bi-volume-up-fill')
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill')
        vol_icon.classList.remove('bi-volume-mute-fill')
        vol_icon.classList.remove('bi-volume-up-fill')
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill')
        vol_icon.classList.remove('bi-volume-mute-fill')
        vol_icon.classList.add('bi-volume-up-fill')
    }
    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100

})