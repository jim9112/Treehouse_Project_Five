const gallery = document.getElementById('gallery');

fetch('https://randomuser.me/api/?results=12')
    .then(res => res.json())
    .then(data => {
        const userList = data.results;
        console.log(userList);
        createGallery(userList);
    });


    // Creates the cards of the employee dir
    const createGallery = (userList) => {
        for(let i = 0; i<userList.length; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            var cardHTML = `<div class="card-img-container"><img class="card-img" src="${userList[i].picture.medium}" alt="profile picture"></div>`;
            cardHTML += `<div class="card-info-container"><h3 id="name" class="card-name cap">${userList[i].name.first} ${userList[i].name.last}</h3><p class="card-text">${userList[i].email}</p><p class="card-text cap">${userList[i].location.city}, ${userList[i].location.state}</p></div>`;
            card.innerHTML = cardHTML;
            gallery.append(card);
        }
        modalTrigger(userList);
    };
    const modalTrigger = (userList) => {
        gallery.addEventListener('click', (e) => {
            if (e.target.className === 'card' || e.target.parentNode.parentNode.className === 'card' || e.target.parentNode.className === 'card'){
            
                createModal(userList);
            }
        });
    };
    const createModal = (userList) => {
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        modalHTML = `<div class="modal"><button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>`;
        modalHTML += `<div class="modal-info-container"></div>`;
        
        
        modalHTML += `</div>`;
        modalContainer.innerHTML = modalHTML;
        const body = document.querySelector('body');
        body.append(modalContainer);
        document.querySelector('#modal-close-btn').addEventListener('click', ()=> body.removeChild(body.lastChild));
    };