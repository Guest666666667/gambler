<template>
  <div class="Login">
    <LogPanel />
  </div>
</template>

<script>
// @ is an alias to /src
import LogPanel from "@/components/LogPanel.vue";

export default {
  name: "Login",
  components: {
    LogPanel,
  },
};
</script>
