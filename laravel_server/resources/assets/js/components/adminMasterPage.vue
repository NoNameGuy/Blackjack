<template>
    <div class="form-group">
        <h1>Welcome Admin</h1>
        <div class="form-group">
            <v-btn class="btn btn-primary" @click.prevent="usersList">Users</v-btn> -
            <v-btn class="btn btn-primary" @click.prevent="imageList">Image</v-btn> -
            <v-btn class="btn btn-primary" @click.prevent="statistics">Statistics</v-btn> -
            <v-btn class="btn btn-primary" @click.prevent="getUsersBla">defesa</v-btn>
        </div>
        <div v-if="userList">
            <users-list :page="page" :users="users" @block-click="blockUser" @unlock-click="unlockUser" @delete-click="deleteUser">Users List</users-list>
            <div class="text-center">
                <nav>
                    <ul class="pagination">
                        <li v-if="pagination.current_page > 1">
                            <a href="#" aria-label="Previous"
                               @click.prevent="changePage(pagination.current_page - 1)">
                                <span aria-hidden="true">«</span>
                            </a>
                        </li>
                        <li v-for="page in pagesNumber"
                            v-bind:class="[ page == isActived ? 'active' : '']">
                            <a href="#"
                               @click.prevent="changePage(page)">@{{ page }}</a>
                        </li>
                        <li v-if="pagination.current_page < pagination.last_page">
                            <a href="#" aria-label="Next"
                               @click.prevent="changePage(pagination.current_page + 1)">
                                <span aria-hidden="true">»</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <div v-if="imagesList">
            <images-list :images="images">Images List</images-list>
        </div>
    </div>
</template>
<script type="text/javascript">
/*
    import UsersList from './usersList.vue';
    import ImagesList from './imagesList.vue';
*/
    export default {
        data: function(){
            return {
                title: 'List Users',
                showSuccess: false,
                successMessage: '',
                currentUser: null,
                users: [],
                images: [],
                departments: [],
                userList: false,
                imagesList: false,
                page: 1,
                pagination: {},
            }
        },
        methods: {
            blockUser: function(user){
                this.currentUser = user;
                this.getUsers();
            },

            unlockUser: function(user){
                this.currentUser = user;
                this.getUsers();
            },
            deleteUser: function(user){
                axios.delete('api/users/'+user.id)
                    .then(response => {
                        this.showSuccess = true;
                        this.successMessage = 'User Deleted';
                    });
                this.getUsers();
            },

            getUsers: function(page){
                axios.get('api/users?page='+ page)
                    .then(response=>{
                        this.users = response.data.data;
                        this.pagination = response.data.meta;
                        console.log(this.pagination);
                        console.log(this.users);
                    });
            },
            usersList: function(){
                this.userList = true;
            },
            imageList: function(){
                this.imagesList = true;
            },
            childMessage: function(message){
                this.showSuccess = true;
                this.successMessage = message;
            },
            changePage: function (page) {
                this.pagination.current_page = page;
                this.getUsers(page);
            },

            getImages: function(){
                axios.get('api/images/active')
                    .then(response=>{
                        this.images = response.data.data;
                        console.log(this.images);
                        console.log(response.data.data.path);
                    });
            },

            statistics: function() {
                this.$router.push('/statistics');
            },
            getUsersBla: function () {
                this.$router.push('/defesa');
            },
        },
        components: {
            /*
            'users-list': UsersList,
            'images-list': ImagesList,
*/
        },
        computed: {
            isActived: function () {
                return this.pagination.current_page;
            },
            pagesNumber: function () {
                if (!this.pagination.to) {
                    return [];
                }
                let from = this.pagination.current_page - this.offset;
                if (from < 1) {
                    from = 1;
                }
                let to = from + (this.offset * 2);
                if (to >= this.pagination.last_page) {
                    to = this.pagination.last_page;
                }
                let pagesArray = [];
                while (from <= to) {
                    pagesArray.push(from);
                    from++;
                }
                return pagesArray;
            }
        },

        mounted() {
            this.getUsers(this.pagination.current_page);
            this.getImages();
        }

    }
</script>

<style scoped>
    p {
        font-size: 2em;
        text-align: center;
    }
    a {
        background-color: #2a88bd;
    }
</style>