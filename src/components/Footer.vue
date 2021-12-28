<template>
  <div v-html="data"></div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: "",
    };
  },
  method: {
    async footer() {
      try {
        let response = await axios.get("/api/html?name=footer");
        if (response.status == 200) {
          this.data = response.data.html.html;
        }
      } catch (errors) {
        console.log(errors);
        this.data = "";
      }
    },
  },
  mounted() {
    this.footer();
  },
};
</script>
