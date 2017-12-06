<template>
  <v-container fluid>
    <v-layout class="pt-1 pb-1" row wrap>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          :width='7'
          :height='70'
          v-if="loading"
          color="primary">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout class="pt-1 pb-1" row wrap v-if="!loading">
      <v-flex xs6 order-lg1>

          <vertical-ticker ref="swiper"
            :pages="infos"  >
          </vertical-ticker>

      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Totem from './shared/Totem'
import Info from './Info/Info'
export default {
  name: 'home',
  components: {
    // swiper,
    // swiperSlide,
    Totem: 'vertical-ticker',
    Info
  },
  data () {
    return {
      src : '',
      swiperOption: {
          // swiper options 所有的配置同swiper官方api配置
          autoplay: 3000,
          direction: 'vertical',
          pagination: '.swiper-pagination',
          observeParents: true,
          loop: true,
          slidesPerView: 15,
          centeredSlides: true,
          freeMode: true,
          hideControls: true,
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          onTransitionStart (swiper) {
            console.log(swiper)
          }
        },
        swiperOption2: {
            // swiper options 所有的配置同swiper官方api配置
            autoplay: 3500,
            direction: 'horizontal',
            grabCursor: true,
            setWrapperSize: true,
            autoHeight: true,
            paginationClickable: true,
            prevButton: '.swiper-button-prev',
            nextButton: '.swiper-button-next',
            scrollbar: '.swiper-scrollbar',
            mousewheelControl: true,
            observeParents: true,
            slidesPerView: 2,
            centeredSlides: true,
            // if you need use plugins in the swiper, you can config in here like this
            // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
            debugger: true,
            // swiper callbacks
            // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
            onTransitionStart (swiper) {
              console.log(swiper)
            }
          }

    }

  },
  computed: {
    infos () {
      return this.$store.getters.lastInfos
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadInfo (id) {
      this.$router.push('/infos/' + id)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  position : absolute;
  bottom: 50px;
  background-color: rgba(0,0,0,0.5);
  color: white;
  font-size: 2em;
  padding: 15px;
}
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
