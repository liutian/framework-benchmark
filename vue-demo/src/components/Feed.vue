<template>
  <div>
    <div>{{itemData.author + itemData.id}} :</div>
    <div>{{itemData.content}}</div>
    <div>
      <button class="btn" @click="logger('favorite',favorite())">favorite {{itemData.favorite || ''}}</button>
      <button class="btn" @click="logger('like',like())">like {{itemData.like || ''}}</button>
      <button class="btn" @click="logger('forward',forward())">forward {{itemData.forward || ''}}</button>
      <button class="btn" @click="logger('toggle',toggle())">comment {{itemData.comments.length || ''}}</button>
    </div>
    <div v-if="itemData.isShowComment">
      <input type="text" v-model="itemData.newComment" />
      <button @click="logger('comment',comment())" :disabled="!itemData.newComment">ok</button>
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
      logger
    };
  },
  methods: {
    toggle() {
      this.itemData.isShowComment = !this.itemData.isShowComment;
    },

    favorite() {
      this.itemData.favorite += 1;
    },

    like() {
      this.itemData.like += 1;
    },

    forward() {
      this.itemData.forward += 1;
    },

    comment() {
      this.itemData.comments.push({
        id: this.itemData.id + 10000 + this.itemData.comments.length,
        content: this.itemData.newComment
      });
      this.itemData.newComment = "";
    }
  }
});
</script>