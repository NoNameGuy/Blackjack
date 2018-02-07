<template v-if="localStorage.getItem('token') == null">
  <form>
      <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" v-model="email">
      </div>

      <div class="text-center">
          <a class="btn btn-primary" v-on:click.prevent="sendEmail()">Send Email</a>
      </div>
  </form>


</template>

<script type="text/javascript">
export default {
  data() {
    return {
      email : null,
      body: "Olá eu sou um burro do caralho que ainda não fez DAD LOL"
    };
  }, // end data
  methods: {
    sendEmail() {
        console.log('send Email: ', this.email);
        axios.get('/api/adminEmail/'+ this.email, this.email)
          .then(response => {
            let isAdmin = response.data.admin;
            console.log('isAdmin1', isAdmin);
            
            
            if (isAdmin) { // email é válido e pode-se mandar email
            console.log('isAdmin2: OK');
            console.log("Mandar esta filho da puta para página de login/nova password");
            }
          }).catch(error => {
            console.log('error: ', error);
            alert("Error: Invalid Email/ Not allowed");
          });
    }, // end function sendEmail()
  } // end methods
}
</script>


<scope>

</scope>