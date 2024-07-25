document.addEventListener('DOMContentLoaded', () => {
    // Update the last modified date
    const lastModified = new Date(document.lastModified);
    document.getElementById('lastModified').textContent = lastModified.toLocaleString();

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Fetch and display current weather data
    const apiKey = '5752a4053b45dfc8b4e1fe09df8c1ec5';
    const city = 'Barranquilla';
    const weatherCard = document.getElementById('weather-card');

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            weatherCard.querySelector('.temp').textContent = `${data.main.temp}°C`;
            weatherCard.querySelector('.condition').textContent = data.weather[0].description;
            weatherCard.querySelector('.humidity').textContent = `Humidity: ${data.main.humidity}%`;
        })
        .catch(error => console.error('Error fetching weather data:', error));

    // Fetch and display forecast data
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const forecastContainer = document.createElement('div');
            forecastContainer.className = 'forecast-container';
            
            const dailyData = data.list.filter((_, index) => index % 8 === 0).slice(1, 4);
            dailyData.forEach(day => {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'forecast-day';
                const date = new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
                dayDiv.innerHTML = `
                    <p>${date}</p>
                    <p>Temp: ${day.main.temp}°C</p>
                    <p>${day.weather[0].description}</p>
                `;
                forecastContainer.appendChild(dayDiv);
            });
            weatherCard.appendChild(forecastContainer);
        })
        .catch(error => console.error('Error fetching forecast data:', error));

    // Load and display spotlights from JSON
    fetch('data/members.json')
        .then(response => response.json())
        .then(members => {
            const spotlightsContainer = document.querySelector('#spotlights .spotlight-container');
            const filteredMembers = members.filter(member => member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver');
            const randomMembers = getRandomElements(filteredMembers, 2);
            randomMembers.forEach(member => {
                const memberDiv = document.createElement('div');
                memberDiv.className = 'spotlight';
                memberDiv.innerHTML = `
                    <h3>${member.name}</h3>
                    <p>${member.description}</p>
                    <a href="mailto:${member.email}">${member.email}</a>
                    <a href="tel:${member.phone}">${member.phone}</a>
                    <a href="${member.website}" target="_blank">Website</a>
                `;
                spotlightsContainer.appendChild(memberDiv);
            });
        })
        .catch(error => console.error('Error fetching member data:', error));

    // Get random elements from array
    function getRandomElements(arr, count) {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // Display banner on specific days
    const daysToShowBanner = [1, 2, 3]; // Monday (1) to Wednesday (3)
    const currentDay = new Date().getDay();
    if (daysToShowBanner.includes(currentDay)) {
        const banner = document.createElement('div');
        banner.className = 'banner';
        banner.innerHTML = `
            <p>Join us for the Chamber of Commerce meet and greet on Wednesday at 7:00 p.m.</p>
            <button id="close-banner">❌</button>
        `;
        document.body.insertBefore(banner, document.body.firstChild);
        document.getElementById('close-banner').addEventListener('click', () => {
            banner.style.display = 'none';
        });
    }
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
