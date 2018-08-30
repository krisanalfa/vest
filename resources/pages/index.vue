<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="~/assets/img/logo.png"
    >
    <HelloWorld msg="Welcome" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import HelloWorld from "./../components/HelloWorld.vue";

@Component({
  components: {
    HelloWorld,
  },
})
export default class IndexPage extends Vue {}
</script>
