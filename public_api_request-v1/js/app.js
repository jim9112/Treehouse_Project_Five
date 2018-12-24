const gallery = document.getElementById('gallery');

fetch('https://randomuser.me/api/?results=12&nat=us')
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
            card.className = `card` ;
            card.id = userList[i].name.last;
            var cardHTML = `<div class="card-img-container"><img class="card-img" src="${userList[i].picture.large}" alt="profile picture"></div>`;
            cardHTML += `<div class="card-info-container"><h3 id="name" class="card-name cap">${userList[i].name.first} ${userList[i].name.last}</h3><p class="card-text">${userList[i].email}</p><p class="card-text cap">${userList[i].location.city}</p></div>`;
            card.innerHTML = cardHTML;
            gallery.append(card);
        }
        modalTrigger(userList);
    };

    // create modal
    const createModal = (userList, i) => {
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        modalHTML = `<div class="modal"><button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>`;
        modalHTML += `<div class="modal-info-container"><img class="modal-img" src="${userList[i].picture.large}" alt="profile picture">`;
        modalHTML += `<h3 id="name" class="modal-name cap">${userList[i].name.first} ${userList[i].name.last}</h3>`;
        modalHTML += `<p class="modal-text">${userList[i].email}</p>`;
        modalHTML += `<p class="modal-text cap">${userList[i].location.city}</p><hr>`;
        modalHTML += `<p class="modal-text">${userList[i].phone}</p>`;
        modalHTML += `<p class="modal-text cap">${userList[i].location.street}, ${userList[i].location.city}, ${userList[i].location.state} ${userList[i].location.postcode}</p>`;
        var bDayRaw = userList[i].dob.date.slice(0,userList[i].dob.date.indexOf("T")).split("-");
        var bDayFinal = `${bDayRaw[1]}/${bDayRaw[2]}/${bDayRaw[0]}`;
        modalHTML += `<p class="modal-text">Birthday: ${bDayFinal}</p>`;
        modalHTML += `</div></div>`;
        modalContainer.innerHTML = modalHTML;
        const body = document.querySelector('body');
        body.append(modalContainer);
        document.querySelector('#modal-close-btn').onclick = () => body.removeChild(body.lastChild);
    };


    const modalTrigger = (userList) => {
        for (i = 0; i<gallery.children.length; i++) { 
            ((i) => {
            gallery.children[i].onclick = () => {
                createModal(userList, i);
            };
        })(i);
        }
    };