window.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card.getAttribute('href') !== '') {
            card.classList.add('card--active');
        }

    })
})

