<template>
  <v-list-item @click="$router.push({name: 'Shop Products', params: {categoryId: category.id}})">
    <v-list-item-avatar inactive>
      <v-icon>{{category.icon}}</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{category.name}}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    category: {
      type:Object,
      required: true
    }
  }
}
</script>

<style>
</style>