document.querySelectorAll('.accordion__header').forEach(button => {
    button.addEventListener('click', () => {
        const accordionContent = button.nextElementSibling;

        button.classList.toggle('active');

        if (button.classList.contains('active')) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        } else {
            accordionContent.style.maxHeight = 0;
        }
    });
});


let nextButt = document.querySelectorAll(".audience__promo__button .next"),
    prevButt = document.querySelectorAll(".audience__promo__button .prev"),
    slides = document.querySelector(".audience__cards__list"),
    counter = 0,
    slide = document.querySelector(".audience__cards__item");




// Функция для отображения слайда
function showSlide(index) {
    let slideWidthWithGap = slide.offsetWidth + 31.8;
    let translateX = index === 0 ? 0 : -index * slideWidthWithGap;
    slides.style.transform = `translate(${translateX}px)`;
}

// Переключение на следующий слайд
nextButt.forEach(butt => {
    butt.addEventListener("click", () => {
        if (counter < 3) {
            counter++;
            showSlide(counter);
        }
    });
});

prevButt.forEach(prevbutt => {
    prevbutt.addEventListener("click", () => {
        if (counter > 0) {
            counter--;
            showSlide(counter);
        }
    });
});


// Начните с отображения первого слайда
showSlide(counter);


let nextButtResults = document.querySelectorAll(".results__promo__button .next"),
    prevButtResults = document.querySelectorAll(".results__promo__button .prev"),
    slidesResults = document.querySelector(".results__slider__list"),
    counterResults = 0,
    slideResults = document.querySelector(".results__slider__item");




// Функция для отображения слайда
function showSlideResults(index) {
    let slideWidthWithGap = slideResults.offsetWidth + 32.4;
    let translateX = index === 0 ? 0 : -index * slideWidthWithGap;
    slidesResults.style.transform = `translate(${translateX}px)`;
}

// Переключение на следующий слайд
nextButtResults.forEach(butt => {
    butt.addEventListener("click", () => {
        if (counterResults < 5) {
            counterResults++;
            showSlideResults(counterResults);
        }
    });
});



// Переключение на предыдущий слайд
prevButtResults.forEach(butt => {
    butt.addEventListener("click", () => {
        if (counterResults > 0) {
            counterResults--;
            showSlideResults(counterResults);
        }
    });
});

// Начните с отображения первого слайда
showSlideResults(counterResults);


document.querySelectorAll('.anchor').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



const form__button = document.querySelector(".form button"),
    close__form = document.querySelector(".close__butt"),
    open__form = document.querySelectorAll(".open__form");

let tarrif__name = document.querySelector(".text__and__price .text"),
    tarrif__price = document.querySelector(".text__and__price .price"),
    sum__heading = document.querySelector(".sum"),
    price__heading = document.querySelector(".price__heading");


let tarrifs = {
    'base': {
        'name__tarrif': 'БАЗОВИЙ',
        'price': '890 грн',
        'heading__price': 'Сума: 890 грн',
        'heading__sum': 'Сума: 890 грн',
        'link': 'https://secure.wayforpay.com/button/b6adec61620c5',
    },
    'standart': {
        'name__tarrif': 'СТАНДАРТ',
        'price': '2190 грн',
        'heading__price': 'Сума: 2190 грн',
        'heading__sum': 'Сума: 2190 грн',
        'link': 'https://secure.wayforpay.com/button/bac9cad44d6de',
    },
    'premium': {
        'name__tarrif': 'ПРЕМІУМ',
        'price': '6990 грн',
        'heading__price': 'Сума: 6990 грн',
        'heading__sum': 'Сума: 6990 грн',
        'link': 'https://secure.wayforpay.com/button/b9babe8ffb73c',
    }
}

form__button.addEventListener("click", () => {
    formSend(form__button);
});

open__form.forEach(butt => {
    butt.addEventListener("click", () => {
        let key = butt.getAttribute("key");
        tarrif__name.textContent = tarrifs[key]['name__tarrif'];
        tarrif__price.textContent = tarrifs[key]['price'];
        price__heading.textContent = tarrifs[key]['heading__price'];
        sum__heading.textContent = tarrifs[key]['heading__sum'];
        form__button.setAttribute('data-url', tarrifs[key]['link']);
        document.body.classList.add("dissabled");
        document.querySelector(".form__block").classList.add("show");
    });
});

close__form.addEventListener("click", () => {
    document.querySelector(".form__block").classList.remove("show");
    document.body.classList.remove("dissabled");
});


function formSend(formbutt) {
    let error = formValidate(formbutt);
    if (error === 0) {
        let formButt = formbutt,
            parent = formButt.parentNode,
            firstname = parent.querySelector('#username'),
            nickname = parent.querySelector('#nickname'),
            chooseTarrif = document.querySelector('.text__and__price .text'),
            tel = parent.querySelector('#phone');
        const token = "2108676986:AAHpXF3U82xBQNfUBgNMXGHCOfYL98j-GqI";
        const chatId = "-635947338";
        let url = 'https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + chatId + '&text=';
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", url + "ArmyFitnes, у вас новый клиент.%0AИмя : " + firstname.value + ",%0AНикнейм : " + nickname.value + ",%0AТелефон : " + tel.value + ",%0AТариф : " + chooseTarrif.textContent, true);
        xhttp.send();
        parent.reset();
        window.open(formButt.getAttribute('data-url'), '_blank');
        document.querySelector(".form__block").classList.remove("show");
        document.body.classList.remove("dissabled");
    }
}

function formValidate(formbutt) {
    let error = 0;
    let parent = formbutt.parentNode
    let formReq = parent.querySelectorAll('.req');
    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        input.parentNode.classList.remove('error');
        if (input.classList.contains('phone')) {
            if (PhoneNumberValidate(input) === null) {
                input.classList.add('error');
                error++;
            }
        }
        else if (input.value === '') {
            input.classList.add('error');
            error++;
        }
    }
    return error;
}

function PhoneNumberValidate(input) {
    return input.value.match(/[+38]\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{2})\2([0-9]{2})/);
}

let validateInput = document.querySelectorAll('.validate__input');


validateInput.forEach(element => {
    element.onchange = function () {
        if (element.value !== "") {
            element.classList.remove('error');
        }
    };
});


let element = document.querySelector('#phone'),
    maskOptions = {
        mask: '+{38}(000)-000-00-00',
    }

let mask = new IMask(element, maskOptions);

IMask(
    document.getElementById('nickname'),
    {
        mask: '@num',
        blocks: {
            num: {
                mask: /^[a-zA-Z0-9!@#$%^&*()._-]*$/,
                thousandsSeparator: ' '
            }
        }
    }
)

IMask(
    document.getElementById('username'),
    {
        mask: /^[а-яА-ЯёЁ]*$/,
    }
);