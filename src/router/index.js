import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/auth/Dashboard.vue'
import AllFarms from '../views/auth/Farm/AllFarms.vue'
import AddFarm from '../views/auth/Farm/AddFarm.vue'
import AddFarmOwner from '../views/auth/Farm/AddFarmOwner.vue'
import ShowFarm from '../views/auth/Farm/ShowFarm.vue'
import ErrorPage from '../views/404.vue'
import AuthLayout from '../components/AuthLayout.vue'
import GuestLayout from '../components/GuestLayout.vue'
import auth from '../store/modules/Auth/auth'
import store from '../store'

Vue.use(VueRouter)

const routes = [ 
  {
    path:'/', 
    redirect: '/dashboard',    
    component: AuthLayout,
    children: [
      {
        path: '/dashboard', 
        name: 'Dashboard',  
        meta: {needsAuth : true, role:'trader'},    
        component: Dashboard
      },
      {
        path: '/farms', 
        name: 'Farms',  
        meta: {needsAuth : true, role:'trader'},    
        component: AllFarms
      },
      {
        path: '/farms/add', 
        name: 'AddFarm',  
        meta: {needsAuth : true, role:'trader'},    
        component: AddFarm
      },
      {
        path: '/farms/owners/add', 
        name: 'AddFarmOwner',  
        meta: {needsAuth : true, role:'trader'},    
        component: AddFarmOwner
      },
      {
        path: '/farm/:id', 
        name: 'ShowFarm',  
        meta: {needsAuth : true, role:'trader'},    
        component: ShowFarm
      },
    ]
  },
  {
    path:'/login', 
    redirect:'/login/distributor'
  },
  {
    path: '/guest', 
    redirect: '/login/distributor',     
    component: GuestLayout,
    children: [
      {
        path: '/login/distributor',
        name: 'LoginDistributor',    
        meta: {needsAuth: false},         
        component: Login
        
      },
      {
        path: '/login/trader',
        name: 'LoginTrader',    
        meta: {needsAuth: false},         
        component: Login
        
      },
      {
        path: '/register/distributor',
        name: 'RegisterDistributor',  
        meta: {needsAuth: false},            
        component: Register
      },     
      {
        path: '/register/trader',
        name: 'RegisterTrader',  
        meta: {needsAuth: false},            
        component: Register
      },     
    ]
  },
  {
    path: '/404',
    name: 'ErrorPage',    
    meta: {needsAuth: true, role: 'distributor'},
    component: ErrorPage
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',    
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(!store.state.loading){    
    if(!to.meta.needsAuth){
      store.state.loading = true
    }
    else{
      store.watch(
        (state) => state.loading,
        (ready) => {
            if(ready){              
              proceed()
            }
        }
      )
    }      
  }
  else if(!to.meta.needsAuth){
    store.state.loading = true
  } 
  else{    
    store.state.loading = false
  }  
  proceed() 
  
  
  
  function proceed(){
    if(to.meta.needsAuth && !auth.state.user.api_token){    
      next({name: 'LoginDistributor'});
      
    }    
    else if(!to.meta.needsAuth && auth.state.user.api_token){
      if(auth.state.user.role == 'trader'){
        next({name: 'Dashboard'});
      }   
      else{
        next({name: 'ErrorPage'});
      } 
      
    }
    else{
      if(to.meta.role == 'distributor' && auth.state.user.role == 'trader'){
        next({name: 'Dashboard'});
      }
      else if(to.meta.role == 'trader' && auth.state.user.role == 'distributor'){
        next({name: 'ErrorPage'});
      }
      else{
        next();
      }     
    }
  }
  
});



export default router
