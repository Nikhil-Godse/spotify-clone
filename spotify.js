
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById("gif")
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName")
let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));
let timestamp = document.getElementsByClassName("timestamp");



let songs =[
    {songName: "Safari", filePath:"1.mp3", coverPath:"1.jpeg", duration:"03:10"},
    {songName: "Heros Tonight", filePath:"2.mp3", coverPath:"2.jpeg", duration:"03:28"},
    {songName: "Chikato Chika", filePath:"3.mp3", coverPath:"3.jpeg", duration:"02:59"},
    {songName: "Faith", filePath:"4.mp3", coverPath:"4.jpeg", duration:"03:25"},
    {songName: "Rise", filePath:"5.mp3", coverPath:"5.jpeg", duration:"03:30"},
    {songName: "Bilionera", filePath:"6.mp3", coverPath:"6.jpeg", duration:"03:05"},
    {songName: "Play with fire", filePath:"7.mp3", coverPath:"7.jpeg", duration:"02:57"},
    {songName: "On My Way", filePath:"8.mp3", coverPath:"8.jpeg", duration:"03:36"},
    {songName: "Shape of you", filePath:"9.mp3", coverPath:"9.jpeg", duration:"04:23"},
    {songName: "Cheap thirlls", filePath:"10.mp3", coverPath:"10.jpeg", duration:"03:37"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("timestamp")[0].innerText = songs[i].duration;
})

masterPlay.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1;
        songItemPlay[songIndex].classList.add('fa-pause-circle')
        songItemPlay[songIndex].classList.remove('fa-play-circle')
    } 
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle')
        masterPlay.classList.remove('fa-pause-circle')
        gif.style.opacity = 0;
        songItemPlay[songIndex].classList.remove('fa-pause-circle')
        songItemPlay[songIndex].classList.add('fa-play-circle')
    }
})

audioElement.addEventListener("timeupdate",()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value=progress
})

myProgressBar.addEventListener("change",()=>{
audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays =()=>{
    songItemPlay.forEach((element)=>{
        element.classList.add('fa-play-circle')
        element.classList.remove('fa-pause-circle')
    })
}

songItemPlay.forEach((element)=>{
    element.addEventListener("click",(e)=>{
        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex].songName;
        timestamp.innerText = songs[songIndex].duration;
        audioElement.src=`${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        gif.style.opacity = 1;
        masterPlay.classList.add('fa-pause-circle')
        masterPlay.classList.remove('fa-play-circle')
        let count = e.target.classList[2]
        if(count == 'fa-play-circle'){
            makeAllPlays()
            audioElement.play();
            e.target.classList.remove("fa-play-circle")
            e.target.classList.add("fa-pause-circle")
        }
        else{
            audioElement.pause();
            e.target.classList.remove("fa-pause-circle")
            e.target.classList.add("fa-play-circle")
        }
    })
})

document.getElementById("next").addEventListener("click",()=>{
    if(songIndex >= (songs.length-1)){
        songIndex = 0;
        songItemPlay[9].classList.remove('fa-pause-circle')
        songItemPlay[9].classList.add('fa-play-circle')
    }
    else{
        songIndex +=1
        songItemPlay[songIndex-1].classList.remove('fa-pause-circle')
        songItemPlay[songIndex-1].classList.add('fa-play-circle')
    }
    audioElement.src=`${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    timestamp.innerText = songs[songIndex].duration;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.add('fa-pause-circle')
    masterPlay.classList.remove('fa-play-circle')
    songItemPlay[songIndex].classList.add('fa-pause-circle')
    songItemPlay[songIndex].classList.remove('fa-play-circle')
})

document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex<=0){
        songIndex = (songs.length-1);
        songItemPlay[0].classList.remove('fa-pause-circle')
        songItemPlay[0].classList.add('fa-play-circle')
    }
    else{
        songIndex -=1
        songItemPlay[songIndex+1].classList.remove('fa-pause-circle')
        songItemPlay[songIndex+1].classList.add('fa-play-circle')
    }
    audioElement.src=`${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    songItemPlay[songIndex].classList.add('fa-pause-circle')
    songItemPlay[songIndex].classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    masterPlay.classList.remove('fa-play-circle')
})
