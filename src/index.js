


document.addEventListener("DOMContentLoaded", (event) => { 

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


  const playlistUl = document.getElementById("playlist")

  const submitHandler = () => {
    document.addEventListener("click", function(e){
        e.preventDefault()
        const songForm = document.querySelector("form")
        const songField = document.getElementById("sequence-field")
    
        const playlistLi = document.createElement("li")

        playlistLi.innerText = songField.value
        
        playlistUl.append(playlistLi)
        
        songForm.reset()
        
        // debugger

        // songToPlay.split("")

        // debugger

    })

  }

submitHandler()

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
  


})