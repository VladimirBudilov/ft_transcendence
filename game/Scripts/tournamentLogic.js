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
        ChangeDivStateById("StopGame", false);
    }
    StartMatch = () =>
    {
        console.log("start match");
        console.log("names of losers: " + this.looserPool);
        console.log("names of winners: " + this.winnersPool);
        console.log("names of current participants: " + this.currentParticipants);
        console.log("before validation");
        if(!this.winnerBranch && this.looserPool.length === 1 && this.currentParticipants.length === 1)
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
        }
        console.log("start match");
        console.log("names of losers: " + this.looserPool.length);
        console.log("names of winners: " + this.winnersPool.length);
        console.log("names of current participants: " + this.currentParticipants.length);
        console.log("after validation");
        if(!this.IsValidState()) {
            this.StopTournament();
            return;
        }
        ChangeDivStateById("StopGame", true);
        PrepareData();
        createScene();
        UpdateVsPlayer();
        startPlaying = true;
    }

    IsValidState() {
        if (this.currentParticipants.length === 0
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
        return true;
    }
}

let tournament = new Tournament();

function ChangeDivStateById(name, state){
    let tournamentInput = document.getElementById(name);
    if(state)
        tournamentInput.style.display = "block";
    else
        tournamentInput.style.display = "none";
}

function StartTournament()
{
    ChangeDivStateById("tournament", true);
    tournament.tournamentInput = document.getElementById("tournament");
}

function generateError(errorMessageContainer, errorMessageContent) {
    const errorMessage = document.createElement("p");
    errorMessage.id = "errorMessage";
    errorMessage.textContent = errorMessageContent;
    errorMessage.style.color = "red";
    errorMessageContainer.appendChild(errorMessage);
}

function ReadInput() {
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
        tournament.numberOfParticipants = userInput;
        document.getElementById("userInput").value = "";
        if(tournament.numberOfParticipants < 2)
        {
            tournament.numberOfParticipants = 0;
            generateError(errorMessageContainer, "Error: Number of participants must be at least 2");
        }
        if(!IsDigit(tournament.numberOfParticipants))
        {
            tournament.numberOfParticipants = 0;
            generateError(errorMessageContainer, "Error: Input must be a number");
        }
        return;
    }
    if(tournament.tournamentName === "")
    {
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
            if(document.getElementById("errorMessage") !== null)
                document.getElementById("errorMessage").remove();
            document.getElementById("userInput").value = ""
            ChangeDivStateById("tournament", false);
        }, 2000);
        tournament.StartTournament();
    }
}