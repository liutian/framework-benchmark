<template>
  <div>
    <div>{{item.author + item.id}} :</div>
    <div>{{item.content}}</div>
    <div>
      <button class="btn" @click="logTime('favorite',favorite())">favorite {{item.favorite || ''}}</button>
      <button class="btn" @click="logTime('like',like())">like {{item.like || ''}}</button>
      <button class="btn" @click="logTime('forward',forward())">forward {{item.forward || ''}}</button>
      <button class="btn" @click="logTime('toggle',toggle())">comment {{item.comments.length || ''}}</button>
    </div>
    <div v-if="item.isShowComment">
      <input type="text" v-model="item.newComment" />
      <button @click="logTime('comment',comment())" :disabled="!item.newComment">ok</button>
      <div v-for="comment of item.comments" :key="comment.id">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
import logger from "../logger";

export default {
  props: ["item"],
  data() {
    return {
      logTime: logger(this.$nextTick)
    };
  },
  methods: {
    toggle() {
      this.item.isShowComment = !this.item.isShowComment;
    },

    favorite() {
      this.item.favorite += 1;
    },

    like() {
      this.item.like += 1;
    },

    forward() {
      this.item.forward += 1;
    },

    comment() {
      this.item.comments.push({
        id: this.item.id + 10000 + this.item.comments.length,
        content: this.item.newComment
      });
      this.item.newComment = "";
    }
  }
};
</script>