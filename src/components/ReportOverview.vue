<template>
  <div class="reports pt-16">
    <div class="reports__content pt-10">
      <div class="w-75">
        <v-card v-if="!expenses.length" class="bg-red-accent-2">
          <v-card-text class="font-size">Add categories and expenses to see reports</v-card-text>
        </v-card>
        <v-card v-if="expenses.length" class="w-100 d-flex flex-column" color="#1b1b1b">

          <v-card flat>
            <v-toolbar color="#06dec3">
              <v-card-text class="font-size">The total amount of expenses</v-card-text>
            </v-toolbar>
            <v-card>
              <v-card-text class="font-size">{{totalSum}} PLN</v-card-text>
            </v-card>
          </v-card>

          <v-card class="mt-16">
            <v-toolbar color="#06dec3" height="30%">
              <v-card-text class="font-size">Monthly expenses</v-card-text>
            </v-toolbar>
            <v-table
                fixed-header
                height="512"
                class="w-100 rounded"
            >
              <thead class="rounded">
              <tr>
                <th class="text-center text-wrap">
                  Date
                </th>
                <th class="text-center  text-wrap">
                  Summary per date
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="item in summary"
                  :key="item.name"
              >
                <td class="mb-10">{{ item.date }}</td>
                <td class="mb-10">{{ item.summary }} PLN</td>
              </tr>
              </tbody>
            </v-table>
          </v-card>
          <v-card class="mt-16">
            <v-toolbar color="#06dec3" height="30%">
              <v-card-text class="font-size">Category expenses</v-card-text>
            </v-toolbar>
            <v-table
                fixed-header
                height="512"
                class="w-100 rounded"
            >
              <thead class="rounded">
              <tr>
                <th class="text-center text-wrap">
                  Category
                </th>
                <th class="text-center  text-wrap">
                  Summary per category
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="item in catSummary"
                  :key="item.name"
              >
                <td class="mb-10">{{ item.category }}</td>
                <td class="mb-10">{{ item.summary }} PLN</td>
              </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed, ref} from "vue";

export default {
  name: "ReportOverview",
  setup() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    const store = useStore()
    const currentUserName = ref(store.state.currentUserName);
    const index = store.state.userList.findIndex((element) => element.login === currentUserName.value)
    const expenses = store.state.userList[index].expenses

    const totalSum = expenses.reduce((sum, entry) => sum + entry.amount, 0);


    const summary = [];
    const catSummary = [];

    const x=computed(()=>{
      expenses.forEach(entry => {
        const date = new Date(entry.date);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const monthYear = `${year}-${month}`;

        const existingSummary = summary.find(item => item.date === monthYear);
        if (existingSummary) {
          existingSummary.summary += entry.amount;
        } else {
          const newSummary = {
            date: monthYear,
            summary: entry.amount
          };
          summary.push(newSummary);
        }
      });
      summary.sort((a, b) => a.date.localeCompare(b.date));

    })

    expenses.forEach(entry => {
      const date = new Date(entry.date);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const monthYear = `${year}-${month}`;

      const category = entry.category

      const existingCategorySummary = catSummary.find(item => item.category === category);
      if (existingCategorySummary) {
        existingCategorySummary.summary += entry.amount
      } else {
        const newSummary = {
          category: category,
          summary: entry.amount
        };
        catSummary.push(newSummary);
      }

      const existingSummary = summary.find(item => item.date === monthYear);
      if (existingSummary) {
        existingSummary.summary += entry.amount;
      } else {
        const newSummary = {
          date: monthYear,
          summary: entry.amount
        };
        summary.push(newSummary);
      }
    });
    summary.sort((a, b) => a.date.localeCompare(b.date));

    return {expenses, summary, catSummary,totalSum}
  }
}
</script>

<style lang="scss" scoped>

.reports {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
  background: #1b1b1b;
}

.reports__content {
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 50px 20px 50px 76px;
  width: 70%;
}

.font-size {
  font-size: 20px;
  font-weight: 500;
}

</style>
