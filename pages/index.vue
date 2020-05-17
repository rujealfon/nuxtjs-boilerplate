<template>
  <section>
    <!-- Add  -->
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-primary" @click.prevent="addUpdateModal = true">
        <font-awesome-icon icon="plus" /> Add Post
      </button>
    </div>

    <!-- Table -->
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

    <!-- Pagination -->
    <b-pagination
      v-model="paginateCurrentPage"
      pills
      :total-rows="paginateTotalPage"
      align="right"
    ></b-pagination>

    <!-- Delete Modal -->
    <b-modal
      v-model="deleteModal"
      title="Confirmation"
      :hide-footer="true"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
    >
      <form @submit.prevent="deletePost()">
        <div class="d-block text-center mb-3">
          <h6>
            Are you sure you want delete Post Id "{{ this.delete.postId }}"?
          </h6>
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

    <!-- Add / Update Modal -->
    <b-modal
      v-model="addUpdateModal"
      :title="addUpdateModalTitle"
      :hide-footer="true"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
    >
      <form @submit.prevent="savePost()">
        <div class="mb-3">
          <!-- Title -->
          <div class="form-group">
            <label>Title</label>
            <input
              v-model="$v.form.title.$model"
              type="text"
              class="form-control"
              :class="{
                'is-invalid': $v.form.title.$error || errors.title.length,
                'is-valid': !$v.form.title.$error && $v.form.title.$dirty
              }"
              @input="errors.title = []"
            />

            <!-- Title Error -->
            <template v-if="$v.form.title.$error">
              <div v-if="!$v.form.title.required" class="invalid-feedback">
                Title is required
              </div>
            </template>
          </div>

          <!-- Body -->
          <div class="form-group">
            <label>Body</label>
            <textarea
              v-model="$v.form.body.$model"
              type="text"
              class="form-control"
              :class="{
                'is-invalid': $v.form.body.$error || errors.body.length,
                'is-valid': !$v.form.body.$error && $v.form.body.$dirty
              }"
              @input="errors.body = []"
            ></textarea>

            <!-- Body Error -->
            <template v-if="$v.form.body.$error">
              <div v-if="!$v.form.body.required" class="invalid-feedback">
                Body is required
              </div>
            </template>
          </div>
        </div>

        <!-- Action -->
        <div class="modal-action d-flex justify-content-end">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="buttonLoading"
          >
            <font-awesome-icon v-if="buttonLoading" icon="spinner" pulse />
            Save
          </button>
        </div>
      </form>
    </b-modal>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  layout: 'page',

  data: () => ({
    buttonLoading: false,

    addUpdateModal: false,
    modalTitle: -1,

    deleteModal: false,
    delete: {
      postId: '',
      title: ''
    },

    form: {
      userId: 1,
      title: '',
      body: ''
    },

    formDefault: {
      userId: 1,
      title: '',
      body: ''
    },

    errors: {
      title: [],
      body: []
    },

    paginateCurrentPage: 1
  }),

  validations: {
    form: {
      title: { required },
      body: { required }
    }
  },

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
    addUpdateModal(val) {
      val || this.addUpdateModalClose()
    },

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
    async showUpdateModal(data) {
      // change the modal title to update post
      this.modalTitle = 0

      // deep clone the object
      const post = await JSON.parse(JSON.stringify(data))

      // assign post to post object
      this.form = { ...post }

      // show the update modal
      this.addUpdateModal = true
    },

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
    },

    async savePost() {
      // vuelidate submit
      this.$v.form.$touch()

      // check for client side validation
      if (this.$v.form.$invalid) {
        this.$toastr.e('There are some errors on the form')

        return
      }

      // set the payload
      const payload = this.form

      // set the create post action
      let action = 'post/addPost'

      // set the create message
      let message = 'Post successfully created'

      // update post
      if (this.modalTitle > -1) {
        // set the update post action
        action = 'post/updatePost'

        // set the updated message
        message = 'Post successfully updated'
      }

      try {
        // add button loading
        this.buttonLoading = true

        // api call
        await this.$store.dispatch(action, payload)

        // remove button loading
        this.buttonLoading = false

        // show success toastr
        this.$toastr.s(message)

        // hide the modal
        this.addUpdateModal = false
      } catch (error) {
        if (error.data !== undefined && error.data.error) {
          // show the error toastr
          this.$toastr.e(`There are some errors on the form`)

          // assing the validated data to errors
          this.errors = error.data

          return
        }

        this.$toastr.e(error)
      }
    },

    addUpdateModalClose() {
      setTimeout(() => {
        // reset the modal title
        this.modalTitle = -1

        // reset the form
        this.form = JSON.parse(JSON.stringify(this.formDefault))

        // reset client validation
        this.$v.form.$reset()

        // reset the server side validation
        this.errors = {
          title: [],
          body: []
        }
      }, 300)
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
