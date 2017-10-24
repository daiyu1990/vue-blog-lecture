<template lang="html">
  <div>
    <div class="loading-img">
      <img src="../../assets/loading.gif" alt="" v-if="!$store.state.post.selectPost">
    </div>
    <div class="alert-block" v-if="$store.state.post.selectPost">
      <div class="top-area">
        <button @click="onMaskClick"><i class="fa fa-times" aria-hidden="true"></i></button>
      </div>
      <div class="center-area">
        <div class="title">
          <h2>{{post.title}}</h2>
        </div>
        <div class="subtopic">
          <h4>{{post.subtopic}}</h4>
        </div>
        <div class="description">
          <p>{{post.description}}</p>
        </div>
      </div>
      <div class="bottom-area text-muted" align="right">
        <p>{{timeStamp}}</p>
        <!-- <p>By: {{post.author.email}}</p> -->
        <pre>{{post.author.email}}</pre>
      </div>
    </div>
    <div class="back-mask" @click="onMaskClick">
    </div>
  </div>

</template>

<script>
export default {
  created () {
    this.$store.dispatch('getClickPost', this.$route.params.id)
  },
  computed: {
    timeStamp () {
      var numberTime = parseInt(this.post.time)
      var date = new Date(numberTime)
      return this.$moment(date).format("YYYY/MM/DD hh:mm a")
    },
    post () {
      return this.$store.getters.getSelectPost
    }
  },
  methods: {
    onMaskClick () {
      this.$router.push('/')
    }
  },
  destroyed () {
    this.$store.commit('setSelectPost', null)
  }
}
</script>

<style lang="css" scoped>
.back-mask {
  background-color: rgba(33, 37, 41, 0.7);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.loading-img {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  z-index: 111;
}

.alert-block {
  background-color: #eee;
  border-radius: 8px;
  min-width: 60%;
  word-break: break-word;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  z-index: 111;
}
.alert-block .top-area {
  margin-bottom: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: flex-end;
  border-bottom: 1px solid #ddd;
  padding: 6px;
}
.alert-block .top-area button {
  border: none;
  background-color: initial;
  font-size: 14px;
  padding: 10px;
  margin-right: 10px;
}
.alert-block .center-area {
  margin: 10px;
  padding: 6px 20px;
}
.alert-block .center-area .title, .alert-block .center-area .subtopic, .alert-block .center-area .description {
  margin-bottom: 16px;
}
.alert-block .bottom-area {
  margin: 6px 10px;
  padding: 6px;
}
.alert-block .bottom-area p {
  margin: 0;
}

@media screen and (max-width: 700px) {
  .alert-block {
    width: 100%;
  }
}

</style>
