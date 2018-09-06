<template>
  <div id="app">
    <div id="nav">
      <nuxt-link to="/">Home</nuxt-link> |
      <nuxt-link to="/about">About</nuxt-link>
    </div>

    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  name: "DefaultLayout",
})
export default class DefaultLayout extends Vue {}
</script>
