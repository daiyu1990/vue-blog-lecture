import axios from 'axios'

export default {
  state: {
    user: null,
    loading: false
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    onSubmitSignup ({commit}, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.post('https://nuu-leture-blog.herokuapp.com/api/user/signup', payload)
          .then((response) => {
            window.localStorage.setItem('token', response.headers['token'])
            commit('setUser', response.data)
            commit('setLoading', false)
            resolve();
          }).catch((err) => {
            commit('setLoading', false)
            reject(err.response.data);
          })
      })
    },
    onSubmitSignin ({commit}, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.post('https://nuu-leture-blog.herokuapp.com/api/user/signin', payload)
          .then((response) => {
            window.localStorage.setItem('token', response.headers['token'])
            commit('setUser', response.data)
            commit('setLoading', false)
            resolve();
          }).catch((err) => {
            commit('setLoading', false)
            reject(err.response.data);
          })
      })
    },
    checkToken ({commit}, payload) {
      var token = window.localStorage.getItem("token");
      return new Promise((resolve, reject)=> {
        axios.get('https://nuu-leture-blog.herokuapp.com/api/user/check', {headers: {token}})
          .then((response) => {
            commit('setUser', response.data)
            resolve();
          }).catch((err) => {
            window.localStorage.removeItem("token");
            reject();
          })
      })
    },
    onUserLogout ({commit}) {
      var token = window.localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios.delete('https://nuu-leture-blog.herokuapp.com/api/user/logout', {headers: {token}})
          .then((response) => {
            window.localStorage.removeItem("token")
            commit('setUser', null)
            resolve();
          }).catch((err) => {
            reject();
          })
      })
    }
  },
  getters: {
    getUser (state) {
      return state.user
    }
  }
}
