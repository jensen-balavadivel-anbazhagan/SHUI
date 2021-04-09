<template>
  <div class="navbar-section" @click="goToLogin">
      <img class="logo-top" alt="logo s" src="../../assets/logo.png">
      
    <span
      class="user-action"
      v-show="$route.name === 'Login'"
      @click="$router.push({ name: 'Register' })"
    >
    <font-awesome-icon icon="user" />
    </span>
    <span
      class="user-action"
      v-show="$route.meta.requiresAuth && token"
      @click="logout"
    >
    <font-awesome-icon icon="user" />
    </span>
  </div>
  
</template>

<script>
export default {
  name:"NavBar",
 
  computed: {
    token : {
       get: function () {
        return sessionStorage.getItem("token");
      },
      set: function () {},
    },
  },
  methods:{
    goToLogin(){
      this.$router.push('/login')
    },
    logout() {
      sessionStorage.removeItem("token");
      location.reload();
    }
  }

}
</script>

<style>

.logo-top{
  width:30px;
  height:40px;
  margin-left:60px;
}
 span.user-action {
    color: #fff;
    padding: 10px;
    font-size: 1.3rem;
    border-radius: 50%;
    border: 2px solid #fff;
    margin-left: 80%;
  }

</style>