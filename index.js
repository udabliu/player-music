//peguei todos os dados do html e coloquei em variaves const 
const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

// armazenei o metodo audio() dentro da variavel music,para poder utilizar suas funções
const music = new Audio();

// criei a minha biblioteca com as músicas (criei uma lista dentro de um array,pois assim tenho o index de cada musica)
const songs = [
    {
        path: 'assets/aqua.mp3',
        displayName: 'Aqua Regia',
        cover: 'assets/aqua-regia-pic.jpg',
        artist: 'Sleep Token',
    },
    {
        path: 'assets/chokehold.mp3',
        displayName: 'Chokehold',
        cover: 'assets/chokehold-pic.jpg',
        artist: 'Sleep Token',
    },
    {
        path: 'assets/heart.mp3',
        displayName: 'Heart Of Darkness',
        cover: 'assets/heart-of-darkness-pic.jpg',
        artist: 'Grim Salvo',
    }
    
];

// criei uma função para carregar a música a ser tocada
// recebe como parametro indexSong,que é o index das musicas 
function loadMusic(indexSong) {

//pega o index da musica(q está numa array,passado pelo parametro indexSong) e seleciona qual propriedade "vai querer"
//neste caso quero o caminho/endereço da música entao uso o indexSong.path(que seria index e endereço respectivamente)
    music.src = indexSong.path;

//aqui peguei o titulo da música la do HTML(title) e vou alterar o seu conteúdo para o que está  contido no song.displayName(que seria o index e o nome da música respectivamente) através do textcontent    
    title.textContent = indexSong.displayName;
    artist.textContent = indexSong.artist;
    image.src = indexSong.cover;
    background.src = indexSong.cover;
}

//criei uma variável para colocar um index(coloquei 0 para começar no primeiro elemento do array ou seja a primeira musica)
//poderia colocar 2 se quisesse começar no terceiro elemento(ou seja terceira musica)
let musicIndex = 0;

// criei uma variavel booleana para saber se a musica esta sendo tocada ou nao, true = sendo tocada, false = nao, usarei mais a frente
let isPlaying = false;

// CHAMEI a função de carregar as músicas (loadMusic) e passei de qual array(no caso aqui é o songs) vou querer pegar os dados
// no lugar de musicIndex poderia colocar direto um valor sem precisar de uma variavel,mas como precisarei mais a frente para a função de trocar de música,precisarei manter o valor dentro de uma variavel
loadMusic(songs[musicIndex]);


//função para dar play na musica
function playMusic() {

//setei o isplaying pra true pois quero que a musica toque
    isPlaying = true;

// muda o icone do botao de play usando o classlist.replace
    playBtn.classList.replace('fa-play', 'fa-pause');

// muda o titulo do hover através do setAttribute
    playBtn.setAttribute('title', 'Pause');

//DA PLAY NA MÚSICA através do .play (metodo q contem dentro do audio() exatamente para dar play)
    music.play();
}


// mesma coisa que a função de dar play mas agora o isplaying é false e o music é .pause()
function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//criei uma função para dar play ou pausar a musica(togglePlay)
// se a minha variavel isPlaying estiver ativa eu vou chamar uma outra função(neste caso o isPlaying = false entao chamo a função para pausar a música)
// se essa condição nao for atendida,chamo uma função para dar play na musica (playmusic())
function togglePlay() {
    
    if (isPlaying) {
        pauseMusic();
    } 

    else {
        playMusic();
    }
}

//associei um evento (addeventlistener) ao playbtn que vai chamar a função toggleplay quando eu clicar no botao(i class la do html)
playBtn.addEventListener('click', togglePlay);



//--------------------------até aqui ja da pra dar play e pausar a musica normalmente,so não da pra trocar de musica nem mostrar as minutagens
//criei uma função 



function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}



music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

