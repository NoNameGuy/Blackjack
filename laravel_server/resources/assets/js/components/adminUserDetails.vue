<template>
    <table class="table table-striped">
        <thead>blocked
        <tr>
            <th><strong>Name</strong></th>
            <th><strong>Email</strong></th>
            <th><strong>Nickname</strong></th>
            <th><strong>CreatedAt</strong></th>
            <th><strong>Blocked</strong></th>
            <th><strong>Admin</strong></th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.nickname }}</td>
            <td>{{ user.created_at }}</td>
            <td>{{ user.blocked }}</td>
            <td>{{ user.admin }}</td>
            
        </tr>
        </tbody>
    </table>
</template>

<script type="text/javascript">

    export default {
        props: ['user'],
        data: function(){
            return {
                currentUser:null,
            }
        },
        methods: {
        
            getCurrentUser:function(user) {
                axios.get('api/users/' + user.id)
                    .then(response=>{
                        this.currentUser = response.data.data;
                        console.log(this.currentUser);
                    });

            }

        },
        components: {

        },

        mounted() {
            this.getCurrentUser(user);
        },
    }
</script>