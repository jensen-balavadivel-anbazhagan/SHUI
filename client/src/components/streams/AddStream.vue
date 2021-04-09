<template>
  <div class="addstream-container">
    <div class="form-section">
      <span
        v-if="errorMessage !== undefined || errorMessage !== ''"
        style="color: red"
        >{{ errorMessage }}
      </span>
      <div class="form-controltop">
        <label for="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="4"
          v-model="stream.description"
        ></textarea>
      </div>

      <div class="form-controlbottom">
        <select
          id="tags-desc"
          name="tags-desc"
          v-model="stream.inputTag"
          class="selectTag"
          multiple="true"
        >
         <option
      v-for="tag in tags"
      :key="tag.id"
      :value="tag">
      {{tag.tagName}}
    </option>
        </select>
      </div>
      <button @click="addStream">Publish</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddStream",
  data() {
    return {
      stream: {
        title: "",
        description: "",
        inputTag: [],
      },
      errorMessage: "",
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
    addStream() {
      console.log("selected val: "+JSON.stringify(this.stream));
      if (
        this.stream.description != "undefined" &&
        this.stream.description != null &&
        this.stream.description != "" &&
        this.stream.inputTag != "undefined" &&
        this.stream.inputTag != null &&
        this.stream.inputTag != ""
      ) {
        
        this.$store.dispatch("addStream", this.stream);
        this.$router.push("/streams");
      } else {
        return (this.errorMessage = "All fields are mandate!");
      }
    },
  },
};
</script>

<style scoped>
.addstream-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 600px;
}
.form-section {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form-controltop {
  height: 50%;
  width: 80%;
}
.form-controltop > input {
  height: 40px;
  width: 80%;
}
.form-controltop > label {
  height: 40px;
  width: 50%;
  font-family: PT Sans;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 31px;
  letter-spacing: 0em;
  text-align: center;
  margin-right: 5px;
  color: cornsilk;
}
.form-controlbottom {
  height: 20px;
  width: 80%;
}
.form-controlbottom > label {
  height: 40px;
  width: 50%;
  font-family: PT Sans;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 31px;
  letter-spacing: 0em;
  text-align: center;
  margin-right: 5px;
  color: cornsilk;
}
.form-controltop > textarea {
  height: 80px;
  width: 100%;
  font-family: PT Sans;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 31px;
  letter-spacing: 0em;
  text-align: center;
  margin-right: 5px;
}
button {
  height: 40px;
  margin-top: 70px;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 24px;
  box-shadow: 0 1px 1px 1px black;
  background-color: #ef4343;
  border-radius: 4px;
}
button:hover {
  cursor: pointer;
  border: 1px solid blue;
}

.form-controlbottom select {
  width: 60%;
  height: 40px;
  background-color: #19274a;
  border: 2px solid white;
  color: white;
  font-family: PT Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  margin-left: 20%;
}
form > button {
  width: 20%;
  height: 40px;
}

</style>