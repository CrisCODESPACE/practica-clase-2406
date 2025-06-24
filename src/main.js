const baseUrl = "https://68511f618612b47a2c08b47f.mockapi.io/api/codespace";

// Petición para crear nuevo usuario

async function createUsers(userData) {
    const url = `${baseUrl}/users`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password,
                phone_number: userData.phone,
                name: userData.name,
            })
        })

        if(!response.ok) {
            throw new Error("Error al registrar usuario");
        }

        const newUser = await response.json();
        console.log(`Usuario creado ${newUser}`);
        
    } catch (error) {
        console.error(error);
    }
}


const app = document.getElementById("app");
const register = document.getElementById("register");
const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;

    let validations = true;

    if(name.length < 2) {
        alert("Invalid name");
        return validations = false;
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,4})+$/

    if(!emailRegex.test(email)) {
        alert("Invalid email structure. example@example.com");
        return validations = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/

    if(!passwordRegex.test(password)) {
        alert("Contraseña inválida. Debe tener 8 caracteres mínimo y 15 máximo, al menos una mayúscula una minúscula, un dígito, un caracter especial y sin espacios en blanco");
        return validations = false;
    }

    if(phone.length !== 9 || isNaN(phone)) {
        alert("Invalid phone. Phone must have 9 numbers");
        return validations = false;
    }

    const userData = {
        name,
        email,
        password,
        phone,
    }

    if(validations) await createUsers(userData);
})

// Petición para traer todos los usuarios.

async function getAllUsers() {
    const url = `${baseUrl}/users`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error en la petición getAllUsers")
        }
        const allUsers = await response.json();
        console.log(allUsers); 
        listarUsuarios(allUsers)
        // return allUsers;
    } catch (error) {
        console.error("Error")
    }
}


function listarUsuarios(users) {
    const userList = document.getElementById("user-list");
    userList.innerHTML= ""
    users.forEach(elemento => {

        const userDiv = document.createElement("div");
        userDiv.classList.add("card");

        const name = document.createElement("p");
        name.textContent = `nombre:${elemento.name}`

        const email = document.createElement("p");
        email.textContent = `email:${elemento.email}`

        const phoneNumber = document.createElement("p");
        phoneNumber.textContent = `telefono:${elemento.phone_number}`
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "x";
        const editButton = document.createElement("button");
        editButton.textContent = "editar";

        deleteButton.addEventListener("click",() => {
            deleteUsers(elemento.id)
        })

        userDiv.appendChild(name);
        userDiv.appendChild(email);
        userDiv.appendChild(phoneNumber);
        userDiv.appendChild(deleteButton);
        userDiv.appendChild(editButton);
        userList.appendChild(userDiv);
    })
  
}

getAllUsers()


//Petición para borra usuario

async function deleteUsers(id) {
    const url = `${baseUrl}/users/${id}`;
    try {
        const response = await fetch(url, {
          method: "DELETE",                
            
        })
        console.log("usuario eliminado");

        getAllUsers()
        
    } catch (error) {
        console.error(error);
    }

}

