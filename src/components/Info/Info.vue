<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="accent">
          <v-card-title  class="primary white--text pr-2 pl-2 pt-1 pb-0" >
            <h5 pa-1>{{ info.date | simple }}</h5><v-spacer></v-spacer>
            <h5  class="pa-1">{{ info.infoType }}</h5><v-spacer></v-spacer>
            <h5> {{ info.profName }} </h5>
          </v-card-title>
          <v-card-title class="white--text pr-2 pl-2 pt-1 pb-0">
            <ul v-for="classe in info.cours">
              <li><h5>{{ classe }}</h5></li>
            </ul>
            <p>{{ info.description }}</p>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  name: 'info',
  props: ['id'],
  computed: {
    info () {
      return this.$store.getters.publicInfo(this.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
