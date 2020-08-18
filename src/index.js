


document.addEventListener("DOMContentLoaded", (event) => { 

    fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(console.log)

    fetch("http://localhost:3000/playlists")
    .then(response => response.json())
    .then(playlists => renderPlaylists(playlists))

    fetch("http://localhost:3000/playlist_sounds")
    .then(response => response.json())
    .then(console.log)

    fetch("http://localhost:3000/sounds")
    .then(response => response.json())
    .then(console.log)


    const keys = document.querySelectorAll(".key"),
    note = document.querySelector(".nowplaying"),
    hints = document.querySelectorAll(".hints");
  
  function playNote(e) {
      
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
      key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  
    if (!key) return;
  
    const keyNote = key.getAttribute("data-note");
  
    key.classList.add("playing");
    note.innerHTML = keyNote;
    audio.currentTime = 0;
    audio.play();

  }


  

  // save to playlist method
  // push saved playlist to array
  // listing the contents of playlist array under piano
  // click each playlistlist item to play playlist

  function playPlaylist(keyArray) {
    keyArray.forEach((key) => {
        setTimeout(() => {
            playNote(key)
        }, 1000);
    })
  }
  
  function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("playing");
  }
  
  function hintsOn(e, index) {
    e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
  }
  
  hints.forEach(hintsOn);
  
  keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
  
  window.addEventListener("keydown", playNote);
  


//cathy's work



const renderPlaylists = (playlists) => {
    renderPlaylist(playlists)
}

const playlistUl = document.getElementById("playlist")

const renderPlaylist = (playlistObj) => {
    playlistObj.forEach(playlist => {
        const playlistLi = document.createElement("li")
        playlistLi.innerText = playlist.name
        playlistUl.append(playlistLi)
    })
    // debugger
}



  const submitHandler = () => {
    document.addEventListener("submit", function(e){
        e.preventDefault()
        const songForm = document.querySelector("form")
        const songField = songForm.querySelector("input")
        const newPlaylistLi = document.createElement("li")
        newSong = songField.value
 
        newPlaylistLi.innerText = songField.value
        
        playlistUl.append(newPlaylistLi)
        
        songForm.reset()
        

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },

            body: JSON.stringify({name: newSong, user_id: 1})
        }

        fetch("http://localhost:3000/playlists", options)
        .then(response => response.json())
        .then(console.log)

    })

  }

submitHandler()










})