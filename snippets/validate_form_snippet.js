'use strict';

const DEFAULT_PHONE_CODE = 33;

/** FORM */
const regexName = /^[^0-9-@!$%^&*()_+|~=\\#{}\[\]:";<>?,.\/]*$/i;
const cyrillicCheck = /[\а-я]+/gi;

const emailCheck =
    /^(([^<>()[\]\\.,;:@"]+(\.[^<>()[\]\\.,;:@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9\s]+\.)+[a-zA-Z\s]{2,}))$/;
const emailCheck2 =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

let fields = {};

const validation = {
    firstname: {
        validation: value => {
            let firstNameValidateLetters = value.trim().match(regexName);
            let firstNameValidateNumbers = /(?![×÷])([^0-9]*)/.test(
                value.trim()
            );
            return value.length >= 2 &&
                value.length <= 20 &&
                firstNameValidateLetters &&
                firstNameValidateNumbers &&
                !value.trim().match(cyrillicCheck);
        },
        isValid: false
    },
    lastname: {
        validation: value => {
            let lastNameValidateLetters = value.trim().match(regexName);
            return value.length >= 2 &&
                value.length <= 20 &&
                lastNameValidateLetters &&
                !value.trim().match(cyrillicCheck);
        },
        isValid: false
    },
    email: {
        validation: value => !value.trim().match(cyrillicCheck) && value.trim().match(emailCheck) && value.trim().match(emailCheck2),
        isValid: false,
        inputCallback: () => {
            if ($(fields.email.input).val().length >= 2) {
                $(fields.email.wrapper).addClass('show-hint');
            }
        }
    },
    phone: {
        validation: value => (!(value.length < 10 || value.length > 14) && /^\d+$/.test(value.trim())),
        isValid: false,
        defaultValue: DEFAULT_PHONE_CODE,
        inputCallback: () => {
            $(fields.phone.input).val($(fields.phone.input).val().replace(/ /g, ''));
        }
    },
    address: {},
    zipcode: {},
    city: {},
};

$('form input').each(function (index) {
    const id = $(this).attr('id');
    fields[id] = {
        input: $(this),
        wrapper: $(`#${id}Wrapper`),
        ...validation[id]
    };
});


const showError = (field) => {
    $(fields[field].wrapper).addClass('child-invalid');
    $(fields[field].input).addClass('error');
    $(fields[field].wrapper).removeClass('child-valid');
};

const checkValidation = (field, needShowError) => {
    if (fields[field].validation) {
        if (fields[field].validation($(fields[field].input).val())) {
            $(fields[field].wrapper).addClass('child-valid');
            $(fields[field].input).removeClass('error');
            $(fields[field].wrapper).removeClass('child-invalid');
            fields[field].isValid = true;
            if (needShowError) {
                $(`#${field}Invalid`).css('display', 'none');
            }
        } else {
            showError(field);
            fields[field].isValid = false;
        }
    }
};
for (const key in fields) {
    if (fields[key].input.val()) {
        $(fields[key].wrapper).addClass('focused');
        checkValidation(key);
    } else {
        if (fields[key].defaultValue) {
            fields[key].input.val(fields[key].defaultValue);
            $(fields[key].wrapper).addClass('focused');
        }
    }

    $(fields[key].input).on('focus', () => {
        $(fields[key].wrapper).addClass('focused');
    });

    $(fields[key].input).on('blur', () => {
        if ($(fields[key].input).val() === '') {
            $(fields[key].wrapper).removeClass('focused');
        }
        $(fields[key].input).removeClass('show-hint');
    });

    $(fields[key].wrapper).on('input', () => {
        checkValidation(key, true);
        if (fields[key].inputCallback) {
            fields[key].inputCallback();
        }
    });
}

const showEmailDropdown = () => {
    var value = $(fields.email.input).val();

    $('ul').find('li.email').hide();
    $.each($('ul').find('li.email'), function () {
        let str = value;
        if (!value.includes('@')) {
            str = str.split('@').pop();
            let temp = this.innerHTML.split('@')[1];
            this.innerHTML = str.trim() + '@' + temp.trim();
        }
        if (this.innerHTML.includes(value)) $(this).show();
        $(this).on('click', function () {
            if ($(fields.email.input).val().length) {
                $(fields.email.input).val(this.innerHTML.trim());
                $(fields.email.wrapper).removeClass('show-hint');
            }
            checkValidation('email', true);
        });
    });
};

if ($('.email-hint').length > 0) {
    $(fields.email.input).on('input', function () {
        showEmailDropdown();
    });

    $(fields.email.input).on('click', function () {
        showEmailDropdown();
    });
}


$('#submitForm').click(function (event) {

    if (fields.firstname.isValid && fields.lastname.isValid && fields.phone.isValid && fields.email.isValid) {

    } else {
        $([document.documentElement, document.body]).animate(
            {
                scrollTop: $('#userDataForm').offset().top,
            },
            100
        );

    }
    if (!fields.firstname.isValid) {
        event.preventDefault();
        showError('firstname');
        $(`#firstnameInvalid`).css('display', 'block');
    }
    if (!fields.lastname.isValid) {
        event.preventDefault();
        showError('lastname');
        $(`#lastnameInvalid`).css('display', 'block');
    }
    if (!fields.phone.isValid) {
        event.preventDefault();
        showError('phone');
        $(`#phoneInvalid`).css('display', 'block');
    }
    if (!fields.email.isValid) {
        event.preventDefault();
        showError('email');
        $(`#emailInvalid`).css('display', 'block');
    }
});
