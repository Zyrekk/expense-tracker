<template>
  <router-view v-slot="{ Component }">
<!--    <NavigationBar v-if="this.$route.path!=='/login'&&this.$route.path!=='/register'" />-->
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  /*color: #2c3e50;*/
  margin: 0;
  background: #1b1b1b;
}

/* route transitions */
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
