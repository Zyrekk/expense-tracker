<template>
  <div class="expense">
    <div class="expense__content">
      <form class="w-75" v-on:submit="addExpense($event)">
        <v-card
            class="bg-white"
        >
          <v-row>
            <v-col>
              <v-card-text class="title"
              >
                Add a new expense
              </v-card-text>
            </v-col>
          </v-row>
          <v-row class="px-5">
            <v-col>
              <v-select
                  required
                  v-model="expenseCategory"
                  :items="categories"
                  density="comfortable"
                  label="Category"
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="px-5">
            <v-col>
              <v-text-field
                  required
                  v-model="expenseAmount"
                  label="Amount"
                  type="number"
                  placeholder="10.00"
                  prefix="PLN"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="px-5">
            <v-col>
              <v-text-field
                  required
                  v-model="expenseName"
                  label="Name"
                  placeholder="expense name"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="px-5">
            <v-col>
              <v-text-field
                  required
                  v-model="expenseDate"
                  type="date"
                  label="Date"
                  :max="maxDate"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn type="submit" color="#06dec3" variant="elevated" class="mb-5 mr-5 float-right">
            Add
          </v-btn>
        </v-card>
      </form>
      <div class="w-75 d-flex flex-column">
        <v-card class="w-100 d-flex flex-column mt-10">
          <div class="d-flex justify-center w-100 py-5 background">
            <v-icon prepend>mdi-filter-outline</v-icon>
            <h3 class="font-weight-light">Filters</h3>
          </div>
          <v-select
              chips
              class="px-5 py-5 text-left"
              label="Category"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
              multiple
          ></v-select>
          <v-card class="w-100 d-flex flex-wrap">
            <v-text-field
                class="px-5"
                required
                v-model="filterMinDate"
                type="date"
                label="Start date"
                :max="filterMaxDate"
            ></v-text-field>
            <v-text-field
                class=" px-5"
                required
                v-model="filterMaxDate"
                type="date"
                label="End date"
                :min="filterMinDate"
                :max="maxDate"
            ></v-text-field>
          </v-card>
        </v-card>
        <v-card>
          <v-card-title>
            Nutrition
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
              :headers="headers"
              :items="desserts"
              :search="search"
          ></v-data-table>
        </v-card>
<!--        <v-table-->
<!--            fixed-header-->
<!--            height="512"-->
<!--            class="w-100 rounded my-10"-->
<!--        >-->
<!--          <thead class="rounded">-->
<!--          <tr>-->
<!--            <th class="text-center text-wrap">-->
<!--              Category-->
<!--            </th>-->
<!--            <th class="text-center  text-wrap">-->
<!--              Name-->
<!--            </th>-->
<!--            <th class="text-center  text-wrap">-->
<!--              Amount-->
<!--            </th>-->
<!--            <th class="text-center text-wrap">-->
<!--              Date-->
<!--            </th>-->
<!--          </tr>-->
<!--          </thead>-->
<!--          <tbody>-->
<!--          <tr-->
<!--              v-for="item in expenses"-->
<!--              :key="item.name"-->
<!--          >-->
<!--            <td class="mb-10">{{ item.category }}</td>-->
<!--            <td class="mb-10">{{ item.name }}</td>-->
<!--            <td class="mb-10">{{ item.amount }} PLN</td>-->
<!--            <td class="mb-10">{{ item.date }}</td>-->
<!--          </tr>-->
<!--          </tbody>-->
<!--        </v-table>-->
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";
import { VDataTable } from 'vuetify/labs/VDataTable'

export default {
  name: "ExpenseForm",
  components: {
    VDataTable,
  },
  setup() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    const store = useStore()
    const currentUserName = ref(store.state.currentUserName);
    const index = store.state.userList.findIndex((element) => element.login === currentUserName.value)
    const categories = ref(store.state.userList[index].categoriesList.map((item) => {
      return item.name
    }))
    const expenses = ref(store.state.userList[index].expenses)
    const expenseCategory = ref('')
    const expenseName = ref('')
    const expenseAmount = ref(10)
    const expenseDate = ref('')
    const maxDate = new Date().toISOString().split('T')[0]
    const filterMinDate = ref(new Date().toISOString().split('T')[0])
    const filterMaxDate = ref(new Date().toISOString().split('T')[0])


    const addExpense = (event) => {
      event.preventDefault();
      if (expenseCategory.value !== '' && expenseName.value !== '' && expenseAmount.value !== 0 && expenseDate.value !== '') {
        const indexToAdd = store.state.userList.findIndex((element) => element.login === currentUserName.value)
        store.commit('handleExpenseAdd', {
          expense: {
            category: expenseCategory.value,
            name: expenseName.value,
            amount: expenseAmount.value,
            date: expenseDate.value
          },
          index: indexToAdd
        });
        expenseCategory.value = ''
        expenseName.value = ''
        expenseAmount.value = 0
        expenseDate.value = ''
      }
    }
    return {
      filterMinDate,
      filterMaxDate,
      maxDate,
      categories,
      expenses,
      expenseCategory,
      expenseName,
      expenseAmount,
      expenseDate,
      addExpense
    }
  },
  data() {
    return {
      search: '',
      headers: [
        {
          align: 'start',
          key: 'name',
          sortable: false,
          title: 'Dessert (100g serving)',
        },
        { key: 'calories', title: 'Calories' },
        { key: 'fat', title: 'Fat (g)' },
        { key: 'carbs', title: 'Carbs (g)' },
        { key: 'protein', title: 'Protein (g)' },
        { key: 'iron', title: 'Iron (%)' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: 7,
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: 8,
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: 16,
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: 0,
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: 2,
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45,
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22,
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>

.expense {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
  background: #1b1b1b;
}

.expense__content {
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  margin: 50px 20px 50px 76px;
  width: 70%;
}

.title {
  font-size: 18px;
  background: #06dec3;
}

.background {
  background: #06dec3;

}

.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  background: #06dec3;
  text-wrap: normal;
  color: black;
}

.card {
  border-radius: 5px;
  width: 500px;
  height: 100%;
}

</style>
