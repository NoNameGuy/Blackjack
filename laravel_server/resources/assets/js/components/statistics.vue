<template>

    <table class="table table-striped">
        <thead>
        <div class="text-center">
	        <a class="btn btn-default" v-on:click.prevent="home()">Home</a>
	    </div>
        <h1>Total of Games: {{ totalGames }} </h1>
        <h1>Average Player Per Game: {{ players_per_game}}</h1>
        <h1>Total Players in Platform : {{ totalPlayers }}</h1>
        <tr>
            <th><strong>Status</strong></th>
            <th><strong>Total Players</strong></th>
            <th><strong>Created By</strong></th>
            <th><strong>Winner</strong></th>
        </tr>
        </thead>
        <tbody>
        
        <tr v-for="game in games"  :key="game.id">
            <td>{{ game.status }}</td>
            <td>{{ game.total_players }}</td>
            <td>{{ game.created_by }}</td>
            <td>{{ game.winner }}</td>
        </tr>
        </tbody>

        
    </table>
    

</template>

<script type="text/javascript">

    export default {

        data: function(){
            return {
            	totalGames : 0,
            	games: [],
            	players_per_game : 0,
            	totalPlayers : 0,
            }
        },
        methods: {
            getGames: function() {
            	axios.get('/api/games')
            	.then(response => {
            		this.totalGames = response.data.data.length;
            		this.games = response.data.data;
            		this.averagePlayerPerGame();
            	})
            },

            averagePlayerPerGame: function () {
            	if (this.totalGames == 0) {
            		this.players_per_game = 0;
            	} else {
            		for (var i = 0; i < this.games.length; i++) {
            		this.totalPlayers += parseInt(this.games[i].total_players);
            		console.log(this.games[i].total_players);
            		}

            		this.players_per_game = this.totalPlayers / this.games.length;
            	}
            	
            },

            home() {
		      this.$router.push('/adminMasterPage');
		    }

            


            
        },
        
        components: {
          
        },
        mounted() {
        	this.getGames();
        }
    }
</script>
