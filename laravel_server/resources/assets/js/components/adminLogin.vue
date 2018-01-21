<template>
    <div class="jumbotron login">
        <h2>Welcome Admin</h2>
        <div class="alert alert-danger"  v-if="error">
            Something went wrong. Please check your email and password.
        </div>
        <form>
            <div class="form-group">
                <label for="inputEmail">Email</label>
                <input type="text" class="form-control" v-model="user.email" name="email" id="inputEmail" placeholder="Your Email"/>
            </div>
            <div class="form-group">
                <label for="inputPassword">Password</label>
                <input type="password" class="form-control" v-model="user.password" name="password" id="inputPassword" placeholder="Your Password"/>
            </div>

            <div class="form-group">
                <a class="btn btn-primary"  v-on:click.prevent="login">Submit</a>
                <a class="btn btn-success" v-on:click.prevent="cancel">Turn back</a>
            </div>
        </form>
    </div>
</template>
<script type="text/javascript">

    import Logout from './logout.vue';

    export default{
        data() {
            return {
                user: {
                    email: "",
                    password: ""
                },
                error: false,
            }
        },
        methods: {
            login: function () {
                if(this.user.email === 'admin@mail.dad') {
                    axios.post('api/login', this.user, {
                        headers: {
                            'Content-Type': 'application/json',
                        } })
                        .then(response => {
                            console.log(this.user);

                            this.$router.push('/adminMasterPage');
                        }).catch(error=> {
                        console.log(error);
                        this.error = true;

                    });
                } else {
                    this.error = true;
                }

            },
            cancel: function () {
                this.$router.push('/login');
            },

        },
        components: {
            'logout': Logout,
        },
    }
</script>