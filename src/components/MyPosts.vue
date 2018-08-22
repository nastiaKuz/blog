<template>
  <div class="container">
    <div class="jumbotron" v-for="post in postsByAuthor">
      <h1 class="display-4">{{post.title}}</h1>
      <p class="lead text-right">...by {{currentAuthor.name}}</p>
      <hr class="my-4">
      <p>{{post.description}}</p>
      <p class="lead">
        <router-link class="btn btn-primary btn-lg" v-bind:to="'/posts/'+post.id" role="button">Read more</router-link>
        <button @click="deletePost(post.id)" class="btn btn-danger btn-lg float-lg-right">Delete</button>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'posts',
    data () {
      return {
        posts: []
      }
    },
    async mounted() {
      this.$store.dispatch('getAllPosts');
      this.$store.dispatch('getPostsByAuthor', this.currentAuthor.id);
    },
    methods: {
      deletePost(id) {
        this.$store.dispatch('deletePost', id);
        this.$router.push('/posts');
      }
    },
    computed: {
      allPosts() {
        return this.$store.getters.allPosts;
      },
      postsByAuthor() {
        return this.$store.getters.postsByAuthor;
      },
      currentAuthor() {
        return this.$store.getters.currentAuthor;
      }
    }
  }
</script>
