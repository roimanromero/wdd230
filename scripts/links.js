const baseURL = "https://yourgithubusername.github.io/wdd230/";
const linksURL = "https://yourgithubusername.github.io/wdd230/data/links.json";

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    displayLinks(data);
}

function displayLinks(weeks) {
    const container = document.getElementById('links-container');
    container.innerHTML = ''; // Clear any existing content

    weeks.forEach(week => {
        const weekElement = document.createElement('div');
        weekElement.classList.add('week');

        const weekTitle = document.createElement('h3');
        weekTitle.textContent = week.week;
        weekElement.appendChild(weekTitle);

        const linksList = document.createElement('ul');
        week.links.forEach(link => {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = baseURL + link.url;
            anchor.textContent = link.title;
            listItem.appendChild(anchor);
            linksList.appendChild(listItem);
        });
        weekElement.appendChild(linksList);
        container.appendChild(weekElement);
    });
}

getLinks();
