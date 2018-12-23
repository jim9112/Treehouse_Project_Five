fetch('https://randomuser.me/api/?results=12')
    .then(res => res.json())
    .then(data => {
        const userList = data.results;
        console.log(userList);
        createGallery(userList);
    });

    const createGallery = (userList) => {
        const gallery = document.getElementById('gallery');
        
        for(let i = 0; i<userList.length; i++) {
            var card = document.createElement('div');
            card.className = 'card';
            gallery.append(card);
        }
    };