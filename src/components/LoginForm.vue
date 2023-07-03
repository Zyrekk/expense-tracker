<template>
  <div class="login">
    <form class="mx-3" v-on:submit="login($event)">
      <v-card
          class="mx-auto pt-5 px-12 pb-8 login__font-color"
          elevation="8"
          max-width="448"
          min-height="458"
          rounded="lg"

      >
        <v-img
            class="mx-auto py-6"
            max-width="228"
            :src="require('../assets/parleto_logo.png')"
        ></v-img>
        <div class="text-h6 ">Login</div>

        <v-text-field
            v-model="loginValue"
            density="compact"
            placeholder="Login"
            clearable
            prepend-inner-icon="mdi-account-outline"
            required="true"
            variant="outlined"
        ></v-text-field>

        <v-text-field
            v-model="passwordValue"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            clearable
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            required="true"
            @click:append-inner="toggleLVisibility"
        ></v-text-field>


        <v-btn
            block
            class="mb-8"
            color="#06dec3"
            size="large"
            type="submit"
        >
          Log in
        </v-btn>

        <v-card-text class="text-center">
          <router-link rel="noopener noreferrer" class="text-decoration-none login__font-color" to="/register">Don't
            have an account? Register now
            <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </v-card>
    </form>
    <v-snackbar
        color="red"
        v-model="snackbar"
        :timeout="2000"
    >
      Wrong login or password
    </v-snackbar>
  </div>
</template>

<script>
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  name: "LoginForm",
  setup() {
    const router = useRouter();
    const store = useStore();

    const visible = ref(false);
    const loginValue = ref('');
    const passwordValue = ref('');
    const snackbar = ref(false)

    watch(passwordValue, () => {
      if (passwordValue.value === '') {
        visible.value = false
      }
    })

    const login = (event) => {
      event.preventDefault();
      const user = store.state.userList.find(item => item.login === loginValue.value);
      if (user !== undefined && passwordValue.value === user.password) {
        store.commit('handleChangeUser', loginValue.value)
        router.push("/profile");
      } else {
        snackbar.value = true
        loginValue.value = ''
        passwordValue.value = ''
      }
    };
    const toggleLVisibility = () => {
      visible.value = !visible.value
    };

    return {loginValue, snackbar, passwordValue, visible, toggleLVisibility, login};
  },
};
</script>

<style lang="scss" scoped>

.login {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login__font-color {
  color: #000000;
}

.text-h6 {
  padding-bottom: 25px;
}


</style>
