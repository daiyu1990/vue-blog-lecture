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
    },
    updateTitle (state, payload) {
      state.selectPost.title = payload
    },
    updateSubtopic (state, payload) {
      state.selectPost.subtopic = payload
    },
    updateDescription (state, payload) {
      state.selectPost.description = payload
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
    },
    editPost ({commit}, payload) {
      var token = window.localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios.put(`https://nuu-leture-blog.herokuapp.com/api/posts`, payload, { headers: {token} })
          .then((response) => {
            resolve(response.data);
          }).catch((err) => {
            reject(err.response.data);
          })
      })
    },
    deletePost ({commit}, payload) {
      var token = window.localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios.delete(`https://nuu-leture-blog.herokuapp.com/api/post/${payload._id}`, { headers: {token} })
          .then((response) => {
            resolve(response.data)
          }).catch((err) => {
            reject(err.response.data)
          })
      })
    }
  },
  getters: {
    getSelectPost (state) {
      return state.selectPost
    }
  }
}
