<template>
  <div class="stream-tag">
    <div class="body-section">
      <img class="logo-s" src="../../assets/logo.png" alt="logo s" />
      <h2>Streams</h2>
      <ul>
        <li v-for="tag in tags" :key="tag.id" :id="tag.id">
          <div class="tags-div" @click="removeTag(tag.id)">
            <p>#{{ tag.tagName }}</p>
            <img src="../../assets/close.png" alt="" />
          </div>
        </li>
      </ul>
      <form @submit.prevent="addTag">
        <select id="tags-desc" name="tags-desc" v-model="inputTag">
          <option value="Stockholm">#Stockholm</option>
          <option value="Märsta">#Märsta</option>x
          <option value="Linköping">#Linköping</option>
          <option value="Norköping">#NorKöping</option>
          <option value="Göteborg">#Göteborg</option>
          <option value="Boras">#Boras</option>
        </select>
        <button>
          <img class="submit-click" src="../../assets/click.png" alt="" />
        </button>
      </form>
      <button class="remove-user" @click="removeAllTags">
        Shit, Theyre on to me!
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputTag: "",
    };
  },
  computed: {
    tags: {
      get: function () {
        return this.$store.state.tags;
      },
      set: function () {},
    },
  },
  methods: {
    addTag() {
      const tagDetails = {
        tagName: this.inputTag,
      };
      this.$store.dispatch("addTag", tagDetails);
      return;
    },
    removeTag(id) {
      const tagInfo = {
        id: id,
      };
      this.$store.dispatch("deleteTag", tagInfo);
      return;
    },
    removeAllTags() {
      this.$store.dispatch("deleteAllTags");
      return;
    },
  },

  mounted() {
    this.$store.dispatch("loadTags");
    console.log("tags:" + JSON.stringify(this.$store.state.tags));
    this.tags = this.$store.state.tags;
  },
};
</script>

<style scoped>
.stream-tag {
  top: 50px;
  width: 100%;
  background-color: #ef4343;
  height: 400px;
  position: absolute;
}
body-section {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.logo-s {
  width: 50px;
  height: 30px;
  margin-left: 20px;
}
h2 {
  display: flex;
  height: 50px;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 20px;
  font-family: PT Sans;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 48px;
  letter-spacing: 0em;
  text-align: left;
}
ul {
  height: 150px;
  display: flex;
  flex-wrap: wrap;
}
li {
  list-style: none;
  margin: 5px;
}
.tags-div {
  display: flex;
  flex-wrap: wrap;
  border-radius: 4px;
}
p {
  width: 80px;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  font-family: PT Sans;
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
}
.tags-div > img {
  width: 30px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
}
form {
  min-height: 50px;
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
}
form > select {
  width: 60%;
  height: 40px;
  background-color: #ef4343;
  border: 2px solid white;
  color: white;
  font-family: PT Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
}
form > button {
  width: 45px;
  height: 40px;
}
.submit-click {
  width: 35px;
}
.remove-user {
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin: 0px 55px 0px 295px;
  width: 50%;
  background-color: #082756;
  font-family: PT Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 36px;
  letter-spacing: 0em;
  color: #ffffff;
  border: 1px solid #000000;
  text-align: center;
}
</style>