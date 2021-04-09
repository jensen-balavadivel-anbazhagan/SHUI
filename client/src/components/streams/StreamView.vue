<template>
  <div class="stream-container">
       <div class="stream-body">

        <p class="stream-date">{{date}}</p>
        <div class="stream-section">
           <div class="stream-description">
           <p>{{ description}}</p>
           </div>
          <p class="stream-user"> -{{ userName }}</p>
       </div>
       <div>
        <div class="tag-section">

         <tag-view v-for="tag in tags" :key="tag.id" :id="tag.id" :tagName="tag.tagName"></tag-view>
        <div class= "small-triangle"></div>
        </div>
       </div>
      </div>

  </div>
</template>

<script>
import TagView from '../formComponents/TagView.vue'
export default {
  name: "StreamView",
  props: ["id", "title", "description","date","tags", "userName"],
  components:{
    'tag-view':TagView
  },
  data() {
    return {
    };
  },
  methods: {
    deleteStream(id){
      console.log(id)
      const streamId={
        id:id
      };
      console.log(streamId)
      this.$store.dispatch('deleteStream',streamId)
    }
  },
  mounted(){
    this.$store.dispatch('loadTags')
  }
};
</script>

<style scoped>
.stream-container {
  width: 100%;
  min-height: 120px;
  display:flex;
  flex-direction: column;
  margin-bottom:15px;
}
.stream-body{
  background-color: white;
  display:flex;
  flex-direction:column;
  margin:5px;
}
.stream-date{
 width: 347px;
height: 22px;
font-family: PT Sans;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 150%;
letter-spacing: 0.04em;
color: rgba(0, 0, 0, 0.6);
}
.stream-description{
  display:flex;
 min-height:50px;
 font-size:16px;
 font-weight: 600;
 margin-left:5px;
}
.stream-description>button{
  height:20px;
  width:50px;
font-family: PT Sans;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 150%;
color: #000000;
}
 .stream-user{
  width: 297px;
height: 20px;
font-family: PT Sans;
font-style: italic;
font-weight: bold;
font-size: 16px;
line-height: 150%;
color: #000000;

}
.stream-user .title-bar{
width: 12px;
height: 1px;
align-content: center;
justify-self: center;
}
.small-triangle{
      float:left;
      width: 0;
      height: 0;
      border-top: 25px solid white;
      border-right: 20px solid transparent;
      box-shadow:2px 0px 0px 2px rgba(0,0,0,0.1);   
}
.tag-section{
  display:flex;
   background: #19274A;
   height:30px;
  font-family: PT Sans;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 23px;
letter-spacing: 0em;
text-align: left;
color: #00B2FF;
}
tag-view{
  width:85%;
   display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 16px;
  position: absolute;
  width: 255px;
  height: 32px;
  margin-left:285px;
}
</style>
