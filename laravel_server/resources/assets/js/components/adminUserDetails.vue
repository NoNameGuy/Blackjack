<template>
    <table class="table table-striped">
        <thead>
        <tr>
            <th><strong>Name</strong></th>
            <th><strong>Email</strong></th>
            <th><strong>Nickname</strong></th>
            <th><strong>Blocked</strong></th>
            <th><strong>Admin</strong></th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="!aux" v-bind:src="getUser(user)">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.nickname }}</td>
            <td v-if="user.blocked"> Sim </td>
            <td v-else> Não </td>
            <td v-if="user.admin"> Sim </td>
            <td v-else> Não </td>
        </tr>
        </tbody>
            <a class="btn btn-primary" @click.prevent="home()">Home</a>

    </table>
</template>

<script type="text/javascript">

    export default {
        data: function(){
            return {
              user: null,
              aux : true,
            }
        },
        methods: {

          getUser: function(){
            if (this.aux){
              axios.get('api/users/' + this.$route.params.id)
                  .then(response => {
                      this.user = response.data.data;
                      console.log(this.user);
                      this.aux = false;
                  });
                }
          },
          home: function () {
            this.$router.push('/adminMasterPage');
          },

        },
        components: {

        },

        mounted() {
          this.getUser();
        },
    }
</script>
