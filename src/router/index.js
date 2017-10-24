import Vue from 'vue'
import Router from 'vue-router'

import Signin from '../components/user/Signin.vue'
import Signup from '../components/user/Signup.vue'
import Profile from '../components/user/Profile.vue'
import Logout from '../components/user/Logout.vue'

import CreatePost from '../components/post/CreatePost.vue'
import Post from '../components/post/Post.vue'
import PostsList from '../components/post/PostsList.vue'
import PostsHome from '../components/post/PostsHome.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/signin', name: 'signin', component: Signin },
    { path: '/profile', name: 'profile', component: Profile, meta: { requiresAuth: true } },
    { path: '/signup', name: 'signup', component: Signup },
    { path: '/logout', name: 'logout', component: Logout },
    { path: '/', name: 'postsList', component: PostsList,
      children: [
        { path: 'post/:id', component: Post, meta: { requiresAuth: true } }
      ]},
    { path: '/postsAuth', component: PostsHome, meta: { requiresAuth: true },
      children: [
        { path: 'create', component: CreatePost }
      ]}
  ],
  mode: 'history'
})
