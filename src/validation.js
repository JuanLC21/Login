const form = document.querySelector('.form');
const buttons = document.querySelectorAll('.container__button');
const contSection = document.getElementsByClassName('container__section');
const inputs = document.querySelectorAll('.container__icon input');
const icons = document.querySelectorAll('.container__icon i');
const lightDelay = document.querySelectorAll('.neumorphism');
const errorInput = document.getElementsByClassName('error__input');
const linkButton = document.querySelectorAll('.container__brand-icon');

let fullArray = [false, false, false];
let stateValue = [];
let validation;
let regexOk;

const regex = {
    user: /^[a-zA-Z0-9_]{5,15}$/,
    email: /^[a-z0-9_]+@[a-z]+\.[a-z]{2,4}(.[a-z]{2})?$/,
    password: /^[a-zA-Z0-9*_#$-]{7,20}$/
};
// Cambia "username" por "email" y viceversa.
function changeOption() {

    if (contSection[0].id == 1) {

        contSection[0].classList.remove("container__section--active");
        contSection[1].classList.add("container__section--active");
        contSection[0].id = 0;
        contSection[1].id = 1;
    } else {

        contSection[1].classList.remove("container__section--active");
        contSection[0].classList.add("container__section--active");
        contSection[0].id = 1;
        contSection[1].id = 0;
    }  
};
function light_Added_Icon(pos) {
    
    icons[pos].classList.add("icon__light");
};
function light_Removed_Icon(input, pos) {

    input.addEventListener("blur", (e) => {

        icons[pos].classList.remove("icon__light");
        if (e.target.value == "") errorInput[pos].style.display = "none";  
    });
};
function regexValidation(reference, text, pos) {

    if (reference.test(text.value)) {
        errorInput[pos].style.display = "none";
        regexOk = true;
    } else {
        errorInput[pos].style.display = "block";
        regexOk = false;
    }
    return regexOk;
};
function state_Inputs_Validation() {

    inputs.forEach((element) => {
        element.addEventListener("keyup", (ev) => {
            switch (ev.target.id){
                case "1":  
                    validation = regexValidation(regex.user, element, 0);
                    fullArray.splice(0, 1, validation);
                break;
        
                case "2":
                    validation = regexValidation(regex.email, element, 1);
                    fullArray.splice(1, 1, validation);
                break;
        
                case "3":
                    validation = regexValidation(regex.password, element, 2);
                    fullArray.splice(2, 1, validation);
                break;
            }   
        })
    })  
    return fullArray;
};

stateValue = state_Inputs_Validation();

// Aquí se carga sesion si los valores de "stateValue" cumple con las condiciones. 
// En caso de no cumplirse las condiciones, se indica que el formulario está incompleto o es incorrecto.
form.addEventListener('submit', (ev) => {

    console.log("State Validation", stateValue)
    ev.preventDefault();
    const check = document.getElementById('check');

    if (stateValue[0] && stateValue[2] && check.checked ) {

        form.reset(); 
        fullArray[0] = false;
        lightDelay[4].classList.add('delay__button');
        setTimeout(() => {window.open("./utils/sesion_open.html")}, 500);

    } else if (stateValue[1] && stateValue[2] && check.checked) {

        form.reset(); 
        fullArray[1] = false;
        lightDelay[4].classList.add('delay__button');
        setTimeout(() => {window.open("./utils/sesion_open.html")}, 500);

    } else {
       
        lightDelay[4].classList.remove('delay__button');
        lightDelay[4].classList.add('delay__button-error');
        errorInput[3].style.display = "block";
        setTimeout(() => {
            lightDelay[4].classList.remove('delay__button-error');
            errorInput[3].style.display = "none";
        }, 1500); 
        console.log("Form incomplete or incorrect")
    }          
});   

// buttons en la posición [3] es "Change Option". Recuerde que buttons contiene 5 botones en total.
buttons[3].addEventListener('click', changeOption);

// Si se hace click sobre los inputs "username", "password" o "email", los iconos se iluminam.
// Si se da click fuera de ellos vuelven a su estado inicial.
inputs.forEach((element) => {
    element.addEventListener("focus", (ev) =>{
        switch (ev.target.id){
            case "1":
                light_Added_Icon(0);
                light_Removed_Icon(element, 0); 
            break;
    
            case "2":
                light_Added_Icon(1);
                light_Removed_Icon(element, 1);
            break;
    
            case "3":
                light_Added_Icon(2);
                light_Removed_Icon(element, 2);
            break;
        }
    })    
});

// Cualquiera de los 5 botones, una vez presionados, permanecen iluminados por un intervalo de tiempo.
// Éste bloque se encarga de hacer eso. Encenderlos durante un tiempo determinado y apagarlos.
lightDelay.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.add('delay__button');
        setTimeout(() => {
            button.classList.remove('delay__button');
        }, 1000);
    })
});
// NOTA IMPORTANTE: Acceder a enlaces con etiquetas diferentes a las de la etiqueta enlace "<a> </a>" es una mala practica. Por cuestiones de SEO el buscador
// podría prescindir de la pagina en cuestión que haga un mal uso de los enlaces. Mira: https://www.youtube.com/shorts/bGmRAFItQ0Y
linkButton.forEach((link) => { 
    link.addEventListener("click", () => {
        switch (link.id) {
            case "1":
                setTimeout(() => {window.open('https://www.facebook.com/', '_blank')}, 1000);
            break;

            case "2":
                setTimeout(() => {window.open('https://mail.google.com/mail/u/0/#inbox', '_blank')}, 1000);
            break;

            case "3":
                setTimeout(() => {window.open('https://twitter.com/?lang=es', '_blank')}, 1000);
            break;
        }
    })   
});