<template>
  <div>
    <h2>PureComponent</h2>
    <div class="action-bar">
      <input type="text" v-model="maxLength" />
      <button @click="logger('run',run())">run</button> &nbsp;&nbsp;&nbsp;&nbsp;
      <button @click="logger('unshift',unshift())">unshift</button>
      <button @click="logger('push',push())">push</button>
      <button @click="logger('shift',shift())">shift</button>
      <button @click="logger('pop',pop())">pop</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <input type="text" v-model="targetId" />
      <button @click="logger('move',move())" :disabled="!targetId">move</button>
      <button @click="logger('change',change())" :disabled="!targetId">change</button>
    </div>

    <div>
      <Feed class="item-block" v-for="item of list" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import logger from "../logger";
import { createItem } from "../util";
import Feed from "./Feed.vue";

interface DataType {
  list: any[],
  targetId: number,
  maxLength: number,
  logger: any;
}

export default defineComponent({
  components: {
    Feed
  },
  data() {
    return {
      list: [],
      targetId: 10,
      maxLength: 30000,
      logger
    } as DataType;
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
      const index = this.list.findIndex(item => item.id === +this.targetId);
      const [item] = this.list.splice(index, 1);
      this.list.unshift(item);
    },
    change() {
      const index = this.list.findIndex(item => item.id === +this.targetId);
      const item = createItem();
      this.list.splice(index, 1, item);
    }
  }
})
</script>