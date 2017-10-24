<template lang="html">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="navbar-brand" tag="a">Home Page</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <router-link
          v-for="(item, i) in menuItems"
          class="nav-item"
          tag="li"
          activeClass="active"
          :key="i"
          :to="item.link"
        >
        <div class="nav-link">{{item.title}}</div>
      </router-link>
      </ul>
      <form class="form-inline" v-if="userIsAuthenticated">
        <button class="btn btn-outline-success" type="button" @click="onLogout">Logout</button>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      collapse: false
    }
  },
  computed: {
    menuItems () {
      var menuItems;
      if (this.userIsAuthenticated) {
        menuItems = [
          {title: 'Profile', link: '/profile'},
          {title: 'New Post', link: '/postsAuth/create'}
        ]
      } else {
        menuItems = [
          {title: 'Signin', link: '/signin'},
          {title: 'Signup', link: '/signup'}
        ]
      }
      return menuItems;
    },
    userIsAuthenticated () {
        return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('onUserLogout').then(() => {
        this.$router.push('/signin')
      }).catch(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="css">
.nav-link {
  cursor: pointer;
}
</style>
