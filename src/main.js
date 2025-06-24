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