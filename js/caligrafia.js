/**
 * caligrafia.js
 * Gestión del modal para la visualización de PDFs de caligrafía.
 */
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfIframe');
    const closeBtn = document.querySelector('.close-modal');
    const pdfLinks = document.querySelectorAll('.pdf-btn');

    pdfLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            iframe.src = link.getAttribute('data-pdf');
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        iframe.src = '';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            iframe.src = '';
        }
    });
});
