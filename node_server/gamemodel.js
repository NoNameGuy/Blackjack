/*jshint esversion: 6 */

class BlackJackGame {
    constructor(game, owner) {
      this.numPlayers = 0;
      this.winner = 0;
      this.arrayBaralho = [];
      this.arrayPontuacao = [];
      this.gameOwner = owner.id;
      this.arrayPlayers = []; // array populado quando feito o join
      this.join(owner.id);
      this.gameEnded = false;
      this.gameStarted = false;
      this.gameID = game.id;
      this.playerTurn = 0;
      this.currentCard = 0;
      this.boardGame;
    }

    startGame() {
      //incializar arrayBaralho
      // randomize arrayBaralho
      this.inicializarArrayBaralho();
      console.log("arrayBaralho");
      console.log(this.arrayBaralho);

      //Zerar pontuacoes
      this.zerarPontuacoes();
      console.log("arrayPontuacao");
      console.log(this.arrayPontuacao);

      // inicializar a board de jogo
      this.boardGame[5, this.numPlayers+1];

      // dá as cartas todas sem face 
      for (let j = 1; j <= this.numPlayers; j++)  // players
        for (let k = 1; k <= 4; k++)  // cartas
          this.boardGame[j][k] = "semFace";
      

      // vira as primeiras cartas para cima
      for (let i = this.numPlayers; i>0; i--) {
        this.boardGame[1][i] = this.arrayBaralho[i];
        this.currentCard = i;
      }



      this.gameStarted = true;
    }

    zerarPontuacoes () {
      for (let i = 0; i< this.numPlayers; i++) {
        this.arrayPontuacao[i] = 0;
      }
    }

    inicializarArrayBaralho() {
      let baralho = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13,
                    c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13,
                    o1, o2, o3, o4, o5, o6, o7, o8, o9, o10, o11, o12, o13,
                    e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, e13
                    ];
      this.arrayBaralho = this.shuffleArray(baralho);
    }

    shuffleArray(array){
        let arraySize = array.length;
        while(arraySize > 0){
            let index = Math.floor(Math.random()* arraySize);
            arraySize --;
            let temp = array[arraySize];
            array[arraySize] = array[index];
            array[index] = temp;
        }
        return array;

    }

    join(playerID){
      if (this.hasPlayer(playerID)) {
        return;
      }
        this.numPlayers++;
        this.arrayPlayers.push(playerID);
    }

    hasPlayer(playerID){
      for (let i = 0; i<this.numPlayers; i++) {
        if (this.arrayPlayers[i] === playerID)
          return true;
      }
    }

    // função para as pontuações!!
    removeFirstCharString(){ // receber a string da carta

      var s ="";

      while(s.charAt(0) === 'c' || s.charAt(0) === 'e' || s.charAt(0) === 'p' || s.charAt(0) === 'o' ){
         s = s.substr(1);
      }

    }



    play(playerID, index){ // index = posicao da carta pedida
      if (!this.gameStarted) {
        return;
      }

      if (this.gameEnded) {
        return;
      }

      //


    }

}
/*
class TicTacToeGame {
    constructor(ID, player1Name) {
        this.gameID = ID;
        this.gameEnded = false;
        this.gameStarted = false;
        this.player1= player1Name;
        this.player2= '';
        this.playerTurn = 1;
        this.winner = 0;
        this.board = [0,0,0,0,0,0,0,0,0];
    }

    join(player2Name){
        this.player2= player2Name;
        this.gameStarted = true;
    }

    hasRow(value){
        return  ((this.board[0]==value) && (this.board[1]==value) && (this.board[2]==value)) ||
                ((this.board[3]==value) && (this.board[4]==value) && (this.board[5]==value)) ||
                ((this.board[6]==value) && (this.board[7]==value) && (this.board[8]==value)) ||
                ((this.board[0]==value) && (this.board[3]==value) && (this.board[6]==value)) ||
                ((this.board[1]==value) && (this.board[4]==value) && (this.board[7]==value)) ||
                ((this.board[2]==value) && (this.board[5]==value) && (this.board[8]==value)) ||
                ((this.board[0]==value) && (this.board[4]==value) && (this.board[8]==value)) ||
                ((this.board[2]==value) && (this.board[4]==value) && (this.board[6]==value));
    }

    checkGameEnded(){
        if (this.hasRow(1)) {
            this.winner = 1;
            this.gameEnded = true;
            return true;
        } else if (this.hasRow(2)) {
            this.winner = 2;
            this.gameEnded = true;
            return true;
        } else if (this.isBoardComplete()) {
            this.winner = 0;
            this.gameEnded = true;
            return true;
        }
        return false;
    }

    isBoardComplete(){
        for (let value of this.board) {
            if (value === 0) {
                return false;
            }
        }
        return true;
    }

    play(playerNumber, index){
        if (!this.gameStarted) {
            return false;
        }
        if (this.gameEnded) {
            return false;
        }
        if (playerNumber != this.playerTurn) {
            return false;
        }
        if (this.board[index] !== 0) {
            return false;
        }
        this.board[index] = playerNumber;
        if (!this.checkGameEnded()) {
            this.playerTurn = this.playerTurn == 1 ? 2 : 1;
        }
        return true;
    }

}

module.exports = TicTacToeGame;
*/
module.exports = BlackJackGame;
