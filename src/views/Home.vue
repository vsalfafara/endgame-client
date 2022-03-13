<template>
  <div class="center">
    <el-card>
      <h3>Paimon Sandwich Endgame Banning and Picking System</h3>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item>
          <img v-if="avatar" :src="avatar">
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="Username" @change="createAvatar"></el-input>
        </el-form-item>
        <el-form-item prop="avatar">
          <el-select v-model="form.avatar" placeholder="Select Avatar" @change="createAvatar">
            <el-option
              v-for="item in sprints"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :selected="item.value === 'male'">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-if="!$route.params.id" type="primary" @click="createRoom('form')">Create Private Room</el-button>
          <el-button v-else type="primary" @click="joinRoom('form')">Join Room</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sprints: [
        {
          label: 'Male',
          value: 'male'
        },
        {
          label: 'Female',
          value: 'female'
        },
        {
          label: 'Human',
          value: 'human'
        },
        {
          label: 'Identicon',
          value: 'identicon'
        },
        {
          label: 'Initials',
          value: 'initials'
        },
        {
          label: 'Bottts',
          value: 'bottts'
        },
        {
          label: 'Avataaars',
          value: 'avataaars'
        },
        {
          label: 'Jdenticon',
          value: 'jdenticon'
        },
        {
          label: 'Gridy ',
          value: 'gridy '
        },
        {
          label: 'Micah ',
          value: 'micah '
        }
      ],
      avatar: null,
      form: {
        username: null,
        avatar: null
      },
      rules: {
        username: [
          { required: true }
        ],
        avatar: [
          { required: true }
        ]
      }
    }
  },
  methods: {
    createAvatar () {
      if (this.form.username && this.form.avatar) {
        this.avatar = `https://avatars.dicebear.com/api/${this.form.avatar}/:${this.form.username}.svg`
      }
    },
    createRoom (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const form = {
            username: this.form.username,
            avatar: this.avatar,
            team: null
          }
          this.$socket.client.emit('createRoom', form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    joinRoom (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const form = {
            username: this.form.username,
            avatar: this.avatar,
            team: this.form.team
          }
          this.$socket.client.emit('joinRoom', form, this.$route.params.id)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  sockets: {
    connect () {
      console.log('socket connected')
    },
    getRoomId (val) {
      this.$router.push(`/room/${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .center {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h3 {
    width: 400px;
    text-align: center;
  }
  img {
    height: 100px;
    display: block;
    margin: 0 auto;
  }
  .el-select {
    width: 100%;
  }
  .el-button {
    width: 100%;
  }
</style>
