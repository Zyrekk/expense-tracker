<template>
  <div class="container pt-16">
    <div class="container__content pt-10">
      <div class="custom-width">
        <v-card class="w-100">
          <v-toolbar color="#06dec3" height="30%">
            <v-card-text class="container__font-size">Add a new expense category</v-card-text>
          </v-toolbar>

          <v-card-text>


            <v-text-field
                base-color="black"
                variant="outlined"
                label="Category"
                placeholder="Category"
                v-model="category"
                density="compact"
            ></v-text-field>


            <v-textarea
                base-color="black"

                variant="outlined"
                label="Description"
                placeholder="Description"
                no-resize
                density="compact"
                v-model="description"
            ></v-textarea>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="#06dec3"
                variant="elevated"
                type="submit" @click="handleAddItem"> Add
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card color="#1b1b1b" class="w-100" flat>
          <v-card-text v-if="!categoryList.length" class="text-red-accent-2 pt-15 mb-0 text-white container__font-size">Add categories to see a list of categories
          </v-card-text>
          <v-card-text v-if="categoryList.length" class="pt-15 mb-0 text-white container__font-size">Expense Categories
          </v-card-text>
          <v-expansion-panels color="#06dec3" variant="inset" class="d-inline-block  my-4">
            <v-expansion-panel
                class="mt-2"
                v-for="i in categoryList"
                :key="i"
                :title="i.name"
                :text="i.description"
            ></v-expansion-panel>
          </v-expansion-panels>
        </v-card>
        <v-card-text v-if="!expenses.length" class="text-red-accent-2 pt-15 mb-0 text-white container__font-size">Add expenses to see an expense chart</v-card-text>
        <v-card v-if="expenses.length" color="#1b1b1b" class="w-100 d-flex flex-column align-center" flat>
          <v-card-text class="pt-15 mb-0 text-white container__font-size">Expenses overview</v-card-text>
          <v-card color="#1b1b1b" class="chart-size">
            <canvas v-if="categoryList.length" id="myChart"></canvas>
          </v-card>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>

import {ref} from "vue";
import Chart from 'chart.js/auto';
import {useStore} from "vuex";

export default {
  name: "DashboardComponent",
  mounted() {
    const store = useStore();
    const ctx = document.getElementById('myChart');
    const categoryData = {};
    const currentUserName = ref(store.state.currentUserName);
    const index = store.state.userList.findIndex((element) => element.login === currentUserName.value)
    const expenses=store.state.userList[index].expenses

    expenses.forEach(expense => {
      if (!categoryData[expense.category]) {
        categoryData[expense.category] = {
          name: expense.category,
          amount: 0
        };
      }
      categoryData[expense.category].amount += expense.amount;
    });

    const result = Object.values(categoryData);
    const categories = result.map((item) => {
      return item.name
    })
    const chartValues = result.map((item) => {
      return item.amount
    })
    if (categories.length) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: categories,
          datasets: [{
            label: 'Summary cost in PLN ',
            data: chartValues,
            borderWidth: 1
          }]
        },
      });
    }
  },
  setup() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    const store = useStore()
    const currentUserName = ref(store.state.currentUserName);
    // const currentUser = ref(store.state.userList.find(item => item.login === currentUserName.value));
    const index = store.state.userList.findIndex((element) => element.login === currentUserName.value)
    const categoryList = ref(store.state.userList[index].categoriesList)
    const category = ref('')
    const description = ref('')
    const expenses=store.state.userList[index].expenses

    const handleAddItem = () => {
      const indexToAdd = store.state.userList.findIndex((element) => element.login === currentUserName.value)
      store.commit('handleCategoryAdd', {
        index: indexToAdd,
        category: {
          name: category.value,
          description: description.value
        }
      });
      category.value = ''
      description.value = ''
    }

    return {categoryList, category, description,expenses, handleAddItem}
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/styling.scss";

.chart-size {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
}

@media only screen and (max-width: 768px) {
  .chart-size {
    width: 110%;
  }
}

</style>
