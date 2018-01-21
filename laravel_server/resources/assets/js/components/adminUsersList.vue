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
</template>

<script type="text/javascript">

    export default {
        props: ['users'],
        data: function(){
            return {
                currentPassword: null,
                changePasswordAdmin: false,
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
                this.$router.push('/adminUserDetails');
            },
        },
        components: {

        },
    }
</script>