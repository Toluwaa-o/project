const hamburger = document.getElementById('hamburger')
const navbar = document.querySelector('.navBar')
const hamburg = document.querySelectorAll('#hamburger > div')
const loader = document.querySelector('.cover')

hamburger.addEventListener('click', ()=> {
    navbar.style.display = navbar.style.display === 'none' ? 'block' : 'none'
    hamburg[0].classList.toggle('firstburger')
    hamburg[1].classList.toggle('middleburger')
    hamburg[2].classList.toggle('lastburger')
})

const signIn = document.querySelector('.signin')
const emailEl = document.getElementById('e-mail')
const pword = document.getElementById('p-word')

const whenFocused = (e) => {
    e.target.setAttribute('placeholder', '')
}

const whenBlur = (e) => {
    const {name} = e.target
    e.target.setAttribute('placeholder', `${name}`)
}

emailEl.addEventListener('focus', whenFocused)
emailEl.addEventListener('blur', whenBlur)

pword.addEventListener('focus', whenFocused)
pword.addEventListener('blur', whenBlur)

const togglePass = () => {
    pword.type = pword.type === 'password' ? 'text' : 'password'
    let link = null;
    link = pwordTog.getAttribute('src') === 'images/Eye.svg' ? 'images/EyeSlash.svg' : 'images/Eye.svg'

    pwordTog.setAttribute('src', link)
}

const pwordTog = document.querySelector('.passToggle')

pwordTog.addEventListener('click', togglePass);

const inputEl = document.querySelectorAll('.inputEl')
const errorMsg = document.querySelectorAll('.error-msg')
let valid= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[hotmail||yahoo||outlook||gmail||icloud||mucg.edu]+(?:\.[com||gh]+)*$/;

const validator = () => {
    fetch('./mucg-data.json')
    .then(data => data.json())
    .then(res => {
        for(item of res[1]){
            if(emailEl.value === item.email && pword.value === item.password){
                loader.style.display = 'grid'
                setTimeout(()=>{
                    loader.style.display = 'none'
                    fillEverything(item);
                loginPage.style.display = 'none'
                }, 2000)
            }else {
                if(emailEl.value !== item.email){
                    let stored = errorMsg[0].textContent;
                    errorMsg[0].textContent = `Incorrect email address`;
                    errorMsg[0].style.visibility = 'visible';
                    inputEl[0].style.borderBottom = '1px solid var(--red)'
                    setTimeout(()=>{
                    errorMsg[0].textContent = stored;
                    errorMsg[0].style.visibility = 'hidden'
                    inputEl[0].style.borderBottom = '1px solid var(--main)'
                }, 2500)
                }

                if(pword.value !== item.password){
                    let stored = errorMsg[1].textContent;
                    errorMsg[1].textContent = `Incorrect password`;
                    errorMsg[1].style.visibility = 'visible';
                    inputEl[1].style.borderBottom = '1px solid var(--red)'
                    setTimeout(()=>{
                    errorMsg[1].textContent = stored;
                    errorMsg[1].style.visibility = 'hidden'
                    inputEl[1].style.borderBottom = '1px solid var(--main)'
                }, 2500)
                }
            }
        }})
}

const submitter = () => {
    for(let i = 0; i < inputEl.length; i++) {

        if(inputEl[i].value === ''){
            let stored = errorMsg[i].textContent;
            errorMsg[i].textContent = 'This field is empty';
            errorMsg[i].style.visibility = 'visible';
            inputEl[i].style.borderBottom = '1px solid var(--red)'
            setTimeout(()=>{
                errorMsg[i].textContent = stored;
                errorMsg[i].style.visibility = 'hidden'
                inputEl[i].style.borderBottom = '1px solid var(--main)'
            }, 2500)
        }else if(!inputEl[0].value.match(valid)){
            errorMsg[i].style.visibility = 'visible';
            inputEl[i].style.borderBottom = '1px solid var(--red)'
            setTimeout(()=>{
                errorMsg[i].style.visibility = 'hidden'
                inputEl[i].style.borderBottom = '1px solid var(--main)'
            }, 2500)
        }else {
            validator()
        }
    }
}

signIn.addEventListener('click', submitter)

const loginPage = document.querySelector('.login')
const imPage = document.querySelector('.important')

const fillEverything = (item) => {
    imPage.style.display = 'block'
}