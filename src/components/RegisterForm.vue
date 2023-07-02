<template>
  <div class="register">
    <div class="mx-3">
      <v-card
          class="mx-auto pt-5 px-12 pb-8 register__font-color"
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
        <div class="text-h6 ">Registration</div>

        <v-text-field
            v-model="loginValue"
            density="compact"
            placeholder="Email address"
            clearable
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
        ></v-text-field>

        <v-text-field
            v-model="loginValue"
            density="compact"
            placeholder="Login"
            clearable
            prepend-inner-icon="mdi-account-outline"
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
            @click:append-inner="toggleLVisibility"
        ></v-text-field>


        <v-btn
            block
            class="mb-8"
            color="#06dec3"
            size="large"
        >
          Register
        </v-btn>

        <v-card-text class="text-center">
          <router-link rel="noopener noreferrer" class="text-decoration-none register__font-color" to="/login">Already
            have an account? Log in now
            <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import {ref, watch} from "vue";

export default {
  name: "RegisterForm",
  setup() {

    const visible = ref(false);
    const loginValue = ref('');
    const passwordValue = ref('');

    watch(passwordValue, () => {
      if (passwordValue.value === '') {
        visible.value = false
      }
    })
    const toggleLVisibility = () => {
      visible.value = !visible.value
    };

    return {loginValue, passwordValue, visible, toggleLVisibility};
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #06dec3;

.register {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register__font-color {
  color: #000000;
}

.text-h6 {
  padding-bottom: 25px;
}


</style>
