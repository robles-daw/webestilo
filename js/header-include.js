/**
 * header-include.js
 * Carga el HTML de la cabecera de forma dinámica.
 */
(function() {
    const script = document.currentScript;
    const activePage = (script && script.getAttribute('data-active')) || '';

    // Determinar el prefijo relativo basándose en la ruta del script
    const scriptSrc = script.getAttribute('src') || '';
    const prefix = scriptSrc.includes('js/') ? scriptSrc.substring(0, scriptSrc.indexOf('js/')) : '';
    const headerPath = prefix + 'layout/header.html';

    const xhr = new XMLHttpRequest();
    try {
        // Carga síncrona para asegurar la inyección antes del renderizado
        xhr.open('GET', headerPath, false); 
        xhr.send(null);

        if (xhr.status === 200 || xhr.status === 0) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(xhr.responseText, 'text/html');
            const headerEl = doc.querySelector('header');
            
            if (headerEl) {
                // Ajustar rutas relativas de imágenes y enlaces
                headerEl.querySelectorAll('img').forEach(img => {
                    const src = img.getAttribute('src');
                    if(src && src.startsWith('../')) img.setAttribute('src', prefix + src.substring(3));
                });
                headerEl.querySelectorAll('a').forEach(a => {
                    const href = a.getAttribute('href');
                    if(href && href.startsWith('../')) a.setAttribute('href', prefix + href.substring(3));
                });

                script.insertAdjacentElement('beforebegin', headerEl);
                
                // Marcar página activa en el menú
                if (activePage) {
                    const links = headerEl.querySelectorAll('a');
                    links.forEach(link => {
                        const text = link.textContent.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                        const page = activePage.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                        if (text === page) link.classList.add('active');
                    });
                }

                // Menú responsive
                const menuToggle = headerEl.querySelector('.menu-toggle');
                if (menuToggle) {
                    menuToggle.addEventListener('click', function() {
                        headerEl.classList.toggle('menu-open');
                    });
                }

                const menuLinks = headerEl.querySelectorAll('.menu-container a');
                menuLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        headerEl.classList.remove('menu-open');
                    });
                });

                // Lógica para encoger el logo/cabecera
                const updateHeaderStats = () => {
                    if (window.scrollY > 50) {
                        headerEl.classList.add('header-shrunk');
                    } else {
                        headerEl.classList.remove('header-shrunk');
                    }
                };

                // Verificar estado inicial al cargar
                updateHeaderStats();

                // Lógica de ocultar/mostrar cabecera al hacer scroll
                let lastScrollY = window.scrollY;
                const threshold = 10;

                window.addEventListener('scroll', () => {
                    const currentScrollY = window.scrollY;
                    updateHeaderStats();

                    const portada = document.querySelector('.portada');
                    const portadaHeight = portada ? portada.offsetHeight : 300;

                    if (currentScrollY <= portadaHeight) {
                        headerEl.classList.remove('header-hidden');
                        lastScrollY = currentScrollY;
                        return;
                    }

                    if (currentScrollY > lastScrollY + threshold) {
                        headerEl.classList.add('header-hidden');
                        headerEl.classList.remove('menu-open');
                    } else if (currentScrollY < lastScrollY - threshold) {
                        headerEl.classList.remove('header-hidden');
                    }

                    lastScrollY = currentScrollY;
                });
            } else {
                console.warn("No se encontró <header> en el archivo incrustado.");
            }
        }
    } catch(e) {
        console.warn("Error cargando el header local.", e);
        document.body.insertAdjacentHTML('afterbegin', 
            '<div style="background:red;color:white;padding:10px;text-align:center;">' +
            'Por favor abre la web con un servidor local para cargar el header.</div>');
    }
})();
