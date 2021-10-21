<template>
  <div>
    <Parent />
    <OtherParent />
  </div>
</template>

<script>
import Parent from "./components/Parent.vue";
import OtherParent from "./components/OtherParent.vue";

export default {
  name: "App",
  components: {
    Parent,
    OtherParent,
  },
};
</script>

