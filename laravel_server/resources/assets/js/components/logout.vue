<template v-if="JSON.parse(localStorage.getItem('token')) != null">
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <h1>Logout</h1>
                <p><em>{{message}}</em></p>
                <div class="text-left">
                    <button class="btn btn-primary"  v-on:click="logout()">Logout</button>
                    <router-link class="btn btn-default" to="/users">Cancel</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    data (){
        return {
        	// null obj
        };
			},
				computed: {
						message(){
								return "Sure you want logout?";
						}
            //this.$forceUpdate();
    },
    methods: {
			logout() {
			 let head = {
					 headers: {
							 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
							 'Accept': 'application/json',
					 },
			 };
					axios.post('/api/logout', null, head)
					.then(response => {
					if(response.status == 200){
							window.localStorage.clear();
							console.log("logout sucessfull");	
					}
					this.$router.push('/login');
			}).catch(error => {
					console.log(error);
			});
	}
}
}
</script>

<style scoped>
</style>