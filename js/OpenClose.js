window.addEventListener('DOMContentLoaded', () => {


    // let submitButton = document.getElementById("acceptBtnForm");

    let closeButton = document.getElementById("closeButton");

    let openButton = document.getElementById("openButton");

    let openButton2 = document.getElementById("openButton2");

    let form = document.getElementById("QAforma");

    // let complFormButton = document.getElementById("closeBtnForm");

    closeButton.addEventListener('click', closeForm);
    openButton.addEventListener('click', openForm);
    openButton2.addEventListener('click', openForm);

    // form.addEventListener('submit', checkFormTel);

    // complFormButton.addEventListener('click', completeForm);

    // var regularTel = /^[\d\+][\d\(\)\ -]{4,14}\d$/; //Регулярное выражение, проверяющее написание телефонного номера
    // var regName = /^[\u0400-\u04FF ]+$/; //Регулярное выражение на проверку имени

    function closeForm() {
        document.getElementById("fomPage").style.display = "none";
        document.getElementById("openButton").style.display = "block";
        const body = document.body;
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    function openForm() {
        document.getElementById("fomPage").style.display = "block";
        document.getElementById("openButton").style.display = "none";
        if (document.getElementById("formBox").style.display == "none") {
            document.getElementById("formBox").style.display = "flex";
            document.getElementById("completeBox").style.display = "none";
        }
        if (closeButton.style.display = "none")
            closeButton.style.display = "block";
        const body = document.body;
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}`;
    }

    // function checkFormTel(event) {
    //     event.preventDefault();
    //     let userName = document.getElementById("nameForm").value;
    //     let validationName = regName.test(userName);

    //     // let userSecondName = document.getElementById("secondNameForm").value;
    //     // let validationSecondName = regName.test(userSecondName);

    //     let userTel = document.getElementById("telForma").value;
    //     let validationTel = regularTel.test(userTel);

    //     if (validationTel && validationName) {
    //         thanksWindow(event);
    //     }
    //     else {
    //         alert("Введен неверный номер телефона или имя")
    //     }
    // }

    function thanksWindow(event) {
        event.preventDefault();
        document.getElementById("completeBox").style.display = "flex"; //Появление благодарственной страницы
        document.getElementById("formBox").style.display = "none"; //Скрытие формы
        closeButton.style.display = "none";
    }

    // function completeForm() {
    //     document.forms.QAforma.submit(); //Отправка результатов формы
    // }

    function eraseInput(i) {
        console.log(i);
        let inputName = document.getElementsByTagName('input');
        inputName.removeAttribute('value');
    }

    $(document).click(function (e) {
        if ($(e.target).is('.formBack')) {
            closeForm();
        }
    });
    // ------------ очистка полей начало
    let eraser = document.getElementsByClassName("text-field__aicon");

    for (var i in eraser) {
        if (eraser[i].addEventListener) {
            eraser[i].addEventListener('click', function (e) {
                this.previousElementSibling.value = "";
            });
        }
    }
    // ------------ очистка полей конец



    // MODAL PARTNERS


    const telPartners = document.getElementById('telForma');

    let imPartners = new Inputmask("+7 (999) 999-99-99", { showMaskOnHover: false });
    imPartners.mask(telPartners);




    const validationPartners = new JustValidate('.QA-forma', {
        errorLabelStyle: {
            color: '#EB3A45'
        }
    });

    validationPartners
        .addField('#nameForm', [
            {
                rule: 'required',
                errorMessage: 'Введите имя',
            },
            {
                rule: 'minLength',
                value: 1,
                errorMessage: 'Введите корректное имя',
            },
            {
                rule: 'maxLength',
                value: 150,
                errorMessage: 'Введите корректное имя',
            },
        ])
        .addField('#orgForm', [
            {
                rule: 'required',
                errorMessage: 'Введите наименование организации или учебного заведения',
            },
            {
                rule: 'minLength',
                value: 1,
                errorMessage: 'Введите корректное наименование организации или учебного заведения',
            },
            {
                rule: 'maxLength',
                value: 150,
                errorMessage: 'Введите корректное наименование организации или учебного заведения',
            },
        ])
        .addField('#emailForma', [
            {
                rule: 'required',
                errorMessage: 'Введите Email',
            },
            {
                rule: 'email',
                errorMessage: 'Введите корректный Email',
            },
        ])
        .addField('#telForma', [
            {
                validator: (value) => {
                    const phone = telPartners.inputmask.unmaskedvalue()
                    return Boolean(Number(phone) && phone.length > 0)
                },
                errorMessage: 'Введите номер телефона'
            },
            {
                validator: (value) => {
                    const phone = telPartners.inputmask.unmaskedvalue()
                    return Boolean(Number(phone) && phone.length === 10)
                },
                errorMessage: 'Введите телефон полностью'
            },
        ])
        .addField('#descriptionForm', [
            {
                rule: 'minLength',
                value: 50,
                errorMessage: 'Описание должно содержать не менее 50 символов',
            },
            {
                rule: 'maxLength',
                value: 1000,
                errorMessage: 'Описание должно содержать не более 1000 символов',
            },
        ])
        .addField('#checkboxForma1', [
            {
                rule: 'required',
                errorMessage: 'Вы должны прочитать и согласиться с политикой персональных данных',
            },
        ])
        .addField('#checkboxForma2', [
            {
                rule: 'required',
                errorMessage: 'Вы должны прочитать и согласиться с политикой персональных данных',
            },
        ])

        const formPartners = document.getElementById('partners');
        formPartners.addEventListener('submit', (e) => {
        e.preventDefault();
        validationPartners.onSuccess(() => {
            // closeForm()
            // тут закрыть модальное окно
            formPartners.reset();
            // тут открыть благодарственное окно
        })
    })

})
