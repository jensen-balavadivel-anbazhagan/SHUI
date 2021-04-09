<template>
  <div class="tag-container">
    <p>#{{ tagName }}</p>
  </div>
</template>

<script>
export default {
  name: "TagView",
  props: ["tagName", "id"],
  data() {
    return {};
  },
};
</script>

<style scoped>
div {
  width: 100%;
  display: inline-flex;
  flex-wrap: wrap;
  margin-left:300px;
}

p {
  font-family: PT Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 23px;
  color: rgba(0, 178, 255, 0.8);
  margin-top: 1rem;
  text-align: center;
}
</style>