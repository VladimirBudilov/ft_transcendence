class Tournament
{
    numberOfParticipants = 2;
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
let tournament = new Tournament();
function StartTournament()
{
}

function ReadInput()
{
    if(tournament.tournamentName === "") {
        tournament.tournamentName = document.getElementById("userInput").value;
        //print info about tournament
        let newDiv = document.createElement("div");
        //add new div as child to userInput
        document.getElementById("userInput").appendChild(newDiv);
        newDiv.id = "tournamentName";
        newDiv.className = "tournamentName";
        newDiv.innerHTML = tournament.tournamentName;
        //remove after 2 seconds
        setTimeout(function () {
            document.getElementById("tournamentName").remove();
        }, 2000);
        //clear input
        document.getElementById("userInput").value = "";
    }
    tournament.participants[tournament.counter++] = document.getElementById("userInput").value;
    let numberOfParticipants = document.getElementById("userInput").value;
    let participants = [];
    for(let i = 0; i < numberOfParticipants; i++)
    {
        participants.push(document.getElementById("participant" + i).value);
    }
    let tournamentData = new Tournament();
    tournamentData.numberOfParticipants = numberOfParticipants;
    tournamentData.tournamentName = tournamentName;
    tournamentData.participants = participants;
    tournamentData.CreateFields();
    tournamentData.GetDataAboutTournament();
}