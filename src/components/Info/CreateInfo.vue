<template>
  <set-info :setType="setType" :submitAction="onCreateInfo()" :id="setType.id">
  </set-info>

</template>

<script>
import SetInfo from '../shared/SetInfo'

export default {
  name: 'createInfo',
  components: {
    SetInfo
  },

  data () {
    return {
      setType: {
        title : 'Nouvelle information',
        submitAction : 'onCreateInfo',
        buttonTitle : 'Créer l\'Information',
        id: ''
      },
    }
  },
  methods: {
    onCreateInfo () { return 'onCreateInfo' }
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
