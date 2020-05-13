<template>
  <section>
    <form class="form-signin" @submit.prevent="login()">
      <div class="form-group">
        <label>Email address</label>
        <input
          v-model="$v.form.email.$model"
          type="email"
          class="form-control"
          :class="{
            'is-invalid': $v.form.email.$error || errors.email.length,
            'is-valid': !$v.form.email.$error && $v.form.email.$dirty
          }"
          autofocus
          @input="errors.email = []"
        />

        <template v-if="$v.form.email.$error">
          <small v-if="!$v.form.email.required" class="invalid-feedback d-block"
            >Email address is required</small
          >
          <small v-if="!$v.form.email.email" class="invalid-feedback d-block"
            >Email address is invalid</small
          >
        </template>
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          v-model="$v.form.password.$model"
          type="password"
          class="form-control"
          :class="{
            'is-invalid': $v.form.password.$error || errors.password.length,
            'is-valid': !$v.form.password.$error && $v.form.password.$dirty
          }"
          @input="errors.password = []"
        />

        <template v-if="$v.form.password.$error">
          <small
            v-if="!$v.form.password.required"
            class="invalid-feedback d-block"
            >Password is required</small
          >
        </template>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  layout: 'default',
  middleware: 'guest',

  data: () => ({
    form: {
      email: '',
      password: ''
    },

    errors: {
      email: [],
      password: []
    }
  }),

  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },

  methods: {
    async login() {
      // vuelidate submit
      this.$v.form.$touch()

      // check for client side validation
      if (this.$v.form.$invalid) {
        this.$toastr.e('There are some errors on the form')

        return
      }

      try {
        const response = await this.$api.auth.login(this.form)

        this.$toastr.s(response.message)
      } catch (error) {
        this.$toastr.e(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  justify-content: center;
  height: 100vh;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}
</style>
