<template>
  <div>
    <div class="action-bar">
      <input type="text" v-model="maxLength" />
      <button @click="logTime('run',run())">run</button> &nbsp;&nbsp;&nbsp;&nbsp;
      <button @click="logTime('unshift',unshift())">unshift</button>
      <button @click="logTime('push',push())">push</button>
      <button @click="logTime('shift',shift())">shift</button>
      <button @click="logTime('pop',pop())">pop</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <input type="text" v-model="targetId" />
      <button @click="logTime('move',move())">move</button>
      <button @click="logTime('change',change())">change</button>
    </div>

    <div>
      <Feed class="item-block" v-for="item of list" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import logger from "../logger";
import { createItem } from "../util";
import Feed from "./Feed";

export default {
  components: {
    Feed
  },
  data() {
    return {
      list: [],
      targetId: 10,
      maxLength: 30000,
      logTime: logger(this.$nextTick)
    };
  },
  methods: {
    run() {
      this.list = [];
      for (let i = 0; i < this.maxLength; i++) {
        this.list.push(createItem());
      }
    },
    unshift() {
      this.list.unshift(createItem());
    },
    push() {
      this.list.push(createItem());
    },
    shift() {
      this.list.shift();
    },
    pop() {
      this.list.pop();
    },
    move() {
      const index = this.list.findIndex(item => item.id === this.targetId);
      const [item] = this.list.splice(index, 1);
      this.list.unshift(item);
    },
    change() {
      const index = this.list.findIndex(item => item.id === this.targetId);
      const item = createItem();
      this.list.splice(index, 1, item);
    }
  }
};
</script>

<style>
</style>