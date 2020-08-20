document.addEventListener("DOMContentLoaded", (event) => { 

const playlistUrl = "http://localhost:3000/playlists/"
let sequence = []

    fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(console.log)

    const getPlaylists = () => {
    fetch(playlistUrl)
    .then(response => response.json())
    .then(playlists => renderPlaylists(playlists))
    }

    fetch("http://localhost:3000/playlist_sounds")
    .then(response => response.json())
    .then(console.log)

    fetch("http://localhost:3000/sounds")
    .then(response => response.json())
    .then(console.log)

    
    sequence = document.getElementById('sequence-input').value
    console.log(sequence)

    const keys = document.querySelectorAll(".key"),
    note = document.querySelector(".nowplaying"),
    hints = document.querySelectorAll(".hints");
  
  function playNote(e) {
    //   keyCodesArray.push(e.keyCode);
    console.log(e)
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
      key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    //   debugger
    console.log(audio)
    console.log(key)
    if (!key) return;
  
    const keyNote = key.getAttribute("data-note");
    // debugger
    key.classList.add("playing");
    note.innerHTML = keyNote;
    audio.currentTime = 0;
    console.log("audio", audio)
    audio.play();

  }

  

  // save to playlist method
  // push saved playlist to array
  // listing the contents of playlist array under piano
  // click each playlistlist item to play playlist

//   function playPlaylist(keyArray) {
//     keyArray.forEach((key) => {
//         setTimeout(() => {
//             playNote(key)
//         }, 1000);
//     })
//   }
  
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
        playlistLi.dataset.id = playlist.id
        playlistLi.innerHTML = `
            <div>
            <span>${playlist.name}</span> <br>
            <button id="play-button" data-name="${playlist.name}">Play</button><br>
            <button id="edit-playlist">Edit</button> <br>
            <button id="delete-playlist">Delete</button>
            </div>
            `
        playlistUl.append(playlistLi)
    })
}

// playlistContainer.addEventListener('click', (event) => {
//     if(event.target.id === "play-button"){
//         sortPlaylist(playlistContainer.children[1].value)
//     }
// })

// const sortPlaylist = (sequenceValue) => {
//     let letterArray = []
//     sequenceValue.split("").forEach(letter => letterArray.push(letter));

//     for (let i=0; i<=letterArray.length; i++) { 
//         task(i); 
//     }
//     function task(i) { 
//         setTimeout(function() {
//             playPlaylist(letterArray[i]) 
//         }, 1000 * i); 
//     } 
//     // playPlaylist(letter)
// }
//   const playPlaylist = (key) => {
//     letterArr.forEach((letter) => {
//         setTimeout(()=> {
//             const playSound = document.getElementById(`Key${letter.toUpperCase()}`) // add to uppercase to prevent bugs
//             playSound.play()    
//         }, 1000)
//     })
    
// }


const clickHandler = () => {
document.addEventListener("click", function(e){
    const songForm = document.querySelector("form")
    const buttonText = songForm.querySelector("#save")
    const songField = songForm.querySelector("input")
    const playButton = document.getElementById('play-button')
    
    // create global keyCodesArray
    // when playNote() fires push e.keyCode into keyCodesArray
    if(e.target.matches('#play-button')){
        // e.target.dataset.name "fgh"
        let keyArray = e.target.dataset.name.split("") //["f", "g", "h"]
        
        keyArray.forEach((key, index) => {
            // loop throgh each character in the dataset
            let note = {
                keyCode: key.toUpperCase().charCodeAt(0)
            }
            setTimeout(() => {
                playNote(note)
                // 0 * 500
                // 1 * 500...
            }, index * 500)
        })
        // 
        debugger
        return
    }
    
    if(e.target.matches("#edit-playlist")){
        // debugger
        const editButton = e.target
        const editButtonLi = editButton.parentElement.parentElement
        const currentId = parseInt(editButtonLi.dataset.id)
        // debugger
        const songSpan = editButtonLi.querySelector("span")
        buttonText.dataset.id = currentId
        // debugger

        buttonText.innerText = "Submit Edit"
        
        songField.value = songSpan.innerText
        newSong = songField.value
 
    }else if(e.target.innerText === "Submit Edit"){
        
        const submitEditButton = e.target //edit button triggers patch
        const form = submitEditButton.parentElement  //captures associated form
        const songField = form.querySelector("input")  //captures input field
        newSong = songField.value //captures new song name
        currentId = buttonText.dataset.id
        // debugger
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({name: newSong})
        }
        
        fetch(playlistUrl + currentId, options)
        .then(response => response.json())
        .then(revisedPlaylistObj => {revisedPlaylistName = revisedPlaylistObj.name
        const newLi = document.createElement("li")
        newLi.innerText = revisedPlaylistName
        playListUl.append(newLi) })

    } else if(e.target.matches("#delete-playlist")){
        const deleteButton = e.target
        const liToDelete = deleteButton.parentElement.parentElement
        liToDelete.remove()
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }

        fetch(playlistUrl + liToDelete.dataset.id, options)
        .then(response => response.json())

    } else if(e.target.textContent === "Save to playlist"){
    e.preventDefault()
    const songForm = document.querySelector("form")
    const songField = songForm.querySelector("input")
    const newPlaylistLi = document.createElement("li")
    newSong = songField.value

    newPlaylistLi.innerText = songField.value
    
    playlistUl.append(newPlaylistLi)
    
    songForm.reset()
    
    // debugger;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },

        body: JSON.stringify({name: newSong, user_id: 1, key_code: sequence})
    }
    

    fetch(playlistUrl, options)
    .then(response => response.json())
    .then(newSong => {
        newPlaylistLi.dataset.id = newSong.id
        newPlaylistLi.innerHTML = `
        <div>
        <span>${newSong.name}</span> <br>
         <button id="play-button" data-name="${newSong.name}">Play</button><br>
        <button id="edit-playlist">Edit</button><br> 
        <button id="delete-playlist">Delete</button><br>
        </div>
        `
        
    })
}

    playButton.addEventListener('click', (e) => {
        // I want to grab the new sound sequence that was
        
        debugger

        // grabNewSoundSequence()

        // // added, iterate through each key
        // iterateThroughEachKey()

        // // play the sound
        // playNote()

    })

})
}

getPlaylists()
// submitHandler()
clickHandler()


})