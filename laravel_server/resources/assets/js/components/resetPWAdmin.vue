<template>
  <form>
    <div class="text-left">
        <div class="form-group">
            <label for="password">Old PW:</label>
            <input type="password" class="form-control" id="old_password" v-model="old_password">
        </div>

        <div class="form-group">
            <label for="password">New PW:</label>
            <input type="password" class="form-control" id="password" v-model="password">
        </div>

        <div class="form-group">
            <label for="confirm_password">Confirm PW:</label>
            <input type="password" class="form-control" id="confirm_password" v-model="confirm_password">
        </div>

        <div class="text-center">
            <a class="btn btn-primary" v-on:click.prevent="updatePW()">Mudar PW</a>
        </div>

    </div>
  </form>
</template>

<script type="text/javascript">

    export default {

        data: function(){
            return {
              old_password:null,
              api_password : null,
              password:null,
              confirm_password:null,
            }
        },
        methods: {

          updatePW: function () {
            axios.put('/admin/resetPWAdmin', {
              'old_password': this.old_password,
              'password': this.password,
              'confirm_password': this.confirm_password

            }).then(response => {
              console.log(response);
              this.$router.push('/AdminUsersList');

            }).catch(updatePWError =>{

              console.log(updatePWError);
              this.$router.push('/resetPWAdmin');


            })

          }

        },
        components: {

        },

        mounted() {


        },
    }
</script>
