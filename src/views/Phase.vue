<template>
  <div v-if="characterSelection" class="container">
    <div class="controls">
      <el-button v-if="isHost" type="danger" icon="el-icon-refresh" circle @click="reset"></el-button>
      <el-button v-if="isHost && showSwitchBtn" type="primary" icon="el-icon-refresh" circle @click="switchCaptains"></el-button>
    </div>
    <div class="ban-panels">
      <el-row>
        <el-col :span="8">
          <div class="row">
            <div v-for="(ban, index) in characterSelection[0].selection.bans" :key="index" class="selection ban">
              <img v-if="ban" :src="require(`@/assets/images/characters/${ban}`)" class="select">
            </div>
            <div v-for="(ban, index) in characterSelection[0].bansRemaining" :key="index" class="selection ban">
              <img class="select">
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="center" align="middle">
            <el-col :span="8">
              <div class="text-align-center">
                <p v-if="characterSelection[0].showSelectText">{{characterSelection[0].selectText}}</p>
                <p v-if="showRerollText">{{characterSelection[0].rerollText}}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <h1 class="time">{{time}}</h1>
            </el-col>
            <el-col :span="8">
              <div class="text-align-center">
                <p v-if="characterSelection[1].showSelectText">{{characterSelection[1].selectText}}</p>
                <p v-if="showRerollText">{{characterSelection[1].rerollText}}</p>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <div class="row-reverse">
            <div v-for="(ban, index) in characterSelection[1].selection.bans" :key="index" class="selection ban">
              <img v-if="ban" :src="require(`@/assets/images/characters/${ban}`)" class="select">
            </div>
            <div v-for="(ban, index) in characterSelection[1].bansRemaining" :key="index" class="selection ban">
              <img class="select">
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="6">
        <div>
          <h1>{{ characterSelection[0].name }}</h1>
          <div v-for="(pick, index) in characterSelection[0].selection.picks" :key="index" class="selection pick">
            <img v-if="pick" :src="require(`@/assets/images/characters/${pick}`)" class="select">
          </div>
          <div v-for="(pick, index) in characterSelection[0].picksRemaining" :key="index" class="selection pick">
            <img class="select">
          </div>
          <div v-if="characterSelection[0].showButton" class="forSelection" :class="{'deselect': !characterSelection[0].isTurn, 'pick': selection}" @click="enter">
            <div v-if="!characterSelection[0].isTurn" class="disabled"></div>
            <img :src="require(`@/assets/images/characters/${characterSelected.image}`)" alt="">
            <div class="text">
              <h3>{{selection ? 'Pick' : 'Ban'}}</h3>
              <h1>{{characterSelected.name}}</h1>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="boss" >
          <el-button v-if="isHost && !pressed" type="primary" @click="reveal">Boss Reveal</el-button>
          <img v-if="showBoss" :src="require(`@/assets/images/bosses/${boss}.webp`)" class="boss-img" :class="{'large': !showPanel}" alt="">
          <img v-if="showRoulette" src="@/assets/images/bosses/roulette.gif" class="boss-img large" alt="">
        </div>
        <div v-if="rerollButtons">
          <h3>Reroll?</h3>
          <el-row type="flex" justify="center">
            <el-button type="success" @click="vote(1)">Yes</el-button>
            <el-button type="danger" @click="vote(0)">No</el-button>
          </el-row>
        </div>
        <div class="panel-container" :class="{'show': showPanel}">
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <div class="character-panels">
              <div v-for="(row, index) in panels" :key="index" class="panel-col">
                <img v-for="(character, cIndex) in row.characters" :key="cIndex" :src="require(`@/assets/images/characters/${character.image}`)" @click="select(character)" class="panel" :class="row.color">
              </div>
            </div>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="6">
        <div v-if="players.length && characterSelection.length">
          <h1>{{ characterSelection[1].name }}</h1>
          <div v-for="(pick, index) in characterSelection[1].selection.picks" :key="index" class="selection pick">
            <img v-if="pick" :src="require(`@/assets/images/characters/${pick}`)" class="select">
          </div>
          <div v-for="(pick, index) in characterSelection[1].picksRemaining" :key="index" class="selection pick">
            <img class="select">
          </div>
          <div v-if="characterSelection[1].showButton" class="forSelection" :class="{'deselect': !characterSelection[1].isTurn, 'pick': selection}" @click="enter">
            <div v-if="!characterSelection[1].isTurn" class="disabled"></div>
            <img :src="require(`@/assets/images/characters/${characterSelected.image}`)" alt="">
            <div class="text">
              <h3>{{selection ? 'Pick' : 'Ban'}}</h3>
              <h1>{{characterSelected.name}}</h1>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Characters from '../data/characters'
