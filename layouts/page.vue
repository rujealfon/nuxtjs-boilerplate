<template>
  <section>
    <!-- Header -->
    <page-header></page-header>
    <!-- Content -->
    <main role="main">
      <div class="container">
        <nuxt />
      </div>
    </main>
    <!-- Footer -->
    <page-footer></page-footer>
  </section>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    'page-header': Header,
    'page-footer': Footer
  }
}
</script>

<style></style>
