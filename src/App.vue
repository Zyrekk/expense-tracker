<template>
  <NavigationBar v-if="route!=='/login'&&route!=='/register'"/>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>
<script>
import NavigationBar from "@/components/NavigationBar.vue";
import {useRouter} from "vue-router";
import {ref, watch} from "vue";

export default {
  components: { NavigationBar },
  setup() {
    const router = useRouter();
    const route = ref(router.currentRoute.value.path);
    watch(() => router.currentRoute.value.path, (newPath) => {
      route.value=newPath
    });

    return { route };
  },
};
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
