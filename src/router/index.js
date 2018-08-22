import Vue from 'vue'
import Router from 'vue-router'
import Blog from '@/components/Blog'
import MyPosts from '@/components/MyPosts'
import NewPost from '@/components/NewPost'
import EditPost from '@/components/EditPost'
import Login from '@/components/Login'
import Register from '@/components/Register'
require('bootstrap/dist/css/bootstrap.min.css');

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/posts',
      name: 'myPosts',
      component: MyPosts,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/posts/new',
      name: 'newpost',
      component: NewPost,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/posts/:id/',
      name: 'editpost',
      component: EditPost,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog
    }
  ]
})
