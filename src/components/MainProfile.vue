<template>
  <div class="profile">
      <NavigationBar/>
    <v-card
        class="card"
        height="100%"
        width="100%"
        rounded
        flat
    >
      <v-card class="pt-16 card__flex" width="100%">
        <div class="card-content">
          <v-avatar color="grey" size="150" rounded="50" class="avatar">
            <v-img
                cover
                src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
            ></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  name: "MainProfile",
  components: {NavigationBar},
  setup(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: Add smooth scrolling effect
    });
  }
}
</script>

<style lang="scss" scoped>

.profile {
  overflow: hidden;
  width: 100%;
  display: flex;
}

.card__flex{
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-content{
  border-radius: 10px 10px 0 0;
  position: relative;
  margin: 50px 20px 50px 76px;
  width: 70%;
  background: #3f3d56;
}

.avatar{
  z-index: 100;
  top: -100px;
  left: 0;
}

</style>
