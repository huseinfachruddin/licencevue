<template>
  <div v-html="data.html"></div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: {},
    };
  },
  methods: {
    async header() {
      try {
        let response = await axios.get("/api/html/header");
        if (response.status == 200) {
          this.data = response.data.html;
          console.log
        }
      } catch (errors) {
        console.log(errors);
        this.data = "";
      }
    },
  },
  mounted() {
    this.header();
  },
};
</script>
