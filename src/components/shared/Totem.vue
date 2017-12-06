<template>
  <div>
  <ul  id="vertical-ticker">

  <!-- debut de la boucle LI -->

    <li v-for="page in pages">
      <div class="ecran-slide">
       <div class="slide-ecran-content">
         <info :id="page.id"></info>
       </div>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
  import Info from '../Info/Info'
  //import $ from 'jquery'
  // var $ = require('../../assets/jquery-3.2.1.min.js')
  var $ = window.jQuery = require('jquery')
  require('../../assets/jquery.totemticker.js')
  // import totemticker from '../assets/jquery.totemticker.js'
  export default {
    props: ['pages'],
    components: {
      Info
    },
    data () {
      return {
        //pages: []
      }
    },
    mounted () {
      var vm = this
      $('#vertical-ticker').totemticker({
        /*row_height	:	'200px',*/
        next		:	'#ticker-next',
        previous	:	'#ticker-previous',
        stop		:	'#stop',
        start		:	'#start',
        mousestop	:	true,
      })
    },
    // watch: {
    //   pages (pages) {
    //     // update options
    //     this.pages = pages
    //   }
    // },
  }
</script>

<style>
.slide-ecran-image {
  display:block;
  max-width: 600px;
  max-height: 600px;
  margin:auto;
}

.slide-ecran-content {
  margin-top:0.2em;
  line-height: 1.5em;
}

.ecran-slide {
   font-size:1.5em;
}

.ecran-slide h1 {
   border-bottom: 1px solid #E6D417;
}

.ecran-slide h1, h2{
   font-size:0.5em;
   line-height: 1em;
}

.ecran-slide h3, h4, h5 {
   font-size:1em;
   line-height: 0.5em;
}
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}
</style>
