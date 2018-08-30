<template>
  <div class="error">
    <h1>
      {{ error.statusCode }}
    </h1>
    <p class="info">
      {{ error.message }}
    </p>
    <nuxt-link
      v-if="error.statusCode === 404"
      class="button"
      to="/"
    >
      Homepage
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  props: {
    error: {
      required: true,
      type: Object,
    },
  },
})
export default class HelloWorld extends Vue {}
</script>
