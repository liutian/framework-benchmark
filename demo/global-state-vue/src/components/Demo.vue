<template>
  <div style="border: solid 1px blue">
    Demo
    <button @click="dataSource.tick()">count {{ dataSource.count }}</button>
    <ChildA />
    <ChildB />
  </div>
</template>

<script>
import dataSource from "../dataSource";
import ChildA from "./ChildA.vue";
import ChildB from "./ChildB.vue";

export default {
  data() {
    return { dataSource };
  },
  components: {
    ChildA,
    ChildB,
  },
};
</script>

