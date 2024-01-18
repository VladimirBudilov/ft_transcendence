

class Tournament
{
    tournamentInput = null;
    numberOfParticipants = 0;
    tournamentName = "";
    participants = [];
    currentParticipants = [];
    winnersPool = [];
    looserPool = [];
    currentPair = [];
    firstPlace = null;
	secondPlace = null
	thirdPlace = null;
    OnGameFinished = new CustomEvent("OnGameFinished");
    winnerBranch = true;
    gameForThirdPlace = false;
    StartTournament = () =>
    {
		document.getElementById("tournament-field").remove();
        document.addEventListener("OnGameFinished", this.StartMatch);
        gameType.tournament = true;
        this.currentParticipants = this.participants;
        this.StartMatch();
    }
    StopTournament = () =>{
        gameType.tournament = false;
        this.RefreshData();
    }

    RefreshData() {
        this.tournamentInput = null;
        this.numberOfParticipants = 0;
        this.tournamentName = "";
        this.participants = [];
        this.currentParticipants = [];
        this.currentPair = [];
        this.winner = "";
        //ChangeDivStateById("StopGame", false);
    }
    StartMatch = () =>
    {
/*        console.log("start match");
        console.log("names of losers: " + this.looserPool);
        console.log("names of winners: " + this.winnersPool);
        console.log("names of current participants: " + this.currentParticipants);
        console.log("before validation");*/

        /*if(!this.winnerBranch && this.looserPool.length === 1 && this.currentParticipants.length === 1)
        {
            this.currentParticipants.push(this.looserPool[0]);
            this.looserPool = [];
        }
        if(this.currentParticipants.length % 2 !== 0)
        {
            let player = this.currentParticipants[this.currentParticipants.length - 1]
            player.isFirstRound = false;
            this.winnersPool.push(player);
            this.currentParticipants.splice(this.currentParticipants.length - 1, 1);
        }
        if(this.currentParticipants.length === 0 && this.winnersPool.length !== 0)
        {
            this.currentParticipants = this.winnersPool;
            this.winnersPool = [];
        }
        else if(this.currentParticipants.length === 0 && this.winnersPool.length === 0
            && this.numberOfParticipants > 2 && this.looserPool.length > 1)
        {
            this.currentParticipants = this.looserPool;
            if(this.currentParticipants.length % 2 !== 0)
            {
                let player = this.currentParticipants[this.currentParticipants.length - 1]
                this.looserPool.push(player);
                this.currentParticipants.splice(this.currentParticipants.length - 1, 1);
            }
            this.looserPool = [];
        }
         if(this.numberOfParticipants == 2 && this.currentParticipants.length === 0)
            this.looserPool = [];
        if(this.numberOfParticipants > 2 && this.firstPlace != null && this.looserPool.length === 1 && this.currentParticipants.length === 0)
        {
            this.currentParticipants = this.looserPool;
            this.currentParticipants.push(this.secondPlace);
            this.winnersPool = [];
            this.looserPool = [];
            this.secondPlace = null;
        }*/
/*        console.log("names of losers: " + this.looserPool.length);
        console.log("names of winners: " + this.winnersPool.length);
        console.log("names of current participants: " + this.currentParticipants.length);
        console.log("after validation");*/
        if(!this.IsValidState()) {
            this.StopTournament();
            return;
        }
        console.log("start match");
        PrepareData();
        createScene();
        UpdateVsPlayer();
        startPlaying = true;
    }

