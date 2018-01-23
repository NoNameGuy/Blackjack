<template>
  <form>
    <div class="text-left">
        <div class="form-group">
            <label for="password">Old PW:</label>
            <input type="password" class="form-control" id="old_password" v-model="admin.old_password">
        </div>

        <div class="form-group">
            <label for="password">New PW:</label>
            <input type="password" class="form-control" id="password" v-model="admin.password">
        </div>

        <div class="form-group">
            <label for="confirm_password">Confirm PW:</label>
            <input type="password" class="form-control" id="confirm_password" v-model="admin.confirm_password">
        </div>

        <div class="text-center">
            <a class="btn btn-primary" v-on:click.prevent="updatePW()">Mudar PW</a>
        </div>

    </div>
  </form>
</template>

<script type="text/javascript">

    export default {

        data() {
    return {
      admin : {
        old_password: null,
        password : null,
        confirm_password : null,
      },
    };
  },
        methods: {

          updatePW: function () {

            console.log(this.admin.old_password);
            console.log(this.admin.password);
            console.log(this.admin.confirm_password);

            axios.put('/api/admin/resetPasswordAdmin', {
              old_password: this.admin.old_password,
              password: this.admin.password,
              confirm_password: this.admin.confirm_password

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
