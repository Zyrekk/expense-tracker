<template>
  <div class="profile">
    <v-card
        class="card d-flex justify-center"
        height="100%"
        width="100%"
        rounded
        color="#1b1b1b"
        flat
    >
      <v-card class=" card__flex" width="100%" height="50%">
        <div class="card-content">
          <v-avatar color="grey" size="150" rounded="50">
            <v-img
                cover
                src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
            ></v-img>
          </v-avatar>
          <v-card-text class="text-white text-h5 mb-3">Konrad Żyra</v-card-text>
          <v-card
              class="mb-5"
              color="white"
              width="90%"
          >
            <v-toolbar flat color="#06dec3">
              <v-btn icon="mdi-account"></v-btn>

              <v-card-text class="text-left font-weight-light">
                User Profile
              </v-card-text>

              <v-spacer></v-spacer>

              <v-btn
                  icon
                  @click="edit"
              >
                <v-fade-transition leave-absolute>
                  <v-icon v-if="isEditing">mdi-close</v-icon>

                  <v-icon v-else>mdi-pencil</v-icon>
                </v-fade-transition>
              </v-btn>
            </v-toolbar>

            <v-card-text>
              <v-text-field
                  :disabled="!isEditing"
                  base-color="black"
                  color="#06dec3"
                  label="Name"
              ></v-text-field>

              <v-text-field
                  :disabled="!isEditing"
                  base-color="black"
                  color="#06dec3"
                  label="Last name"
              ></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                  :disabled="!isEditing"
                  @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>

            <v-snackbar
                v-model="hasSaved"
                :timeout="2000"
                attach
                width="100%"
                position="absolute"
                location="bottom left"
            >
              Your profile has been updated
            </v-snackbar>
          </v-card>
<!--          <v-card-->
<!--              class="mx-auto"-->
<!--              color="white"-->
<!--              width="90%"-->
<!--              max-width="344"-->

<!--          >-->
<!--            <v-card-item>-->
<!--              <div>-->
<!--                <div class="text-overline mb-1">-->
<!--                  Latest expense-->
<!--                </div>-->

<!--                <div class="text-caption">1547$ - 2023.11.09</div>-->
<!--              </div>-->
<!--            </v-card-item>-->

<!--            <v-card-actions>-->
<!--              <v-btn variant="outlined">-->
<!--                Button-->
<!--              </v-btn>-->
<!--            </v-card-actions>-->
<!--          </v-card>-->
          <v-card
          width="90%"
          >
            <v-tabs
                v-model="tab"
                bg-color="#06dec3"
                centered
                stacked
            >
              <v-tab width="50%" value="tab-latest">
                <v-icon>mdi-currency-usd</v-icon>
                <span>Latest</span>
                <span>expense</span>

              </v-tab>

              <v-tab width="50%" value="tab-most">
                <v-icon>mdi-bitcoin</v-icon>
                <span>Most</span>
                <span>expensive</span>
              </v-tab>
            </v-tabs>

            <v-window v-model="tab">
              <v-window-item v-for="item in data" :key="item" :value="'tab-' + item.name">
                <v-card class="d-flex justify-space-around">
                  <v-card-text>{{item.price}}</v-card-text>
                  <v-card-text>{{item.date}}</v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-card>
        </div>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import {ref} from "vue";

export default {
  name: "MainProfile",
  components: {NavigationBar},
  data() {
    return {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
  setup(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    const tab=ref(null)
    const data=ref([{name:'latest',price:'196$',date:'12-06-2023'},{name:'most',price:'1961$',date:'11-02-2021'}])
    const hasSaved=ref(false)
    const isEditing=ref(false)

    const edit=()=>{
        isEditing.value=!isEditing.value
    }
    const save=()=>{
      hasSaved.value=true
      console.log('saved')
    }

    return{hasSaved,isEditing,tab,data,edit,save}
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
  background: #1b1b1b;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-content{
  border-radius: 10px 10px 0 0;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 50px 20px 50px 76px;
  width: 40%;
}

@media only screen and (max-width: 768px) {
  .card-content{
    width: 100%;
  }
}

</style>
