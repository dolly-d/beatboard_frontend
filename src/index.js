document.addEventListener("DOMContentLoaded", (event) => { 

const piano = document.getElementById('piano')
// console.log(piano)


piano.addEventListener('click', (e) => {
    //const eventTarget = e.target.innerText
    console.log('e.target', e.target)
    e.target.getElementsByClassName('key')[0].play()
    /*debugger 
    const playKeyA = document.getElementById(`A${eventTarget}`)
    playKeyA.play()
    const playKeyB = document.getElementById(`B${eventTarget}`)
    playKeyB.play()*/
    
})

// function playKey(key){

// }







})