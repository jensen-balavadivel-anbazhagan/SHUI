<template>
  <div class="navbar-section" @click="goToLogin">
      <img class="logo-top" alt="logo s" src="../../assets/logo.png">
  </div>
</template>

<script>
export default {
  name:"NavBar",
  methods:{
    goToLogin(){
      this.$router.push('/login')
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

</style>