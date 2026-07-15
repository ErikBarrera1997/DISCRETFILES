async function searchAudio() {
    const input = document.getElementById('searchInput').value.trim();
    const list = document.getElementById('resultsList');
    const spinner = document.getElementById('loadingSpinner');
    const API = API_CONFIG.MP3_API_URL;

    list.innerHTML = '';
    spinner.style.display = 'block';

    if (!input) {
        spinner.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`${API}/service/start/audio/track/mongo/search?query=${encodeURIComponent(input)}`);

        const data = await response.json();
        spinner.style.display = 'none';

        if (!Array.isArray(data) || data.length === 0) {
            list.innerHTML = '<li>No results founded.</li>';
            return;
        }

        const fragment = document.createDocumentFragment();
        data.forEach(audio => {
            const li = document.createElement('li');
            li.innerHTML = `${audio.metadata?.title} - ${audio.metadata?.artist || "Unknown"} (${audio.metadata?.formato || "N/A"}) |
                <a href="${API}/service/start/mongo/download/${audio.id}" target="_blank">Download</a>`;
            fragment.appendChild(li);
        });

        list.appendChild(fragment);

    } catch (err) {
        spinner.style.display = 'none';
        list.innerHTML = `<li>An error has occurred. Try more later</li>`;
    }
}
