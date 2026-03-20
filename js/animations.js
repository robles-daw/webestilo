/**
 * animations.js
 * Lógica para revelación de elementos, cabecera compacta y carruseles.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Revelación al hacer scroll
    const revealOptions = {
        threshold: 0.05, // Reducido de 0.15 para trigger más temprano
        rootMargin: "0px 0px 0px 0px" // Eliminado el margen negativo para evitar retrasos
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const animatedElements = document.querySelectorAll('.reveal');
    animatedElements.forEach(el => {
        // Si el elemento ya está en el viewport al cargar, mostrarlo directamente
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('reveal-visible');
        } else {
            el.classList.add('reveal-hidden');
            revealObserver.observe(el);
        }
    });

    // Cabecera compacta al hacer scroll
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('header-shrunk');
            } else {
                header.classList.remove('header-shrunk');
            }
        });
    }
});
