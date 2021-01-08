const audioElement = document.getElementById('audio');
const button = document.getElementById('button');



// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}



 // Function to pass joke to VoiceRSS API (VoiceRSS Javascript SDK in voice.js)
 function tellMeJoke(joke) {
    VoiceRSS.speech({
        key: 'fcf903b4b61a4490b0df3a18458a0b4a',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
 }



// Get jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Disable button
        toggleButton();
        // Set joke data to src in text-to-speech API and play
        tellMeJoke(joke);
    } catch {
        console.log("Couldn't get joke", error);
    }
}




button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);