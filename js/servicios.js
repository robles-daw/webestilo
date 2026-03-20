document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("marcasCarouselTrack");
    if (!track) return;

    const visibleColumns = window.innerWidth > 1024 ? 4 : (window.innerWidth > 600 ? 3 : 2);
    const totalColumns = 11;
    
    // Clonar elementos para efecto infinito
    const items = Array.from(track.children);
    const itemsToClone = items.slice(0, visibleColumns * 3); 
    
    itemsToClone.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    let currentIndex = 0;
    const maxIndex = totalColumns;

    // Intervalo de movimiento
    setInterval(() => {
        currentIndex++;
        track.style.transition = "transform 1s cubic-bezier(0.45, 0.05, 0.55, 0.95)";
        
        const offset = currentIndex * (100 / visibleColumns);
        track.style.transform = `translateX(-${offset}%)`;

        // Reinicio al llegar al final de los elementos originales
        if (currentIndex >= maxIndex) {
            setTimeout(() => {
                track.style.transition = "none";
                currentIndex = 0;
                track.style.transform = `translateX(0)`;
            }, 1000);
        }
    }, 3000);
});
