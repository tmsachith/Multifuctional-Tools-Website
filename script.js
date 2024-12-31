// Tool management
const toolContainer = document.getElementById('tool-container');
const toolButtons = document.querySelectorAll('.tool-button');

toolButtons.forEach(button => {
    button.addEventListener('click', () => {
        const toolId = button.getAttribute('data-tool');
        showTool(toolId);
    });
});

function showTool(toolId) {
    // Remove active class from all buttons
    toolButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    document.querySelector(`[data-tool="${toolId}"]`).classList.add('active');

    // Clear the tool container
    toolContainer.innerHTML = '';

    // Show the selected tool
    switch(toolId) {
        case 'calculator':
            toolContainer.innerHTML = createCalculator();
            break;
        case 'todo-list':
            toolContainer.innerHTML = createTodoList();
            break;
        case 'countdown-timer':
            toolContainer.innerHTML = createCountdownTimer();
            break;
        case 'unit-converter':
            toolContainer.innerHTML = createUnitConverter();
            break;
        case 'password-generator':
            toolContainer.innerHTML = createPasswordGenerator();
            break;
        case 'bmi-calculator':
            toolContainer.innerHTML = createBMICalculator();
            break;
    }
}

// Tool creation functions
function createCalculator() {
    return `
        <div class="tool" id="calculator">
            <h2>Calculator</h2>
            <div class="calculator">
                <input type="text" id="display" readonly>
                <div class="buttons">
                    <button onclick="appendToDisplay('7')">7</button>
                    <button onclick="appendToDisplay('8')">8</button>
                    <button onclick="appendToDisplay('9')">9</button>
                    <button onclick="appendToDisplay('+')">+</button>
                    <button onclick="appendToDisplay('4')">4</button>
                    <button onclick="appendToDisplay('5')">5</button>
                    <button onclick="appendToDisplay('6')">6</button>
                    <button onclick="appendToDisplay('-')">-</button>
                    <button onclick="appendToDisplay('1')">1</button>
                    <button onclick="appendToDisplay('2')">2</button>
                    <button onclick="appendToDisplay('3')">3</button>
                    <button onclick="appendToDisplay('*')">*</button>
                    <button onclick="appendToDisplay('0')">0</button>
                    <button onclick="appendToDisplay('.')">.</button>
                    <button onclick="calculate()">=</button>
                    <button onclick="appendToDisplay('/')">/</button>
                    <button onclick="clearDisplay()">C</button>
                </div>
            </div>
        </div>
    `;
}

function createTodoList() {
    return `
        <div class="tool" id="todo-list">
            <h2>To-Do List</h2>
            <div class="todo-container">
                <input type="text" id="todo-input" placeholder="Enter a new task">
                <button onclick="addTodo()">Add Task</button>
                <ul id="todo-items"></ul>
            </div>
        </div>
    `;
}

function createCountdownTimer() {
    return `
        <div class="tool" id="countdown-timer">
            <h2>Countdown Timer</h2>
            <div class="timer-container">
                <input type="number" id="minutes" placeholder="Minutes" min="0">
                <input type="number" id="seconds" placeholder="Seconds" min="0" max="59">
                <button onclick="startTimer()">Start</button>
                <button onclick="stopTimer()">Stop</button>
                <div id="timer-display">00:00</div>
            </div>
        </div>
    `;
}

function createUnitConverter() {
    return `
        <div class="tool" id="unit-converter">
            <h2>Unit Converter</h2>
            <div class="converter-container">
                <select id="conversion-type" onchange="populateUnitSelects()">
                    <option value="length">Length</option>
                    <option value="weight">Weight</option>
                    <option value="temperature">Temperature</option>
                </select>
                <input type="number" id="from-value" placeholder="From">
                <select id="from-unit"></select>
                <input type="number" id="to-value" placeholder="To" readonly>
                <select id="to-unit"></select>
                <button onclick="convert()">Convert</button>
            </div>
        </div>
    `;
}

function createPasswordGenerator() {
    return `
        <div class="tool" id="password-generator">
            <h2>Random Password Generator</h2>
            <div class="password-generator-container">
                <div class="options">
                    <label>
                        <input type="checkbox" id="uppercase" checked> Uppercase
                    </label>
                    <label>
                        <input type="checkbox" id="lowercase" checked> Lowercase
                    </label>
                    <label>
                        <input type="checkbox" id="numbers" checked> Numbers
                    </label>
                    <label>
                        <input type="checkbox" id="symbols"> Symbols
                    </label>
                </div>
                <div class="length-container">
                    <label for="password-length">Password Length:</label>
                    <input type="number" id="password-length" min="8" max="128" value="12">
                </div>
                <button onclick="generatePassword()">Generate Password</button>
                <input type="text" id="password-output" readonly>
                <button onclick="copyPassword()">Copy Password</button>
            </div>
        </div>
    `;
}

