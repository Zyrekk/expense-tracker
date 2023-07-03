<!--<template>-->
<!--  <aside class="navigation">-->
<!--    <div class="navigation__header">-->
<!--      <div class="navigation__logo">-->
<!--        <a href="https://www.parleto.io">-->
<!--          <img :src="logo" alt="logo"/>-->
<!--        </a>-->
<!--      </div>-->
<!--      <nav class="navigation__content">-->
<!--        <ul class="navigation__links-list">-->
<!--          <li v-on:click="handlePageChange('dashboard')" class="navigation__single-link" :class="{'navigation__single-link&#45;&#45;active':currentPage==='dashboard'}">-->
<!--            <font-awesome-icon class="navigation-icon" :icon="['fas', 'table']"/>-->
<!--            <span class="navigation__link-text">Dashboard</span>-->
<!--          </li>-->
<!--          <li v-on:click="handlePageChange('profile')" class="navigation__single-link" :class="{'navigation__single-link&#45;&#45;active':currentPage==='profile'}">-->
<!--            <font-awesome-icon class="navigation-icon" :icon="['far', 'user']"/>-->
<!--            <span class="navigation__link-text">Profile</span>-->
<!--          </li>-->
<!--          <li v-on:click="handlePageChange('expenses')" class="navigation__single-link" :class="{'navigation__single-link&#45;&#45;active':currentPage==='expenses'}">-->
<!--            <font-awesome-icon class="navigation-icon" :icon="['fas', 'dollar-sign']"/>-->
<!--            <span class="navigation__link-text">Expenses</span>-->
<!--          </li>-->
<!--          <li v-on:click="handlePageChange('reports')" class="navigation__single-link" :class="{'navigation__single-link&#45;&#45;active':currentPage==='reports'}">-->
<!--            <font-awesome-icon class="navigation-icon" :icon="['fas', 'file']"/>-->
<!--            <span class="navigation__link-text">Reports</span>-->
<!--          </li>-->
<!--          <li v-on:click="handlePageChange('settings')" class="navigation__single-link" :class="{'navigation__single-link&#45;&#45;active':currentPage==='settings'}">-->
<!--            <font-awesome-icon class="navigation-icon" :icon="['fas', 'gear']"/>-->
<!--            <span class="navigation__link-text">Settings</span>-->
<!--          </li>-->
<!--          <li class="navigation__single-link">-->
<!--            <font-awesome-icon class="navigation-icon" :icon="['fas', 'right-from-bracket']"/>-->
<!--            <span class="navigation__link-text">Log out</span>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </nav>-->
<!--    </div>-->
<!--  </aside>-->

<!--</template>-->
<!--<template>-->
<!--  <v-card>-->
<!--    <v-layout>-->
<!--      <v-navigation-drawer-->
<!--          expand-on-hover-->
<!--          rail-->
<!--      >-->
<!--        <v-list>-->
<!--          <v-list-item-->
<!--              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"-->
<!--              title="Sandra Adams"-->
<!--              subtitle="sandra_a88@gmailcom"-->
<!--          ></v-list-item>-->
<!--        </v-list>-->

<!--        <v-divider></v-divider>-->

<!--        <v-list density="compact" nav>-->
<!--          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>-->
<!--          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>-->
<!--          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>-->
<!--        </v-list>-->
<!--      </v-navigation-drawer>-->

<!--      <v-main style="height: 250px"></v-main>-->
<!--    </v-layout>-->
<!--  </v-card>-->
<!--</template>-->

<template>
  <v-card class="nav">
    <v-layout>
      <v-navigation-drawer
          color="#1b1b1b"
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
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
                @click.stop="rail = !rail"
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
      <v-main style="height: 250px"></v-main>
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
    const isActive=(path)=>{
      return path === router.currentRoute.value.path;

    }
    const handlePageChange = (page) => {
      router.push(`/${page}`);
    }

    return {handlePageChange,isActive,user}
  },
  data() {
    return {
      drawer: true,
      rail: true,
      logo: require('../assets/parleto_logo.png'),
    }
  },
}
</script>

<style scoped lang="scss">
$primary-color: #06dec3;

.navigation {
  z-index: 10;
  height: 100vh;
  width: 15rem;
}

.navigation__header {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.navigation__logo {
  padding-top: 3rem;
}

.navigation__content {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
  height: 100%;
}

.navigation__links-list {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  list-style-type: none;

}

.navigation__single-link {
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: left;
  text-transform: uppercase;
  cursor: pointer;
  color: $primary-color;
  border-bottom: 2px solid transparent;
  transition: .3s ease;

  &:hover {
    .navigation__link-text {
      text-shadow: 0 0 8px $primary-color;
    }
  }

  &:last-child {
    position: absolute;
    bottom: 2rem;
  }
}

.navigation__single-link--active {
  border-bottom: 2px solid $primary-color;

}

.navigation-icon {
  min-width: 22px;
  transition: .2s ease;
}

.navigation__link-text {
  transition: .2s ease;
}

.nav {
  position: absolute;
  z-index: 100;
}

.font-color{
  color:#06dec3
}


img {
  width: 11rem;
}
</style>
