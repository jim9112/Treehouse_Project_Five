fetch('https://randomuser.me/api/?results=12')
    .then(res => res.json())
    .then(data => {
        const userList = data.results;
        console.log(userList);
        createGallery(userList);
    });


    // Creates the cards of the employee dir
    const createGallery = (userList) => {
        const gallery = document.getElementById('gallery');
        
        for(let i = 0; i<userList.length; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            var cardHTML = `<div class="card-img-container"><img class="card-img" src="${userList[i].picture.medium}" alt="profile picture"></div>`;
            cardHTML += `<div class="card-info-container"><h3 id="name" class="card-name cap">${userList[i].name.first} ${userList[i].name.last}</h3><p class="card-text">${userList[i].email}</p><p class="card-text cap">${userList[i].location.city}, ${userList[i].location.state}</p></div>`;
            card.innerHTML = cardHTML;
            gallery.append(card);
        }
    };