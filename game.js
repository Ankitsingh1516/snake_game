// Audio files
let rollingSound = new Audio('rpg-dice-rolling-95182.mp3');
let winSound = new Audio('winharpsichord-39642.mp3');

// Red player's position
let p1sum = 0;

// Question data (example questions, you can add more)
const questions = [
    // {
    //     question: "What is 2 + 2?",
    //     options: ["3", "4", "5", "6"],
    //     correct: 1 // index of the correct answer
    // },
    {
        question: "What is the capital ofDuring the grand adventure, the balloon floated high, carrying chocolate and balloons, as a daring elephant joined the group of friends, grateful for the journey. They crossed the horizon towards an island, where kindness and lanterns guided them through the mountain paths, seeking peace and wisdom under the starry sky. France?",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
        correct: 0
    },
    // {
    //     question: "Which is the largest planet?",
    //     options: ["Earth", "Mars", "Jupiter", "Venus"],
    //     correct: 2
    // },
    // {
    //     question: "Which of these are primary colors?",
    //     options: ["Red", "Green", "Blue", "Yellow", "Orange"],
    //     correct: [0, 2, 3] // Red, Blue, Yellow
    // },
    // {
    //     question: "Which animals are mammals?",
    //     options: ["Dog", "Dolphin", "Crocodile", "Cat", "Snake"],
    //     correct: [0, 1, 3] // Dog, Dolphin, Cat
    // },
    {
        question: "Which of these are programming During the grand adventure, the balloon floated high, carrying chocolate and balloons, as a daring elephant joined the group of friends, grateful for the journey. They crossed the horizon towards an island, where kindness and lanterns guided them through the mountain paths, seeking peace and wisdom under the starry sky. languages?",
        options: ["Python", "HTML", "Java", "Ruby", "CSS"],
        correct: [0, 2, 3] // Python, Java, Ruby
    },
    {
        question: "Which of these are renewable energy During the grand adventure, the balloon floated high, carrying chocolate and balloons, as a daring elephant joined the group of friends, grateful for the journey. They crossed the horizon towards an island, where kindness and lanterns guided them through the mountain paths, seeking peace and wisdom under the starry sky. sources?",
        options: ["Solar", "Coal", "Wind", "Oil", "Hydropower"],
        correct: [0, 2, 4] // Solar, Wind, Hydropower
    },
    // {
    //     question: "Which of these are continents?",
    //     options: ["Asia", "Europe", "Africa", "Russia", "Australia"],
    //     correct: [0, 1, 2] // Asia, Europe, Africa
    // },
    // {
    //     question: "Which of these are planets in the solar system?",
    //     options: ["Mercury", "Pluto", "Venus", "Jupiter", "Moon"],
    //     correct: [0, 2, 3] // Mercury, Venus, Jupiter
    // },
    // {
    //     question: "Which of these are types of fruit?",
    //     options: ["Apple", "Carrot", "Mango", "Banana", "Spinach"],
    //     correct: [0, 2, 3] // Apple, Mango, Banana
    // },
    // {
    //     question: "Which of these are Olympic sports?",
    //     options: ["Soccer", "Chess", "Swimming", "Tennis", "Cricket"],
    //     correct: [0, 2, 3] // Soccer, Swimming, Tennis
    // },
    // {
    //     question: "Which of these are parts of a computer?",
    //     options: ["CPU", "RAM", "Monitor", "Smartphone", "Hard Drive"],
    //     correct: [0, 1, 4] // CPU, RAM, Hard Drive
    // },
    // {
    //     question: "Which of these are types of triangles?",
    //     options: ["Equilateral", "Isosceles", "Scalene", "Parallelogram", "Quadrilateral"],
    //     correct: [0, 1, 2] // Equilateral, Isosceles, Scalene
    // }
];

// Global flag to track if a question is active
let questionActive = false;

// Function to show a random question with a timer
function showQuestion(diceValue, callback) {
    questionActive = true;

    const questionIndex = Math.floor(Math.random() * questions.length);
    const question = questions[questionIndex];
    const numOptions = diceValue;

    const options = question.options.slice(0, numOptions);

    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.right = '2%'; // Position the modal to the right side
    modal.style.left = '72%';
    modal.style.transform = 'translateY(-50%)'; // Vertically center the modal
    modal.style.backgroundColor = '#fff';
    modal.style.padding = '20px';
    modal.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    modal.style.zIndex = '1000';

    const questionText = document.createElement('p');
    questionText.innerText = question.question;
    modal.appendChild(questionText);

    const timerText = document.createElement('p');
    timerText.innerText = "Time Left: 20s";
    modal.appendChild(timerText);

    let timer = 20;
    const timerInterval = setInterval(() => {
        timer--;
        timerText.innerText = `Time Left: ${timer}s`;
        if (timer <= 0) {
            clearInterval(timerInterval);
            document.body.removeChild(modal);
            questionActive = false;
            callback(false);
            alert("Time's up! You moved back one step.");
        }
    }, 1000);

    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.style.margin = '5px';
        button.onclick = () => {
            clearInterval(timerInterval);
            document.body.removeChild(modal);
            questionActive = false;
            const correctAnswers = question.correct;
            const isCorrect = correctAnswers.includes(index);
            callback(isCorrect);
        };
        modal.appendChild(button);
    });

    document.body.appendChild(modal);
}


