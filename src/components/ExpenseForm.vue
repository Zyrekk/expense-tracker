<template>
  <div class="container">
    <div class="container__content d-flex flex-column">
      <form class="custom-width" v-on:submit="addExpense($event)">
        <v-card
            class="bg-white"
        >
          <v-row>
            <v-col>
              <v-card-text class="container__font-size d-flex justify-center align-center container__background"
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
                  :max="new Date().toISOString().split('T')[0]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn type="submit" color="#06dec3" variant="elevated" class="mb-5 mr-5 float-right">
            Add
          </v-btn>
        </v-card>
      </form>
      <div class="custom-width d-flex flex-column">
        <v-card class="w-100 d-flex flex-column mt-10">
            <v-card-text class="container__font-size d-flex justify-center align-center container__background"
            >
              <v-icon prepend>mdi-filter-outline</v-icon> Filters
            </v-card-text>
          <v-select
              chips
              v-model="selectedCategories"
              class="px-5 py-5 text-left"
              label="Category"
              :items="categories"
              multiple
          ></v-select>
          <v-card class="w-100 d-flex flex-wrap">
            <v-text-field
                class="px-5"
                required
                v-model="minDateInput"
                type="date"
                label="Start date"
            ></v-text-field>
            <v-text-field
                class=" px-5"
                required
                v-model="maxDateInput"
                type="date"
                label="End date"
                :max="new Date().toISOString().split('T')[0]"
            ></v-text-field>
          </v-card>
        </v-card>
        <v-card class="mt-10">
          <v-card-text class="container__font-size d-flex justify-center align-center container__background"
          >
            <v-icon prepend>mdi-cash-100</v-icon> Expenses
          </v-card-text>
          <v-card-title>
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
              class="pb-5"
              :headers="headers"
              :items="filteredExpenses"
              :search="search"
          ></v-data-table>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref, watch} from "vue";
import {useStore} from "vuex";
import {VDataTable} from 'vuetify/labs/VDataTable'

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

    const expenseCategory = ref('')

    const expenseName = ref('')

    const expenseAmount = ref(10)

    const expenseDate = ref(new Date().toISOString().split('T')[0])

    const index = store.state.userList.findIndex((element) => element.login === currentUserName.value)

    const categories = ref(store.state.userList[index].categoriesList.map((item) => {
      return item.name
    }))

    const selectedCategories=ref(categories.value)



    const expenses = computed(() => {
      return store.state.userList[index].expenses.filter(expense => selectedCategories.value.includes(expense.category));
    });

    const smallestDate = computed(() => {
      if (expenses.value.length === 0) {
        return new Date().toISOString().split('T')[0]; // Jeśli expenses są puste, ustaw dzisiejszą datę
      } else {
        expenses.value.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        return  expenses.value[0].date
      }
    });
    const minDateInput=ref(new Date(smallestDate.value).toISOString().split('T')[0])
    watch(smallestDate,()=>{
      console.log(smallestDate.value)
      minDateInput.value=new Date(smallestDate.value).toISOString().split('T')[0]
    })

    const maxDateInput=ref(new Date().toISOString().split('T')[0])


    const filteredExpenses = computed(() => {
      return expenses.value.filter(expense=> expense.date>=minDateInput.value&&expense.date<=maxDateInput.value)
    });


    const search = ref('');

    const headers = [
      {
        align: 'center',
        key: 'category',
        title: 'Category',
      },
      {align: 'center', key: 'name', title: 'Name'},
      {align: 'center', key: 'amount', title: 'Amount'},
      {align: 'center', key: 'date', title: 'Date'},
    ]

    const addExpense = (event) => {
      event.preventDefault();
      if (expenseCategory.value !== '' && expenseName.value !== '' && expenseAmount.value !== 0 && expenseDate.value !== '') {
        const indexToAdd = store.state.userList.findIndex((element) => element.login === currentUserName.value)
        store.commit('handleExpenseAdd', {
          expense: {
            category: expenseCategory.value,
            name: expenseName.value,
            amount: Number(expenseAmount.value),
            date: expenseDate.value
          },
          index: indexToAdd
        });
        expenseCategory.value = ''
        expenseName.value = ''
        expenseAmount.value = 0
        expenseDate.value = new Date().toISOString().split('T')[0]
      }
    }
    return {
      smallestDate,
      selectedCategories,
      search,
      headers,
      minDateInput,
      maxDateInput,
      categories,
      expenseCategory,
      expenseName,
      expenseAmount,
      expenseDate,
      filteredExpenses,
      addExpense,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/styling.scss";

</style>
