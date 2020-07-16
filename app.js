const user = 'https://randomuser.me/api/';
const gallery = document.getElementById('gallery');
const placeHolder = document.getElementById('placeholder');
const modal = document.querySelector('.modal-container');
gallery.style.visibility = 'hidden';

// functions
//fetching data
function fetch12 (url) {
    for(let i = 0; i < 12; i++){
    fetch(user)
    .then( info => info.json() )
    .then( info => makeCard(info) )
    .catch(err => console.log('There was an error retrieving users', err))
    };
}

//creates employee info cards as well as getting my modal info to use later since I am not posting info to server and need it for modal window
function makeCard (data) {
    const employeeInfo = data.results;
    
    let html = '';
    html += 
    `<div id='${employeeInfo[0].name.first} ${employeeInfo[0].name.last}' class="card">
        
    <div class="card-img-container">
        <img class="card-img" src='${employeeInfo[0].picture.medium}' alt="profile picture">
        </div>

        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employeeInfo[0].name.first} ${employeeInfo[0].name.last}</h3>
            <p class="card-text">${employeeInfo[0].email}</p>
            <p class="card-text cap">${employeeInfo[0].location.city}, ${employeeInfo[0].location.state}</p>
        </div>

        <div class="extra-info">
            <p id="phone" class="hide">${employeeInfo[0].cell}</p>
            <p id='shipping' class="hide">${employeeInfo[0].location.street.number} ${employeeInfo[0].location.street.name}, ${employeeInfo[0].location.city}, ${employeeInfo[0].location.state} ${employeeInfo[0].location.postcode} </p>
            <p id='bday' class="card-text cap">${employeeInfo[0].dob.date}</p>
        </div>
</div>`
gallery.innerHTML += html;
}
//creates the modal window as well as formatting birthdays
function makeModal(person){
    const extras = person.parentNode.parentNode;
    const cards = document.getElementsByClassName('card');
    for(let i = 0; i < cards.length; i++){
        if(cards[i].id === person.textContent){
            let dob = cards[i].lastElementChild.lastElementChild.textContent;
            var cleaned = ('' + dob.replace(/\D/g, '') )
            console.log(cleaned);
            var match = cleaned.replace(/^(\d{4})(\d{2})(\d{2})(\d{9})$/, '$2/$3/$1' )
            console.log(match)
            dob = match
            let html = '';
            html +=` 
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${cards[i].firstElementChild.firstElementChild.src}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${cards[i].firstElementChild.nextElementSibling.firstElementChild.textContent}</h3>
                    <p class="modal-text">${cards[i].firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.textContent}</p>
                    <p class="modal-text cap">${cards[i].firstElementChild.nextElementSibling.lastElementChild.textContent}</p>
                    <hr>
                    <p class="modal-text">${cards[i].lastElementChild.firstElementChild.textContent}</p>
                    <p class="modal-text">${cards[i].lastElementChild.firstElementChild.nextElementSibling.textContent}</p>
                    <p id ='dob' class="modal-text">Birthday: ${dob}</p>
                </div>
            </div>`
            modal.innerHTML = html;
            modal.style.display = 'inherit'
        }   
    }
}

// event listeners
//creates user elements runs on page load
document.addEventListener('load',fetch12(user) );

//added so div elements displayed after all are loaded
setTimeout(function(){
    gallery.style.visibility = 'visible';
    placeHolder.style.display = 'none';
}, 1500)

//close modal window
modal.addEventListener('click', (e) => {
    if(e.target.textContent === 'X'){
        modal.style.display = 'none';
    }
});

//creating an event listener that can return the name of the user to feed to makeModal
gallery.addEventListener('click', e => {
    const box = e.target;
    let result;
    if(box.className === 'card-info-container'){
        result = box.firstElementChild;
    } else if (box.className === 'card-img-container') {
        result = box.parentNode.lastElementChild.firstElementChild;
    }else if (box.className === 'card-img') {
            result = box.parentNode.nextElementSibling.firstElementChild;
    } else if(box.className === 'card-text'){
        result =  box.previousElementSibling;
    }else if(box.className === 'card'){
            result =  box.firstElementChild;    
    } else if(box.className === 'card-text cap'){
        result =  box.previousElementSibling.previousElementSibling;
    } else if(box.className === 'gallery'){
        result =  box.firstElementChild.lastElementChild.firstElementChild;
    } else if(box.className === 'extra-info'){
        result =  box.previousElementSibling.firstElementChild;
    } else {
        result = box;
    }
    makeModal(result);
});
