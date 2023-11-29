class Tournament
{
    tournamentInput = null;
    numberOfParticipants = 0;
    tournamentName = "";
    participants = [Player];
    currentParticipants = [Player];
    winningParticipants = [Player];
    currentPair = [Player];
    winner = "";
    OnGameFinished = new CustomEvent("OnGameFinished");
    constructor() {
        this.tournamentInput = null;
        this.numberOfParticipants = 0;
        this.tournamentName = "";
        this.winner = "";
        this.OnGameFinished = new Event("OnGameFinished");
        this.currentPair = [Player];
    }
    StartTournament = () =>
    {
        gameType.tournament = true;
        console.log("tournament started");
        //if players number move last player on next round
        console.log((this.participants.length - 1) % 2);
        if((this.participants.length - 1) % 2 !== 0)
        {
            this.winningParticipants.push(this.participants[1]);
            this.participants.splice(1, 1);
        }
        this.currentParticipants = this.participants;
        //find number of rounds
        //add while loop until only one player left
        //do games for each round(here will be a lot)
        document.addEventListener("OnGameFinished", this.StartMatch);
        document.dispatchEvent(this.OnGameFinished);
    }

    StopTournament = () =>{
        gameType.tournament = false;
    }
    StartMatch = () =>
    {
        if(!this.IsValidState())
            return;
        console.log("tournament game started");
        ChangeDivStateById("StopGame", true);
        PrepareData();
        createScene();
        UpdateVsPlayer();
        startPlaying = true;
    }

    IsValidState() {
        if (this.currentParticipants.length === 1) {
            console.log("tournament finished");
            gameType.tournament = false;
            this.winner = this.currentParticipants[1].playerName;
            //TODO add winner on screen
            console.log(this.winner);
            return false;
        }
        console.log("tournament game started");
        console.log(this.currentParticipants.length);
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
let gameType = new GameType();

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
function IsDigit(input) {
    return /^\d+$/.test(input);
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
        //remove the input field and error message in 2 seconds
        setTimeout(() => {
            if(document.getElementById("errorMessage") !== null)
                document.getElementById("errorMessage").remove();
            document.getElementById("userInput").value = ""
            ChangeDivStateById("tournament", false);
        }, 2000);
        tournament.StartTournament();
    }
}