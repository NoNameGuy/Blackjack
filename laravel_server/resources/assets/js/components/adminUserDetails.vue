<template>
    <table class="table table-striped">
        <thead>blocked
        <tr>
            <th><strong>Name</strong></th>
            <th><strong>Email</strong></th>
            <th><strong>Nickname</strong></th>
            <th><strong>Blocked</strong></th>
            <th><strong>Admin</strong></th>
        </tr>
        </thead>
        <tbody>
        <tr v-bind:src="getUser(user)">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.nickname }}</td>
            <td>{{ user.blocked }}</td>
            <td>{{ user.admin }}</td>

        </tr>
        </tbody>
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

        },
        components: {

        },

        mounted() {
          this.getUser();
        },
    }
</script>
