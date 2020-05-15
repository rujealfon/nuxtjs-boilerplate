<template>
  <section>
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-primary">
        <font-awesome-icon icon="plus" /> Add Post
      </button>
    </div>
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
          <td width="115px">
            <button
              v-b-tooltip.hover
              class="btn btn-info rounded-circle"
              title="Update Post"
              @click.prevent="showUpdateModal(post)"
            >
              <font-awesome-icon icon="pen" />
            </button>
            <button
              v-b-tooltip.hover
              class="btn btn-danger rounded-circle"
              title="Delete Post"
              @click.prevent="showDeleteModal(post)"
            >
              <font-awesome-icon icon="trash" />
            </button>
          </td>
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

    <b-modal
      v-model="deleteModal"
      title="Confirmation"
      :hide-footer="true"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
    >
      <form @submit.prevent="deletePost()">
        <div class="d-block text-center mb-3">
          <h5>
            Are you sure you want delete Post Id "{{ this.delete.postId }}"?
          </h5>
        </div>
        <div class="modal-action d-flex justify-content-end">
          <button
            type="submit"
            class="btn btn-danger"
            :disabled="buttonLoading"
          >
            <font-awesome-icon v-if="buttonLoading" icon="spinner" pulse />
            Delete
          </button>
        </div>
      </form>
    </b-modal>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'page',

  data: () => ({
    buttonLoading: false,

    modalTitle: '',

    deleteModal: false,
    delete: {
      postId: '',
      title: ''
    },

    paginateCurrentPage: 1
  }),

  computed: {
    ...mapGetters({
      posts: 'post/getPost',
      paginateTotalPage: 'post/getPostTotal'
    }),

    addUpdateModalTitle() {
      return this.modalTitle === -1 ? 'Add Post' : 'Update Post'
    }
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
    await store.dispatch('post/searchPost')
  },

  methods: {
    showUpdateModal(post) {},

    async showDeleteModal(post) {
      this.delete = await {
        postId: post.id,
        title: post.title
      }

      this.deleteModal = !this.deleteModal
    },

    async deletePost() {
      try {
        // add button loading
        this.buttonLoading = true

        // api call
        await this.$store.dispatch('post/deletePost', this.delete.postId)

        // remove button loading
        this.buttonLoading = false

        // toggle delete modal
        this.deleteModal = !this.deleteModal

        // show success message
        this.$toastr.s(`${this.delete.postId} successfully deleted`)
      } catch (error) {
        // show error message
        this.$toastr.e(error)
      }
    }
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
