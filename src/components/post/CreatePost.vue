<template lang="html">
  <div class="container">
    <h1>New Post</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" placeholder="Enter title" v-model="title" required>
      </div>
      <div class="form-group">
        <label for="subtopic">Subtopic</label>
        <input type="text" class="form-control" id="subtopic" placeholder="Enter subtopic" v-model="subtopic" required>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea class="form-control" id="description" rows="3" v-model="description" wrap="virtual" required></textarea>
      </div>
      <!-- <button type="submit" class="btn btn-primary">Create</button> -->
      <button type="submit" class="btn btn-primary" :disabled="loading">
        <span v-if="!loading">Create</span>
        <span v-if="loading"><i class='fa fa-spinner fa-spin'></i> Lodding</span>
      </button>
    </form>
    <div class="alert alert-danger" role="alert" v-if="status">
      {{status}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      subtopic: '',
      description: '',
      status: '',
      loading: false
    }
  },
  methods: {
    onSubmit () {
      this.loading = true;
      this.axios.post('https://nuu-leture-blog.herokuapp.com/api/posts', {title: this.title, subtopic: this.subtopic, description: this.description, time: this.$moment().valueOf()}, { headers: {token: window.localStorage.getItem('token')} })
        .then((response) => {
          this.$store.dispatch('getPosts')
          this.loading = false;
          this.$router.push('/')
        }).catch((err) => {
          this.loading = false;
          this.status = err.response.data
        })
    }
  }
}
</script>

<style lang="css">
</style>
