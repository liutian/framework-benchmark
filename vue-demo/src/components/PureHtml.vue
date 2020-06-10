<template>
  <div>
    <h2>PureHtml</h2>

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
      <div class="item-block" v-for="item of list" :key="item.id">
        <div>{{item.author + item.id}} :</div>
        <div>{{item.content}}</div>
        <div>
          <button
            class="btn"
            @click="logTime('favorite',favorite(item))"
          >favorite {{item.favorite || ''}}</button>
          <button class="btn" @click="logTime('like',like(item))">like {{item.like || ''}}</button>
          <button
            class="btn"
            @click="logTime('forward',forward(item))"
          >forward {{item.forward || ''}}</button>
          <button
            class="btn"
            @click="logTime('toggle',toggle(item))"
          >comment {{item.comments.length || ''}}</button>
        </div>
        <div v-if="item.isShowComment">
          <input type="text" v-model="item.newComment" />
          <button @click="logTime('comment',comment(item))" :disabled="!item.newComment">ok</button>
          <div v-for="comment of item.comments" :key="comment.id">{{comment.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logger from "../logger.js";
import { createItem } from "../util.js";

export default {
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
    },
    toggle(item) {
      item.isShowComment = !item.isShowComment;
    },
    favorite(item) {
      item.favorite += 1;
    },
    like(item) {
      item.like += 1;
    },
    forward(item) {
      item.forward += 1;
    },
    comment(item) {
      item.comments.push({
        id: item.id + 10000 + item.comments.length,
        content: item.newComment
      });
      item.newComment = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
