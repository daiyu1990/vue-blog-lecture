<template lang="html">
  <div class="jumbotron">
    <h1>Profile</h1>
    <div v-if="$store.state.user.user">
      <h3>_id: {{$store.state.user.user._id}}</h3>
      <h3>name: {{$store.state.user.user.name}}</h3>
      <h3>email: {{$store.state.user.user.email}}</h3>
    </div>
  </div>

</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
