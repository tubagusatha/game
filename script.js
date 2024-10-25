const car = document.getElementById("car");
const scoreDisplay = document.getElementById("score");
const opponents = document.querySelectorAll(".opponent");
const finishLine = document.getElementById("finish-line");

let score = 0;
let carPosition = 175; // Posisi awal mobil (px dari kiri)
let carYPosition = 500; // Posisi awal mobil (px dari bawah)
const moveDistance = 10; // Jarak mobil bergerak ke kiri/kanan (px)
const moveForwardDistance = 2; // Jarak mobil maju (px)
let gameInterval;

// Menggerakkan mobil
function moveCar(direction) {
  if (direction === 'left' && carPosition > 0) {
    carPosition -= moveDistance;
  } else if (direction === 'right' && carPosition < 350) {
    carPosition += moveDistance;
  }
  car.style.left = carPosition + 'px';
}

// Menggerakkan mobil maju
function moveForward() {
  carYPosition -= moveForwardDistance;
  car.style.bottom = carYPosition + 'px';
}

// Mendapatkan input dari keyboard
document.addEventListener("keydown", function(event) {
  if (event.key === 'a' || event.key === 'ArrowLeft') {
    moveCar('left');
  } else if (event.key === 'd' || event.key === 'ArrowRight') {
    moveCar('right');
  } else if (event.key === 'w' || event.key === 'ArrowUp') {
    moveForward();
    startGame();
  }
});

// Cek garis finish
function checkFinish() {
  const carRect = car.getBoundingClientRect();
  const finishLineRect = finishLine.getBoundingClientRect();

  // Jika mobil melewati garis finish
  if (carRect.y < finishLineRect.y + finishLineRect.height) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    resetGame();
  }
}

// Reset game
function resetGame() {
  carPosition = 175;
  carYPosition = 500;
  car.style.left = carPosition + 'px';
  car.style.bottom = carYPosition + 'px';
}

// Mulai permainan
function startGame() {
  if (!gameInterval) {
    gameInterval = setInterval(() => {
      moveForward(); // Mobil akan terus maju jika tombol ditekan
      checkFinish();
    }, 50);
  }
}

// Hentikan permainan saat tombol dilepas
document.addEventListener("keyup", function(event) {
  if (event.key === 'w' || event.key === 'ArrowUp') {
    clearInterval(gameInterval);
    gameInterval = null; // Reset interval
  }
});

// Mulai cek garis finish
setInterval(() => {
  checkFinish();
}, 50);
