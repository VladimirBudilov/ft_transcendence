class Tournament
{
    tournamentInput = null;
    numberOfParticipants = 0;
    tournamentName = "";
    status = "";
    participants = [];
    winner = "";
    counter = 0;
    GetDataAboutTournament = function () {
    }

    CreateFields() {
        for(let i = 0; i < this.numberOfParticipants; i++)
        {
            let newDiv = document.createElement("div");
            newDiv.id = "tournamentParticipant" + i;
            newDiv.className = "tournamentParticipant";
            newDiv.innerHTML = (this.participants)[i];
            document.getElementById("tournamentParticipants").appendChild(newDiv);
        }
    }
}

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
}

let tournament = new Tournament();

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
    const userInput = document.getElementById("userInput").value;
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
        console.log("number of players"+tournament.numberOfParticipants);
        return;
    }
    if(tournament.tournamentName === "")
    {
        tournament.tournamentName = userInput;
        document.getElementById("userInput").value = "";
        console.log("tournament name"+tournament.tournamentName);
        return;
    }
    if (tournament.participants.length >= tournament.numberOfParticipants) {
        const successMessage = document.createElement("p");
        successMessage.textContent = "Reached " + tournament.numberOfParticipants;
        successMessage.style.color = "green";
        errorMessageContainer.appendChild(successMessage);
        //
        return;
    }
    tournament.participants.push(userInput);
    document.getElementById("userInput").value = ""; // Clear the input field for the next input
    console.log("participant name "+tournament.participants+" added");
}