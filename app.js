// localStorage загрузка
let exercises = JSON.parse(localStorage.getItem('exercises')) || [];
let meals = JSON.parse(localStorage.getItem('meals')) || [];
let water = parseInt(localStorage.getItem('water')) || 0;

const exerciseList = document.getElementById('exerciseList');
const mealList = document.getElementById('mealList');
const waterAmount = document.getElementById('waterAmount');

function render() {
    exerciseList.innerHTML = '';
    exercises.forEach((ex, index) => {
        const li = document.createElement('li');
        li.textContent = ex.name;
        if (ex.done) li.classList.add('completed');
        li.onclick = () => toggleExercise(index);
        const btn = document.createElement('button');
        btn.textContent = "✕";
        btn.onclick = (e) => { e.stopPropagation(); removeExercise(index); };
        li.appendChild(btn);
        exerciseList.appendChild(li);
    });

    mealList.innerHTML = '';
    meals.forEach((meal, index) => {
        const li = document.createElement('li');
        li.textContent = meal;
        const btn = document.createElement('button');
        btn.textContent = "✕";
        btn.onclick = () => removeMeal(index);
        li.appendChild(btn);
        mealList.appendChild(li);
    });

    waterAmount.textContent = water;
    localStorage.setItem('exercises', JSON.stringify(exercises));
    localStorage.setItem('meals', JSON.stringify(meals));
    localStorage.setItem('water', water);
}

function addExercise() {
    const input = document.getElementById('exerciseInput');
    if (input.value.trim()) {
        exercises.push({ name: input.value.trim(), done: false });
        input.value = '';
        render();
    }
}

function toggleExercise(index) {
    exercises[index].done = !exercises[index].done;
    render();
}

function removeExercise(index) {
    exercises.splice(index, 1);
    render();
}

function addMeal() {
    const input = document.getElementById('mealInput');
    if (input.value.trim()) {
        meals.push(input.value.trim());
        input.value = '';
        render();
    }
}

function removeMeal(index) {
    meals.splice(index, 1);
    render();
}

function addWater(amount) {
    water += amount;
    render();
}

function resetWater() {
    water = 0;
    render();
}

render();
