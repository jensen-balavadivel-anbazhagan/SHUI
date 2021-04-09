<template>
<div class="stream-page">
   <div class="navbar-section">
       <p v-if="userDeleted === true" class="register-user">You no longer exist in the SHUI system!</p>
  <img v-if="userDeleted === false" class="logo-top" alt="logo s" src="../assets/logo.png" @click="toggleView = !toggleView">
   <span  v-if="userDeleted === false"
      class="user-action"
      @click="logout">
    <font-awesome-icon icon="user" />
    </span>
   </div>
  <stream-tag v-if="toggleView"></stream-tag>
  <div class="header-section">
     <h1>Hello there!</h1>
      <h2 v-if="!streams.length">
        You dont follow any channels
      </h2>
      <h2 v-else>Your streams</h2>
  </div>
  <div class="stream-body">
  
  <stream-view v-for="stream in streams" :key="stream.id" 
  :title="stream.title"
  :description="stream.description"
  :id="stream.id"
  :date="stream.date"
  :tags="stream.tags"
  :userName="stream.userName" >
  </stream-view>
  </div>
  <div class="streampage-buttons">
    <img class="logo-top" alt="Add new Stream" src="../assets/edit.png" @click="goToAddStream">
    <button @click="deleteUser">Delete user</button>
  </div>
  <footer-section></footer-section>
</div>
</template>

<script>
import StreamView from '../components/streams/StreamView.vue';
import FooterSection from '../components/layoutSection/FooterSection.vue';
import StreamTag from '../components/streams/StreamTag.vue';
export default {
  name:'StreamsPage',
  components:{
    'stream-view':StreamView,
    'footer-section':FooterSection,
    'stream-tag':StreamTag,
  },
  data(){
    return{
      toggleView:false,
      userDeleted:false,
    }
  },
  methods:{
    goToAddStream(){
      this.$router.push('/addstream')
    },
    deleteAllStreams(){
      this.$store.dispatch('deleteAllStreams')
    },
    deleteUser(){
      this.$store.dispatch('deleteUser');
      sessionStorage.removeItem("token");
       this.userDeleted=true;
      setTimeout(()=>{
               this.$router.push('/login');
            },1000)
    },
    logout() {
      sessionStorage.removeItem("token");
      location.reload();
    }

  },
   computed: {
        streams() {
            return this.$store.state.streams;
        },      
    },
  mounted(){
    this.$store.dispatch('loadStreams');
       this.$store.dispatch('loadTags')
  }

}
</script>

<style scoped>
.stream-page{
    width:100%;
    height:600px;
    display:flex;
    flex-direction:column; 
    margin:0 auto;
}
.header-section{
  display:flex;
  width:100%;
}
.header-section > h1{
  width:60%;
  color:peru;
  margin-left:30px;
}
.header-section >button{
  width:100px;
}

.header-section >h2 {
    color: #fff;
    font-size: 1.3rem;
    margin-top: 2rem ;
    margin-left: 2px;
  }
.streampage-buttons{
  display:flex;
  width:80%;
  margin:0 auto;

}
stream-tag{
  width:100%;
  height:500px;
 padding-left: 400px;
}

button{
   height:40px;
   width:20%;
   margin:10px;
   display:flex;
   justify-content: center;
   align-items: center;
   border-radius:2px;
   border:2px solid #ffffff;
   box-shadow: 0 1px 1px 1px rgb(170, 170, 194);
   color:rgb(12, 5, 5);
   text-align: center;
   font-size:18px;
   font-weight: 700;
   width:75%;
}
button:hover{
    border: 2px solid rgb(7, 4, 150);
}
.stream-body{
  width:90%;
  min-height:400px;
  display:flex;
  flex-direction:column;
  margin:0 auto;
}

stream-view{
  width:100%;
  height:100px;
  border:2px solid orange;
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