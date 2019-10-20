console.log('Client side javascript code is loaded!');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// });




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
// const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'hui';



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;

    messageTwo.textContent = 'Loading...';
    messageTwo.textContent = '';
 
    fetch('gi/weather?adress=' + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log( data.error );
            messageTwo.textContent = data.error;
            } else {
                messageTwo.textContent = data.location;
                messageTwo.textContent = data.forecast;
                console.log(data.location);
                console.log(data.forecast);
            }
        })
    });

})
