//Selectors
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 8;
var yeah = document.getElementById("yeah");
var masterAudio = document.getElementById("master");
var musicIcon = document.getElementById("music-icon");
var isPlaying = false;
// Lives count
playerLivesCount.textContent = playerLives;

//Data generator
const getData = () => [
    { imgSrc: "./images/kill.jpg", name: "Kill" },
    { imgSrc: "./images/master.jpg", name: "Master" },
    { imgSrc: "./images/black.jpg", name: "Black" },
    { imgSrc: "./images/anger.jpg", name: "Anger" },
    { imgSrc: "./images/hardwired.jpg", name: "Hardwired" },
    { imgSrc: "./images/ride.jpg", name: "Ride" },
    { imgSrc: "./images/justice.jpg", name: "Justice" },
    { imgSrc: "./images/death.jpg", name: "Death" },
    { imgSrc: "./images/kill.jpg", name: "Kill" },
    { imgSrc: "./images/master.jpg", name: "Master" },
    { imgSrc: "./images/black.jpg", name: "Black" },
    { imgSrc: "./images/anger.jpg", name: "Anger" },
    { imgSrc: "./images/hardwired.jpg", name: "Hardwired" },
    { imgSrc: "./images/ride.jpg", name: "Ride" },
    { imgSrc: "./images/justice.jpg", name: "Justice" },
    { imgSrc: "./images/death.jpg", name: "Death" },
    
];

// Randomizer

const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};


// Card generator function 

const cardGenerator = () => {
    const cardData = randomize();
    //Generate HTML
        
        cardData.forEach((item, index) => {
        const card = document.createElement("div");
        const face = document.createElement('img');
        const back = document.createElement("div");
        card.classList = 'card';
        face.classList = "face";
        back.classList = "back";
    // Attach the info to the cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);    
    // Attach card into section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener("click", (e) => {
            
            card.classList.toggle("toggleCard");
            checkCard(e);
        });
    });
};
// Check cards 
const checkCard = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');
    // If statement 
    if(flippedCards.length === 2){
        if(flippedCards[0].getAttribute('name') === 
        flippedCards[1].getAttribute('name')
        ) {
            console.log("match");
            playYeah();
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = 'none';
            });
        } else {
            console.log("wrong");
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                setTimeout(() =>  card.classList.remove('toggleCard'), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if(playerLives === 0) {
                restart("Sad but true... you lose.");
            }
        }
    }
    // Check if game won
        if(toggleCard.length === 16){
            restart("You win ! Enter champagne, yeah!");
        }
};

//Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard");
    // Randomize
    setTimeout(() => {
    cards[index].style.pointerEvents = "all";
    faces[index].src = item.imgSrc;
    cards[index].setAttribute('name', item.name);
    section.style.pointerEvents = "all";
    }, 1000);
    });
    playerLives = 8;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
};

// Audio

function playYeah() {
    yeah.play();
}

function togglePlay() {
    isPlaying ? masterAudio.pause() : masterAudio.play();
};

masterAudio.onplaying = function () {
    isPlaying = true;
    musicIcon.classList.add("audio-play")
};
masterAudio.onpause = function () {
    isPlaying = false;
    musicIcon.classList.remove("audio-play")
};


cardGenerator();