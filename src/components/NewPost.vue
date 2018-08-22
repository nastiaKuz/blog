<template>
  <div class="container">
    <div class="row justify-content-center">
      <form class="form-group" @submit.prevent="addNewPost">
        <label>Name: </label>
        <input type="text" v-model="post.title" class="form-control"/>
        <label>Date</label>
        <input type="text" v-model="post.date" class="form-control"/>
        <input type="submit" class="btn btn-success" value="Add"/>
        <p>Author: {{currentAuthor.name}}</p>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NewPost',
    data() {
      return {
        post: {
          title: '',
          date: ''
        },
        author:null
      }
    },
    mounted() {
      this.author = this.$store.getters.currentAuthor;
      this.$store.dispatch('getAllAuthors');
    },
    computed: {
      allAuthors() {
        return this.$store.getters.allAuthors;
      },
      currentAuthor() {
        return this.$store.getters.currentAuthor;
      }
    },
    methods: {
      addNewPost() {
        this.$store.dispatch('addPost', {post: this.post, author: this.author})
          .then(()=> {
            this.$router.push('/posts');
          })
          .catch((err)=>{
             console.log(err);
          })
      }
    }
  }
</script>
