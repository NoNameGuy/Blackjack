<template>
	<div class="jumbotron" v-if="isUserLogged">
	    <h2>My Account</h2>
		<a class="btn btn-danger" v-on:click.prevent="deleteUser()">Delete Account</a>

	    <div class="form-group">
	        <label for="inputName">Name: {{logged_user.name}} </label>
	    </div>
	    <div class="form-group">
	        <label for="inputEmail">Email: {{logged_user.email}}</label>
	    </div>
	    <div class="form-group">
	        <label for="inputNickname">Nickname: {{logged_user.nickname}}</label>
	    </div>


	    <div class="form-group">
	    <!--
	        <a class="btn btn-default" v-on:click.prevent="saveUser()">Save</a>
	        <a class="btn btn-default" v-on:click.prevent="cancelEdit()">Cancel</a>
	        -->
	        <a class="btn btn-default" v-on:click.prevent="editUser()">Edit</a>

	    </div>

	    <div v-show="editingUser" class="jumbotron" >
		    <h2>Edit User</h2>
		    <div class="form-group">
		        <label for="inputName">Name</label>
		        <input
		            type="text" class="form-control" v-model="logged_user.name"
		            name="name" id="inputName"
		            placeholder="Fullname"/>
		    </div>
		    <div class="form-group">
		        <label for="inputEmail">Email</label>
		        <input
		            type="email" class="form-control" v-model="logged_user.email"
		            name="email" id="inputEmail"
		            placeholder="Email address"/>
		    </div>
		    <div class="form-group">
		        <label for="inputPassword">Password</label>
		        <input
		            type="password" class="form-control" v-model="logged_user.password"
		            name="password" id="inputPassword"
		            placeholder="Password"/>
		    </div>
		    <div class="form-group">
		        <label for="inputNickname">Nickname</label>
		        <input
		            type="text" class="form-control" v-model="logged_user.nickname"
		            name="nickname" id="inputNickname"
		            placeholder="Nickname"/>
		    </div>


		    <div class="form-group">
		        <a class="btn btn-default" v-on:click.prevent="saveUser()">Save</a>
		        <a class="btn btn-default" v-on:click.prevent="cancelEdit()">Cancel</a>
		    </div>
		</div>
	</div>
</template>

<script type="text/javascript">
	module.exports={
		data: function() {
			return {
				logged_user : {},
				isUserLogged : false,
				editingUser : false,
			};
		},
	    methods: {
	        saveUser: function(){
	            axios.put('api/users/'+this.logged_user.id, this.logged_user)
	                .then(response=>{
	                	// Copy object properties from response.data.data to this.user
	                	// without creating a new reference
	                	Object.assign(this.logged_user, response.data.data);
	                	this.editingUser = false;
	                	
	                });
	        },
	        cancelEdit: function(){
	        	axios.get('api/users/'+this.logged_user.id)
	                .then(response=>{
	                	// Copy object properties from response.data.data to this.user
	                	// without creating a new reference
	                	Object.assign(this.logged_user, response.data.data);
	                	this.editingUser = false;
	                	
	                });
	        },

	        editUser: function(){
	        	this.editingUser = true;
	        },

	        deleteUser: function() {

	            let head = {
					 headers: {
							 'Authorization': 'Bearer ' + localStorage.getItem('token'),
					 		},
			 		};
					axios.post('/api/logout', null, head)
					.then(response => {
						console.log(response);
						window.localStorage.clear();
						//console.log("logout sucessfull");	
					
						axios.delete('/api/users/'+this.logged_user.id)
		                .then(response => {
		                    this.logged_user = null;
							console.log("user deleted");	
		                    
		                });
				});
						
	            	


	        	this.$router.push('/login');
	        },

	        logoutUser: function() {
	        	
	        	let head = {
					 headers: {
							 'Authorization': 'Bearer ' + localStorage.getItem('token'),
					 },
			 };
					axios.post('/api/logout', null, head)
					.then(response => {
						console.log(response);
						window.localStorage.clear();
						console.log("logout sucessfull");	
					
					this.$router.push('/login');
			})


	        	/*
	        	let head = {
					 headers: {
							 'Authorization': 'Bearer ' + localStorage.getItem('token'),
					 			},
			 		};
					axios.post('/api/logout', null, head)
					.then(response => {
						window.localStorage.clear();
						
						
				});
				*/
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
                            this.isUserLogged = true;
                            console.log(this.logged_user);

                      }).catch(error => {
                        // não está autenticado
                        this.isUserLogged = false;
                        console.log(error);
                      });
            }, // end function
		},
		mounted() {
			this.getLoggedUser();
		}
	}
</script>

<style scoped>

</style>
