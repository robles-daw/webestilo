/**
 * footer-include.js
 * Carga el HTML del pie de página de forma dinámica.
 */
(function() {
    const script = document.currentScript;

    // Determinar el prefijo relativo basándose en la ruta del script
    const scriptSrc = script.getAttribute('src') || '';
    const prefix = scriptSrc.includes('js/') ? scriptSrc.substring(0, scriptSrc.indexOf('js/')) : '';
    const footerPath = prefix + 'layout/footer.html';

    const xhr = new XMLHttpRequest();
    try {
        xhr.open('GET', footerPath, false); 
        xhr.send(null);

        if (xhr.status === 200 || xhr.status === 0) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(xhr.responseText, 'text/html');
            const footerEl = doc.querySelector('footer');
            
            if (footerEl) {
                // Ajustar rutas relativas de imágenes y enlaces
                footerEl.querySelectorAll('img').forEach(img => {
                    const src = img.getAttribute('src');
                    if(src && src.startsWith('../')) img.setAttribute('src', prefix + src.substring(3));
                });
                footerEl.querySelectorAll('a').forEach(a => {
                    const href = a.getAttribute('href');
                    if(href && href.startsWith('../')) a.setAttribute('href', prefix + href.substring(3));
                });

                script.insertAdjacentElement('beforebegin', footerEl);
                
                // Actualizar año actual
                const yearSpan = footerEl.querySelector('#footer-year');
                if (yearSpan) yearSpan.textContent = new Date().getFullYear();

                // Botón "Volver arriba"
                const upBtn = footerEl.querySelector('.up-float');
                if (upBtn) {
                    upBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    });
                }
            }
        }
    } catch(e) {
        console.warn("Error cargando el footer local.", e);
    }
})();
