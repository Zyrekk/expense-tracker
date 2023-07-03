<template>
  <div class="container__settings pt-16">
    <div class="container__content pt-10">
      <div class="custom-width">
        <v-card class="w-100">
          <v-toolbar color="#06dec3" height="30%">
            <v-card-text class="container__font-size">Change your password</v-card-text>
          </v-toolbar>
          <v-card-text>
            <v-text-field
                v-model="oldPassword"
                :append-inner-icon="visibleOld ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visibleOld ? 'text' : 'password'"
                density="compact"
                placeholder="Type your old password"
                clearable
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                required="true"
                @click:append-inner="toggleOldPasswordVisibility"
            ></v-text-field>
            <v-text-field
                v-model="newPassword"
                :append-inner-icon="visibleNew ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visibleNew ? 'text' : 'password'"
                density="compact"
                placeholder="Type your new password"
                clearable
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                required="true"
                @click:append-inner="toggleNewPasswordVisibility"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                @click="changePassword"
                color="#06dec3"
                variant="elevated"
            >
              Change password
            </v-btn>
          </v-card-actions>
          <v-snackbar
              :color="snackbar.color"
              v-model="snackbar.active"
              :timeout="2000"
          >
            {{snackbar.text}}
          </v-snackbar>
        </v-card>
        <v-card class="mt-10">
          <v-toolbar class="bg-red-accent-1" height="30%">
            <v-card-text class="container__font-size">Delete account</v-card-text>
          </v-toolbar>

          <v-card-text>
            <v-text-field
                v-model="deletePassword"
                :append-inner-icon="visibleDelete ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visibleDelete ? 'text' : 'password'"
                density="compact"
                placeholder="Type your password"
                clearable
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                required="true"
                @click:append-inner="toggleOldPasswordVisibility"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                @click="deleteAccount"
                class="bg-red-accent-1"
                variant="elevated"
            >
              Delete account
            </v-btn>
          </v-card-actions>
          <v-snackbar
              :color="snackbarDelete.color"
              v-model="snackbarDelete.active"
              :timeout="2000"
          >
            {{snackbarDelete.text}}
          </v-snackbar>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive,toRefs, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  name: "SettingsComponent",
  setup(){
    const store = useStore()
    const router=useRouter()
    const userIndex = store.state.userList.findIndex((element) => element.login === store.state.currentUserName)

    const data=reactive({
      newPassword:'',
      visibleNew:false,
      oldPassword:'',
      visibleOld:false,
      deletePassword:'',
      visibleDelete:false,
      snackbar:{
        active:false,
        color:'',
        text:''
      },
      snackbarDelete:{
        active:false,
        color:'',
        text:''
      }
    })

    watch(data,()=>{
      if (data.newPassword===''){
        data.visibleNew=false
      }
      if (data.oldPassword===''){
        data.visibleOld=false
      }
    })
    const toggleOldPasswordVisibility=()=>{
      data.visibleOld=!data.visibleOld
    }
    const toggleNewPasswordVisibility=()=>{
      data.visibleNew=!data.visibleNew
    }

    const changePassword=()=>{
      if(data.oldPassword===store.state.userList[userIndex].password){
        store.commit('handleChangePassword', {
          password:data.newPassword,
          index: userIndex
        });
        data.snackbar={
          active:true,
          color:'green',
          text:'Password has been changed'
        }
        data.newPassword=''
        data.oldPassword=''
      }
      else{
        data.snackbar={
          active:true,
          color:'red',
          text:'The passwords dont match'
        }
      }
    }

    const deleteAccount=()=>{
      if(data.deletePassword===store.state.userList[userIndex].password){
        store.commit('handleDeleteAccount', {
          index: userIndex
        });
        data.snackbarDelete={
          active:true,
          color:'green',
          text:'Account deleted'
        }
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
      else{
        data.snackbarDelete={
          active:true,
          color:'red',
          text:'Wrong password'
        }
      }
    }

    return{...toRefs(data),toggleOldPasswordVisibility,toggleNewPasswordVisibility,changePassword,deleteAccount}
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/styling.scss";

</style>
