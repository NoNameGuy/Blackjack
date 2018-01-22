<template>
    <table class="table table-striped">
        <thead>blocked
        <tr>
            <th><strong>Name</strong></th>
            <th><strong>Email</strong></th>
            <th><strong>Nickname</strong></th>
            <th><strong>Actions</strong></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users"  :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.nickname }}</td>
            <td v-if="user.admin !== 1">
                <a v-if="user.blocked == 0" class="btn btn-xs btn-warning" v-on:click.prevent="blockUser(user)">Block User</a>
                <a v-if="user.blocked == 1" class="btn btn-xs btn-success" v-on:click.prevent="unlockUser(user)">Unlock User</a>
                <a class="btn btn-xs btn-danger" v-on:click.prevent="deleteUser(user)">Delete User</a>
                <a class="btn btn-xs btn-primary" v-on:click.prevent="userDetails(user)">Details</a>
            </td>
        </tr>
        </tbody>
    </table>
<!--
    <div v-if="details">
        <user-details :details="details">User Details</user-details>
    </div>
-->
</template>

<script type="text/javascript">
    import UserDetails from './adminUserDetails.vue';

    export default {
        props: ['users'],
        data: function(){
            return {
                currentPassword: null,
                changePasswordAdmin: false,
                user: [],
                details : false,
            }
        },
        methods: {
            blockUser: function(user){
                axios.put('api/user/blocked/' + user.id)
                    .then(
                        console.log(this.users),
                    );
                this.$emit('block-click', user);
            },

            unlockUser: function (user) {
                axios.put('api/user/unblocked/' + user.id)
                    .then(
                        console.log(this.users),
                    );
                this.$emit('unlock-click', user);
            },

            deleteUser: function(user){
                this.$emit('delete-click', user);
            },
            changePassword: function () {
                this.changePasswordAdmin = true;
            },
            clear: function () {
                this.changePasswordAdmin = false;
            },
            userDetails: function (user) {
              axios.get('api/users/' + user.id)
              .then(response => {
                console.log("userDetails UsersList");
                this.user = response.data.data;
                console.log(this.user.id);
                this.$router.push('adminUserDetails/' + this.user.id);
              });
            }
        },
        components: {
          'user-details' : UserDetails,
        },
    }
</script>
