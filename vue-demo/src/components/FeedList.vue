<template>
  <div>
    <div class="action-bar">
      <h2>feed list</h2>
      <input type="text" v-model="maxLength" />
      <button @click="batchCreate()">batchCreate</button>
      <button @click="clear()">clear</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button @click="unshift()">unshift</button>
      <button @click="push()">push</button>
      <button @click="shift()">shift</button>
      <button @click="pop()">pop</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <input type="text" v-model="targetId" />
      <button @click="moveHead()" :disabled="!targetId">moveHead</button>
      <button @click="replace()" :disabled="!targetId">replace</button>
      <button @click="del()" :disabled="!targetId">del</button>
    </div>

    <div class="container">
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
    } as DataType;
  },
  methods: {
    batchCreate() {
      logger('batchCreate');
      this.list = [];
      for (let i = 0; i < this.maxLength; i++) {
        this.list.push(createItem());
      }
    },
    clear(){
      logger('clear');
      this.list = [];
    },
    unshift() {
      logger('unshift');
      this.list.unshift(createItem());
    },
    push() {
      logger('push');
      this.list.push(createItem());
    },
    shift() {
      logger('shift');
      this.list.shift();
    },
    pop() {
      logger('pop');
      this.list.pop();
    },
    moveHead() {
      logger('moveHead');
      const index = this.list.findIndex(item => item.id === +this.targetId);
      const [item] = this.list.splice(index, 1);
      this.list.unshift(item);
    },
    replace() {
      logger('replace');
      const index = this.list.findIndex(item => item.id === +this.targetId);
      const item = createItem();
      this.list.splice(index, 1, item);
    },
    del() {
      logger('del');
      const index = this.list.findIndex(item => item.id === +this.targetId);
      this.list.splice(index, 1);
    }
  }
})
</script>