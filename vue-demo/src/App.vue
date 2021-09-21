<template>
  <FeedList/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FeedList from './components/FeedList.vue';

export default defineComponent({
  name: 'App',
  components: {
    FeedList
  }
});
</script>

