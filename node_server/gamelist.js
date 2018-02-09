/*jshint esversion: 6 */

var BlackJackGame = require('./gamemodel.js');

class GameList {
	constructor() {
        this.contadorID = 0;
        this.games = new Map();
    }

    gameByID(gameID) {
    	let game = this.games.get(gameID);
    	return game;
    }

    createGame(playerName, socketID) {
    	this.contadorID = this.contadorID+1;
    	var game = new BlackJackGame(this.contadorID, playerName);
    	game.player1SocketID = socketID;
    	this.games.set(game.gameID, game);
    	return game;
    }

    joinGame(gameID, playerName, socketID) {
    	let game = this.gameByID(gameID);
    	if (game===null) {
    		return null;
    	}

			console.log('gameID: ', gameID);
			console.log('playerName: ', playerName);
			console.log('socketID: ', socketID);

			if (game.player1SocketID == null){
				game.join(playnerName);
				game.player1SocketID = socketID;
				console.log('player1 joined', sockedID);
			}

			if (game.player1SocketID != socketID) {
				game.join(playerName);
				game.player2SocketID = socketID;
				console.log('player2 joined', game.player2SocketID);

			}

			if (game.player2SocketID != socketID && game.player1SocketID != socketID) {
				game.join(playerName);
				game.player3SocketID = socketID;
				console.log('player3 joined', game.player3SocketID);

			}

			if (game.player3SocketID != socketID && game.player2SocketID != socketID && game.player1SocketID != socketID) {
				game.join(playerName);
				game.player4SocketID = socketID;
				console.log('player4 joined', game.player4SocketID);

			}

    	return game;
    }

    removeGame(gameID, socketID) {
    	let game = this.gameByID(gameID);
    	if (game===null) {
    		return null;
    	}
    	if (game.player1SocketID == socketID) {
    		game.player1SocketID = "";
    	} else if (game.player2SocketID == socketID) {
    		game.player2SocketID = "";
    	}
    	if ((game.player1SocketID === "") && (game.player2SocketID === "")) {
    		this.games.delete(gameID);
    	}
    	return game;
    }

    getConnectedGamesOf(socketID) {
    	let games = [];
    	for (var [key, value] of this.games) {
    		if ((value.player1SocketID == socketID) || (value.player2SocketID == socketID)) {
    			games.push(value);
    		}
		}
		return games;
    }

    getLobbyGamesOf(socketID) {
    	let games = [];
    	for (var [key, value] of this.games) {
    		if ((!value.gameStarted) && (!value.gameEnded))  {
    			if ((value.player1SocketID != socketID) && (value.player2SocketID != socketID)) {
    				games.push(value);
    			}
    		}
		}
		return games;
    }



    startGame(gameID) {

        let game = this.gameByID(gameID);
        if (game===null) {
            return null;
        }
        game.startGame();
        return game;
}
}

module.exports = GameList;
