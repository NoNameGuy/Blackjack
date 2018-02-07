<template v-if="localStorage.getItem('token') == null">

  <form @submit.prevent="login(user)">
      <div class="text-left">
          <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" v-model="user.email">
          </div>

          <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" v-model="user.password">
          </div>
      </div>

      <div class="text-center">
          <a class="btn btn-primary" v-on:click.prevent="login()">Login</a>
          <br><br>
          <a class="btn btn-default" v-on:click.prevent="register()">Register</a>
          <br><br>          
          <a v-on:click.prevent="forgot()">Admin, forgot your password? <br>  HERE BITCH!</a> 
      </div>
  </form>


</template>

<script type="text/javascript">
export default {
  data() {
    return {
      newUser : {},
      user : {
        email: null,
        password: null,
      },
        loginError: false,
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
        // console.log('Response: ');
        // console.log(response);
        let token = response.data.access_token;
        // guardar na localStorage o token
        localStorage.setItem('token', token);
        // user já se encontra logado e com a sessão guardada



        console.log("after getUser")
        // saber se o user é admin ou não e redicioná-lo para a vista correta

        axios.get('/api/user', { 
                    headers: {'Content-Type' : 'application/json',
                          'Authorization' : 'Bearer ' + token }
              }).then(response => {
                this.newUser = response.data;
                console.log (this.newUser);

                  if(this.newUser.admin == "1") {
                    this.$router.push('/adminMasterPage');
                  } else if (this.newUser.blocked == "1") {
                    console.log("user bloqueado");
                    this.$router.push('/login');
                  } else {
                    this.$router.push('/');
                  }
              }).catch(error => {
                console.log(error);
              });

      }).catch(loginError => {
        // Something went wrong!
        console.log('Login Error: ' + loginError);
        this.loginError = true;
        alert("Error: Email or password Invalid!");
      });
    },
    forgot() {
      this.$router.push('/forgot');      
    },
    register() {
      this.$router.push('/register');
    }
  }
}
</script>


<scope>

</scope>