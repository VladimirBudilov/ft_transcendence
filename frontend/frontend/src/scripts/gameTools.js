function TurnOffById(input)
{
	document.getElementById(input).style.display = "none";
}

function printScore() {
	//TODO add proper score
	document.getElementById("scores").innerHTML = gameData.playerScore + "-" + gameData.opponentScore;
}
function WaitTime(method, time) {
	setTimeout(method, time);
}

function ShowWinner(player) {
	document.getElementById("scores").innerHTML = player.playerName + " wins!";
	document.getElementById("winnerBoard").innerHTML = "Refresh to play again";
	
}

function ValidateFirstPlace(winner, loser) {
	if(tournament.numberOfParticipants == 2)
	{
		tournament.firstPlace = tournament.currentPair[winner];
		tournament.secondPlace = tournament.currentPair[loser];
		console.log("first: " + tournament.firstPlace.playerName);
		console.log("second: " + tournament.secondPlace.playerName);
		tournament.winnersPool = [];
		tournament.looserPool = [];
		tournament.currentParticipants = [];
		return;
	}
	if(tournament.firstPlace !== null) return;
	if(tournament.winnersPool.length === 1 && tournament.currentParticipants.length === 0) {
		tournament.firstPlace = tournament.currentPair[winner];
		tournament.secondPlace = tournament.currentPair[loser];
		console.log("first: " + tournament.firstPlace.playerName);
		console.log("second: " + tournament.secondPlace.playerName);
		tournament.winnersPool = [];
		tournament.winnerBranch = false;
	}
}

function ValidateThirdPlace(winner,loser) {
	if(tournament.winnerBranch || tournament.numberOfParticipants == 2) return;
	if(tournament.currentParticipants.length === 0 && tournament.winnersPool.length === 0
		&& tournament.looserPool.length === 1 && tournament.secondPlace === null)
	{
		tournament.secondPlace = tournament.currentPair[winner];
		tournament.thirdPlace = tournament.currentPair[loser];
		console.log("second: " + tournament.secondPlace.playerName);
		console.log("third: " + tournament.thirdPlace.playerName);
		tournament.winnersPool = [];
		tournament.looserPool = [];
	}
}


function ChooseWinnerName(winner, loser) {
	let playerName = winner === 0 ? player.defaultPlayerName : player.defaultOpponentName;
	if (gameType.tournament) {
		playerName = tournament.currentPair[winner].playerName;
		if(tournament.winnerBranch) {
			tournament.currentParticipants.push(tournament.currentPair[winner]);
			/*tournament.winnersPool.push(tournament.currentPair[winner]);
			if (tournament.currentPair[loser].isFirstRound &&
				tournament.firstPlace === null) {
				tournament.looserPool.push(tournament.currentPair[loser]);
				tournament.looserPool[tournament.looserPool.length - 1].isFirstRound = false;
			}
			tournament.winnersPool[tournament.winnersPool.length - 1].isFirstRound = false;*/
		}
		else
		{
			tournament.looserPool.push(tournament.currentPair[winner]);
		}
		//ValidateFirstPlace(winner,loser);
		//ValidateThirdPlace(winner, loser);
	}
	return playerName;
}

function IsGameFinished()
{
	let playerName = "";
	if (gameData.playerScore >= gameData.maxScore)
	{
		playerName = ChooseWinnerName(0, 1);
		console.log("winner player Name: " + playerName);
		return true;
	}
	else if (gameData.opponentScore >= gameData.maxScore)
	{
		playerName = ChooseWinnerName(1, 0);
		console.log("winner player Name: " + playerName);
		return true;
	}
	return false;
}

function IsDigit(input) {
	return /^\d+$/.test(input);
}