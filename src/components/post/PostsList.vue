<template lang="html">
  <div class="posts-list">
    <div class="container">
      <h1>Post List</h1>
      <div v-if="!$store.state.post.posts">Loading...</div>
      <div class="list-group" v-if="$store.state.post.posts">
        <list-item v-for="(post, index) in $store.state.post.posts" :post="post" :key="index" @onUpdateItem="onClickItem"></list-item>
      </div>
    </div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'
export default {
  components: {
    ListItem
  },
  methods: {
    onClickItem (payload) {
      this.$router.push(`/post/${payload}`)
    }
  }
}
</script>

<style lang="css" scoped>
  
</style>
