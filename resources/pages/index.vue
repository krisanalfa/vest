<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="~/assets/img/logo.png">
    <HelloWorld msg="Welcome"/>
  </div>
</template>

<script lang="ts">
import HelloWorld from '~/components/HelloWorld.vue'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    HelloWorld
  }
})
export default class IndexPage extends Vue {}
</script>
