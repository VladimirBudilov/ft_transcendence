

function TurnOffById(input)
{
	document.getElementById(input).style.display = "none";
}

function printScore() {
	document.getElementById("scores").innerHTML = score1 + "-" + score2;
}

var bounceTime = 0;

function WaitTime(method, time) {
	setTimeout(method, time);
}

function ShowWinner(player) {
	ballSpeed = 0;
	document.getElementById("scores").innerHTML = player + " wins!";
	document.getElementById("winnerBoard").innerHTML = "Refresh to play again";
	
}

function ChooseWinnerName(index) {
	let playerName = index === 1 ? defaultPlayerName : defaultOpponentName;
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
	if (score1 >= maxScore)
	{
		console.log("score1 >= maxScore" + score1 + " " + maxScore);
		playerName = ChooseWinnerName(1);
		return true;
	}
	else if (score2 >= maxScore)
	{
		console.log("score1 >= maxScore" + score2 + " " + maxScore);
		playerName = ChooseWinnerName(2);
		return true;
	}
	return false;
}

function IsDigit(input) {
	return /^\d+$/.test(input);
}