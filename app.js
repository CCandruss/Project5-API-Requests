const user = 'https://randomuser.me/api/';
const gallery = document.getElementById('gallery');
const placeHolder = document.getElementById('placeholder');
const modal = document.querySelector('.modal-container');
const exit = document.getElementById("modal-close-btn");
gallery.style.visibility = 'hidden';

//fetching data

// fetch(user)
//     .then( info => info.json() )
//     .then( info => makeCard(info))


// functions
function fetch12 (url) {
    for(let i = 0; i < 12; i++){
    fetch(user)
    .then( info => info.json() )
    .then( info => makeCard(info))
    .catch(err => console.log('There was an error retrieving users', err))
    };
}

function makeCard (data) {
    const employeeInfo = data.results;
    let html = '';
    html += `  <div class="card">
    <div class="card-img-container">
        <img class="card-img" src='${employeeInfo[0].picture.medium}' alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${employeeInfo[0].name.first} ${employeeInfo[0].name.last}</h3>
        <p class="card-text">${employeeInfo[0].email}</p>
        <p class="card-text cap">${employeeInfo[0].location.city}, ${employeeInfo[0].location.state}</p>
    </div>
</div>`
gallery.innerHTML += html;
}

function showCard() {
    const cards = document.getElementById('card');
    console.log(cards.length);
}


// event listeners
document.addEventListener('load', fetch12(user));

setTimeout(function(){
    gallery.style.visibility = 'visible';
    placeHolder.style.display = 'none';
}, 1500)

exit.addEventListener('click', () => modal.style.display = 'none');
//post?