/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score, activePlayer, Roundscore, gamePlaying, lastDice;

//score = [0, 0];
//roundScore = 0;
//activePlayer = 0;
//dice = Math.floor(Math.random() * 6) + 1
//console.log(dice);
//document.getElementById('score-0').textContent = 0;
//document.getElementById('score-1').textContent = 0;
//document.getElementById('current-0').textContent = 0;
//document.getElementById('current-1').textContent = 0;

hideDice();

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
    hideDice();
}
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

//document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //defining dice
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //changing dice image
        showDice();
        document.querySelector('#dice-1').src = 'dice-' + dice1 + '.png';
        document.querySelector('#dice-2').src = 'dice-' + dice2 + '.png';
        /* if (lastDice === 6 && dice === 6) {
            score[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
            nextPlayer();
        } else */
        if (dice1 !== 1 && dice2 !== 1) {
            //adding dice score to round score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //changing the active player
            nextPlayer();
        }
        //lastDice = dice;
    }


});
document.querySelector('.btn-hold').addEventListener('click', function() {
    var input = document.querySelector('.final-score').value;
    var winningScore;
    if (input) {
        winningScore = input;
    } else {
        winningScore = 100;
    }

    if (gamePlaying) {
        score[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

        if (score[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
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

function hideDice() {
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
}

function showDice() {
    document.querySelector('#dice-1').style.display = 'block';
    document.querySelector('#dice-2').style.display = 'block';
}
/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
(Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score,
so that they can change the predefined score of 100. (Hint: you can read that value with the
 .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score 
when one of them is a 1. (Hint: you will need CSS to position the second dice, 
so take a look at the CSS code for the first one.)
*/