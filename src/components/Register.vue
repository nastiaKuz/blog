<template>
  <div class="login row justify-content-center">
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">Registration</div>
        <div class="card-body">
          <form @submit.prevent="registrate">
            <div class="form-group row">
              <label>Name:</label>
              <input type="text" v-model="form.name" class="form-control" placeholder="Your Name" required>
            </div>
            <div class="form-group row">
              <label>Email:</label>
              <input type="email" v-model="form.email" class="form-control" placeholder="Email Address" required>
            </div>
            <div class="form-group row">
              <label>Password:</label>
              <input type="password" v-model="form.password" class="form-control" placeholder="Password" required>
            </div>
            <div class="form-group row">
              <input type="submit" value="Create an account">
            </div>
            <!--<div class="form-group row" v-if="authError">-->
              <!--<p class="error">-->
                <!--{{ authError }}-->
              <!--</p>-->
            <!--</div>-->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {registrate, login} from '../helpers/auth';
  export default {
    name: "login",
    data() {
      return {
        form: {
          name: '',
          email: '',
          password: ''
        },
        error: null
      };
    },
    methods: {
      registrate() {
        this.$store.dispatch('registrate');
        registrate(this.$data.form)
          .then((response)=>{
            this.$store.commit('registrationSuccess', response);
              login(response.author)
                .then((response)=>{
                  this.$store.commit('loginSuccess', response);
                  this.$router.push('/posts');
                });
          })
          .catch((err)=> {
            this.$store.commit('registrationFailed', {err});
          })
      }
    },
    computed: {

    }
  }
</script>

<style scoped>
  .error {
    text-align: center;
    color: red;
  }
</style>
