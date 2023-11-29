class Tournament
{
    tournamentInput = null;
    numberOfParticipants = 0;
    tournamentName = "";
    participants = [Player];
    winner = "";
    StartTournament = function()
    {
        console.log("tournament started");
    }
    StartTournamentGame= function(player1, player2)
    {
        
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
function IsDigit(input) {
    return /^\d+$/.test(input);
}
function ReadInput() {
    var userInput = "";
    userInput = document.getElementById("userInput").value;
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
    if (tournament.participants.length >= tournament.numberOfParticipants) {
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
        return;
    }
    var player = new Player(userInput, tournament.participants.length);
    tournament.participants.push(player);
    document.getElementById("userInput").value = ""; // Clear the input field for the next input
}