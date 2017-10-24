import axios from 'axios'

export default {
  state: {
    posts: [],
    selectPost: null
  },
  mutations: {
    setPosts (state, payload) {
      state.posts = payload
    },
    setSelectPost (state, payload) {
      state.selectPost = payload
    }
  },
  actions: {
    getPosts ({commit}) {
      axios.get('https://nuu-leture-blog.herokuapp.com/api/posts')
        .then((response) => {
          commit('setPosts', response.data);
        })
    },
    getClickPost ({commit}, payload) {
      var token = window.localStorage.getItem('token')
      axios.get(`https://nuu-leture-blog.herokuapp.com/api/post/${payload}`, { headers: {token} })
        .then((response) => {
          commit('setSelectPost', response.data);
        })
    }
  },
  getters: {
    getSelectPost (state) {
      return state.selectPost
    }
  }
}