// Function to handle ladders and show question
function handleLadder(player, destination, diceValue, callback) {
    showQuestion(diceValue, (correct) => {
        if (correct) {
            p1sum = destination;
            play(player, 'p1sum', 0, 0); // Refresh position
            alert("Correct answer! You climbed the ladder!");
        } else {
            alert("Wrong answer! You stay at the current position of the ladder.");
            play(player, 'p1sum', 0, 0); // Refresh position
        }
        callback();
    });
}
function handleSnake(player, destination, diceValue, callback) {
    showQuestion(diceValue, (correct) => {
        if (correct) {
            p1sum = destination;
            play(player, 'p1sum', 0, 0); // Refresh position
            alert("Correct answer! You escaped the snake!");
        } else {
            alert("Wrong answer! You stay at the current position of the snake.");
            play(player, 'p1sum', 0, 0); // Refresh position
        }
        callback();
    });
}


// Function to update player position and handle snakes and ladders
function play(player, psum, correction, num) {
    p1sum += num;

    if (p1sum > 100) {
        p1sum -= num;
    }

    // Snakes and ladders logic
    switch (p1sum) {
        case 1:
            handleLadder(player, 38, num, () => { });
            return;
        case 4:
            handleLadder(player, 14, num, () => { });
            return;
        case 8:
            handleLadder(player, 30, num, () => { });
            return;
        case 21:
            handleLadder(player, 42, num, () => { });
            return;
        case 28:
            handleLadder(player, 76, num, () => { });
            return;
        case 32: p1sum = 10; break;
        case 36: p1sum = 6; break;
        case 48: p1sum = 26; break;
        case 50:
            handleLadder(player, 67, num, () => { });
            return;
        case 62: p1sum = 18; break;
        case 71:
            handleLadder(player, 92, num, () => { });
            return;
        case 80:
            handleLadder(player, 99, num, () => { });
            return;
        case 88: p1sum = 24; break;
        case 95: p1sum = 56; break;
        case 97: p1sum = 78; break;
    }

    let sum = p1sum;

    document.getElementById(player).style.transition = `linear all .5s`;

    if (sum < 10) {
        document.getElementById(player).style.left = `${(sum - 1) * 62}px`;
        document.getElementById(player).style.top = `${-0 * 62 - correction}px`;
    } else if (sum === 100) {
        winSound.play();
        alert("Red Won!!");
        location.reload();
    } else {
        let numarr = Array.from(String(sum));
        let n1 = eval(numarr.shift());
        let n2 = eval(numarr.pop());

        if (n1 % 2 !== 0) {
            if (n2 === 0) {
                document.getElementById(player).style.left = `${9 * 62}px`;
                document.getElementById(player).style.top = `${(-n1 + 1) * 62 - correction}px`;
            } else {
                document.getElementById(player).style.left = `${(9 - (n2 - 1)) * 62}px`;
                document.getElementById(player).style.top = `${-n1 * 62 - correction}px`;
            }
        } else {
            if (n2 === 0) {
                document.getElementById(player).style.left = `0px`;
                document.getElementById(player).style.top = `${(-n1 + 1) * 62 - correction}px`;
            } else {
                document.getElementById(player).style.left = `${(n2 - 1) * 62}px`;
                document.getElementById(player).style.top = `${-n1 * 62 - correction}px`;
            }
        }
    }
}

// Dice roll button functionality
document.getElementById("diceBtn").addEventListener("click", function () {
    if (questionActive) {
        alert("Please answer the current question before rolling again.");
        return;
    }

    rollingSound.play();
    let num = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice").innerText = num;

    let diceElement = document.getElementById("dice");
    diceElement.classList.remove('one', 'two', 'three', 'four', 'five', 'six');
    diceElement.classList.add(num.toString());

    showQuestion(num, (correct) => {
        if (correct) {
            play('p1', 'p1sum', 0, num);
        } else {
            p1sum = Math.max(0, p1sum - 1);
            play('p1', 'p1sum', 0, 0);
            alert("Wrong answer! You moved back one step.");
        }
    });
});
