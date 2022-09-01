const endpoint = "http://177.44.248.30/usersapi";

loadTable = () => {
    axios.get(`${endpoint}/users`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.name + '</td>';
                    trHTML += '<td>' + element.age + '</td>';
                    trHTML += '<td>' + element.sex + '</td>';
                    trHTML += '<td>' + element.email + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

userCreate = () => {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const email = document.getElementById("email").value;

    axios.post(`${endpoint}/users`, {
        name: name,
        age: age,
        sex: sex,
        email: email,
    })
        .then((response) => {
            console.log(response);
            Swal.fire(`User ${response.data.name} created`);
            loadTable();
        }, (error) => {
            console.log(error);
            Swal.fire(`Error to create user: ${error.response.data.error} `);
            loadTable();
        });
}

getUser = (id) => {
    return axios.get(`${endpoint}/users/` + id);
}

userEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const email = document.getElementById("email").value;

    axios.put(`${endpoint}/users/` + id, {
        name: name,
        age: age,
        sex: sex,
        email: email,
    })
        .then((response) => {
            console.log(response);
            Swal.fire(`User ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            console.log(error);
            Swal.fire(`Error to update user: ${error.response.data.error} `);
            loadTable();
        });
}

showUserCreateBox = () => {
    Swal.fire({
        title: 'Create user',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="Name">' +
            '<input id="age" class="swal2-input" placeholder="Age">' +
            '<input id="sex" class="swal2-input" placeholder="Sex">' +
            '<input id="email" class="swal2-input" placeholder="Email">',
        focusConfirm: false,
        preConfirm: () => {
            userCreate();
        }
    });
}

showUserEditBox = async (id) => {
    console.log(id);
    const user = await getUser(id);
    const data = user.data;
    Swal.fire({
        title: 'Edit User',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="name" class="swal2-input" placeholder="Name" value="' + data.name + '">' +
            '<input id="age" class="swal2-input" placeholder="Age" value="' + data.age + '">' +
            '<input id="sex" class="swal2-input" placeholder="Sex" value="' + data.sex + '">' +
            '<input id="email" class="swal2-input" placeholder="Email" value="' + data.email + '">',
        focusConfirm: false,
        preConfirm: () => {
            userEdit();
        }
    });

}

userDelete = async (id) => {
    const user = await getUser(id);
    const data = user.data;
    axios.delete(`${endpoint}/users/` + id)
        .then((response) => {
            console.log(response);
            Swal.fire(`User ${data.name} deleted`);
            loadTable();
        }, (error) => {
            console.log(error);
            Swal.fire(`Error to delete user: ${error.response.data.error} `);
            loadTable();
        });
};
