const ham = document.getElementById('ham');
const dropdown = document.getElementById('dropdown');
const theme = document.getElementById('theme');
const color = document.getElementById('color');
const stepsContainer = document.querySelector('.subgoal-container');
const elem = document.getElementById('myBar');
const hero = document.getElementById('hero');
const newGoalLink = document.getElementById('newGoal');

// Get info from localStorage
const myGoal = JSON.parse(localStorage.getItem('myGoal'));

let steps = [];
let idCounter = 0;
let preset = 20;

// Nav bar
ham.addEventListener('click', () => dropdown.classList.toggle('show'));

// Create text from goaldata
function updateText() {
   let idArr = steps.map(steps => steps.id);
   let stepsArr = steps.map(steps => steps.name);

   stepsArr.forEach(string => {
      const item = document.createElement('div');
      item.innerHTML = `
      <i style="font-size:200%" id="${idArr[idCounter]}"></i><h2>${string}</h2>
         `;
      stepsContainer.appendChild(item);
      item.classList.add('subgoal-box');

      idCounter++;
   });
}

function setMain() {
   document.getElementById('main-title').innerText = myGoal[0].name;
   if (!localStorage.getItem('steps')) {
      steps = myGoal;
      steps.shift();
      localStorage.setItem('steps', JSON.stringify(steps));
   } else {
      steps = JSON.parse(localStorage.getItem('steps'));
   }
}

// Click event to finish goal
stepsContainer.addEventListener('click', e => {
   const clickedEl = e.target;
   if (clickedEl.className === 'subgoal-box') {
      let x = clickedEl.children[1].innerText;
      let y = clickedEl.children[0].id;

      steps.forEach(name => {
         if (name.name === x && name.completed === false) {
            name.completed = true;
            // console.log(steps);
            localStorage.setItem('steps', JSON.stringify(steps));
            steps = steps;
         } else if (name.name === x && name.completed === true) {
            name.completed = false;
            localStorage.setItem('steps', JSON.stringify(steps));
            steps = steps;
         }
      });
   }
   checkIfCompleted();
});

function checkIfCompleted() {
   steps.forEach(name => {
      if (name.completed === true) {
         let cId = name.id;
         document.getElementById(cId).classList.add('fa-check');
         document.getElementById(cId).classList.add('fas');
      } else if (name.completed === false) {
         let cId = name.id;
         document.getElementById(cId).classList.remove('fa-check');
         document.getElementById(cId).classList.remove('fas');
      }
   });
   updateProg();
}

function updateProg() {
   let progC = 0;
   steps.forEach(name => {
      if (name.completed === true) {
         progC++;
      }
   });
   let percent = (progC * 100) / steps.length;
   progress(percent);
}

function progress(percent) {
   let left = percent;

   hero.style.left = left - 10 + '%';
   elem.style.width = left + '%';
}

// Change theme
function setLight() {
   document.documentElement.style.setProperty('--main-color', '#7BFED6');
   document.documentElement.style.setProperty('--secondary-color', '#AEFFE7');
   document.documentElement.style.setProperty('--text-color', 'black');
}

function setDark() {
   document.documentElement.style.setProperty('--main-color', '#0C4951');
   document.documentElement.style.setProperty('--secondary-color', '#387780');
   document.documentElement.style.setProperty('--text-color', '#fff');
}

let style = getComputedStyle(document.body);
// console.log(style.getPropertyValue('--main-color'));

// Eventlisteners
newGoalLink.addEventListener('click', () => {
   localStorage.clear();
   window.open('../index.html', '_self');
});

theme.addEventListener('click', e => {
   const dark = style.getPropertyValue('--main-color');
   e.preventDefault();
   if (dark === '#0C4951') {
      setLight();
   } else {
      setDark();
   }
});

function init() {
   setMain();
   updateText();
   checkIfCompleted();
   updateProg();
   progress();
}

init();
