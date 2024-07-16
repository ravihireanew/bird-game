document.addEventListener('DOMContentLoaded', () => {
    const bird = document.getElementById('bird');
    const pipes = document.querySelectorAll('.pipe');
    const gameContainer = document.getElementById('game-container');
    const scoreDisplay = document.getElementById('score');
    const audio = document.getElementById('audio');
    let birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue('top'));
    let gravity = 2;
    let pipeSpeed = 2;
    let jumping = false;
    let pipeGap = 200;
    let score = 0;

    function gameLoop() {
        if (!jumping) {
            birdTop += gravity;
            bird.style.top = birdTop + 'px';
        }

        pipes.forEach(pipe => {
            let pipeLeft = parseInt(window.getComputedStyle(pipe).getPropertyValue('left'));
            pipeLeft -= pipeSpeed;
            pipe.style.left = pipeLeft + 'px';

            if (pipeLeft < -pipe.offsetWidth) {
                resetPipe(pipe);
                updateScore();
            }

            checkCollision(pipe);
        });

        if (birdTop < 0 || birdTop > gameContainer.offsetHeight - bird.offsetHeight) {
            alert('Game Over');
            resetGame();
        }

        requestAnimationFrame(gameLoop);
    }

    function resetPipe(pipe) {
        pipe.style.left = gameContainer.offsetWidth + 'px';
        if (pipe.classList.contains('upper-pipe')) {
            pipe.style.height = Math.floor(Math.random() * (gameContainer.offsetHeight / 2)) + 'px';
        } else {
            pipe.style.height = (gameContainer.offsetHeight - pipeGap - parseInt(pipe.previousElementSibling.style.height)) + 'px';
        }
    }

    function checkCollision(pipe) {
        let pipeRect = pipe.getBoundingClientRect();
        let birdRect = bird.getBoundingClientRect();

        if (
            birdRect.left < pipeRect.left + pipeRect.width &&
            birdRect.left + birdRect.width > pipeRect.left &&
            birdRect.top < pipeRect.top + pipeRect.height &&
            birdRect.top + birdRect.height > pipeRect.top
        ) {
            alert('Game Over');
            resetGame();
        }
    }

    function updateScore() {
        score++;
        scoreDisplay.textContent = score;
        if (score % 10 === 0) {
            audio.play();
        }
    }

    function resetGame() {
        birdTop = gameContainer.offsetHeight / 2;
        bird.style.top = birdTop + 'px';
        pipes.forEach(pipe => resetPipe(pipe));
        score = 0;
        scoreDisplay.textContent = score= 0 ;
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            jumping = true;
            let jumpCount = 0;
            const jumpInterval = setInterval(() => {
                if (jumpCount < 15) {
                    birdTop -= 5;
                    bird.style.top = birdTop + 'px';
                    jumpCount++;
                } else {
                    clearInterval(jumpInterval);
                    jumping = false;
                }
            }, 20);
        }
    });

    resetGame();
    gameLoop();
});
