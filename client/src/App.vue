<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name:'App',
}
</script>

<style>
*{
  box-sizing: border-box;
  margin:0;
}
body{
 
  margin:0 auto;
  background: #19274a;
  font-family: "Poppins", sans-serif;
  
}
#app{
  background: #19274A !important;
   width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}


</style>
