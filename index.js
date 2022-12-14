const state = {
    users: null,
    setUsers(users) {
        this.users = users;
    },
}

let inputName = document.getElementById('name');
let inputEmail = document.getElementById('email');
let inputCity = document.getElementById('city');
let inputBirthday = document.getElementById('birthday');
let inputId = document.getElementById('id');
let form = document.querySelector('form#create-user');
let btn = document.querySelector('.btn');

btn.addEventListener('click', addUser);
form.addEventListener('submit', updateUser);


function addUser() {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdEmail = document.createElement('td');
    const tdCity = document.createElement('td');
    const tdBirthday = document.createElement('td');
    const tdId = document.createElement('td');

    tdName.innerText = inputName.value;
    tdEmail.innerText = inputEmail.value;
    tdCity.innerText = inputCity.value;
    tdBirthday.innerText = inputBirthday.value;
    tdId.innerText = inputId.value;

    const tbody = document.getElementById('tab');
    tbody.appendChild(tr);
    tr.appendChild(tdName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdCity);
    tr.appendChild(tdBirthday);
    tr.appendChild(tdId);

}

function loadMForm(userId) {
    const user = state.users.find(user => user.id == userId);

    inputName.value = user.name;
    inputEmail.value = user.email;
    inputCity.value = user.city;
    inputBirthday.value = user.birthday;
    inputId.value = userId;

}

function updateUser(event) {
    event.preventDefault();

    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const city = form.elements.city.value;
    const birthday = form.elements.birthday.value;
    const id = form.elements.id.value;

    const modifiedUser = {
        name,
        email,
        city,
        birthday,
        id
    }
    const users = state.users;

    const newUsers = users.map(user => {
        if (user.id === id) {
            return modifiedUser;
        }

        return user;
    })

    state.setUsers(newUsers);

    renderUsers();
}

function deleteUser(userId) {
    const users = state.users;

    const index = users.findIndex(user => user.id == userId);

    users.splice(index, 1);

    renderUsers();
}

function renderUsers() {
    const users = state.users;

    const tbody = document.getElementById('tab');
    tbody.innerHTML = `<tbody id="tab"></tbody>`;

    for (let user of users) {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdEmail = document.createElement('td');
        const tdCity = document.createElement('td');
        const tdBirthday = document.createElement('td');
        const tdId = document.createElement('td');
        const Mbutton = document.createElement('button');
        const Dbutton = document.createElement('button');

        tbody.appendChild(tr);
        tr.appendChild(tdName);
        tr.appendChild(tdEmail);
        tr.appendChild(tdCity);
        tr.appendChild(tdBirthday);
        tr.appendChild(tdId);
        tr.append(Mbutton);
        tr.append(Dbutton);

        tdName.innerText = user.name;
        tdEmail.innerText = user.email;
        tdCity.innerText = user.city;
        tdBirthday.innerText = user.birthday;
        tdId.innerText = user.id;

        Mbutton.innerHTML = `<button class="btn btn-warning" onclick="loadMForm(${user.id})">Modificar</button>`
        Dbutton.innerHTML = `<button class="btn btn-danger" onclick="deleteUser(${user.id})">Eliminar</button>`
    }

}

function setUsers() {
    fetch('https://6393e57e11ed187986bf9667.mockapi.io/api/curso/employees')
        .then(response => response.json())
        .then(users => {
            state.setUsers(users);

            renderUsers();
        })
        .catch(err => console.log('Hubo un problema con la petición Fetch:' + err.message))
}

(function getUsers() {
    setUsers();
    renderUsers();
})();