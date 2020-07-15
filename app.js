const user = 'https://randomuser.me/api/';
const gallery = document.getElementById('gallery');
const placeHolder = document.getElementById('placeholder');
const modal = document.querySelector('.modal-container');
const exit = document.getElementById("modal-close-btn");
const cards = document.getElementsByClassName('card');
console.log(cards.length);
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
    .then( info => makeCard(info) )
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
return employeeInfo;
}

function makeModal(person){
    const info = person.textContent;
    const modalContainer = document.getElementsByClassName('modal-container');
    
    console.log(info);
    // let html = '';
    // html +=` 
    // <div class="modal">
    //                 <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    //                 <div class="modal-info-container">
    //                     <img class="modal-img" src="${info[0].picture.medium}" alt="profile picture">
    //                     <h3 id="name" class="modal-name cap">${info[0].name.first} ${info[0].name.last}</h3>
    //                     <p class="modal-text">${info[0].email}</p>
    //                     <p class="modal-text cap">${info[0].location.city}</p>
    //                     <hr>
    //                     <p class="modal-text">${info[0].cell}</p>
    //                     <p class="modal-text">${info[0].location.street.number} ${info[0].location.street.name},${info[0].location.city}, ${info[0].location.state} ${info[0].location.postcode}</p>
    //                     <p class="modal-text">Birthday: ${info[0].dob}</p>
    //                 </div>
    //             </div>`

}



// event listeners
document.addEventListener('load',fetch12(user) );

setTimeout(function(){
    gallery.style.visibility = 'visible';
    placeHolder.style.display = 'none';
}, 1500)

exit.addEventListener('click', () => modal.style.display = 'none');


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
    } else {
        result = box;
    }
    makeModal(result);
});

//post?