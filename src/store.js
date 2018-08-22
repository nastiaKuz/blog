import Api from './services/Api'
import {getLocalAuthor} from './helpers/auth'

const author = getLocalAuthor();

export default {
  state: {
    currentAuthor: author,
    isLoggedIn: !!author,
    authors: [],
    posts: [],
    postsByAuthor: [],
    authorsWithPosts: []
  },
  mutations: {
    registrate(state){

    },
    registrationSuccess(state, payload) {
    },
    registrationFailed(state, payload) {

    },
    login(state) {

    },
    loginSuccess(state, payload) {
      state.isLoggedIn = true;
      state.currentAuthor = Object.assign({}, payload.author, {token: payload.token});
      localStorage.setItem("author", JSON.stringify(state.currentAuthor));
    },
    loginFailed(state, payload) {

    },
    logout(state) {
      localStorage.removeItem("author");
      state.isLoggedIn= false;
      state.currentAuthor = null;
    },
    updatePosts(state, payload) {
      state.posts = payload;
    },
    updateAuthors(state, payload) {
      state.authors = payload;
    },
    updatePostsByAuthor(state, payload) {
      state.postsByAuthor = payload;
    },
    getAuthorsWithPosts(state, payload) {
      state.authorsWithPosts = payload;
    }
  },
  actions: {
    login(context) {
      context.commit('login');
    },
    registrate(context) {
      context.commit('registrate');
    },
    getAllPosts(context) {
      Api().get('posts')
        .then((response)=> {
          context.commit('updatePosts', response.data);
        })
    },
    addPost(context, data) {
      Api().post('posts', data)
        .then((response)=> {
          this.dispatch('getAllPosts');
        })
    },
    deletePost(context, id) {
      Api().delete('posts/'+id)
        .then((response)=> {
          this.dispatch('getAllPosts');
        })
    },
    getAllAuthors(context) {
      Api().get('authors')
        .then((response)=> {
          context.commit('updateAuthors', response.data);
        })
    },
     getPostsByAuthor(context, author_id) {
      Api().get('/'+author_id+'/posts')
        .then((response)=> {
          context.commit('updatePostsByAuthor', response.data);
        })
     },
    getAuthorsWithPosts(context) {
      Api().get('authors_posts')
        .then(response=>{
          context.commit('getAuthorsWithPosts', response.data);
        })
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    currentAuthor(state) {
      return state.currentAuthor;
    },
    allPosts(state) {
      return state.posts;
    },
    allAuthors(state) {
      return state.authors;
    },
    postsByAuthor(state) {
      return state.postsByAuthor;
    },
    authorsWithPosts(state) {
      return state.authorsWithPosts;
    }
  }
}
