<template>
  <v-container >
    <v-layout row wrap v-for="info in infos" :key="info.id" >
      <v-flex xs12>
        <v-card
          class="accent"
          :to="'infos/' + info.id"

          >
          <v-container fluid ma-0 pa-1>
            <v-layout row  class="primary" ma-0 pa-0>
              <v-flex ma-0 class="pa-0">
                <v-card-title class="ma-2 pa-0 white--text"
                  ><h5 class="mr-3">{{ info.date | simple }}</h5>
                  <h6>{{ info.infoType }}</h6>
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-layout >
              <v-flex >
                <v-card-title>
                  <div>
                    <div><b class="white--text" mb-0>{{ info.profName }}</b>
                      <ul v-for="classe in info.cours"><li>{{ classe }}</li>
                      </ul>
                    </div>
                    <div><p class="white--text" >{{ info.description }}</p></div>
                  </div>
                  </v-card-title>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'infoList',
  computed: {
    infos () {
      return this.$store.getters.publicInfos
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
