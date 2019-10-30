const { ipcRenderer } = require("electron")
const { $ } = require("./helper")

let musicAudio = new Audio()
let allTracks
let currentTrack


$("add-music-button").addEventListener("click", () => {
    ipcRenderer.send('add-music-window', 'hello')
})

const renderListHTML = (tracks) => {
    const tracksList = $('tracksList')
    const trackListHTML = tracks.reduce((html, track) => {
        html += `<li class="row music-track list-group-item d-flex justify-content-between align-items-center"> 
            <div class="col-10">
                <i class="fas fa-music mr-2"></i>
                <b>${track.filename}</b>
            </div>
            <div class="col-2">
                <i class="fas fa-play mr-2" data-id="${track.id}"></i>
                <i class="fas fa-trash-alt" data-id="${track.id}"></i>
            </div>
        </li>`
        return html
    }, '')
    const emptyTrackHTMl = `<div class="alert alert-primary">还没有添加任何音乐</div>`
    tracksList.innerHTML = tracks.length ? `<ul class="list-group">${trackListHTML}</ul>` : emptyTrackHTMl
}

ipcRenderer.on('get-tracks', (event, tracks) => {
    console.log('index-getTracks', tracks);
    allTracks = tracks
    renderListHTML(tracks)
})

$('tracksList').addEventListener('click', function(event) {
    event.preventDefault()
    const { dataset, classList } = event.target
    const id = dataset && dataset.id

    if(id && classList.contains('fa-play')){
        if(currentTrack && currentTrack.id === id) {
            musicAudio.play()
        } else {
            currentTrack = allTracks.find(track => track.id === id)
            musicAudio.src = currentTrack.path
            musicAudio.play()
            const resetIconEle = document.querySelector(".fa-pause")
            if(resetIconEle){
                resetIconEle.classList.replace('fa-pause', 'fa-play')
            }
        }

        classList.replace('fa-play', 'fa-pause')
        
    } else if(id && classList.contains('fa-pause')) {
        musicAudio.pause()
        classList.replace('fa-pause', 'fa-play')
    }else if(id && classList.contains('fa-trash-alt')) {
        ipcRenderer.send('delete-track', id)
    }
})