document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mainForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const passwordMessage = document.getElementById('passwordMessage');
    const rating = document.getElementById('rating');
    const ratingValue = document.getElementById('ratingValue');
    const hamburger = document.getElementById('hamburger');
    const navUl = document.querySelector('nav ul');

    form.addEventListener('submit', (event) => {
        if (password.value !== confirmPassword.value) {
            event.preventDefault();
            passwordMessage.textContent = 'Passwords do not match';
            password.value = '';
            confirmPassword.value = '';
            password.focus();
        } else {
            passwordMessage.textContent = '';
        }
    });

    rating.addEventListener('input', () => {
        ratingValue.textContent = rating.value;
    });

    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });
});