    IsValidState() {
        if (this.currentParticipants.length === 1) {
            gameType.tournament = false;
            this.winner = this.currentParticipants[0].playerName;
            let secondPlayer = this.currentPair[0].playerName === this.winner
                ? this.currentPair[1].playerName
                : this.currentPair[0].playerName;
            setResult(this.winner, 1, this.tournamentName);
            setResult(secondPlayer, 2, this.tournamentName);
            console.log(this.winner);
            return false;
        }
        this.currentPair[0] = this.currentParticipants[0];
        this.currentPair[1] = this.currentParticipants[1];
        let player1 = this.currentPair[0];
        let player2 = this.currentPair[1];
        //TODO add player names on screen
        console.log(player1.playerName + " vs " + player2.playerName);
        document.getElementById("playerNames").innerHTML = player1.playerName + "-" + player2.playerName;
        this.currentParticipants.splice(0, 2);
        return true;
        /*if (this.currentParticipants.length === 0
            && this.winnersPool.length === 0
            && this.looserPool.length === 0
        ) {
            gameType.tournament = false;
            console.log("tournament finished");
            console.log("first: " + this.firstPlace.playerName);
            setResult(this.firstPlace.playerName, 1, this.tournamentName);
            console.log("second: " + this.secondPlace.playerName);
            setResult(this.secondPlace.playerName, 2, this.tournamentName);
            if(this.numberOfParticipants != 2) {
                console.log("third: " + this.thirdPlace.playerName);
                setResult(this.thirdPlace.playerName, 3, this.tournamentName);
            }
            return false;
        }
        this.currentPair[0] = this.currentParticipants[0];
        this.currentPair[1] = this.currentParticipants[1];
        let player1 = this.currentPair[0];
        let player2 = this.currentPair[1];

        //TODO add player names on screen
        console.log(player1.playerName + " vs " + player2.playerName);
        this.currentParticipants.splice(0, 2);
        document.getElementById("playerNames").innerHTML = player1.playerName + "-" + player2.playerName;
        return true;*/
    }
}

let tournament = new Tournament();

function ChangeDivStateById(name, state){
    // let tournamentInput = document.getElementById(name);
    // if(state)
    //     tournamentInput.style.display = "block";
    // else
    //     tournamentInput.style.display = "none";
}

function StartTournament()
{
    setTimeout(() => {
    //ChangeDivStateById("tournament", true);
    tournament.tournamentInput = document.getElementById("tournament");
    }, 1000);
}

function generateError(errorMessageContainer, errorMessageContent) {
    const errorMessage = document.createElement("p");
    errorMessage.id = "errorMessage";
    errorMessage.textContent = errorMessageContent;
    errorMessage.setAttribute("class", "row");
    errorMessage.style.color = "red";
    errorMessage.style.marginTop = "1rem";
    errorMessage.style.padding = "1rem";
    errorMessage.style.fontWeight = "bold";
    errorMessage.style.justifyContent = "center";
    errorMessage.style.border = "2px solid red";
    errorMessage.style.borderRadius = "0.375rem";
    errorMessage.style.letterSpacing = "2px";
    errorMessageContainer.appendChild(errorMessage);
}

function ReadInput() {

    var buttonExit = document.querySelector('.button_menu');
    buttonExit.onclick = function () {
        tournament.StopTournament();
    }
    
    
    let userInput = document.getElementById("userInput").value;
    const errorMessageContainer = document.getElementById("tournament");
    if(document.getElementById("errorMessage") !== null)
        document.getElementById("errorMessage").remove();
    if (userInput.trim() === "") {
        generateError(errorMessageContainer, "Error: Input is empty");
        return;
    }
    if(tournament.numberOfParticipants === 0)
    {
        document.getElementById("tournament-text").innerHTML = "Enter name of tournament:";
        tournament.numberOfParticipants = userInput;
        document.getElementById("userInput").value = "";
        if(tournament.numberOfParticipants < 2)
        {
            document.getElementById("tournament-text").innerHTML = "Enter number of players:";
            tournament.numberOfParticipants = 0;
            generateError(errorMessageContainer, "Error: Number of players must be at least 2");
        }
        if(!IsDigit(tournament.numberOfParticipants))
        {
            document.getElementById("tournament-text").innerHTML = "Enter number of players:";
            tournament.numberOfParticipants = 0;
            generateError(errorMessageContainer, "Error: Input must be a number");
        }
        return;
    }
    
    if(tournament.tournamentName === "")
    {
        document.getElementById("tournament-text").innerHTML = `Enter name of player:`;
        tournament.tournamentName = userInput;
        document.getElementById("userInput").value = "";
        return;
    }
    let player = new Player(userInput, tournament.participants.length);
    tournament.participants.push(player);
    console.log(tournament.participants);
    document.getElementById("userInput").value = "";
    if ((tournament.participants.length).toString() === tournament.numberOfParticipants.toString()) {
        const successMessage = document.createElement("p");
        successMessage.textContent = "Reached " + tournament.numberOfParticipants;
        successMessage.style.color = "green";
        errorMessageContainer.appendChild(successMessage);
        setTimeout(() => {
            if(document.getElementById("errorMessage") !== null) {
                document.getElementById("errorMessage").remove();
            }
            // document.getElementById("userInput").value = "";
            //ChangeDivStateById("tournament", false);
        }, 2000);
        tournament.StartTournament();
    }
}

