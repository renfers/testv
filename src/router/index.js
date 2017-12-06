import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import InfoList from '@/components/Info/InfoList'
import Info from '@/components/Info/Info'
import CreateInfo from '@/components/Info/CreateInfo'
import SetInfo from '@/components/shared/SetInfo'
import SignIn from '@/components/User/SignIn'
import SignUp from '@/components/User/SignUp'
import Profile from '@/components/User/Profile'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/infos',
      name: 'Infos',
      component: InfoList
    },
    {
      path: '/info/new',
      name: 'CreateInfo',
      component: CreateInfo,
      beforeEnter: AuthGuard
    },
    {
      path: '/info/:id/edit',
      name: 'EditInfo',
      props: true,
      component: SetInfo,
      beforeEnter: AuthGuard
    },
    {
      path: '/infos/:id',
      name: 'Info',
      props: true,
      component: Info
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ],
  mode : 'history'
})
