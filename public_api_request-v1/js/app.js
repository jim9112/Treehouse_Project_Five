const gallery = document.getElementById('gallery');
const body = document.querySelector('body');

// AJAX request with fetch
fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(res => res.json())
    .then(data => {
        const userList = data.results;
        console.log(userList);
        createGallery(userList);
        searchBox(userList);
    });

    const searchBox = (userList) => {
        const searchContainer = document.querySelector('.search-container');
        searchContainer.innerHTML = '<form action="#" method="get"><input type="search" id="search-input" class="search-input" placeholder="Search..."><input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit"></form>';
        const searchBox = document.getElementById('search-input');
        searchBox.onkeyup = () => {
            for(i=0; i<gallery.children.length; i++) {
                var name = userList[i].name.first + ' ' + userList[i].name.last;
                
                if (searchBox.value === '') {
                    gallery.children[i].style.display = '';
                }
                else if(name.startsWith(searchBox.value.toLowerCase())){
                    gallery.children[i].style.display = '';
                } else {
                    gallery.children[i].style.display = 'none';
                }
            }
        };
    };
    
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
        // build modal contents
        modalHTML = `<div class="modal"><button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>`;
        // add picture
        modalHTML += `<div class="modal-info-container"><img class="modal-img" src="${userList[i].picture.large}" alt="profile picture">`;
        // add name   
        modalHTML += `<h3 id="name" class="modal-name cap">${userList[i].name.first} ${userList[i].name.last}</h3>`;
        // add email   
        modalHTML += `<p class="modal-text">${userList[i].email}</p>`;
        // add city
        modalHTML += `<p class="modal-text cap">${userList[i].location.city}</p><hr>`;
        // add cell
        modalHTML += `<p class="modal-text">${userList[i].cell}</p>`;
        // add address
        modalHTML += `<p class="modal-text cap">${userList[i].location.street}, ${userList[i].location.city}, ${userList[i].location.state} ${userList[i].location.postcode}</p>`;
        // reformat birtday and add birthday
        var bDayRaw = userList[i].dob.date.slice(0,userList[i].dob.date.indexOf("T")).split("-");
        var bDayFinal = `${bDayRaw[1]}/${bDayRaw[2]}/${bDayRaw[0]}`;
        modalHTML += `<p class="modal-text">Birthday: ${bDayFinal}</p>`;
        modalHTML += `</div><div id="cycle">`;        
        // adds previous button only when not the first record and add next button only when not the last record
        if (i>0){
            modalHTML += `<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>`;
        }
        if (i< userList.length-1) {
            modalHTML +=`<button type="button" id="modal-next" class="modal-next btn">Next</button>`;
        }
        modalHTML += `</div></div>`;
        modalContainer.innerHTML = modalHTML;
        body.append(modalContainer);
        // event listener for exit button on modal
        document.querySelector('#modal-close-btn').onclick = () => deletModal();
        cycleModal(userList, i);
    };
    // removes current modal
    const deletModal = () => body.removeChild(body.lastChild);
    
    // triggers event listeners
    const modalTrigger = (userList) => {
        for (i = 0; i<gallery.children.length; i++) { 
            ((i) => {
            gallery.children[i].onclick = () => {
                createModal(userList, i);
            };
        })(i);
        }
    };

    // event listener for previous and next button
    const cycleModal = (userList, i) => {
        document.getElementById('cycle').onclick = (e) => {
            if(e.target.id === 'modal-prev') {
                i--;
                deletModal();
                createModal(userList, i);
            } else if(e.target.id === 'modal-next') {
                i++;
                deletModal();
                createModal(userList, i);
            }
        };
    };