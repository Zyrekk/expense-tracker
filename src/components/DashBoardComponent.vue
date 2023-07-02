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
            <v-card class="width" color="">
              <v-toolbar color="#06dec3">
                <v-card-text class="font-size">Add a new expense category</v-card-text>
              </v-toolbar>

              <v-card-text>
                <v-text-field
                    base-color="black"
                    color="#06dec3"
                    variant="outlined"
                    label="Category"
                    class="font-color"
                    placeholder="Category"
                    v-model="category"

                ></v-text-field>

                <v-textarea
                    base-color="black"
                    color="#06dec3"
                    variant="outlined"
                    label="Description"
                    class="font-color"
                    placeholder="Description"
                    no-resize
                    v-model="description"
                ></v-textarea>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                       color="#06dec3"
                       size="large"
                       variant="elevated"
                       type="submit" @click="handleAddItem"> Add</v-btn>
              </v-card-actions>
            </v-card>
            <v-card color="#1b1b1b" class="width" flat>
              <v-card-text class="pt-15 mb-0 text-white font-size">Expense Categories</v-card-text>
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
          <v-card>wykres</v-card>
        </div>
      </v-card>
    </v-card>
  </div>
</template>

<script>

import {ref} from "vue";

export default {
  name: "DashboardComponent",
  setup() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    const category = ref('')
    const description = ref('')
    const handleAddItem = () => {
      categoryList.value.push({
        name: category.value,
        description: description.value
      })
      category.value = ''
      description.value = ''
    }
    const categoryList = ref([{
      name: "food",
      description: "I like eat pizza"
    }, {
      name: "car",
      description: "My car is broken"
    }])

    return {categoryList, category, description, handleAddItem}
  }
}
</script>

<style lang="scss" scoped>
.font-size {
  font-size: 20px;
  font-weight: 500;
}

.width {
  width: 50%;
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
  width: 100%;
}

.avatar {
  z-index: 100;
  top: -100px;
  left: 0;
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
}

</style>
