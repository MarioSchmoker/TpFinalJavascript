let inputName = document.getElementById('name');
let inputEmail = document.getElementById('email');
let inputId = document.getElementById('id');
let btn = document.querySelector('.btn');

btn.addEventListener('click', addUser);


function addUser() {

    let tr = document.createElement('tr');
    let tdName = document.createElement('td');
    let tdEmail = document.createElement('td');
    let tdId = document.createElement('td');

    tdName.innerText = inputName.value;
    tdEmail.innerText = inputEmail.value;
    tdId.innerText = inputId.value;

    let tbody = document.getElementById('tab');
    tbody.appendChild(tr);
    tr.appendChild(tdName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdId);


}



fetch('https://6393e57e11ed187986bf9667.mockapi.io/api/curso/employees')
    .then(response => response.json())
    .then(data => {

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            console.log(`Nombre: ${data[index].name} Email: ${data[index].email} Id: ${data[index].id}`)


            inputName.value = element.name;
            inputEmail.value = element.email;
            inputId.value = element.id;

            let tr = document.createElement('tr');
            let tdName = document.createElement('td');
            let tdEmail = document.createElement('td');
            let tdId = document.createElement('td');

            let tbody = document.getElementById('tab');
            tbody.appendChild(tr);
            tr.appendChild(tdName);
            tr.appendChild(tdEmail);
            tr.appendChild(tdId);

            tdName.innerText = inputName.value;
            tdEmail.innerText = inputEmail.value;
            tdId.innerText = inputId.value;
        
        }

    })


    .catch(err => console.log('Hubo un problema con la petición Fetch:' + err.message))