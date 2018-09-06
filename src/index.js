const form = document.getElementById('hog-form');

document.addEventListener('DOMContentLoaded', () => {
    fetchHogs().then(hogs => hogs.forEach(hog => renderHog(hog)))
    
})

form.addEventListener('submit', (event) => {
    const hogInputs = event.target.querySelectorAll('input');
    console.log(hogInputs);
    const hogName = hogInputs[0].value;
    const hogSpecialty = hogInputs[1].value;
    const hogMedal = hogInputs[2].value;
    const hogWeight = hogInputs[3].value;
    const hogImage = hogInputs[4].value;
    const hogIsGreased = hogInputs[5];
    const data = {
        name: hogName,
        specialty: hogSpecialty,
        greased: hogIsGreased.checked ? true : false,
        "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": hogWeight,
        "highest medal achieved": hogMedal,
        image: hogImage
 
    }

    fetch('http://localhost:3000/hogs', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(hog => renderHog(hog))
    event.preventDefault();
    
    console.log(event.currentTarget);
    event.currentTarget.reset();
})

function fetchHogs() {
    return fetch('http://localhost:3000/hogs').then(res => res.json())
}

function renderHog(hog) {
    const div = document.createElement('div');
    div.className = 'hog-card';
    div.innerHTML += `<h2>${hog.name}</h2>
    <img src="${hog.image}">
    <h4>${hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]}</h4>
    <h5>Highest Medal Achieved: ${hog["highest medal achieved"]}</h5>
     <input type="checkbox" id="greased-hog-${hog.id}"${hog.greased ? 'checked' : ''} disabled>Greased<br>
    <button data-id = "${hog.id}" class="delete-hog">Delete</button>`
    document.getElementById('hog-container').appendChild(div);
    document.querySelectorAll('.delete-hog').forEach(button => button.addEventListener('click', deleteHog));
    
}

function deleteHog(event) {
    console.log('deleting hog...')
    const id = event.target.dataset.id;
    const hogDiv = event.target.parentElement;
    const data = {id: id}
    fetch(`http://localhost:3000/hogs/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(hog => console.log('Deleted', hog))
    hogDiv.remove();
}