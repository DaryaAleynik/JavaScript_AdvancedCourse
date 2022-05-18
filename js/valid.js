let form = document.forms.feedbackForm;

let formValidation = function (e) {
    e.preventDefault();

    let name = form.elements.name;
    let phone = form.elements.phone;
    let mail = form.elements.email;

    name.classList.remove("field-invalid");
    phone.classList.remove("field-invalid");
    mail.classList.remove("field-invalid");

    let valid = true;

    if (nameValidation(name) == false) {
        alert("Поле 'Имя' заполнено некорректно!");
        valid = false;
    }

    if (phoneValidation(phone) == false) {
        alert("Поле 'Телефон' заполнено некорректно!");
        valid = false;
    }

    if (emailValidation(mail) == false) {
        alert("Поле 'E-mail' заполнено некорректно!");
        valid = false;
    }

    if (valid == true) {
        alert("Данные приняты!");
    }

    return valid;
}

function nameValidation(name) {
    let regExp = /^[A-Za-zА-Яа-я ]+$/;

    if (name.value.match(regExp)) {
        return true;
    } else {
        name.classList.add("field-invalid");
        return false;
    }
}

function phoneValidation(phone) {
    let regExp = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;

    if (phone.value.match(regExp)) {
        return true;
    } else {
        phone.classList.add("field-invalid");
        return false;
    }
}

function emailValidation(mail) {
    let regExp = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;

    if (mail.value.match(regExp)) {
        return true;
    } else {
        mail.classList.add("field-invalid");
        return false;
    }
}