function createBMICalculator() {
    return `
        <div class="tool" id="bmi-calculator">
            <h2>BMI Calculator</h2>
            <div class="bmi-calculator-container">
                <div class="input-group">
                    <label for="height">Height:</label>
                    <input type="number" id="height" placeholder="cm">
                </div>
                <div class="input-group">
                    <label for="weight">Weight:</label>
                    <input type="number" id="weight" placeholder="kg">
                </div>
                <button onclick="calculateBMI()">Calculate BMI</button>
                <div id="bmi-result" class="result-display"></div>
                <div id="bmi-category" class="category-display"></div>
            </div>
        </div>
    `;
}
// Calculator functions
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    try {
        const result = eval(document.getElementById('display').value);
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

// To-Do List functions
function addTodo() {
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-items');
    
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = input.value;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() {
            todoList.removeChild(li);
        };
        
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
        input.value = '';
    }
}

// Countdown Timer functions
let timerInterval;

function startTimer() {
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    let totalSeconds = minutes * 60 + seconds;

    clearInterval(timerInterval);

    timerInterval = setInterval(function() {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            document.getElementById('timer-display').textContent = "Time's up!";
        } else {
            const minutesRemaining = Math.floor(totalSeconds / 60);
            const secondsRemaining = totalSeconds % 60;
            document.getElementById('timer-display').textContent = 
                `${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
            totalSeconds--;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

// Unit Converter functions
const conversions = {
    length: {
        meter: 1,
        kilometer: 1000,
        centimeter: 0.01,
        millimeter: 0.001,
        inch: 0.0254,
        foot: 0.3048,
        yard: 0.9144,
        mile: 1609.34
    },
    weight: {
        gram: 1,
        kilogram: 1000,
        milligram: 0.001,
        pound: 453.592,
        ounce: 28.3495
    },
    temperature: {
        celsius: 'C',
        fahrenheit: 'F',
        kelvin: 'K'
    }
};

function populateUnitSelects() {
    const conversionType = document.getElementById('conversion-type').value;
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');
    
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    for (const unit in conversions[conversionType]) {
        fromUnit.add(new Option(unit, unit));
        toUnit.add(new Option(unit, unit));
    }
}

function convert() {
    const conversionType = document.getElementById('conversion-type').value;
    const fromValue = parseFloat(document.getElementById('from-value').value);
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    
    if (isNaN(fromValue)) {
        alert('Please enter a valid number');
        return;
    }
    
    let result;
    
    if (conversionType === 'temperature') {
        result = convertTemperature(fromValue, fromUnit, toUnit);
    } else {
        const baseValue = fromValue * conversions[conversionType][fromUnit];
        result = baseValue / conversions[conversionType][toUnit];
    }
    
    document.getElementById('to-value').value = result.toFixed(4);
}

function convertTemperature(value, from, to) {
    if (from === to) return value;
    
    if (from === 'celsius') {
        if (to === 'fahrenheit') return (value * 9/5) + 32;
        if (to === 'kelvin') return value + 273.15;
    }
    if (from === 'fahrenheit') {
        if (to === 'celsius') return (value - 32) * 5/9;
        if (to === 'kelvin') return (value - 32) * 5/9 + 273.15;
    }
    if (from === 'kelvin') {
        if (to === 'celsius') return value - 273.15;
        if (to === 'fahrenheit') return (value - 273.15) * 9/5 + 32;
    }
}

// Event listeners
document.getElementById('conversion-type').addEventListener('change', populateUnitSelects);
window.addEventListener('load', populateUnitSelects);

// Password Generator functions
function generatePassword() {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    chars += document.getElementById("uppercase").checked ? uppercase : "";
    chars += document.getElementById("lowercase").checked ? lowercase : "";
    chars += document.getElementById("numbers").checked ? numbers : "";
    chars += document.getElementById("symbols").checked ? symbols : "";

    const passwordLength = document.getElementById("password-length").value;

    if (chars.length === 0) {
        alert("Please select at least one character type.");
        return;
    }

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById("password-output").value = password;
}

function copyPassword() {
    const passwordOutput = document.getElementById("password-output");
    passwordOutput.select();
    passwordOutput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    alert("Password copied to clipboard!");
}

// Event listeners
document.getElementById("password-length").addEventListener("change", function() {
    let value = parseInt(this.value);
    if (value < 8) this.value = 8;
    if (value > 128) this.value = 128;
});

// BMI Calculator functions
function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert('Please enter valid height and weight values.');
        return;
    }

    const bmi = weight / ((height / 100) ** 2);
    const roundedBMI = bmi.toFixed(1);

    document.getElementById('bmi-result').textContent = `Your BMI: ${roundedBMI}`;
    
    let category;
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 25) {
        category = 'Normal weight';
    } else if (bmi < 30) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }

    document.getElementById('bmi-category').textContent = `Category: ${category}`;
}

// BMI Calculator event listeners
document.getElementById('height').addEventListener('input', validateInput);
document.getElementById('weight').addEventListener('input', validateInput);

function validateInput(e) {
    if (e.target.value < 0) {
        e.target.value = '';
    }
}

// Initialize the first tool (Calculator) on page load
window.onload = () => showTool('calculator');