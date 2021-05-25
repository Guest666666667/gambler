<template>
  <div class="Main">
    <SelectPanel />
  </div>
</template>

<script>
// @ is an alias to /src
import SelectPanel from "@/components/SelectPanel.vue";

export default {
  name: "Main",
  components: {
    SelectPanel,
  },
};
</script>
