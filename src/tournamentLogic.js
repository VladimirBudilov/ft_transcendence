class Tournament
{
    tournamentInput = null;
    numberOfParticipants = 0;
    tournamentName = "";
    participants = [Player];
    currentParticipants = [Player];
    currentPair = [Player];
    winner = "";
    OnGameFinished = new CustomEvent("OnGameFinished");
    StartTournament = () =>
    {
        gameType.tournament = true;
        this.currentParticipants = this.participants;
        document.addEventListener("OnGameFinished", this.StartMatch);
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
        this.participants = [Player];
        this.currentParticipants = [Player];
        this.currentPair = [Player];
        this.winner = "";
        ChangeDivStateById("StopGame", false);
    }
    StartMatch = () =>
    {
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
        if (this.currentParticipants.length === 2) {
            gameType.tournament = false;
            this.winner = this.currentParticipants[1].playerName;
            //TODO add winner on screen
            console.log(this.winner);
            return false;
        }
        this.currentPair[1] = this.currentParticipants[1];
        this.currentPair[2] = this.currentParticipants[2];
        let player1 = this.currentPair[1];
        let player2 = this.currentPair[2];
        //TODO add player names on screen
        console.log(player1.playerName + " vs " + player2.playerName);
        this.currentParticipants.splice(1, 2);
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
    if ((tournament.participants.length-1).toString() === tournament.numberOfParticipants.toString()) {
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