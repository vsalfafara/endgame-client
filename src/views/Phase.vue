<template>
  <div class="container">
    <div class="ban-panels">
      <el-row>
        <el-col :span="10">
          <el-row type="flex" justify="center">
            <div v-for="(ban, index) in characterSelection[0].selection.bans" :key="index" class="selection ban">
              <img v-if="ban" :src="require(`@/assets/images/characters/${ban}`)" class="select">
            </div>
            <div v-for="(ban, index) in characterSelection[0].bansRemaining" :key="index" class="selection ban">
              <img class="select">
            </div>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row type="flex" justify="center">
            <h1 class="time">{{time}}</h1>
          </el-row>
        </el-col>
        <el-col :span="10">
          <el-row type="flex" justify="center">
            <div v-for="(ban, index) in characterSelection[1].selection.bans" :key="index" class="selection ban">
              <img v-if="ban" :src="require(`@/assets/images/characters/${ban}`)" class="select">
            </div>
            <div v-for="(ban, index) in characterSelection[1].bansRemaining" :key="index" class="selection ban">
              <img class="select">
            </div>
          </el-row>
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
          <div v-if="characterSelection[0].showButton" class="forSelection" :class="{'deselect': !isTurn, 'pick': selection}" @click="enter">
            <div v-if="!isTurn" class="disabled"></div>
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
          <img v-if="boss > 0" :src="require(`@/assets/images/bosses/${boss}.webp`)" alt="">
        </div>
        <div v-if="rerollButtons">
          <h3>Reroll?</h3>
          <el-row type="flex" justify="center">
            <el-button type="success" @click="vote(1)">Yes</el-button>
            <el-button type="danger" @click="vote(0)">No</el-button>
          </el-row>
        </div>
        <div class="panel-container">
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
          <div v-if="characterSelection[1].showButton" class="forSelection" :class="{'deselect': !isTurn, 'pick': selection}" @click="enter">
            <div v-if="!isTurn" class="disabled"></div>
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
      pressed: 0,
      boss: 0,
      rerollButtons: false,
      reroll: false,
      players: [],
      panels: [],
      panelCount: 0,
      isHost: this.$route.query.isHost,
      userId: null,
      mode: this.$route.query.mode,
      characterSelection: [],
      selection: null,
      currentSelecting: null,
      isTurn: false,
      characterSelected: null,
      time: 0
    }
  },
  created () {
    this.panelCount = parseInt(this.$route.query.mode.charAt(0))
    this.$socket.client.emit('getUser')
    this.$socket.client.emit('getAllPlayersInRoom', this.$route.params.id)
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
  },
  methods: {
    reveal () {
      this.pressed = 1
      const started = new Date().getTime()
      const duration = 3000
      const fileCount = require.context('@/assets/images/bosses', false, /\.(webp)$/).keys().length
      const randomize = setInterval(() => {
        const current = new Date().getTime()
        if (current - started > duration) {
          clearInterval(randomize)
          this.$socket.client.emit('boss', { boss: this.boss, room: this.$route.params.id })
          if (!this.reroll) {
            this.$socket.client.emit('startTimerReroll', this.$route.params.id)
          } else {
            this.$socket.client.emit('determineSequence', { room: this.$route.params.id, mode: this.$route.query.mode })
            this.$socket.client.emit('nextTurn')
          }
        }
        this.boss = Math.floor(Math.random() * fileCount) + 1
      }, 300)
    },
    vote (vote) {
      this.$socket.client.emit('reroll', { id: this.userId, reroll: vote })
      this.rerollButtons = false
      this.reroll = true
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
        }
        return info
      })
      this.isTurn = false
      this.$socket.client.emit('enter', { character: this.characterSelected, selection: this.selection, room: this.$route.params.id, playerId: this.userId })
      this.$socket.client.emit('nextTurn')
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
    }
  },
  sockets: {
    getAllPlayersInRoom (val) {
      this.players = val
      this.characterSelection = this.players.map(player => {
        return {
          id: player.id,
          name: player.username,
          showButton: false,
          bansRemaining: this.panelCount,
          picksRemaining: this.panelCount,
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
    showBoss (boss) {
      this.boss = boss
      if (!this.isHost && !this.reroll) {
        this.rerollButtons = true
      } else {
        this.$socket.client.emit('startTimeReroll', this.$route.params.id)
      }
    },
    determineReroll (reroll) {
      const vote = reroll.reduce((votes, info) => votes + info.voteReroll, 0)
      if (vote === 2) {
        this.pressed = 0
        this.boss = 0
        this.reroll = true
      } else {
        this.$socket.client.emit('determineSequence', { room: this.$route.params.id, mode: this.$route.query.mode })
        this.$socket.client.emit('nextTurn')
      }
    },
    select (type) {
      this.isTurn = true
      this.selection = type
      this.$socket.client.emit('startTimeSelect')
    },
    removeCharacterFromPanel (data) {
      this.addCharacterToSelectionPanel(data)
      this.removeCharacterFromPanel(data)
    },
    counter (time) {
      this.time = time
    },
    pickDefault (data) {
      this.isTurn = false
      if (data.selection) {
        this.$socket.client.emit('enter', { character: this.default, selection: data.selection, room: this.$route.params.id, playerId: data.player.id })
      }
      this.$socket.client.emit('nextTurn')
    },
    announceSelect (data) {
      this.currentSelecting = data.name
      this.selection = data.type
      this.characterSelected = null
      this.characterSelection = this.characterSelection.map(info => {
        info.showButton = false
        return info
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding: 1rem;
  }
  h1 {
    text-align: center;
    margin: 0;
    &.time {
      font-size: 5rem;
      margin: 0;
    }
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
    padding: 2rem 0;
  }
  .panel-container {
    max-width: 700px;
    width: 100%;
    margin: 2rem auto;
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
    height: 150px;
    img {
      height: 100%;
      width: auto;
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
      height: 100px;
      width: 200px;
      margin: 0 .5rem;
    }
    &.pick {
      height: 130px;
      width: 250px;
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
