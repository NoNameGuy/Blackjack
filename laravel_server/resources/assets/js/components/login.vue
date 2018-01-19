<template v-if=" JSON.parse(localStorage.getItem('token')) == null">

  <form @submit.prevent="login(user)">
      <div class="text-left">
          <div class="form-group">
              <label for="email">Email</label>
              <input value="luisa82@example.net" type="email" class="form-control" id="email" v-model="user.email">
          </div>

          <div class="form-group">
              <label for="password">Password</label>
              <input value="secret" type="password" class="form-control" id="password" v-model="user.password">
          </div>
      </div>

      <div class="text-center">
          <a class="btn btn-primary" v-on:click.prevent="login()">Login</a>
          <br><br>
          <a class="btn btn-default" v-on:click.prevent="register()">Register</a>
      </div>
  </form>


</template>

<script type="text/javascript">
export default {
  data() {
    return {
      user : {
        email: null,
        password: null,
      },
        loginError: false
    };
  },
  methods: {
    login: function() {
      //console.log(user);
      //let user = {email : user.email, password : user.password};
      axios.post('/api/login', this.user, {
        headers: {'Content-Type' : 'application/json'}
      }).then(response => {
        // buscar o token do user logado
        console.log('Response: ');
        console.log(response);
        let token = response.data.access_token;
        // guardar na localStorage o token
        localStorage.setItem('token', JSON.stringify(token));
        // user já se encontra logado e com a sessão guardada
        this.$router.push('/');
        console.log("after update view");
      }).catch(loginError => {
        // Something went wrong!
        console.log('Login Error: ' + loginError);
        this.loginError = true;
      });
    },
    register() {
      this.$router.push('/register');
    }
  }
}
</script>


<scope>

</scope>