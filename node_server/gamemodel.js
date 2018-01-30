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
      this.gameTurn = 1;
      this.currentCard = 0;
      this.boardGame;
    }

    startGame() {
      //incializar arrayBaralho
      // randomize arrayBaralho
      this.inicializarArrayBaralho();
      // console.log("arrayBaralho");
      // console.log(this.arrayBaralho);

      //Zerar pontuacoes
      this.zerarPontuacoes();
      // console.log("arrayPontuacao");
      // console.log(this.arrayPontuacao);

      // inicialize boardGame
      this.boardGame = new Array(this.numPlayers+1);

      // console.log("boardGame");
      // console.log(this.boardGame.length);
      for (var i = 0; i < this.numPlayers+1; i++) {
        this.boardGame[i] = new Array(5);
      }

      for (let j = 0; j <= this.numPlayers; j++){
        this.boardGame[j][0] = 'Player' + j;
        for (let k = 0; k <= 4; k++){
            this.boardGame[0][0] = "semFace";
            this.boardGame[0][k] = 'Carta' + k;
        }  // cartas
      }  // players

//k - linhas
//j - Colunas


      // dá as cartas todas sem face
      for (let j = 1; j <= this.numPlayers; j++)  // players
        for (let k = 1; k <= 4; k++)  // cartas
          this.boardGame[j][k] = "Empty";


      // vira as primeiras cartas para cima
      for (let i = this.numPlayers; i>0; i--) {
        this.boardGame[i][1] = this.arrayBaralho[this.currentCard];
        this.incrementaPontuacao(i, this.boardGame[i][1]);
        this.currentCard++;
      }




      this.gameTurn = 2;
      this.gameStarted = true;
    }

    zerarPontuacoes () {
      for (let i = 0; i< this.numPlayers; i++) {
        this.arrayPontuacao[i] = 0;
      }
    }

    inicializarArrayBaralho() {
      let baralho = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12", "p13",
                     "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "c11", "c12", "c13",
                     "o1", "o2", "o3", "o4", "o5", "o6", "o7", "o8", "o9", "o10", "o11", "o12", "o13",
                     "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "e10", "e11", "e12", "e13"
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
    removeFirstCharString(card){ // receber a string da carta
      while(card.charAt(0) === 'c' || card.charAt(0) === 'e' || card.charAt(0) === 'p' || card.charAt(0) === 'o' ){
         card = card.substr(1);
      }

      return card;

    }



    play(playerID, index){ // index = posicao da carta pedida
      if (!this.gameStarted) {
        return;
      }

      if (this.gameEnded) {
        return;
      }
      // console.log(this.boardGame[1][index]);
      if(this.boardGame[playerID][index] != "Empty") {
        console.log("FODASSE3");
        return;
      }

      this.boardGame[playerID][index] = this.arrayBaralho[this.currentCard];
      console.log(this.boardGame[playerID][index] + "boardGame na carta clicada");
      this.currentCard++;

      if(this.gameTurn > 3) { // jogo já terminou
        //this.checkHighScore();
        console.log("jogo terminou");
        let maiorPontuacao = 100;
        this.winner = maiorPontuacao;
        return;
      }


      this.incrementaPontuacao(playerID, this.boardGame[playerID][index]);
      this.gameTurn++;
    }

    incrementaPontuacao(playerID, card) {
      let pont = 0;

      let sCard = parseInt(this.removeFirstCharString(card));

      switch(sCard) {
        case 1:
          pont = 11;
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
          pont = sCard; // a pontuação vai ser igual ao valor da sCard
          break;
        case 11:
        case 12:
        case 13:
          pont = 10;
          break;
      }
        // console.log(playerID-1);
        // console.log("FDS " + this.arrayPontuacao[playerID-1]);
        this.arrayPontuacao[playerID-1] += pont;
        console.log(this.arrayPontuacao);

    }
}
module.exports = BlackJackGame;
