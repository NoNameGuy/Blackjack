<template>
  <!-- <div v-if="!isUserLogged"> -->
    <form @submit.prevent="register(user)">

      <div class="control-group">
        <label class="control-label" for="email">E-mail</label>
        <div class="controls">
          <input type="text" v-model.trim="user.email" id="email" name="email" class="input-xlarge">
        </div>
      </div>

      <div class="control-group">
        <label class="control-label" for="password">Password</label>
        <div class="controls">
          <input type="password" v-model="user.password" id="password" name="password" class="input-xlarge">
        </div>
      </div>

      <div class="control-group">
        <label class="control-label" for="name"> Name </label>
        <div class="controls">
          <input type="text" v-model="user.name" id="name" name="name" class="input-xlarge">
        </div>
      </div>

      <div class="control-group">
        <label class="control-label" for="nickname"> Nickname </label>
        <div class="controls">
          <input type="text" v-model="user.nickname" id="nickname" name="nickname" class="input-xlarge">
        </div>
      </div>

      <div class="control-group">
        <!-- Button -->
        <div class="controls">
          <a class="btn btn-default" v-on:click.prevent="register()">Register</a>
        </div>
      </div>

    </form>
  <!-- </div> -->
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      user : {
        email: null,
        password : null,
		    name : null,
        nickname : null,
        logged_user: {},
        isUserLogged: false,
      },
      //registerError: false
    };
  },
  
  methods: {
    register: function() {
    	axios.post('/api/register', {
    							email : this.user.email,
    							password : this.user.password,
    							name : this.user.name,
                  nickname : this.user.nickname
    						},
                         { headers: {
                             'Content-Type': 'application/json',
                         }
                        }).then(response => {
                  // enviar email de autenticação
                  console.log(response);
                  this.$router.push('/login');
    	}).catch(registerError => {
        // Something went wrong!
        //this.registerError = true;
        console.log('Login Error: ' + registerError);
      });
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
                  });
        }, // end function
  },
  mounted () {
    
    // this.getLoggedUser();
  }
}
</script>


<scope>

</scope>