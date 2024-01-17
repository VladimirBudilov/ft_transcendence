var web3 = new Web3(new Web3.providers.HttpProvider(`${server_url}/blockchain/`));

var contractABI = [
    {
      "inputs": [],
      "name": "getAllResult",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "playerName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "nameTournament",
          "type": "string"
        }
      ],
      "name": "getResultPlayer",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "nameTournament",
          "type": "string"
        }
      ],
      "name": "getResultTournament",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "newPlayer",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "newResult",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "nameTournament",
          "type": "string"
        }
      ],
      "name": "setResult",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]; // Вставьте ABI вашего смарт-контракта
var contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // Вставьте адрес вашего смарт-контракта

var contract = new web3.eth.Contract(contractABI, contractAddress);

function setResult(newPlayer, newResult, nameTournament) {
    // Вам также нужно указать аккаунт (адрес кошелька), который будет отправителем транзакции
    var senderAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

    // Подготавливаем транзакцию
    var transactionObject = {
        from: senderAddress,
        gas: 200000, // Укажите достаточное количество газа
    };

    // Вызываем функцию setResult
    contract.methods.setResult(newPlayer, newResult, nameTournament).send(transactionObject)
        .then(function(receipt) {
            console.log("Transaction receipt:", receipt);
        })
        .catch(function(error) {
            console.error(error);
        });
}

// Пример вызова функции setResult
// setResult("Vova", 42, "first");

function getResultPlayer(playerName, nameTournament) {
    contract.methods.getResultPlayer(playerName, nameTournament).call()
        .then(function(result) {
            console.log("Result for player " + playerName + " in tournament " + nameTournament + ": " + result);
        })
        .catch(function(error) {
            console.error(error);
        });
}

let tournamentResultByName;

function getResultTournament(nameTournament) {
    contract.methods.getResultTournament(nameTournament).call()
        .then(function(results) {
            console.log("Results for tournament " + nameTournament + ":");

            // Проверяем, что results является массивом и имеет нужные длины
            if (Array.isArray(results[0]) && Array.isArray(results[1]) && results[0].length === results[1].length) {
                // Создаем объект турнира
                tournamentResultByName = {
                    tournamentName: nameTournament,
                    players: []
                };

                // Используем цикл по индексам
                for (let i = 0; i < results[0].length; i++) {
                    // Выводим результаты в консоль
                    console.log("Player: " + results[0][i] + ", Place: " + results[1][i]);

                    // Добавляем результат в объект турнира
                    tournamentResultByName.players.push({
                        playerName: results[0][i],
                        place: results[1][i]
                    });
                }

                // Теперь у вас есть объект tournament, который содержит результаты турнира
                console.log(tournamentResultByName);
            } else {
                console.error("Invalid results format");
            }
		})
        .catch(function(error) {
            console.error(error);
        });
}

// Создаем объект tournamentsResult
let tournamentsResult;

function getAllResult() {
	contract.methods.getAllResult().call()
		.then(function(results) {
			// console.log("All results: ");
			// Распаковываем результаты
            const tournamentNames = results[0];
            const playerNames = results[1];
            const playerScores = results[2];

			tournamentsResult = {};
            // Итерируемся по результатам
            for (let i = 0; i < tournamentNames.length; i++) {
                const tournamentName = tournamentNames[i];
                const playerName = playerNames[i];
                const playerScore = playerScores[i];

                // Проверяем, есть ли уже турнир в объекте tournaments
                if (!tournamentsResult[tournamentName]) {
                    tournamentsResult[tournamentName] = [];
                }

                // Добавляем результат в массив турнира
                tournamentsResult[tournamentName].push({
                    playerName: playerName,
                    playerScore: playerScore
                });
            }

            let result = "";
            // Выводим результаты
            for (const tournamentName in tournamentsResult) {
                
                result += "<span class='tournament-name mt-4'>" + tournamentName + "</span>\n";

                // console.log("Tournament: " + tournamentName);
                tournamentsResult[tournamentName].forEach(player => {
                    result += "<span class='tournament-stats'>" + player.playerName + ": " + player.playerScore + "</span>\n";
                    // console.log("  Player: " + player.playerName + ", Place: " + player.playerScore);
                });
            }
            if (result === "") {
                result = "<p class='tournament-name'>No results</p>";
            }
            document.getElementById("results").innerHTML = result;
            
		})
		.catch(function(error) {
			console.error(error);
		});
}

//getResultTournament("first")
//getAllResult()
// getResultPlayer("Vova", "first")
// export { getAllResult };
