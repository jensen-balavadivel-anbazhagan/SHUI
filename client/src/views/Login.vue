<template>
  <div>
      <nav-bar />
      <div class="body-login">
        <body-section></body-section>
        <login-form></login-form>
      </div>
    <footer-section></footer-section>
  </div>
</template>

<script>
import NavBar from '../components/layoutSection/NavBar';
import BodySection from '../components/layoutSection/BodySection'
import FooterSection from '../components/layoutSection/FooterSection.vue';
import LoginForm from '../components/formComponents/LoginForm.vue'
export default {
    name:'LoginPage',
    components:{
    'nav-bar':NavBar,
    'body-section':BodySection,
    'footer-section':FooterSection,
    'login-form':LoginForm
    },
   }
</script>

<style scoped>
body-login{
   height:500px;
    width:350px;
    display:flex;
    justify-content:center;
    align-items:center;
}
login-form{
    height:150px;
    height:500px;

}
.register-button{
    margin:-200px 0 50px 0;
    
    display:flex;
    justify-content: center;
    align-items:center;
}

</style>