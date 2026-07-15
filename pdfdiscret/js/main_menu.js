async function searchPdf() {
    const input = document.getElementById('searchInput').value.trim();
    const resultsSection = document.getElementById('results');
    const infoPlaceholder = document.getElementById('infoPlaceholder');
    const spinner = document.getElementById('loadingSpinner');
    const API = API_CONFIG.PDF_API_URL;

    infoPlaceholder.innerHTML = '<span>PDF info</span>';
    resultsSection.style.display = 'none';
    spinner.style.display = 'block';

    if (!input) {
        spinner.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`${API}/service/pdfs/search?query=${encodeURIComponent(input)}`);

        const data = await response.json();
        spinner.style.display = 'none';

        if (!Array.isArray(data) || data.length === 0) {
            infoPlaceholder.innerHTML = '<span>No results found.</span>';
            resultsSection.style.display = 'block';
            return;
        }

        const pdf = data[0];
        const downloadUrl = `${API}/service/pdfs/download/${pdf.id}`;

        infoPlaceholder.innerHTML = `
            <div class="pdf-info-content">
                <p><strong>Name:</strong> ${pdf.metadata?.name || pdf.filename || 'N/A'}</p>
                <p><strong>Author:</strong> ${pdf.metadata?.author || 'Unknown'}</p>
                <p><strong>Size:</strong> ${pdf.metadata?.size || 'N/A'}</p>
                <p><strong>Date:</strong> ${pdf.metadata?.date || 'N/A'}</p>
                <p><strong>Filename:</strong> ${pdf.filename || 'N/A'}</p>
                <a href="${downloadUrl}" target="_blank" class="download-link">Download</a>
            </div>
        `;
        resultsSection.style.display = 'block';

    } catch (err) {
        spinner.style.display = 'none';
        infoPlaceholder.innerHTML = '<span>An error has occurred. Try again later.</span>';
        resultsSection.style.display = 'block';
    }
}
