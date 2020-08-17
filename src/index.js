document.addEventListener("DOMContentLoaded", (event) => { 

const piano = document.getElementById('piano')
// console.log(piano)


piano.addEventListener('click', (e) => {
    const eventTarget = e.target.innerText
    const playKeyA = document.getElementById(`A${eventTarget}`)
    playKeyA.play()
    const playKeyB = document.getElementById(`B${eventTarget}`)
    playKeyB.play()
    console.log(playKeyB)
})

// function playKey(key){

// }







})