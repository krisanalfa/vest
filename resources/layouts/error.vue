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
      to="/">
      Homepage
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  }
}
</script>
