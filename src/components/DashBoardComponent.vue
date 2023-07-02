<template>
  <div class="dashboard">
    <v-card
        class="card"
        color="#1b1b1b"
        width="100%"
        rounded
        flat
    >
      <v-card class="pt-16 card__flex" width="100%" flat>
        <div class="card-content">
          <div class="card-content__left">
            <v-card class="width" height="60%" color="">
              <v-toolbar color="#06dec3" height="30%">
                <v-card-text class="font-size">Add a new expense category</v-card-text>
              </v-toolbar>

              <v-card-text>


                <v-text-field
                    class="font-color input-height"
                    base-color="black"
                    color="#06dec3"
                    variant="outlined"
                    label="Category"
                    placeholder="Category"
                    v-model="category"
                    density="compact"
                ></v-text-field>


                <v-textarea
                    base-color="black"
                    color="#06dec3"
                    variant="outlined"
                    label="Description"
                    class="font-color"
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
                    type="submit" @click="handleAddItem"> Add</v-btn>
              </v-card-actions>
            </v-card>
            <v-card color="#1b1b1b" class="width" flat>
              <v-card-text class="pt-15 mb-0 text-white font-size__chart">Expense Categories</v-card-text>
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
          </div>
          <v-card color="#1b1b1b" class="chart-size mt-16 d-flex flex-column" flat>
            <span class="pt-15 height mb-0 text-white font-size__chart">Quick overview of expenses</span>
            <canvas id="myChart"></canvas>
          </v-card>
        </div>
      </v-card>
    </v-card>
  </div>
</template>

<script>

import {ref} from "vue";
import Chart from 'chart.js/auto';
import {useStore} from "vuex";

export default {
  name: "DashboardComponent",
  mounted() {
    const store=useStore();
    const ctx = document.getElementById('myChart');
    const categoryData = {};
    const currentUserName = ref(store.state.currentUserName);
    const index=store.state.userList.findIndex((element) => element.login === currentUserName.value)

    store.state.userList[index].expenses.forEach(expense => {
      if (!categoryData[expense.category]) {
        categoryData[expense.category] = {
          name: expense.category,
          amount: 0
        };
      }
      categoryData[expense.category].amount += expense.amount;
    });

    const result = Object.values(categoryData);
    console.log(result)
    const categories=result.map((item)=>{
      return item.name
    })
    const chartValues=result.map((item)=>{
      return item.amount
    })
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
  },
  setup() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    const store = useStore()
    const currentUserName = ref(store.state.currentUserName);
    // const currentUser = ref(store.state.userList.find(item => item.login === currentUserName.value));
    const index=store.state.userList.findIndex((element) => element.login === currentUserName.value)
    const categoryList=ref(store.state.userList[index].categoriesList)
    const category = ref('')
    const description = ref('')

    const handleAddItem = () => {
      const indexToAdd=store.state.userList.findIndex((element) => element.login === currentUserName.value)
      store.commit('handleCategoryAdd', {
        index: indexToAdd,
        category:{
          name: category.value,
          description: description.value
        }
      });
      category.value = ''
      description.value = ''
    }

    return {categoryList, category, description, handleAddItem}
  }
}
</script>

<style lang="scss" scoped>
.font-size {
  font-size: 20px;
  font-weight: 500;
}

.font-size__chart{
  font-size: 24px;
  padding-bottom: 40px;
  font-weight: 500;
}

.height{
  height: fit-content;
  line-height: 1.25rem;
}

.chart-size{
  width: 50%;
}

.width {
  width: 60%;
}

.font-color {
  color: #595959;
}

.dashboard {
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
  background: #1b1b1b;
  display: flex;
}

.card__flex {
  background: #1b1b1b;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-content {
  display: flex;
  border-radius: 10px 10px 0 0;
  position: relative;
  margin: 50px 20px 50px 76px;
  width: 70%;
}

.card-content__left{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: fit-content;
  width: 100%;
}

@media only screen and (max-width: 768px) {
  .width {
    width: 100%;
  }
  .font-size {
    font-size: 18px;
  }
  .card-content{
    flex-direction: column;
  }
  .chart-size{
    width: 100%;
  }
}

</style>
