// Toggle hamburger menu
document.getElementById('hamburger').addEventListener('click', function() {
    var menu = document.querySelector('nav ul');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
        this.textContent = '\u2630'; // Hamburger icon
    } else {
        menu.style.display = 'block';
        this.textContent = '\u2715'; // X icon
    }
});

// Toggle dark mode
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');
    document.querySelector('nav').classList.toggle('dark-mode');
    document.querySelectorAll('.card').forEach(function(card) {
        card.classList.toggle('dark-mode');
    });
});

