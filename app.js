/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score, activePlayer, Roundscore, gamePlaying;

//score = [0, 0];
//roundScore = 0;
//activePlayer = 0;
//dice = Math.floor(Math.random() * 6) + 1
//console.log(dice);
//document.getElementById('score-0').textContent = 0;
//document.getElementById('score-1').textContent = 0;
//document.getElementById('current-0').textContent = 0;
//document.getElementById('current-1').textContent = 0;

var diceDom = document.querySelector('.dice');
diceDom.style.display = 'none';

init();

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    //setting scores to 0 if 1 pops up
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //Changing active plyaer (class)
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //hiding dice when it's next players turn so he sees clear space
    diceDom.style.display = 'none';
}
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

//document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //defining dice
        var dice = Math.floor(Math.random() * 6) + 1;
        //changing dice image
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        if (dice !== 1) {
            //adding dice score to round score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //changing the active player
            nextPlayer();
        }
    }


});
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        score[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

        if (score[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            diceDom.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}