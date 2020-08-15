const constants = Object.freeze({
   PLAYER_HEALTH: 100,
   MONSTER_HEALTH: 100,
   MONSTER_MAX: 12,
   MONSTER_MIN: 7,
   MAX_ATTACK: 10,
   MIN_ATTACK: 5,
   MAX_SP_ATTACK: 15,
   MIN_SP_ATTACK: 10,
   HEAL: 10,
});

new Vue({
  el: '#app',
  data: {
    playerHealth: constants.PLAYER_HEALTH,
    monsterHealth: constants.MONSTER_HEALTH,
    coolOff: 0,
    logs: [],
    turn: true,
    gameOver: false
  },
  methods: {
    attack: function() {
      console.log(Math.floor(Math.random()));
      randomNumber = Math.floor(Math.random() * (constants.MAX_ATTACK - constants.MIN_ATTACK + 1) + constants.MIN_ATTACK)
      this.monsterHealth -= randomNumber;
      this.createLog('PLAYER', 'HITS', randomNumber);
      this.monsterTurn();
    },
    specialAttack: function() {
      randomNumber = Math.floor(Math.random() * (constants.MAX_SP_ATTACK - constants.MIN_SP_ATTACK + 1) + constants.MIN_SP_ATTACK)
      this.monsterHealth -= randomNumber;
      this.coolOff = 4;
      this.createLog('PLAYER', 'SPECIAL HITS', randomNumber);
      this.monsterTurn();
    },
    heal: function() {
      if (this.playerHealth == 100) {
        return;
      }
      this.playerHealth += 10;
      this.createLog('PLAYER', 'HEALS', 10);
      this.monsterTurn();
    },
    giveUp: function() {
      this.playerHealth = 0;
      setTimeout(() => {
        this.checkGame;
      }, 600);
    },
    monsterTurn: function() {
      setTimeout(() => {
        randomNumber = Math.floor(Math.random() * (constants.MONSTER_MAX - constants.MONSTER_MIN + 1) + constants.MONSTER_MIN)
        this.playerHealth -= randomNumber;
        this.createLog('MONSTER', 'HITS', randomNumber);
      }, 600);
      setTimeout(() => {
        this.checkGame;
      }, 600);
    },
    createLog: function(person, action, amount) {
      this.logs.unshift(`${person} ${action}, for ${amount}`);
    },
    checkColor: function(log) {
      return log.split(' ')[0] == 'MONSTER';
    },
    resetGame: function() {
      this.playerHealth = constants.PLAYER_HEALTH;
      this.monsterHealth = constants.MONSTER_HEALTH;
      this.coolOff = 0;
      this.turn = true;
      this.logs = [];
      this.gameOver = false;
    }
  },
  computed: {
    checkGame: function() {
      if (this.monsterHealth <= 0) {
        this.gameOver = true;
        alert("You have WON!!!!")
        this.resetGame();
      } else if (this.playerHealth <= 0) {
        this.gameOver = true;
        alert("THE MONSTER HAS WON!!!!")
        this.resetGame();
      } else {
        this.turn = true;
      }
    },
    checkGameOver: function() {
      return this.gameOver;
    },
    checkCoolOff: function() {
      return this.coolOff <= 0;
    },
  }
});
