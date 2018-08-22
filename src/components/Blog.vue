<template>
  <div class="container">
    <template v-for="post in allPosts">
      <div class="jumbotron">
        <h1 class="display-4">{{post.title}}</h1>
        <p class="lead text-right">...by {{post.author.name}}</p>
        <hr class="my-4">
        <p>{{post.description}}</p>
        <p class="lead">
          <router-link class="btn btn-primary btn-lg" v-bind:to="'/posts/'+post.id" role="button">Read more</router-link>
        </p>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'posts',
    data () {
      return {
        post: null,
        author: null
      }
    },
    mounted() {
      this.$store.dispatch('getAllPosts');
      this.$store.dispatch('getAuthorsWithPosts');
    },
    methods: {

    },
    computed: {
      allPosts() {
        return this.$store.getters.allPosts;
      },
      authorsWithPosts() {
       return this.$store.getters.authorsWithPosts;
      }
    }
  }
</script>
