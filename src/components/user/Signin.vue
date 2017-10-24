<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <form @submit.prevent="onSubmitSignin">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password" required>
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
      status: ''
    }
  },
  methods: {
    onSubmitSignin () {
      this.$store.dispatch('onSubmitSignin', {email: this.email, password: this.password})
        .then(() => {
          // window.location.reload();
          this.$router.push('/')
        }).catch((err) => {
          this.status = err
        })
    }
  }
}
</script>

<style lang="css">
</style>
