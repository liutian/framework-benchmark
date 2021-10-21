<template>
  <div>
    OtherParent
    <button @click="dataSource.tick()">count {{ dataSource.count }}</button>
  </div>
</template>

<script>
import dataSource from "../dataSource";

export default {
  data() {
    return { dataSource };
  },
};
</script>

