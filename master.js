
let primer = document.querySelector('.primer')
let otvet = document.querySelectorAll('.otvet')
let current = 0
let questNum_given = 0
let correct_given = 0
let znaki = ['+', '-', '/', '*']
let start_btn = document.querySelector('.start-btn')
let start_scrin = document.querySelector('.start-scrin')
let main_scrin = document.querySelector('.main-scrin')
let h3 = document.querySelector('.h3')
let cookie = false
let cookies = document.cookie.split('; ')

for (let i = 0; i< cookie.length; i+=1) {
    if (cookies[i].split('=')[0] == 'numbers_hight_score') {
        cookie = cookies[i].split('=')[1]
        break
    }
}

function getRandomSign() {
    return znaki[randint(0,3)]
}

function randint(min,max) {
    return Math.round(Math.random() * (max-min)+min)
}

function shuffle(array) { 
    let currentIndex = array.length,  randomIndex; 
    while (currentIndex != 0) { 
        randomIndex = Math.floor(Math.random() * currentIndex); 
        currentIndex--; 
        [array[currentIndex], array[randomIndex]] = [ array[randomIndex], array[currentIndex]]; 
    } 
    return array; 
} 

class Question {    
    constructor() {
        let a = randint(1,30)
        let b = randint(1,30)
        this.znak = getRandomSign()
        this.quest = `${a} ${this.znak} ${b}`
        if(this.znak == '+') {
            this.correct = a + b
        }else if(this.znak == '-') {
            this.correct = a - b
        }else if(this.znak == '/') {
            this.correct = a / b
        }else if(this.znak == '*') {
            this.correct = a * b
        }
        this.answers = [
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct - 15, this.correct - 1),
            this.correct,
            randint(this.correct + 1, this.correct + 15),
            randint(this.correct + 1, this.correct + 15)
        ]
        shuffle(this.answers)

        for(let i = 0; i < this.answers.length; i++){
            if(!Number.isInteger(this.answers[i])) {
                this.answers[i] = this.answers[i].toFixed(2);
            }
        }
    }
    display() {
        primer.innerHTML = this.quest;
        for(let i = 0; i < otvet.length; i++){
            otvet[i].innerHTML = this.answers[i]
        }
    }
}

for (let i = 0; i < otvet.length; i += 1) { 
    otvet[i].addEventListener('click', function() { 
        if (otvet[i].innerHTML == current.correct) {
            correct_given += 1
            otvet[i].style.background = '#00FF00' 
            anime({ 
                targets: otvet[i], 
                background: '#FFFFFF', 
                duration: 500, 
                delay: 100, 
                easing: 'linear' 
            }) 
        } else { 
            otvet[i].style.background = '#FF0000' 
            anime({ 
                targets: otvet[i], 
                background: '#FFFFFF', 
                duration: 500, 
                delay: 100, 
                easing: 'linear' 
            }) 
        } 
        questNum_given += 1 
        current = new Question() 
        current.display() 
    }) 
}

start_btn.addEventListener('click', function() {
    main_scrin.style.display = 'flex'
    start_scrin.style.display = 'none'
    correct_given = 0;
    questNum_given = 1;
    current = new Question() 
    current.display() 

    setTimeout(function(){
        let new_cookie = `numbers_high_score = ${questNum_given}/${correct_given}; max-age = 10000000000`
        document.cookie = new_cookie

        main_scrin.style.display = 'none'
        start_scrin.style.display = 'flex'
        h3.innerHTML = `<h3> Вы дали ${correct_given} правильых ответов из ${questNum_given}. Точность - ${Math.round(correct_given * 100 / questNum_given)}%. </h3>`
    },10000)
})

if (cookie) {
    let data = cookie.split('/')
    h3.innerHTML = `<h3> В прошлый раз вы дали ${data[1]} правильых ответов из ${data[0]}. Точность - ${Math.round(data[1] * 100 / data[0])}%. </h3>`
}
