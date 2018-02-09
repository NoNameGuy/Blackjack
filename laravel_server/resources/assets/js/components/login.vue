<template >
  <div v-if="!isUserLogged">
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

  </div>
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
        isUserLogged: false,
        token : null,
        logged_user: {},
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



        // saber se o user é admin ou não e redicioná-lo para a vista correta

        axios.get('/api/user', { 
                    headers: {'Content-Type' : 'application/json',
                          'Authorization' : 'Bearer ' + token }
              }).then(response => {
                this.newUser = response.data;
                // console.log (this.newUser);
                  if (this.newUser.activated == "1" && this.newUser.blocked != "1") { // conta ativada faz login
                    if (this.newUser.admin == "1") {
                    console.log ("sou admin");
                      
                      this.$router.push('/adminMasterPage');
                    } else
                    console.log ("sou user normal");
                    
                      this.$router.push('/');
                  } else {
                    console.log ("sou corno");
                    
                    window.localStorage.clear();
                    this.$router.push('/login');
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
    },
    getLoggedUser: function () {
            this.token = localStorage.getItem('token');
            //console.log("get Logged User");
            axios.get('/api/user', { 
                        headers: {'Content-Type' : 'application/json',
                        		  'Authorization' : 'Bearer ' + this.token }
                  }).then(response => {
                        this.logged_user = response.data;
                        //console.log (this.logged_user.id);
                        this.isUserLogged = true;
                        console.log(this.logged_user);

                  }).catch(error => {
                    // não está autenticado
                    this.isUserLogged = false;
                    console.log(error);
                  });
        }, // end function
  }, 
  mounted () {
    this.getLoggedUser();
  }
}
</script>


<scope>

</scope>