<template>
  <div class="profile">
    <v-dialog v-model="dialog"
              persistent="true"
              width="auto">
      <v-card width="auto">
        <v-card-text class="container__font-size d-flex justify-center align-center container__background"
        >
          Fill in the first and last name
        </v-card-text>
        <v-card-text class="d-flex flex-column">
          <v-text-field
              v-model="dialogName"
              label="First name"
              required
          ></v-text-field>

          <v-text-field
              v-model="dialogLastName"
              label="Last name"
              required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn class="mx-auto" variant="elevated" :color="color" @click="handleCloseDialog"
          >{{ text }}
          </v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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
                src="https://cdn.pixabay.com/photo/2023/06/26/13/41/wolf-8089783_1280.jpg"
            ></v-img>
          </v-avatar>
          <v-card-text class="text-white text-h5 mb-3">{{ currentUser.name }} {{ currentUser.lastName }}</v-card-text>
          <v-card
              class="mb-5"
              color="white"
              width="90%"
          >
            <v-toolbar flat color="#06dec3">
              <v-btn icon="mdi-account"></v-btn>

              <v-card-text class="text-left font-weight-light">
                Edit user profile
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
                  label="Name"
                  v-model="newName"
                  :model-value="newName"
              ></v-text-field>

              <v-text-field
                  :disabled="!isEditing"
                  base-color="black"
                  label="Last name"
                  v-model="newLastName"
                  :model-value="newLastName"
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
                  <v-card-text>{{ item.price }}</v-card-text>
                  <v-card-text>{{ item.date }}</v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-card>
        </div>
      </v-card>
      <v-snackbar
          :color="snackbar.snackBarColor"
          v-model="snackbar.active"
          :timeout="2000"
      >
        {{snackbar.snackBarText}}
      </v-snackbar>
    </v-card>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import {reactive, ref, toRefs, watch} from "vue";
import {useStore} from "vuex";

export default {
  name: "MainProfile",
  components: {NavigationBar},
  setup() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    const store = useStore()
    const tab = ref(null);
    const currentUserName = ref(store.state.currentUserName);
    const currentUser = ref(store.state.userList.find(item => item.login === currentUserName.value));
    const newName = ref(currentUser.value.name)
    const newLastName = ref(currentUser.value.lastName)
    const dialog = ref(false)
    const dialogName = ref('')
    const dialogLastName = ref('')
    const dialogButton = reactive({
      text: 'Close',
      color: 'red',
    })
    const snackbarData=reactive({
      snackbar:{
        active:false,
        snackBarColor:'',
        snackBarText:''
      },
    })

    watch([dialogName, dialogLastName], () => {
      if (dialogName.value !== '' && dialogLastName.value !== '') {
        dialogButton.text = 'Save'
        dialogButton.color = '#06dec3'
      }
    })

    let maxAmount = 0;
    let maxDate = null;

    for (const expense of currentUser.value.expenses) {
      if (expense.amount > maxAmount) {
        maxAmount = expense.amount;
        maxDate = expense.date;
      }
    }

    const data = ref([
      {
        name: 'latest',
        price: currentUser.value.expenses.length !== 0 ? currentUser.value.expenses[currentUser.value.expenses.length - 1].amount + ' PLN' : 'no expenses',
        date: currentUser.value.expenses.length !== 0 ? currentUser.value.expenses[currentUser.value.expenses.length - 1].date : '',
      },
      {
        name: 'most',
        price: currentUser.value.expenses.length !== 0 ? maxAmount + ' PLN' : 'no expenses',
        date: currentUser.value.expenses.length !== 0 ? maxDate : ''
      }]);
    const hasSaved = ref(false);
    const isEditing = ref(false);

    if (currentUser.value.firstTime === true) {
      setTimeout(() => {
        dialog.value = true
      }, 1000);
    }

    const handleCloseDialog = () => {
      if (dialogName.value !== '' && dialogLastName.value !== '') {
        const index = store.state.userList.findIndex((element) => element.login === currentUserName.value)
        store.commit('handleUserDetailsChange', {
          login: currentUserName.value,
          name: dialogName.value,
          lastName: dialogLastName.value,
          index: index
        });
        newName.value=dialogName.value
        newLastName.value=dialogLastName.value
        dialog.value = false
        store.commit('handleFirstTimeChange', index);
        snackbarData.snackbar.snackBarColor='green'
        snackbarData.snackbar.active=true
        snackbarData.snackbar.snackBarText="Profile Updated"
      }
      else{
        snackbarData.snackbar.snackBarColor='red'
        snackbarData.snackbar.active=true
        snackbarData.snackbar.snackBarText="Fill in the first and last name"
      }
    }

    const edit = () => {
      isEditing.value = !isEditing.value;
    }

    const save = () => {
      const index = store.state.userList.findIndex((element) => element.login === currentUserName.value)

      store.commit('handleUserDetailsChange', {
        login: currentUserName.value,
        name: newName.value ? newName.value : currentUser.value.name,
        lastName: newLastName.value ? newLastName.value : currentUser.value.lastName,
        index: index
      });
      hasSaved.value = true;
      isEditing.value = false
    }

    return {
      ...toRefs(snackbarData),
      ...toRefs(dialogButton),
      dialogName,
      dialogLastName,
      currentUser,
      newName,
      newLastName,
      hasSaved,
      isEditing,
      tab,
      data,
      dialog,
      edit,
      save,
      handleCloseDialog,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/styling.scss";

.profile {
  overflow: hidden;
  width: 100%;
  display: flex;
}

.card__flex {
  background: #1b1b1b;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-content {
  border-radius: 10px 10px 0 0;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 50px 20px 50px 76px;
  width: 40%;
}

@media only screen and (max-width: 768px) {
  .card-content {
    width: 100%;
  }
}

</style>
