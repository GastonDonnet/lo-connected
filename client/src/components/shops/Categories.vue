<template>
  <div class="my-2">
    <v-row>
      <v-col v-for="(category, i) in categories" :key="i" class="pa-0">
        <div class="justify-center text-center py-2">
          <v-btn
            class="mx-2"
            fab
            small
            elevation="0"
            color="primary"
            @click="$router.push({name: 'Shops Category', params: {id: category.id}})"
          >
            <v-icon>{{category.icon}}</v-icon>
          </v-btn>
          <v-subheader
            class="font-weight-light mt-1 justify-center"
            style="height: 14px"
          >{{category.name}}</v-subheader>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
    }
  },
  methods: {
    getCategories() {this.$http.get('shop-category').then(res=>this.categories=res.data.data.data)}
  },
  created() {
    this.getCategories()
  },

}
</script>

<style>
</style>