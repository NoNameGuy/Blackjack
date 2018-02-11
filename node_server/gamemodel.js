/*jshint esversion: 6 */

class BlackJackGame {
    constructor(ID, owner) {
      this.numPlayers = 0;
      this.winner = 0;
      this.winnerP = 0;
      this.arrayBaralho = [];
      this.arrayPontuacao = [];
      this.arraySockets = [];
      this.gameOwner = owner.id;
      this.arrayPlayers = []; // array populado quando feito o join
      this.join(owner.id);
      this.gameEnded = false;
      this.gameStarted = false;
      this.gameID = ID;
      this.gameTurn = 1;
      this.currentCard = 0;
      this.boardGame;
      this.playerGame;
      this.trunfoGame;
      this.trunfoCard; // carta de trunfo
      this.baralhoPlayer1= [];
      this.baralhoPlayer2= [];
      this.baralhoPlayer3= [];
      this.baralhoPlayer4= [];
    }

    startGame() {

      // if (this.numPlayers != 4) {
      //   return;
      // }

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
      this.playerGame = new Array(4);
      this.trunfoGame = new Array(1);

      for (let i = 0; i < 3; i++) {
        this.boardGame[i] = new Array(3);
      }

      for (let i = 0; i < 4; i++) {
        this.playerGame[i] = new Array(11);
      }

      for (let i = 0; i < 1; i++) {
        this.trunfoGame[i] = new Array(1);
      }


      /* preenchimento da boardGame com todos os componentes */
      //COLOCAÇÃO SITOS PLAYER
      this.boardGame[0][1] = 'Player1';
      this.boardGame[1][2] = 'Player2';
      this.boardGame[2][1] = 'Player3';
      this.boardGame[1][0] = 'Player4';

      // popular board game (cartas jogadas)
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          if (this.boardGame[j][k] != 'Player1'
            && this.boardGame[j][k] != 'Player2'
            && this.boardGame[j][k] != 'Player3'
            && this.boardGame[j][k] != 'Player4') {
            this.boardGame[j][k] = 'Empty';
          }
        }
      }
      /* fim da população do boardGame */


      //Distribuir Cards pro players
      // console.log("Sockets " + this.arraySockets);
      // console.log("Player " + this.arrayPlayers);


      // for (let i = 1; i < this.playerGame.length; i++) {
      //   this.playerGame[0][0] = "Player1";
      //   this.playerGame[i][0] = this.arrayBaralho[i-1];
      //   this.currentCard++;
      // }

      // popular P1,P2,P3,P4
      let xy= 0;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < this.playerGame.length; j++) {
          xy=i+1;
          this.playerGame[i][0] = "Player" + xy;
        }
      }


      // random 1º jogador

      let randomPlayer = Math.floor(Math.random() * 3); // queremos o zero :D
      // console.log("randomPlayer", randomPlayer);
      let jaTenhoCartas = 0;
      // console.log('trunfo baralho', this.arrayBaralho[0]);
      this.trunfoCard = this.arrayBaralho[0];
      /* popular cartas no playerGame */
      for (let k = randomPlayer; k <=3 ; k++){
        if(jaTenhoCartas != 4) {
          for (var m = 1; m < 11; m++) {
            this.playerGame[k][m] = this.arrayBaralho[this.currentCard];
            this.currentCard++;
          }
          jaTenhoCartas++;

          if (k == 3) {
            k = -1;
          }
        } else {
          k = 4;
        }

      } // fim do for do k



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
      if (this.numPlayers >= 4) {
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

      if (playerID == 1) {

        this.boardGame[0][1] = this.playerGame[playerID-1][index];
      }else if (playerID == 2) {

        this.boardGame[1][2] = this.playerGame[playerID-1][index];
      }else if (playerID == 3) {

        this.boardGame[2][1] = this.playerGame[playerID-1][index];
      }else if (playerID == 4) {

        this.boardGame[1][0] = this.playerGame[playerID-1][index];
      }


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