export default {
  data () {
    return {
      characters: Characters,
      default: null,
      noBan: null,
      players: [],
      panels: [],
      showPanel: false,
      showRoulette: false,
      showBoss: false,
      showRerollText: false,
      panelCount: 0,
      isHost: this.$route.query.isHost,
      showSwitchBtn: true,
      userId: null,
      mode: this.$route.query.mode,
      characterSelection: [],
      pressed: false,
      boss: 0,
      rerollButtons: false,
      reroll: false,
      selection: null,
      currentSelecting: null,
      characterSelected: null,
      time: 0
    }
  },
  created () {
    this.panelCount = parseInt(this.$route.query.mode.charAt(0))
    this.$socket.client.emit('getUser')
    this.$socket.client.emit('getAllCaptainsInRoom', this.$route.params.id)
  },
  mounted () {
    this.panels.push(
      {
        color: 'Pyro',
        characters: this.characters.filter(character => character.vision === 'Pyro')
      },
      {
        color: 'Hydro',
        characters: this.characters.filter(character => character.vision === 'Hydro')
      },
      {
        color: 'Cryo',
        characters: this.characters.filter(character => character.vision === 'Cryo')
      },
      {
        color: 'Electro',
        characters: this.characters.filter(character => character.vision === 'Electro')
      },
      {
        color: 'Anemo',
        characters: this.characters.filter(character => character.vision === 'Anemo')
      },
      {
        color: 'Geo',
        characters: this.characters.filter(character => character.vision === 'Geo')
      }
    )
    this.default = this.characters.filter(character => character.vision === 'Unknown')[0]
    this.noBan = this.characters.filter(character => character.vision === 'x')[0]
  },
  methods: {
    reveal () {
      this.pressed = true
      const fileCount = require.context('@/assets/images/bosses', false, /\.(webp)$/).keys().length
      this.boss = Math.floor(Math.random() * fileCount) + 1
      this.showRoulette = true
      setTimeout(() => {
        this.showRoulette = false
        this.showBoss = true
        this.$socket.client.emit('boss', { boss: this.boss, room: this.$route.params.id })
      }, 3000)
    },
    vote (vote) {
      this.$socket.client.emit('reroll', { id: this.userId, reroll: vote })
      this.rerollButtons = false
    },
    select (character) {
      this.characterSelected = character
      this.characterSelection = this.characterSelection.map(info => {
        if (info.id === this.userId) {
          info.showButton = true
        }
        return info
      })
    },
    enter () {
      this.characterSelection = this.characterSelection.map(info => {
        if (info.id === this.userId) {
          info.showButton = false
          info.isTurn = false
        }
        return info
      })
      this.$socket.client.emit('enter', { character: this.characterSelected, selection: this.selection, room: this.$route.params.id, playerId: this.userId })
    },
    addCharacterToSelectionPanel (data) {
      this.characterSelection = this.characterSelection.map(info => {
        if (info.id !== data.playerId) {
          return info
        }
        if (data.selection) {
          info.selection.picks.push(data.character.image)
          info.picksRemaining--
        } else {
          info.selection.bans.push(data.character.image)
          info.bansRemaining--
        }
        info.showSelectText = false
        return info
      })
    },
    removeCharacterFromPanel (data) {
      this.panels = this.panels.map(panel => {
        return {
          color: panel.color,
          characters: panel.characters.filter(character => character.name !== data.character.name)
        }
      })
    },
    switchCaptains () {
      this.$confirm('This will switch the selection sequence.. Continue?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$socket.client.emit('switchCaptain', this.$route.params.id)
      })
    },
    reset () {
      this.$confirm('This will reset the entire room. Continue?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$socket.client.emit('reset', { room: this.$route.params.id, type: 0 })
      })
    }
  },
  sockets: {
    getAllCaptainsInRoom (val) {
      this.players = val
      this.characterSelection = this.players.map(player => {
        return {
          id: player.id,
          name: player.username,
          showButton: false,
          bansRemaining: this.panelCount,
          picksRemaining: this.panelCount,
          selectText: '',
          showSelectText: false,
          isTurn: false,
          rerollText: false,
          selection: {
            picks: [],
            bans: []
          }
        }
      })
    },
    getUser (val) {
      this.isHost = val.isHost
      this.userId = val.id
    },
    returnToRoom () {
      this.$router.push(`/room/${this.$route.params.id}`)
    },
    showBoss (data) {
      this.boss = data.boss
      this.showBoss = true
      if (!this.isHost && !data.rerollStatus) {
        this.rerollButtons = true
      }
      if (this.isHost && !data.rerollStatus) {
        this.$socket.client.emit('startTimeReroll', this.$route.params.id)
      } else if (this.isHost && data.rerollStatus) {
        this.$socket.client.emit('countdownToSelect', this.$route.params.id)
      }
    },
    startSelect () {
      this.$socket.client.emit('determineSequence', { room: this.$route.params.id, mode: this.$route.query.mode })
      this.$socket.client.emit('nextTurn', this.$route.params.id)
      this.$socket.client.emit('showPanel', this.$route.params.id)
    },
    determineReroll (data) {
      const vote = data.reroll.reduce((votes, info) => votes + info.voteReroll, 0)
      if (vote > 1 && !data.rerollStatus) {
        this.pressed = 0
        this.showBoss = false
        this.showRoulette = false
        this.boss = 0
        this.$socket.client.emit('rerolled')
      } else {
        this.$socket.client.emit('countdownToSelect', this.$route.params.id)
      }
    },
    showReroll (data) {
      this.showRerollText = true
      console.log(data.rerollStatus)
      if (!data.rerollStatus) {
        this.rerollButtons = false
        this.characterSelection = this.characterSelection.map(info => {
          data.captains.forEach(player => {
            if (info.id === player.id) {
              info.rerollText = player.voteReroll ? 'Reroll' : 'No Reroll'
            }
          })
          return info
        })
      }
    },
    showPanel () {
      this.showPanel = true
    },
    select (type) {
      this.characterSelection = this.characterSelection.map(info => {
        if (this.userId === info.id) {
          info.isTurn = true
        }
        return info
      })
      this.selection = type
    },
    removeCharacterFromPanel (data) {
      this.addCharacterToSelectionPanel(data)
      this.removeCharacterFromPanel(data)
      this.characterSelection = this.characterSelection.map(info => {
        info.isTurn = false
        if (data.playerId === info.id) {
          info.showSelectText = true
        }
        return info
      })
    },
    counter (time) {
      this.time = time
    },
    pickDefault (data) {
      if (data.selection) {
        this.$socket.client.emit('enter', { character: this.default, selection: data.selection, room: this.$route.params.id, playerId: data.player.id })
      } else {
        this.$socket.client.emit('enter', { character: this.noBan, selection: data.selection, room: this.$route.params.id, playerId: data.player.id })
      }
      this.characterSelection = this.characterSelection.map(info => {
        info.isTurn = false
        return info
      })
    },
    announceSelect (data) {
      this.currentSelecting = data.name
      this.selection = data.type
      this.characterSelected = null
      this.showRerollText = false
      this.characterSelection = this.characterSelection.map(info => {
        info.showButton = false
        info.showSelectText = false
        info.selectText = `${info.name} is ${this.selection ? 'picking' : 'banning'}`
        if (data.id === info.id) {
          info.showSelectText = true
        }
        return info
      })
    },
    startTimeSelect () {
      this.$socket.client.emit('startTimeSelect')
    },
    nextTurn () {
      this.$socket.client.emit('nextTurn', this.$route.params.id)
    },
    showSwitchBtn () {
      this.switchBtn = true
    },
    reset () {
      this.selection = null
      this.characterSelected = null
      this.boss = 0
      this.time = 0
      this.showPanel = false
      this.showBoss = false
      this.showRoulette = false
      this.showRerollText = false
      this.rerollButtons = false
      this.pressed = false
      this.panels = []
      this.$socket.client.emit('getAllCaptainsInRoom', this.$route.params.id)
      this.panels.push(
        {
          color: 'Pyro',
          characters: this.characters.filter(character => character.vision === 'Pyro')
        },
        {
          color: 'Hydro',
          characters: this.characters.filter(character => character.vision === 'Hydro')
        },
        {
          color: 'Cryo',
          characters: this.characters.filter(character => character.vision === 'Cryo')
        },
        {
          color: 'Electro',
          characters: this.characters.filter(character => character.vision === 'Electro')
        },
        {
          color: 'Anemo',
          characters: this.characters.filter(character => character.vision === 'Anemo')
        },
        {
          color: 'Geo',
          characters: this.characters.filter(character => character.vision === 'Geo')
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding: 1rem;
    position: relative;
  }
  .controls {
    position: absolute;
    top: .5rem;
    right: .5rem;
    z-index: 2;
    display: flex;
    .el-button {
      margin: 0 .5rem;
    }
  }
  h1 {
    text-align: center;
    margin: 0;
    &.time {
      font-size: 5rem;
      margin: 0;
    }
  }
  .text-align-center {
    text-align: center;
  }
  .panel {
    height: 100px;
    width: auto;
    cursor: pointer;
    margin: .3rem 0;
    border-width: 2px;
    border-style: solid;
    &.Pyro {
      border-color: #881d21
    }
    &.Hydro {
      border-color: #2850a5
    }
    &.Cryo {
      border-color: #2892a5
    }
    &.Electro {
      border-color: #6928a5
    }
    &.Anemo {
      border-color: #28a57b
    }
    &.Geo {
      border-color: #a5a328
    }
  }
  .ban-panels {
    margin: 3rem 0;
  }
  .row {
    display: flex;
    justify-content: center;
  }
  .row-reverse {
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
  }
  .panel-container {
    max-width: 700px;
    width: 100%;
    margin: 2rem auto;
    transition: .2s;
    opacity: 0;
    visibility: hidden;
    &.show {
      opacity: 1;
      visibility: visible;
    }
  }
  .character-panels {
    max-height: calc(100vh - 400px);
    display: flex;
    justify-content: center;
  }
  .panel-col {
    display: flex;
    flex-direction: column;
    margin: 0 .3rem;
  }
  .el-col {
    padding: 0 1rem;
  }
  .el-card {
    height: 100%;
  }
  .boss {
    display: flex;
    justify-content: center;
    align-items: center;
    .boss-img {
      max-height: 150px;
      height: 100%;
      width: auto;
      transition: .2s;
      &.large {
        max-height: 500px;
      }
    }
  }
  h3 {
    text-align: center;
  }
  .selection {
    background-color: rgb(31, 31, 31);
    border: 1px solid rgb(88, 88, 88);
    border-radius: 7px;
    margin-bottom: .4rem;
    overflow: hidden;
    margin: 1rem auto;
    .select {
      height: 100%;
      width: auto;
      display: block;
      margin: auto;
    }
    &.ban {
      height: 80px;
      width: 130px;
      margin: 0 .5rem;
    }
    &.pick {
      height: 100px;
      width: 200px;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .forSelection {
    height: 120px;
    width: 100%;
    border: 1px solid rgb(70, 70, 70);
    overflow: hidden;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    cursor: pointer;
    background-image: linear-gradient(to top, #c73535, #a5282a, #831c1f, #641014, #460505);
    &.deselect {
      pointer-events: none;
    }
    &.pick {
      background-image: linear-gradient(to top, #2a8f38, #1d752c, #115c20, #064414, #012d07);
    }
    img {
      margin-left: 1rem;
      height: 130%;
      width: auto;
    }
    .text {
      padding-right: 2rem;
      h3, h1 {
        margin: 0;
        text-align: right;
      }
    }
    .disabled {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
</style>
