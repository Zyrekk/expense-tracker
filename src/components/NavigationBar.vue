<template>
  <v-card class="nav">
    <v-layout>
      <v-navigation-drawer
          color="#1b1b1b"
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = !rail"
      >
        <v-list-item
            class="pt-10 font-color"
            prepend-avatar="https://cdn.pixabay.com/photo/2023/06/26/13/41/wolf-8089783_1280.jpg"
            :title="user.name +' '+user.lastName"
            nav
        >
          <template v-slot:append>
            <v-btn
                variant="text"
                icon="mdi-chevron-left"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item :active="isActive('/dashboard')" @click="handlePageChange('dashboard')" color="white" base-color="#06dec3" prepend-icon="mdi-home-outline" title="Dashboard" value="dashboard"></v-list-item>
          <v-list-item :active="isActive('/profile')" @click="handlePageChange('profile')" color="white" base-color="#06dec3" prepend-icon="mdi-account-outline" title="Profile" value="profile"></v-list-item>
          <v-list-item :active="isActive('/expenses')" @click="handlePageChange('expenses')" color="white" base-color="#06dec3" prepend-icon="mdi-currency-usd" title="Expenses" value="expenses"></v-list-item>
          <v-list-item :active="isActive('/reports')" @click="handlePageChange('reports')" color="white" base-color="#06dec3" prepend-icon="mdi-file-document-outline" title="Reports" value="reports"></v-list-item>
          <v-list-item :active="isActive('/settings')" @click="handlePageChange('settings')" color="white" base-color="#06dec3" prepend-icon="mdi-cog-outline" title="Settings" value="settings"></v-list-item>
          <v-list-item @click="handlePageChange('login')" color="white" base-color="#06dec3" prepend-icon="mdi-logout" title="Logout" value="logout"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<script>
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faUser} from '@fortawesome/free-regular-svg-icons'
import {faDollar, faRightFromBracket, faGear, faFile, faTable} from '@fortawesome/free-solid-svg-icons'
import {useStore} from 'vuex'
import {ref, watch} from "vue";
import {useRouter} from "vue-router";

library.add(faUser, faDollar, faRightFromBracket, faGear, faFile, faTable)
export default {
  name: "NavigationBar",
  components: {
    FontAwesomeIcon
  },
  setup() {
    const router=useRouter()
    const store=useStore()
    const currentUserName = ref(store.state.currentUserName);
    const index = store.state.userList.findIndex((element) => element.login === currentUserName.value)
    const user = index!==-1? store.state.userList[index]:{name:'no',lastName: 'name'}
    const drawer=ref(true)
    const rail=ref(true)
    const logo=require('../assets/parleto_logo.png')
    const isActive=(path)=>{
      return path === router.currentRoute.value.path;

    }
    const handlePageChange = (page) => {
      drawer.value = true;
      rail.value = false;
      router.push(`/${page}`);
    };
    return {handlePageChange,isActive,user,drawer,rail,logo}
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/styling.scss";
</style>
