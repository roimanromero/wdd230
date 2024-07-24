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
            memberCard.className = `member-card ${isGrid ? 'grid-view' : 'list-view'}`;
            
            memberCard.innerHTML = `
                <img src="${member.image}" alt="${member.name}" />
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                    <p>${member.description}</p>
                </div>
            `;
            
            directoryList.appendChild(memberCard);
        });
    }
});
