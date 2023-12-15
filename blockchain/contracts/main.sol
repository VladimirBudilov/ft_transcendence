// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Tournaments {
    struct PlayerResult {
        string playerName;
        uint score;
    }

    mapping (string => PlayerResult[]) private tournaments;
	string[] private keys;

    function setResult(string memory newPlayer, uint newResult, string memory nameTournament) public {
        tournaments[nameTournament].push(PlayerResult({
            playerName: newPlayer,
            score: newResult
        }));

		// Check if the key is already in the keys array
        bool keyExists = false;
        for (uint i = 0; i < keys.length; i++) {
            if (keccak256(abi.encodePacked(keys[i])) == keccak256(abi.encodePacked(nameTournament))) {
                keyExists = true;
                break;
            }
        }

        // If the key is not in the keys array, add it
        if (!keyExists) {
            keys.push(nameTournament);
        }
    }

    function getResultPlayer(string memory playerName, string memory nameTournament) public view returns (uint) {
    PlayerResult[] storage playerResults = tournaments[nameTournament];

    // Итерируем по массиву структур PlayerResult и находим результат игрока
    for (uint i = 0; i < playerResults.length; i++) {
        if (keccak256(abi.encodePacked(playerResults[i].playerName)) == keccak256(abi.encodePacked(playerName))) {
            return playerResults[i].score;
        }
    }

    // Если результат не найден, можно вернуть значение по умолчанию, например, 0
    return 0;
}


    function getResultTournament(string memory nameTournament) public view returns (string[] memory, uint[] memory) {
        PlayerResult[] storage playerResults = tournaments[nameTournament];

        string[] memory playerNames = new string[](playerResults.length);
        uint[] memory playerScores = new uint[](playerResults.length);

        for (uint i = 0; i < playerResults.length; i++) {
            playerNames[i] = playerResults[i].playerName;
            playerScores[i] = playerResults[i].score;
        }

        return (playerNames, playerScores);
    }

	function getAllResult() public view returns (string[] memory, string[] memory, uint[] memory) {
		uint totalResults = 0;
		// Подсчитываем общее количество результатов
		for (uint j = 0; j < keys.length; j++) {
			totalResults += tournaments[keys[j]].length;
		}
		// Выделяем память для массивов с известной длиной
		string[] memory tournamentsNames = new string[](totalResults);
		string[] memory playerNames = new string[](totalResults);
		uint[] memory playerScores = new uint[](totalResults);

		// Заполняем массивы
		uint index = 0;
		for (uint j = 0; j < keys.length; j++) {
			PlayerResult[] storage playerResults = tournaments[keys[j]];

			for (uint i = 0; i < playerResults.length; i++) {
				tournamentsNames[index] = keys[j];
				playerNames[index] = playerResults[i].playerName;
				playerScores[index] = playerResults[i].score;
				index++;
			}
		}
    	return (tournamentsNames, playerNames, playerScores);
    }
}
