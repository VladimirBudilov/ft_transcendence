import {gameData, gameType} from "./globalData.js";

function TurnOffById(input)
{
	document.getElementById(input).style.display = "none";
}

function printScore() {
	//TODO add proper score
	document.getElementById("scores").innerHTML = gameData.playerScore + "-" + gameData.opponentScore;
}

var bounceTime = 0;

function WaitTime(method, time) {
	setTimeout(method, time);
}

function ShowWinner(player) {
	document.getElementById("scores").innerHTML = player.playerName + " wins!";
	document.getElementById("winnerBoard").innerHTML = "Refresh to play again";
	
}

function ChooseWinnerName(index) {
	let playerName = index === 1 ? player.defaultPlayerName : player.defaultOpponentName;
	if (gameType.tournament) {
		playerName = tournament.currentPair[index].playerName;
		tournament.participants.push(tournament.currentPair[index]);
	}
	return playerName;
}

// checks if either player or opponent has reached 7 points
function IsGameFinished()
{
	let playerName = "";
	if (gameData.playerScore >= gameData.maxScore)
	{
		console.log("score1 >= maxScore" + gameData.playerScore + " " + gameData.maxScore);
		playerName = ChooseWinnerName(1);
		return true;
	}
	else if (gameData.opponentScore >= gameData.maxScore)
	{
		console.log("score1 >= maxScore" + gameData.opponentScore + " " + gameData.maxScore);
		ChooseWinnerName(2);
		return true;
	}
	return false;
}

function IsDigit(input) {
	return /^\d+$/.test(input);
}

export {TurnOffById, printScore, WaitTime, ShowWinner, bounceTime, IsGameFinished, IsDigit};