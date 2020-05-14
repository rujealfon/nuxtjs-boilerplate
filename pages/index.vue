<template>
  <section>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Post Id</th>
          <th scope="col">User Id</th>
          <th scope="col">Title</th>
          <th scope="col">Body</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, postIndex) in posts" :key="postIndex">
          <th scope="row">{{ post.id }}</th>
          <td>{{ post.userId }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.body }}</td>
          <td>button</td>
        </tr>
        <tr v-if="posts.length === 0">
          <td colspan="5" class="font-weight-bolder text-center">
            No Posts Found
          </td>
        </tr>
      </tbody>
    </table>

    <b-pagination
      v-model="paginateCurrentPage"
      pills
      :total-rows="paginateTotalPage"
      align="right"
    ></b-pagination>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'page',

  data: () => ({
    paginateCurrentPage: 1
    // paginateTotalPage: 100
  }),

  computed: {
    // paginateTotalPage() {
    //   return Math.ceil(this.paginateTotal / this.paginateRange) || 1
    // },

    // addUpdateModalTitle() {
    //   return this.modalTitle === -1 ? 'Add Branch' : 'Update Branch'
    // },

    ...mapGetters({
      posts: 'post/getPost',
      paginateTotalPage: 'post/getPostTotal'
    })
  },

  watch: {
    async paginateCurrentPage(_page) {
      await this.$store.dispatch('post/searchPost', {
        _page,
        _limit: 10
      })
    }
  },

  async fetch({ store }) {
    await store.dispatch('post/searchPost', { _page: 1, _limit: 10 })
  }
}
</script>

<style lang="scss" scoped>
section {
  margin-top: 100px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
