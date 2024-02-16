const searchInput = document.getElementById('searchInput');
const voiceBtn = document.getElementById('voiceBtn');
const searchResults = document.getElementById('searchResults');
const statusResult = document.getElementById('status');

voiceBtn.addEventListener('click', function() {
    recognizeSpeech();
});

function recognizeSpeech() {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        
        statusResult.style.display = 'block';
        statusResult.innerHTML = `<p>Talk now. I am listening</p>....`;
        setTimeout(function() {
            statusResult.style.display = 'none';
        }, 10000);
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
        search();
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error occurred: ' + event.error);
    };

    recognition.start();
}

function search() {
    const query = searchInput.value.trim();
    // Here you can implement your search logic
    // For demonstration, just showing the search query in the results div
    searchResults.style.display = 'block';
    searchResults.innerHTML = `<p>Search query: ${query}</p>`;
}
