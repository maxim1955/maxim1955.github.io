window.addEventListener('DOMContentLoaded', () => {

    // MODAL FEEDBACK

    // Валидация и маска для инпута

    const words = /[А-Яа-яёЁa-zA-Z ]/;
    const letters = /[А-Яа-яёЁ]/;

    const fio = document.querySelectorAll('.fio');
    const tel = document.getElementById('feedback__tel');
    const question = document.getElementById('feedback__question');

    fio.forEach(el => {
        el.addEventListener('keypress', (e) => {
            if (!words.test(e.key)) {
                e.preventDefault();
            }
        })
    })

    fio.forEach(el => {
        el.addEventListener('blur', () => {
            el.value = el.value.trimStart();
            el.value = el.value.trimEnd();
            el.value = el.value.replace(/\s+/g, ' ');
        })
    })

    question.addEventListener('keypress', (e) => {
        if (!letters.test(e.key)) {
            e.preventDefault();
        }
    })

    let im = new Inputmask("+7 (999) 999-99-99", { showMaskOnHover: false });
    im.mask(tel);


    document.querySelectorAll('.modal__btn').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            el.previousSibling.previousSibling.value = '';
            el.parentNode.firstElementChild.style.bottom = '8px';
            if (el.previousSibling.previousSibling.id == 'feedback__question' || el.previousSibling.previousSibling.id == 'descriptionForm') {
                el.parentNode.firstElementChild.style.bottom = '84px';
            }
        })
    })

    const submitFeedback = document.querySelector('.feedback__form');
    submitFeedback.addEventListener('submit', (e) => {
        e.preventDefault();
        validationFeedback.onSuccess(() => {
            document.querySelector('.feedback').classList.remove('open');
            document.querySelector('.feedback__form').reset();
            const modalSent = document.querySelector('.sent');
            modalSent.classList.add('open');
        })
    })

    const validationFeedback = new JustValidate('.feedback__form', {
        errorLabelStyle: {
            color: '#EB3A45'
        }
    });

    validationFeedback
        .addField('#feedback__fio', [
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
        .addField('#feedback__email', [
            {
                rule: 'required',
                errorMessage: 'Введите Email',
            },
            {
                rule: 'email',
                errorMessage: 'Введите корректный Email',
            },
        ])
        .addField('#feedback__tel', [
            {
                validator: (value) => {
                    const phone = tel.inputmask.unmaskedvalue()
                    return Boolean(Number(phone) && phone.length > 0)
                },
                errorMessage: 'Введите номер телефона'
            },
            {
                validator: (value) => {
                    const phone = tel.inputmask.unmaskedvalue()
                    return Boolean(Number(phone) && phone.length === 10)
                },
                errorMessage: 'Введите телефон полностью'
            },
        ])
        .addField('#feedback__question', [
            {
                rule: 'required',
                errorMessage: 'Введите свой вопрос',
            },
        ])

        .addField('#feedback__policy', [
            {
                rule: 'required',
                errorMessage: 'Вы должны прочитать и согласиться с политикой персональных данных',
            },
        ])
        .addField('#feedback__personal', [
            {
                rule: 'required',
                errorMessage: 'Вы должны прочитать и согласиться с политикой персональных данных',
            },
        ])


    // Открытие модального окна

    const feedbackBtn = document.getElementById('feedback');
    const modal = document.querySelector('.feedback');
    feedbackBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('open');
        document.body.style.position = 'fixed';
        document.body.style.top = '0';

    })

    // Закрытие модального окна

    const closeBtns = document.querySelectorAll('.modal__exit');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('open');
            document.body.style = '';
            validationFeedback.refresh();
        })

    })



    // Плейсхолдеры у инпутов 

    const inputs = document.querySelectorAll('.modal__input');
    inputs.forEach(input => {
        input.addEventListener('click', () => {
            input.previousSibling.previousSibling.style.bottom = '58px';
        })
    })


    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.value.length) {
                input.previousSibling.previousSibling.style.bottom = '8px';
            }

        })
    })


    document.getElementById('feedback__question').addEventListener('click', () => {
        document.getElementById('feedback__question').previousSibling.previousSibling.style.bottom = '84px';
    })

    document.getElementById('feedback__question').addEventListener('blur', () => {
        document.getElementById('feedback__question').previousSibling.previousSibling.style.bottom = '84px';
    })

    
    document.getElementById('descriptionForm').addEventListener('click', () => {
        document.getElementById('descriptionForm').previousSibling.previousSibling.style.bottom = '84px';
    })

    document.getElementById('descriptionForm').addEventListener('blur', () => {
        document.getElementById('descriptionForm').previousSibling.previousSibling.style.bottom = '84px';
    })


    // REGISTRATION UNDER

    const telUnder = document.getElementById('under__tel');
    const organization = document.querySelectorAll('.organization');

    const submitUnder = document.querySelector('.under__form');
    submitUnder.addEventListener('submit', (e) => {
        e.preventDefault();
        validationUnder.onSuccess(() => {
            document.querySelector('.under').classList.remove('open');
            document.querySelector('.under__form').reset();
            const modalThanks = document.querySelector('.thanks');
            modalThanks.classList.add('open');
        })
    })

    const validationUnder = new JustValidate('.under__form', {
        errorLabelStyle: {
            color: '#EB3A45'
        }
    });

    validationUnder
        .addField('#under__fio', [
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
        .addField('#under__fioRep', [
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
        .addField('#under__organization', [
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
        .addField('#under__email', [
            {
                rule: 'required',
                errorMessage: 'Введите Email',
            },
            {
                rule: 'email',
                errorMessage: 'Введите корректный Email',
            },
        ])
        .addField('#under__tel', [
            {
                validator: (value) => {
                    const phone = telUnder.inputmask.unmaskedvalue()
                    return Boolean(Number(phone) && phone.length > 0)
                },
                errorMessage: 'Введите номер телефона'
            },
            {
                validator: (value) => {
                    const phone = telUnder.inputmask.unmaskedvalue()
                    return Boolean(Number(phone) && phone.length === 10)
                },
                errorMessage: 'Введите телефон полностью'
            },
        ])
        .addField('.under__choices', [
            {
                rule: 'required',
                errorMessage: 'Выберите город',
            },
        ])
        .addField('#under__policy', [
            {
                rule: 'required',
                errorMessage: 'Вы должны прочитать и согласиться с политикой персональных данных',
            },
        ])
        .addField('#under__personal', [
            {
                rule: 'required',
                errorMessage: 'Вы должны прочитать и согласиться с политикой персональных данных',
            },
        ])




    // Закрытие модального окна

    const btnCloseUnder = document.querySelector('.under .modal__exit');
    btnCloseUnder.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = document.querySelector('.under');
        modal.classList.remove('open');
        validationUnder.refresh();
    })

    const elementUnder = document.querySelector('.under__choices');
    const choicesUnder = new Choices(elementUnder, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
    });



    organization.forEach(el => {
        el.addEventListener('keypress', (e) => {
            if (!words.test(e.key)) {
                e.preventDefault();
            }
        })
    })

    organization.forEach(el => {
        el.addEventListener('blur', () => {
            el.value = el.value.trimStart();
            el.value = el.value.trimEnd();
            el.value = el.value.replace(/\s+/g, ' ');
        })
    })



    let imUnder = new Inputmask("+7 (999) 999-99-99", { showMaskOnHover: false });
    imUnder.mask(telUnder);


    const inputUnder = document.getElementById('under__organization');
    if (inputUnder.previousSibling.previousSibling.clientHeight > 24) {
        document.getElementById('under__fioRep').parentNode.style.marginBottom = '54px';
    } else document.getElementById('under__fioRep').parentNode.style.marginBottom = '34px';


    const inputOrg = document.getElementById('orgForm');
    if (inputOrg.previousSibling.previousSibling.clientHeight > 24) {
        document.getElementById('nameForm').parentNode.style.marginBottom = '54px';
    } else document.getElementById('nameForm').parentNode.style.marginBottom = '34px';



    // REGISTRATION OVER

    const telOver = document.getElementById('over__tel');

    const submitOver = document.querySelector('.over__form');
    submitOver.addEventListener('submit', (e) => {
        e.preventDefault();
        validationOver.onSuccess(() => {
            document.querySelector('.over').classList.remove('open');
            document.querySelector('.over__form').reset();
            const modalThanks = document.querySelector('.thanks');
            modalThanks.classList.add('open');
        })
    })

    let imOver = new Inputmask("+7 (999) 999-99-99", { showMaskOnHover: false });
    imOver.mask(telOver);

    const validationOver = new JustValidate('.over__form', {
        errorLabelStyle: {
            color: '#EB3A45'
        }
    });

    validationOver
        .addField('#over__fio', [
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
        .addField('#over__organization', [
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
        .addField('#over__email', [
            {
                rule: 'required',
                errorMessage: 'Введите Email',
            },
            {
                rule: 'email',
                errorMessage: 'Введите корректный Email',
            },
        ])
        .addField('#over__tel', [
            {
                validator: (value) => {
                    const phone = telOver.inputmask.unmaskedvalue()
                    return Boolean(Number(phone) && phone.length > 0)
                },
                errorMessage: 'Введите номер телефона'
            },
            {
                validator: (value) => {
                    const phone = telOver.inputmask.unmaskedvalue()
                    return Boolean(Number(phone) && phone.length === 10)
                },
                errorMessage: 'Введите телефон полностью'
            },
        ])
        .addField('.over__choices', [
            {
                rule: 'required',
                errorMessage: 'Выберите город',
            },
        ])
        .addField('#over__policy', [
            {
                rule: 'required',
                errorMessage: 'Вы должны прочитать и согласиться с политикой персональных данных',
            },
        ])
        .addField('#over__personal', [
            {
                rule: 'required',
                errorMessage: 'Вы должны прочитать и согласиться с политикой персональных данных',
            },
        ])


    // Закрытие модального окна

    const btnCloseOver = document.querySelector('.over .modal__exit');
    btnCloseOver.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = document.querySelector('.over');
        modal.classList.remove('open');
        validationOver.refresh();
    })



    const elementOver = document.querySelector('.over__choices');
    const choicesOver = new Choices(elementOver, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
    });

    const inputOver = document.getElementById('over__organization');
    if (inputOver.previousSibling.previousSibling.clientHeight > 24) {
        document.getElementById('over__fio').parentNode.style.marginBottom = '54px';
    } else document.getElementById('over__fio').parentNode.style.marginBottom = '34px';




    // MODAL AGE

    const modalAge = document.querySelector('.age');

    const ageBtn = document.querySelector('.header_btn_title');
    ageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modalAge.classList.add('open');

    })


    const ageClose = document.querySelector('.age__close');
    ageClose.addEventListener('click', (e) => {
        e.preventDefault();
        modalAge.classList.remove('open');
        if (modalAge.parentNode == document.querySelector('.modal__overlay')) {
            document.querySelector('.modal-age').classList.remove('open');
        }
    })

    const yesBtn = document.querySelector('.age__btn--yes');
    yesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modalAge.classList.remove('open');
        if (modalAge.parentNode == document.querySelector('.modal__overlay')) {
            document.querySelector('.modal-age').classList.remove('open');
        }
        const modalOver = document.querySelector('.over');
        modalOver.classList.add('open');
        document.body.style.position = 'fixed';
        document.body.style.top = '0';
    })

    const noBtn = document.querySelector('.age__btn--no');
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modalAge.classList.remove('open');
        if (modalAge.parentNode == document.querySelector('.modal__overlay')) {
            document.querySelector('.modal-age').classList.remove('open');
        }
        const modalUnder = document.querySelector('.under');
        modalUnder.classList.add('open');
        document.body.style.position = 'fixed';
        document.body.style.top = '0';
    })


    // MODAL THANKS

    const modalThanks = document.querySelector('.thanks');
    const btnCloseThanks = document.querySelector('.thanks .modal__exit');
    btnCloseThanks.addEventListener('click', (e) => {
        e.preventDefault();
        modalThanks.classList.remove('open');
    })


    // MODAL SENT

    const modalSent = document.querySelector('.sent');
    const btnCloseSent = document.querySelector('.sent .modal__exit');
    btnCloseSent.addEventListener('click', (e) => {
        e.preventDefault();
        modalSent.classList.remove('open');
    })


    const media = window.matchMedia('(max-width: 1266px)');
    function handleTabletChange(e) {
        if (e.matches) {
            const modal = document.querySelector('.age');
            document.querySelector('.modal-age .modal__overlay').appendChild(modal);
        } else {
            const modal = document.querySelector('.age');
            document.querySelector('.header_last_list').appendChild(modal);
        }
    }
    media.addListener(handleTabletChange)
    handleTabletChange(media)


    document.querySelector('.btn_registration').addEventListener('click', (e) => {
        e.preventDefault();
        const modal = document.querySelector('.modal-age');
        modal.classList.add('open');
        modalAge.classList.add('open');
    })


   
})

window.addEventListener('resize', () => {
    const inputUnder = document.getElementById('under__organization');
    if (inputUnder.previousSibling.previousSibling.clientHeight > 24) {
        document.getElementById('under__fioRep').parentNode.style.marginBottom = '54px';
    } else document.getElementById('under__fioRep').parentNode.style.marginBottom = '34px';

    const inputOver = document.getElementById('over__organization');
    if (inputOver.previousSibling.previousSibling.clientHeight > 24) {
        document.getElementById('over__fio').parentNode.style.marginBottom = '54px';
    } else document.getElementById('over__fio').parentNode.style.marginBottom = '34px';

    const inputOrg = document.getElementById('orgForm');
    if (inputOrg.previousSibling.previousSibling.clientHeight > 24) {
        document.getElementById('nameForm').parentNode.style.marginBottom = '54px';
    } else document.getElementById('nameForm').parentNode.style.marginBottom = '34px';

})

