document.addEventListener('DOMContentLoaded', () => {
    const lastModified = new Date(document.lastModified);
    document.getElementById('lastModified').textContent = lastModified.toLocaleString();

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
});

// Lazy loading images
document.addEventListener("DOMContentLoaded", function() {
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        let active = false;

        const lazyLoad = function() {
            if (active === false) {
                active = true;

                setTimeout(function() {
                    lazyImages.forEach(function(lazyImage) {
                        if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.classList.remove("lazy");

                            lazyImages = lazyImages.filter(function(image) {
                                return image !== lazyImage;
                            });

                            if (lazyImages.length === 0) {
                                document.removeEventListener("scroll", lazyLoad);
                                window.removeEventListener("resize", lazyLoad);
                                window.removeEventListener("orientationchange", lazyLoad);
                            }
                        }
                    });

                    active = false;
                }, 200);
            }
        };

        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationchange", lazyLoad);
    }
});

// Display visit message
function displayVisitMessage() {
    const visitMessage = document.getElementById('visitMessage');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = Date.now();
    
    if (!lastVisit) {
        visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const timeDiff = currentVisit - lastVisit;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        if (daysDiff < 1) {
            visitMessage.textContent = 'Back so soon! Awesome!';
        } else if (daysDiff === 1) {
            visitMessage.textContent = 'You last visited 1 day ago.';
        } else {
            visitMessage.textContent = `You last visited ${daysDiff} days ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', currentVisit);
}

// Set current date in sidebar
document.getElementById('currentDate').textContent = new Date().toLocaleDateString();

document.addEventListener("DOMContentLoaded", function() {
    displayVisitMessage();
});
document.addEventListener('DOMContentLoaded', (event) => {
    const timestamp = new Date().toISOString();
    document.getElementById('timestamp').value = timestamp;
});
document.addEventListener('DOMContentLoaded', () => {
    const directoryList = document.getElementById('directory-list');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');
    
    // Fetch members data
    fetch('data/members.json')
        .then(response => response.json())
        .then(members => {
            displayMembers(members, 'grid');
            
            gridViewButton.addEventListener('click', () => displayMembers(members, 'grid'));
            listViewButton.addEventListener('click', () => displayMembers(members, 'list'));
        });

    function displayMembers(members, view) {
        directoryList.innerHTML = '';
        const isGrid = view === 'grid';

        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = isGrid ? 'member-card grid-view' : 'member-card list-view';
            
            memberCard.innerHTML = `
                <img src="${member.image}" alt="${member.name}" />
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p>${member.description}</p>
            `;
            
            directoryList.appendChild(memberCard);
        });
    }
});
