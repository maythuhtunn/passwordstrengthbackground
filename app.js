//UI
const background = document.getElementById('background');

const btns = document.querySelectorAll('.input-btn');
const password = document.getElementById('password'),
    eyeicon = document.getElementById('eye');

const upper = document.getElementById('capital'),
    small = document.getElementById('small'),
    number = document.getElementById('number'),
    lengthel = document.getElementById('length'),
    special = document.getElementById('special');

const ulel = document.getElementById('ullist');
var specialchar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

function passwordcheck(e){

    
    //Check Length
    if(this.value.length > 8){
        lengthel.style.display = "block";
    }else{
        lengthel.style.display = "none";
    }
    
    //check special character
    if(specialchar.test(this.value)){
        special.style.display = "block";
    }else{
        special.style.display = "none";
    }
    
    //check uppercase
    if(/[A-Z]/.test(this.value)){
        upper.style.display = "block";
    }else{
        upper.style.display = "none";
    }
    
    //check lower case
    if(/[a-z]/.test(this.value)){
        small.style.display = "block";
    }else{
        small.style.display = "none";
    }
    
    //check number
    if(/\d/.test(this.value)){
        number.style.display = "block";
    }else{
        number.style.display = "none";
    }

    //show background
    const inlength = this.value.length;
    if((/\d/.test(this.value)) && (/[A-Z]/.test(this.value)) && (specialchar.test(this.value))){
        const blurvalue = 20 - inlength * 2;

        background.style.filter = `blur(${blurvalue}px)`;
    
    }

}


//add Event Listener
btns.forEach(btn=>{
    // console.log(btn);
    btn.addEventListener('click',(e)=>{
        // console.log(e.target.parentElement.parentElement);
                        //i            button   form-group
        const target = e.target.parentElement.parentElement;
        target.classList.toggle('active');
        e.preventDefault();

    });
});

eyeicon.addEventListener('click',()=>{
    // console.log("hey");
    if(eyeicon.classList.contains('fa-eye-slash')){
        // console.log('hide password');

        eyeicon.classList.replace("fa-eye-slash","fa-eye");

        password.setAttribute("type","text");

    }else{
        // console.log('hide password');
        eyeicon.classList.replace('fa-eye','fa-eye-slash');

        password.setAttribute("type","password");
    }
});

password.addEventListener('input',passwordcheck);


//Modal box
const submitbtn = document.getElementById('submit'),
    closemodal = document.getElementById('close-modal')
    modalbox = document.getElementById('modal');

//Event Listener
//show modal box
submitbtn.addEventListener('click',()=>{
    // console.log(password.value);
    if((/\d/.test(password.value)) && (/[a-z]/.test(password.value)) && (/[A-Z]/.test(password.value)) && (specialchar.test(password.value)) && (password.value.length > 8)){

    modalbox.classList.add('showmodal');
    }else{
        window.alert('Your password must have number, special character, uppercase, lowercase and length of greater than 8. ')
    }
});


//hide modal box
closemodal.addEventListener('click',()=>{
    modalbox.classList.remove('showmodal');
});

//hide modal outside click
window.addEventListener('click',(e)=>e.target === modal ? modalbox.classList.remove('showmodal') : false);



//Quiz Area
const quizdata = [
    {
        question:"1. What is this ?",
        image: `img/tangerine.png` ,
        a:"Watermelon",
        b:"Pineapple",
        c:"Tangerine",
        d:"Lemon",
        correct:"c"
    },
    {
        question:"2. What is this ?",
        image:`img/pomegranate.png`,
        a:"Cherry",
        b:"Pomegranate",
        c:"Damson",
        d:"Peach",
        correct:"b"
    },
    {
        question:"3. What is this ?",
        image:`img/watermelon.png`,
        a:"Watermelon",
        b:"Grapes",
        c:"Cucumber",
        d:"Melon",
        correct:"a"
    },
    {
        question:"4. What is this ?",
        image:`img/cherry.png`,
        a:"Damson",
        b:"Apple",
        c:"Guava",
        d:"Cherry",
        correct:"d"
    },
    {
        question:"5. What is this ?",
        image:`img/coconut.png`,
        a:"Mango",
        b:"Lemon",
        c:"Coconut",
        d:"Dates",
        correct:"c"
    }
];

