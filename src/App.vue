<template>
  <div :style="bg">
    <div :style="transparent">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      image: require('../assets/images/bg')
    }
  },
  created () {
    console.log(this.image)
  },
  computed: {
    bg () {
      return {
        'background-image': `url(${this.image})`,
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-position': 'center center',
        height: '100vh'
      }
    },
    transparent () {
      return {
        'background-color': 'rgba(0, 0, 0, .7)',
        height: '100vh'
      }
    }
  }
}
</script>
