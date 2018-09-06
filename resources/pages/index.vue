<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="~/assets/img/logo.png"
    >
    <HelloWorld :msg="message" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import HelloWorld from "./../components/HelloWorld.vue";
import { State } from "vuex-class";

@Component({
  components: {
    HelloWorld,
  },
  name: "HomePage",
})
export default class HomePage extends Vue {
  @State("message")
  message: string;
}
</script>
