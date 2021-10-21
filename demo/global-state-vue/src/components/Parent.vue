<template>
  <div style="border: solid 1px red">
    Parent
    <button @click="dataSource.tick()">count {{ dataSource.count }}</button>
    <Demo />
    <Sibling />
  </div>
</template>

<script>
import dataSource from "../dataSource";
import Demo from "./Demo.vue";
import Sibling from "./Sibling.vue";

export default {
  data() {
    return { dataSource };
  },
  components: {
    Demo,
    Sibling,
  },
};
</script>

