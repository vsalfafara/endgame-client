<template>
  <div class="container">
    <el-row>
      <el-col v-if="isHost">
        <el-card>
          <div slot="header">
            <span>Game Setup</span>
          </div>
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="mode" label="Mode">
              <el-radio-group v-model="form.mode">
                <el-radio-button label="1v1">1v1</el-radio-button>
                <el-radio-button label="2v2">2v2</el-radio-button>
                <el-radio-button label="3v3">3v3</el-radio-button>
                <el-radio-button label="4v4">4v4</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="buttons">
              <div class="btn-group">
                <el-button @click="getRoomLink">Get Room Link</el-button>
                <el-button type="primary" @click="start('form')" :disabled="players.length < 2">Start Game</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col>
        <el-card>
          <div slot="header">
            <span>Players</span>
          </div>
          <div v-for="(player, index) in players" :key="index" class="player">
            <img :src="player.avatar" alt="">
            <p>{{player.username}}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      players: [],
      isHost: false,
      userId: null,
      form: {
        mode: null
      },
      rules: {
        mode: [
          { required: true }
        ]
      }
    }
  },
  created () {
    this.$socket.client.emit('getUser')
    this.$socket.client.emit('getAllPlayersInRoom', this.$route.params.id)
  },
  methods: {
    getRoomLink () {
      navigator.clipboard.writeText(window.location.origin + '/' + this.$route.params.id)
      this.$message({
        message: 'Game link copied to clipboard',
        type: 'success'
      })
    },
    start (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const form = {
            room: this.$route.params.id,
            mode: this.form.mode
          }
          this.$socket.client.emit('startPhase', form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  sockets: {
    getAllPlayersInRoom (val) {
      this.players = val
    },
    getUser (val) {
      this.isHost = val.isHost
      this.userId = val.id
    },
    startPhase (mode) {
      this.$router.push(`phase/${this.$route.params.id}?userId=${this.userId}&isHost=${this.isHost}&mode=${mode}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
    display: flex;
    align-items: center;
    .el-row {
      width: 100%;
      display: flex;
      justify-content: center;
      .el-col {
        margin: 0 10px;
        max-width: 500px;
        width: 100%;
        span {
          font-weight: bold;
        }
        img {
          width: 50px;
          display: block;
          margin: 0 auto;
        }
        p {
          text-align: center;
        }
        .btn-group {
          display: flex;
          justify-content: space-between;
        }
        .player {
          display: inline-block;
          width: 25%;
          margin: 0;
        }
      }
    }
  }
</style>
