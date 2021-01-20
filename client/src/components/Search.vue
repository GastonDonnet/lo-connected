<template>
  <div>
    <v-card color="grey lighten-4" flat shaped>
      <v-card-text class="py-1 pb-0">
        <v-text-field
          v-model="searchText"
          :loading="loading"
          color="accent"
          :label="label"
          :placeholder="placeholder"
          prepend-icon="mdi-database-search"
          return-object
        >
          <template v-slot:append-outer>
            <v-btn text @click="search()">Buscar</v-btn>
          </template>
        </v-text-field>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      entries: [],
      results: 0,
      loading: false,
      searchText: null,
    }),
    props: {
      route: {
        type: String,
        required: true
      },
      placeholder: {type: String},
      label: {type: String}
    },

    computed: {
      searchTextParsed() {
        return `%${this.searchText}%`
      }
    },

    methods: {
       search () {
        // Items have already been requested
        if (this.loading) return

        this.loading = true
        this.$http.get(this.route+this.searchTextParsed).then(res=> {
          this.results = res.data.data.data.length
          this.entries = res.data.data.data
        }).finally(()=>{
          this.loading = false
          this.$emit('success', { entries: this.entries, results: this.results })
        })
      },
    },
  }
</script>

<style>
</style>