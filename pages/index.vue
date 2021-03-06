<template>
  <section>
    <!-- Add  -->
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-primary" @click.prevent="addUpdateModal = true">
        <font-awesome-icon icon="plus" /> Add User
      </button>
    </div>

    <!-- Table -->
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">User ID</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">Avatar</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, userIndex) in users" :key="userIndex">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td><img :src="user.avatar" alt="User Avatar" width="50px" /></td>
          <td width="115px">
            <button
              v-b-tooltip.hover
              class="btn btn-info rounded-circle"
              title="Update User"
              @click.prevent="showUpdateModal(user)"
            >
              <font-awesome-icon icon="pen" />
            </button>
            <button
              v-b-tooltip.hover
              class="btn btn-danger rounded-circle"
              title="Delete User"
              @click.prevent="showDeleteModal(user)"
            >
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="5" class="font-weight-bolder text-center">
            No Users Found
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <b-pagination
      v-model="paginateCurrentPage"
      pills
      :total-rows="paginateTotalPage"
      :per-page="paginatePerPage"
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
      <form @submit.prevent="deleteUser()">
        <div class="d-block text-center mb-3">
          <h6>
            Are you sure you want delete "<i>{{ this.delete.fullName }}</i
            >"?
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
      <form @submit.prevent="saveUser()">
        <div class="mb-3">
          <!-- First Name -->
          <div class="form-group">
            <label>First Name</label>
            <input
              v-model="$v.form.first_name.$model"
              type="text"
              class="form-control"
              :class="{
                'is-invalid':
                  $v.form.first_name.$error || errors.first_name.length,
                'is-valid':
                  !$v.form.first_name.$error && $v.form.first_name.$dirty
              }"
              @input="errors.first_name = []"
            />

            <!-- First Name Error -->
            <template v-if="$v.form.first_name.$error">
              <div v-if="!$v.form.first_name.required" class="invalid-feedback">
                First Name is required
              </div>
            </template>
          </div>

          <!-- Last Name -->
          <div class="form-group">
            <label>Last Name</label>
            <input
              v-model="$v.form.last_name.$model"
              type="text"
              class="form-control"
              :class="{
                'is-invalid':
                  $v.form.last_name.$error || errors.last_name.length,
                'is-valid':
                  !$v.form.last_name.$error && $v.form.last_name.$dirty
              }"
              @input="errors.last_name = []"
            />

            <!-- Last Name Error -->
            <template v-if="$v.form.last_name.$error">
              <div v-if="!$v.form.last_name.required" class="invalid-feedback">
                Last Name is required
              </div>
            </template>
          </div>

          <!-- Email -->
          <div class="form-group">
            <label>Email</label>
            <input
              v-model="$v.form.email.$model"
              type="text"
              class="form-control"
              :class="{
                'is-invalid': $v.form.email.$error || errors.email.length,
                'is-valid': !$v.form.email.$error && $v.form.email.$dirty
              }"
              @input="errors.email = []"
            />

            <!-- Email Error -->
            <template v-if="$v.form.email.$error">
              <div v-if="!$v.form.email.required" class="invalid-feedback">
                Email is required
              </div>
              <div v-if="!$v.form.email.email" class="invalid-feedback">
                Email format is invalid
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
import { email, required } from 'vuelidate/lib/validators'

export default {
  layout: 'page',

  data: () => ({
    buttonLoading: false,

    addUpdateModal: false,
    modalTitle: -1,

    deleteModal: false,
    delete: {
      userId: '',
      fullName: ''
    },

    form: {
      first_name: '',
      last_name: '',
      email: ''
    },

    formDefault: {
      first_name: '',
      last_name: '',
      email: ''
    },

    errors: {
      first_name: '',
      last_name: '',
      email: ''
    }
  }),

  validations: {
    form: {
      first_name: { required },
      last_name: { required },
      email: { required, email }
    }
  },

  computed: {
    ...mapGetters({
      users: 'user/getUsers',
      paginateTotalPage: 'user/getUsersTotal',
      paginatePerPage: 'user/getUsersPage'
    }),

    addUpdateModalTitle() {
      return this.modalTitle === -1 ? 'Add User' : 'Update User'
    },

    paginateCurrentPage: {
      get() {
        return this.$route.query.page || 1
      },

      async set(page) {
        // start loading
        this.$nuxt.$loading.start()

        // api call
        await this.$store.dispatch('user/searchUsers', {
          page
        })

        this.$router.push({ query: { page } })

        // finish loading
        this.$nuxt.$loading.finish()
      }
    }
  },

  watch: {
    addUpdateModal(val) {
      val || this.addUpdateModalClose()
    }
  },

  async fetch({ store, route }) {
    await store.dispatch('user/searchUsers', route.query)
  },

  methods: {
    async showUpdateModal(data) {
      // change the modal title to update user
      this.modalTitle = 0

      // deep clone the object
      const user = await JSON.parse(JSON.stringify(data))

      // assign user object
      this.form = { ...user }

      // show the update modal
      this.addUpdateModal = true
    },

    async showDeleteModal(user) {
      this.delete = await {
        userId: user.id,
        fullName: `${user.first_name} ${user.last_name}`
      }

      this.deleteModal = !this.deleteModal
    },

    async deleteUser() {
      try {
        // add button loading
        this.buttonLoading = true

        // delete user
        await this.$store.dispatch('user/deleteUser', this.delete.userId)

        // get all user
        await this.$store.dispatch('user/searchUsers', this.$route.query)

        // remove button loading
        this.buttonLoading = false

        // toggle delete modal
        this.deleteModal = !this.deleteModal

        // show success message
        this.$toastr.s(`${this.delete.fullName} successfully deleted`)
      } catch (error) {
        // show error message
        this.$toastr.e(error)
      }
    },

    async saveUser() {
      // vuelidate submit
      this.$v.form.$touch()

      // check for client side validation
      if (this.$v.form.$invalid) {
        this.$toastr.e('There are some errors on the form')

        return
      }

      // set the payload
      const payload = this.form

      // set the create user action
      let action = 'user/addUser'

      // set the create message
      let message = 'User successfully created'

      // update user
      if (this.modalTitle > -1) {
        // set the update user action
        action = 'user/updateUser'

        // set the updated message
        message = 'User successfully updated'
      }

      try {
        // add button loading
        this.buttonLoading = true

        // save/update user
        await this.$store.dispatch(action, payload)

        // get all user
        await this.$store.dispatch('user/searchUsers', this.$route.query)

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
          first_name: [],
          last_name: [],
          email: []
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
</style>
