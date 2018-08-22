<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h4>{{post.title}}</h4>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'editPost',
    data() {
      return {
        post: {
          title: null,
          date: null,
          author_id: null
        }
      }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>
