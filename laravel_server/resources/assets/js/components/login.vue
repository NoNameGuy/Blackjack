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
        // console.log('Response: ');
        // console.log(response);
        let token = response.data.access_token;
        // guardar na localStorage o token
        localStorage.setItem('token', token);
        // user já se encontra logado e com a sessão guardada



        console.log("after getUser")
        // saber se o user é admin ou não e redicioná-lo para a vista correta
/*
        axios.get('/api/user', { 
                    headers: {'Content-Type' : 'application/json',
                          'Authorization' : 'Bearer ' + token }
              }).then(response => {
                    this.newUser = response.data;
                    //console.log (this.newUser.id); NÃO ESTÁ UNDEFINED 
              }).catch(error => {
                console.log(error);
              });
              //console.log(this.newUser.id);
      
            /*
          setTimeout(function(){ 
            console.log("when timeout");
            console.log(this.newUser); // ESTÁ UNDEFINED

              if(this.newUser.admin == 1) {
            console.log("yes admin");
            console.log(this.newUser.admin);

                this.$router.push('/adminMasterPage');
              } else {
            console.log("not admin");
            console.log(this.newUser.admin);
                this.$router.push('/');
              }
          }, 4000); 
*/

                this.$router.push('/');

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