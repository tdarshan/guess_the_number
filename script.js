const msgEl = document.getElementById('msg');

let randomNum = getRandomNum();

// console.log(`Number : ${randomNum}`);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognizing
recognition.start();

// Capture user speak
function onSpeak(e){
    let msg = e.results[0][0].transcript;

    writeMessage(msg);
    checkNumer(msg);
}

// Write the number user speak
function writeMessage(msg){
    msgEl.innerHTML = `
    <div>You said :</div>
    <span class="box">${msg}</span>`;
}

// Check message and number
function checkNumer(msg){
    const num = +msg;

    // check if it's a valid number
    if(Number.isNaN(num)){
        msgEl.innerHTML += '<div> Not a valid number </div>';
        return ;
    }

    // Check range
    if(num > 100 || num < 1){
        msgEl.innerHTML += '<div> Number must be in between 1 - 100 </div>';
        return ;
    }

    // Check the number
    if(num == randomNum){
        document.body.innerHTML = `
            <h2>Congrats! You have guessed the right number <br><br>
            It was ${num} </h2>
            <button class="play-again" id="play-again"> Play Again </button>
        `;
    }
    else if(num > randomNum){
        msgEl.innerHTML += `<div>GO LOWER</div>`
    }
    else{
        msgEl.innerHTML += `<div>GO HIGHER</div>`
    }
}

// Generate a number
function getRandomNum(){
    return Math.ceil(Math.random()*100);
}

// Speck result
recognition.addEventListener('result', onSpeak);

// End SpeechRecognition
recognition.addEventListener('end', () => recognition.start());


document.body.addEventListener('click', (e) => {

    if(e.target.id == 'play-again'){
        window.location.reload();
    }
});