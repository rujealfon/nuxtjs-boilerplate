<template>
  <section>
    <div class="wrapper">
      <div class="box">
        <h1 v-if="error.statusCode === 404">Page not found</h1>
        <h1 v-else>An error occurred</h1>
        <p>{{ error.message }}</p>
        <p>&#58;&#40;</p>
        <p><nuxt-link to="/">Let me try again!</nuxt-link></p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NuxtBoilerplateError',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      return this.error.message || "Sorry, it's me, not you."
    }
  },
  head() {
    return {
      title: this.message,
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0'
        }
      ]
    }
  }
}
</script>

<style scoped>
section {
  font: normal 100%/1.15 'Merriweather', serif;
  background-color: #7ed0f2;
  color: #fff;
  height: 100vh;
}

.wrapper {
  padding-top: 50px;
  position: relative;
  max-width: 1298px;
  height: auto;
  margin: auto;
}

/* https://www.flaticon.com/authors/vectors-market */
/* https://www.flaticon.com/authors/icomoon */
.box {
  min-height: auto;
  margin: 0 auto;
  padding: 1em 1em;
  text-align: center;
  background: url('https://www.dropbox.com/s/xq0841cp3icnuqd/flame.png?raw=1')
      no-repeat top 10em center/128px 128px,
    transparent
      url('https://www.dropbox.com/s/w7qqrcvhlx3pwnf/desktop-pc.png?raw=1')
      no-repeat top 13em center/128px 128px;
}

h1,
p:not(:last-of-type) {
  text-shadow: 0 0 6px #216f79;
}

h1 {
  margin: 0 0 1rem 0;
  font-size: 8em;
}

p {
  margin-bottom: 0.5em;
  font-size: 3em;
}

p:first-of-type {
  margin-top: 4em;
}

p > a {
  border-bottom: 1px dashed #216f79;
  font-style: italic;
  text-decoration: none;
  color: #216f79;
}

p > a:hover {
  text-shadow: 0 0 6px #216f79;
}

p img {
  vertical-align: bottom;
}
</style>
