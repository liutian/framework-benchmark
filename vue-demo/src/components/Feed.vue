<template>
  <div>
    <div>{{itemData.author + itemData.id}} :</div>
    <div>{{itemData.content}}</div>
    <div>
      <button class="btn" @click="like()">like {{itemData.like || ''}}</button>
      <button class="btn" @click="toggle()">comment {{itemData.comments.length || ''}}</button>
    </div>
    <div v-if="itemData.isShowComment">
      <input type="text" v-model="itemData.newComment" @keypress="keypress()"/>
      <button @click="comment()" :disabled="!itemData.newComment">ok</button>
      <div v-for="comment of itemData.comments" :key="comment.id">{{comment.content}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import logger from "../logger";

export default defineComponent({
  props: ['item'],
  data() {
    return {
      itemData: this.item,
    };
  },
  methods: {
    toggle() {
      logger('toggle');
      this.itemData.isShowComment = !this.itemData.isShowComment;
    },

    like() {
      logger('like');
      this.itemData.like += 1;
    },

    comment() {
      logger('comment');
      this.itemData.comments.push({
        id: this.itemData.id + 10000 + this.itemData.comments.length,
        content: this.itemData.newComment
      });
      this.itemData.newComment = "";
    },
    keypress(){
      logger('keypress', true);
    }
  }
});
</script>