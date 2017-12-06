<template>
  <v-container>
    <v-layout row>
      <v-flex xs12  sm6 offset-sm3>
        <h4 class="primary--text">{{ setType.title }}</h4>

      </v-flex>
    </v-layout>
    <v-layout row >
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="submitAction">
          <v-layout row >
            <v-flex xs12 >
              <v-datetime-picker
                label="Date de l'information"
                 :datetime="date"
                 @input="updateDatetime">
                 {{ date | simple }}
              </v-datetime-picker>
            </v-flex>
          </v-layout>

          <v-layout row >
            <v-flex xs12 >
              <v-select
                :items="infoTypes"
                v-model="infoType"
                label="Sélection du type d'information"
              >
              </v-select>
            </v-flex>
          </v-layout>
          <v-layout row >

          <v-flex xs12 >
            <v-select
              v-bind:items="profIds"
              v-model="profId"
              label="Sélection du prof concerné"
              autocomplete
            >
            </v-select>
            <h4>{{ profName }}</h4>
          </v-flex>
        </v-layout>
        <v-layout row >
          <v-flex xs12 >
            <v-select
              :items="classes"
              v-model='cours'
              label="Sélection des cours concernés"
              multiple>
            </v-select>
          </v-flex>
        </v-layout>
        <v-layout row >
          <v-flex xs12 >
            <v-text-field
              v-model='description'
              label="Description"
              multi-line
            >
          </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row >
          <v-flex xs12 >
            <v-datetime-picker
              label="Début de publication"
               :datetime="startDatePublication"
               @input="updateStartDatetime">
               {{ startDatePublication }}
            </v-datetime-picker>
          </v-flex>
        </v-layout>
        <v-layout row >
          <v-flex xs12 >
            <v-datetime-picker
              label="Fin de publication"
               :datetime="endDatePublication"
               @input="updateEndDatetime">
               {{ endDatePublication }}
            </v-datetime-picker>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12  sm6 offset-sm3>
            <v-btn class="primary" type='submit'
              :disabled="!formIsValid">
              {{ this.setType.buttonTitle }}
            </v-btn>
          </v-flex>
        </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import DatetimePicker from '../shared/datetimePicker'

export default {
  name: 'setInfo',
  props: {
    'setType': {
      type: Object,
      default: function () {
        return {
          title : 'Nouvelle information',
          submitAction : 'onCreateInfo',
          buttonTitle : 'Créer l\'Information',
          id: '',
        }
      }
    },
    'id': {
      type: String,
      default: ''
    },
    submitAction: {
      type: String,
      default: 'onCreateInfo'
    }
  },
  components: {
    DatetimePicker
  },
  computed: {
    myAction: () => (this.setType.submitAction=="onCreateInfo")?this.onCreateInfo:this.onUpdateInfo,
    profIds () {
      return this.$store.getters.coursprofs_prop('id')
    },
    infoTypes () { return [
      'Libération',
      'Changement de salle',
      'Information importante'
    ]},
    prof () {
      if (!this.profId) return null
      return this.$store.getters.prof(this.profId)
    },
    formIsValid () {
      return this.infoType !== '' &&
      this.profId !== '' && this.cours !== ''
    },
    info () {
      return this.$store.getters.publicInfo(this.id)
    },
    today () {
      return this.formatDate(new Date())
    },
    // startDatePublication () {
    //   return (!this.id)?this.formatDate(new Date()):this.info.startDatePublication
    // },
    // endDatePublication () {
    //   return (!this.id)?this.formatDate(new Date()):this.info.endDatePublication
    // },
    classes () {
      if (!this.profId) return []
      this.cours = []
      return this.$store.getters.cours(this.profId)
    },
  },

  data () {
    return {
      profId : '',
      cours : '',
      description: '',
      infoType : '',
      modal : false,
      modal1 : false,
      modal2 : false,
      profId: '',
      profName : '',
      cours: [],
      date: new Date().toISOString().substr(0, 19).replace('T', ' '),
      description: '',
      infoType: '',
      startDatePublication: new Date().toISOString().substr(0, 19).replace('T', ' '),
      endDatePublication: new Date().toISOString().substr(0, 19).replace('T', ' ')
    }
  },

  methods : {
    onCreateInfo () {
      if (!this.formIsValid) {
        return
      }
      const info = {
        infoType : this.infoType,
        profId : this.profId,
        profName : this.profName,
        cours : this.cours,
        description : this.description,
        date : this.date,
        startDatePublication : this.startDatePublication,
        endDatePublication : this.endDatePublication,
        id : this.date + this.profId + this.infoType,
        creatorId: this.$store.user.id
      }

      this.$store.dispatch('createInfo', info)
      this.$router.push('/infos')
    },
    onUpdateInfo () {
      if (!this.formIsValid) {
        return
      }
      const info = {
        infoType : this.infoType,
        profId : this.profId,
        profName : this.profName,
        cours : this.cours,
        description : this.description,
        date : this.date,
        startDatePublication : this.startDatePublication,
        endDatePublication : this.endDatePublication,
        id : this.date + this.profId + this.infoType,
        creatorId: this.$store.user.id
      }

      this.$store.dispatch('createInfo', info)
      this.$router.push('/infos')
    },
    updateDatetime: function(datetime){
      this.date=datetime
    },
    updateStartDatetime: function(datetime){
      this.startDatePublication=datetime
    },
    updateEndDatetime: function(datetime){
      this.endDatePublication=datetime
    },
    formatDate: (val) => new Date(val).toISOString().substr(0, 19).replace('T', ' ')
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