const quiz = document.getElementById('quiz');
const questions = document.getElementById('question');
const answerels = document.querySelectorAll('.answer');
var scoreheader = document.getElementById('score-header');

const images = document.querySelector('image');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');

const submitansbtn = document.getElementById('submitans');
const startbtn = document.querySelector('.start');
const resetbtn = document.querySelector('.reset');
const display = document.getElementById('timer');

let [milliseconds,seconds,minutes,hours] = [0,0,0,0];

let currentquiz = 0;
let score = 0;
let time;

function loadquiz(){

    deselectanswers();
    // starttimer();

    const currentquizdata = quizdata[currentquiz];

    question.innerText = currentquizdata.question;
    img.src = currentquizdata.image;
    a_text.innerText = currentquizdata.a;
    b_text.innerText = currentquizdata.b;
    c_text.innerText = currentquizdata.c;
    d_text.innerText = currentquizdata.d;

}
loadquiz();



function deselectanswers(){
    answerels.forEach((answerel)=> answerel.checked = false);
}

function getselected() {

    let answer;

    answerels.forEach((answerel) => {

        if (answerel.checked) {
            answer = answerel.id;
        }
    });

    return answer;

}

submitansbtn.addEventListener('click',()=>{


    let answer = getselected();

    if(answer){
        if(answer===quizdata[currentquiz].correct){
        score ++;
        scoreheader.innerText = score;
        }
      currentquiz++;

        if(currentquiz < quizdata.length) {
            loadquiz();
        }else {
            quiz.innerHTML =
            `            
            <h2 class="reloadtext">You answered correct at ${score} / ${quizdata.length} questions.</h2>
            <button class="reloadbtn" onclick="location.reload()">Reload</button>
            `;
        }
    }

});


startbtn.addEventListener('click',playpause);
resetbtn.addEventListener('click',resettimer);

function playpause(e){
    if(e.target.classList.contains('fa-play')){
        starttimer();
        e.target.className = "fas fa-pause";
    }else{
        pausetimer();
        e.target.className = "fas fa-play";
    }
}

//Start Timer
function starttimer(){
    // console.log('start timer');
    if(time !== null){
        clearInterval(time);
    }
    time = setInterval(displaytimer,10);

}

//Pause Timer
function pausetimer(){
    // console.log('pause timer');
    clearInterval(time);
}


function resettimer(){
    // console.log('reset timer');
    clearInterval(time);
    [milliseconds,seconds,minutes,hours] = [0,0,0,0];
    display.textContent = "00 : 00 : 000";

    // console.log(startbtn.classList);
    // startbtn.className = "fas fa-play";
}

function displaytimer(){
    // console.log('hey i working');
    milliseconds +=10;
    // console.log(milliseconds);

    if(milliseconds === 1000){
        milliseconds = 0;
        // console.log(milliseconds);

        //seconds +=1
        
        seconds++;
        // console.log(seconds);

        if(seconds === 60){
            seconds = 0;
            // console.log(seconds);

            minutes++;
            // console.log(minutes);

            if(minutes === 60){
                minutes = 0;

                hours++;
            }
        }

    }

    let m = minutes < 10 ? "0"+minutes : minutes;
    let s = seconds < 10 ? "0"+seconds : seconds;
    let ms = milliseconds < 10 ? "00"+milliseconds : milliseconds < 100 ? "0"+milliseconds : milliseconds;

    display.innerText = ` ${m} : ${s} : ${ms}`;

   
}



// for
// forEach
// for in => object like array
// for of
// while
// do while =>pure value output
// mapping => object output