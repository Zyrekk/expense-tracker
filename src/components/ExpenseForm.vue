<template>
  <div class="expense">
    <div class="expense__content">
      <v-card
          class="bg-white card"
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
                :items="items"
                density="comfortable"
                label="Category"
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="px-5">
          <v-col>
            <v-text-field
                label="Amount"
                placeholder="10.00"
                prefix="PLN"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="px-5">
          <v-col>
            <v-text-field
                label="Name"
                placeholder="coca-cola"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="px-5">
          <v-col>
            <v-text-field
                type="date"
                label="Date"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn color="#06dec3"
               variant="elevated" class="mb-5 mr-5 float-right">Add
        </v-btn>
      </v-card>
      <v-table
          fixed-header
          height="512"
          class="card my-10"
      >
        <thead>
        <tr>
          <th class="text-center text-wrap">
            Category
          </th>
          <th class="text-center text-wrap">
            Name
          </th>
          <th class="text-center text-wrap">
            Amount
          </th>
          <th class="text-center text-wrap">
            Date
          </th>


        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in desserts"
            :key="item.name"
        >
          <td class="mb-10">food</td>
          <td class="mb-10">ham</td>
          <td class="mb-10">120 pln</td>
          <td class="mb-10">2022.11.11</td>


        </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "ExpenseForm",
  setup() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    const items = ref(['Foo', 'Bar', 'Fizz', 'Buzz']);
    const desserts = ref([
      {
        name: 'Frozen Yogurt',
        calories: 159,
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
      },
      {
        name: 'Eclair',
        calories: 262,
      },
      {
        name: 'Cupcake',
        calories: 305,
      },
      {
        name: 'Gingerbread',
        calories: 356,
      },
      {
        name: 'Jelly bean',
        calories: 375,
      },
      {
        name: 'Lollipop',
        calories: 392,
      },
      {
        name: 'Honeycomb',
        calories: 408,
      },
      {
        name: 'Donut',
        calories: 452,
      },
      {
        name: 'KitKat',
        calories: 518,
      },
      {
        name: 'Gingerbread',
        calories: 356,
      },
      {
        name: 'Jelly bean',
        calories: 375,
      },
      {
        name: 'Lollipop',
        calories: 392,
      },
      {
        name: 'Honeycomb',
        calories: 408,
      },
      {
        name: 'Donut',
        calories: 452,
      },
      {
        name: 'KitKat',
        calories: 518,
      },
      {
        name: 'Gingerbread',
        calories: 356,
      },
      {
        name: 'Jelly bean',
        calories: 375,
      },
      {
        name: 'Lollipop',
        calories: 392,
      },
      {
        name: 'Honeycomb',
        calories: 408,
      },
      {
        name: 'Donut',
        calories: 452,
      },
      {
        name: 'KitKat',
        calories: 518,
      },
    ])

    return {items, desserts}
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
.v-table.v-table--fixed-header>.v-table__wrapper>table>thead>tr>th {
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
