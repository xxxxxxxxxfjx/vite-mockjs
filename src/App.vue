<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <button @click="handleUpdate">更新数据</button>
</template>

<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";

import { getData, updateData, fetchItems } from "@/service";

const handleData = async () => {
  const res = await getData({
    page: 2,
    size: 10
  });
  console.log("res", res);
};
handleData();


const handleUpdate = async () => {
  const res = await updateData({ id: 4, name: 'fjx' })
  console.log(res);
  const data = await getData();
  console.log("data", data);
}

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
