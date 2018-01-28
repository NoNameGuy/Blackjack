<template>
	<div class="jumbotron">
		<table class="table table-striped">
		    <thead>
		        <tr>
		            <th>Name</th>
		            <th>Email</th>
		            <th>Nickname</th>
		            <th>Actions</th>
		        </tr>
		    </thead>
		    <tbody>
		        <tr v-for="user in users"  :key="user.id" :class="{activerow: editingUser === user}">
		            <td>{{ user.name }}</td>
		            <td>{{ user.email }}</td>
		            <td>{{ user.nickname }}</td>
		            <td>
		            	<!--
						<a class="btn btn-xs btn-success" v-on:click.prevent="definePlayer(user,1)">P1</a>
						<a class="btn btn-xs btn-success" v-on:click.prevent="definePlayer(user,2)">P2</a>
						-->
		                <a v-if="user.id === logged_user.id" class="btn btn-xs btn-primary" v-on:click.prevent="editUser(user)">Edit</a>
		                <!--
		                <a class="btn btn-xs btn-danger" v-on:click.prevent="deleteUser(user)">Delete</a>
		                -->
		            </td>
		        </tr>
		    </tbody>
		</table>
	</div>
</template>

<script type="text/javascript">
	// Component code (not registered)
	module.exports={
		props: ['users'],
		data: function(){
			return {
				editingUser: null,
				logged_user: {},
			};
		},
		mounted() {
			this.getLoggedUser();
		},
        methods: {
            editUser: function(user){
            	this.$router.push('/userAccount');
            },
            deleteUser: function(user){
                this.editingUser = null;
                this.$emit('delete-click', user);
			},
			definePlayer: function(user,player){
				this.$root.$data['player'+player] = user;
				this.$emit('message', user.name+' selected as Player'+player);
			},
			getLoggedUser: function () {
                let token = localStorage.getItem('token');
                //console.log("get Logged User");
                axios.get('/api/user', { 
                            headers: {'Content-Type' : 'application/json',
                            		  'Authorization' : 'Bearer ' + token }
                      }).then(response => {
                            this.logged_user = response.data;
                            //console.log (this.logged_user.id);
                            console.log(this.logged_user);

                      }).catch(error => {
                        // não está autenticado
                        this.isUserLogged = false;
                        console.log(error);
                      });
            }, // end function
        },
	}
</script>

<style scoped>
	tr.activerow {
  		background: #123456  !important;
  		color: #fff          !important;
}

</style>
