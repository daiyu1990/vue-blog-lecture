<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <h1>Signup</h1>
        <form @submit.prevent="onSubmitSignup">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model.lazy="email" :class="{'is-invalid': emailStatus}" required>
            <div class="invalid-feedback">
              {{emailStatus}}
            </div>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" :class="{'is-invalid': passwordStatus}" id="exampleInputPassword1" placeholder="Password" v-model="password" required>
            <div class="invalid-feedback">
              {{passwordStatus}}
            </div>
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" class="form-control" :class="{'is-invalid': confirmPasswordStatus}" id="confirmPassword" placeholder="Confirm Password" v-model="confirmPassword" required>
            <div class="invalid-feedback">
              {{confirmPasswordStatus}}
            </div>
          </div>
          <div class="form-group">
            <label for="exampleInputName1">Name</label>
            <input type="text" class="form-control" id="exampleInputName1" placeholder="Name" v-model="name" required>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="$store.state.user.loading">
            <span v-if="!$store.state.user.loading">Submit</span>
            <span v-if="$store.state.user.loading"><i class='fa fa-spinner fa-spin '></i> Lodding</span>
          </button>
        </form>
      </div>
      <div class="col-md-4"></div>
    </div>
    <div class="row">
      <div class="alert alert-danger" role="alert" v-if="status">
        {{status}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      status: '',
      emailStatus: null,
      passwordStatus: null
    }
  },
  methods: {
    // submitSignup () {
    //   this.loading = true
    //   this.axios.post('https://nuu-leture-blog.herokuapp.com/api/user/signup', {email: this.email, name: this.name, password: this.password}).then((response) => {
    //     window.localStorage.setItem('token', response.headers['token'])
    //     this.$router.push('/profile')
    //   }).catch((err) => {
    //     this.status = err.response.data
    //     this.loading = false
    //   })
    // }
    onSubmitSignup () {
      if (this.password == this.confirmPassword && !this.emailStatus && !this.passwordStatus && !this.confirmPasswordStatus) {
        this.$store.dispatch('onSubmitSignup', { email: this.email, name: this.name, password: this.password }).then(() => {
          this.$router.push('/')
        }).catch((err) => {
          this.status = err
        })
      } else {
        alert('請檢查填寫內容')
      }
    }
  },
  watch: {
    password (value) {
      if (value.length >= 0 && value.length < 6) {
        this.passwordStatus = '密碼不能低於六位數'
      } else {
        this.passwordStatus = null;
      }
    },
    email (value) {
      this.axios.get(`https://nuu-leture-blog.herokuapp.com/api/user/uniqueEmail/${value}`)
        .then((response) => {
          this.emailStatus = null;
        }).catch((err) => {
          this.emailStatus = err.response.data
        })
    }
  },
  computed: {
    confirmPasswordStatus () {
      var confirmStatus;
      if (this.confirmPassword !== this.password) {
        confirmStatus = '與密碼不相同'
      } else {
        confirmStatus = null;
      }
      return confirmStatus;
    }
  }
}
</script>

<style lang="css">
</style>
