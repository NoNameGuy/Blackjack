/*jshint esversion: 6 */

class BlackJackGame {
    constructor(game, owner) {
      this.numPlayers = 0;
      this.winner = 0;
      this.winnerP = 0;
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
      this.playerGame;
      this.trunfoGame;
      this.bet = false;
    }

    startGame() {

//DESCOMENTAR!

      // if (this.numPlayers != 4) {
      //   return;
      // }

//END DESCOMENTAR!!


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
      this.boardGame = new Array(3);
      this.playerGame = new Array(11);
      this.trunfoGame = new Array(1);

      for (var i = 0; i < 3; i++) {
        this.boardGame[i] = new Array(3);
      }

      for (var i = 0; i < 11; i++) {
        this.playerGame[i] = new Array(1);
      }

      for (var i = 0; i < 1; i++) {
        this.trunfoGame[i] = new Array(1);
      }

      //COLOCAÇÃO SITOS PLAYER
      this.boardGame[0][1] = 'Player1';
      this.boardGame[1][2] = 'Player2';
      this.boardGame[2][1] = 'Player3';
      this.boardGame[1][0] = 'Player4';

      for (var j = 0; j < 3; j++) {
        for (var k = 0; k < 3; k++) {
          if (this.boardGame[j][k] != 'Player1'
            && this.boardGame[j][k] != 'Player2'
            && this.boardGame[j][k] != 'Player3'
            && this.boardGame[j][k] != 'Player4') {
            this.boardGame[j][k] = 'Empty';
          }
        }
      }

      //Distribuir Cards pro player1

      for (let i = 1; i < this.playerGame.length; i++) {
        this.playerGame[0][0] = 'Player1';
        this.playerGame[i][0] = this.arrayBaralho[i-1];
        this.currentCard++;
      }

      this.trunfoGame[0][0] = this.arrayBaralho[0];

      this.gameTurn = 2;
      this.gameStarted = true;
    }

    zerarPontuacoes () {
      for (let i = 0; i< this.numPlayers; i++) {
        this.arrayPontuacao[i] = 0;
      }
    }

    inicializarArrayBaralho() {
      let baralho = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p11", "p12", "p13",
                     "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c11", "c12", "c13",
                     "o1", "o2", "o3", "o4", "o5", "o6", "o7", "o11", "o12", "o13",
                     "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e11", "e12", "e13"
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
      if (this.numPlayers>=4) {
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

    betClick() {
      // próxima posiç\ao da carta, em vez de ficar com um carta fica com o valor betClick
      this.bet = true;
      return
      //
    }

    play(playerID, index){ // index = posicao da carta pedida
      if (!this.gameStarted) {
        return;
      }

      if (this.gameEnded) {
        return;
      }
      // console.log(this.boardGame[1][index]);
      if(this.boardGame[playerID][index] != "semFace" && this.boardGame[playerID][index] != "Empty") {
        return;
      }

      if (this.bet){
        return;
      }

      //console.log('pontuacao player 1', this.arrayPontuacao[playerID-1]);
      if (this.arrayPontuacao[playerID-1] >= 22) {
        console.log('player lost ID-Points', playerID + '-' + this.arrayPontuacao[playerID-1]);
        return;
      }


      this.gameTurn++;


      if(index >= 4 || this.arrayPontuacao[playerID-1] >= 22) { // jogo já terminou
        //this.checkHighScore();
        console.log("jogo terminou");
        this.incrementaPontuacao(playerID, this.boardGame[playerID][index]);

        var aux = this.arrayPontuacao.slice();
        aux.sort(function(a, b){return b-a});

        for (let i = 0; i < this.arrayPontuacao.length; i++) {
          if (this.arrayPontuacao[i] == aux[0])
            this.winner = i;
            this.winnerP = aux[0];
            console.log('winner', this.winner);
            console.log('winnerP', this.winnerP);
            break;
        }

        return;
      }


      /*for (let i = this.numPlayers; i>0; i--) {
        this.boardGame[i][2] = this.arrayBaralho[this.currentCard];
        this.incrementaPontuacao(i, this.boardGame[i][1]);
        this.currentCard++;
      }*/
      //this.boardGame[playerID][index] = this.arrayBaralho[this.currentCard];


      //console.log(this.boardGame[playerID][index] + "boardGame na carta clicada");
      this.currentCard++;
      this.incrementaPontuacao(playerID, this.boardGame[playerID][index]);

      return true;
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
