// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Demo {
    struct PlayerResult {
        string playerName;
        uint score;
    }

    mapping (string => PlayerResult[]) private tournaments;

    function setResult(string memory newPlayer, uint newResult, string memory nameTournament) public {
        tournaments[nameTournament].push(PlayerResult({
            playerName: newPlayer,
            score: newResult
        }));
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
}
