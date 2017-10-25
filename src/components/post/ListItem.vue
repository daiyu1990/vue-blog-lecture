<template lang="html">
  <a class="list-group-item list-group-item-action flex-column align-items-start" @click="onClickItem">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{post.title}}</h5>
      <small>{{timeStamp}}</small>
    </div>
    <p class="mb-1">{{post.subtopic}}</p>
    <small class="text-muted">By: {{post.author.email}}</small>
  </a>
</template>

<script>
export default {
  props: ['post'],
  computed: {
    timeStamp () {
      var numberTime = parseInt(this.post.time)
      var date = new Date(numberTime)
      return this.$moment(date).format("YYYY/MM/DD hh:mm a")
    }
  },
  methods: {
    onClickItem () {
      this.$emit('onUpdateItem', this.post._id)
    }
  }
}
</script>

<style lang="css" scoped>
  .list-group-item {
    cursor: pointer;
  }
</style>
