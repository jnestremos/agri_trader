<template>
  <div id="authLayout" class="d-flex">   
    <div>
        <b-nav vertical class="vh-100 justify-content-between align-items-center py-5" style="background-color:green; width:8vw">
        <b-nav-item class="d-flex justify-content-center">
            <font-awesome-icon icon="fa-regular fa-user" style="font-size:40px; color:white;"/>
          </b-nav-item>
        <div style="width:100%; color:black;">          
          <b-nav-item @mouseenter="moduleLeave()">Home</b-nav-item>
          <b-nav-item @mouseenter="showModules()" @mouseleave="hideModules()" class="w-100">Modules</b-nav-item>
          <b-nav-item @mouseenter="moduleLeave()">Settings</b-nav-item>
        </div>
        <b-nav-text class="d-flex justify-content-center">
          <form action="" @submit.prevent="logoutUser()">
            <button type="submit" style="border:0; background-color:transparent">
              <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" style="font-size:40px; transform:rotate(-180deg); color:white;"/>
            </button>
          </form>          
        </b-nav-text>                    
      </b-nav>
    </div>
    <div style="width:300px; height:100vh; position: fixed; left:8%;" class="d-flex align-items-center">
      <div style="background-color:green; width:100%; height:40%; opacity:0; display:none; transition:0.5s" id="modules" @mouseenter="moduleEnter()" @mouseleave="moduleLeave()">
      <!-- All modules in list view here -->
      </div>
    </div>
      <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {    
    name: 'AuthLayout',  
    data(){
      return{
        show:false
      }      
    },  
    methods:{
      ...mapActions(['logout']),
      showModules(){     
        var modules = document.getElementById('modules')               
        modules.style.opacity = '1'  
        modules.style.display = 'block'  
        this.show = true               
      },
      hideModules(){       
        var modules = document.getElementById('modules')
        if(!this.show){
          modules.style.opacity = '0'       
          modules.style.display = 'none'       
        }                  
      },
      moduleEnter(){
        var modules = document.getElementById('modules')
        this.show = true
        if(modules.style.opacity == '1'){
          modules.style.opacity = '1' 
          modules.style.display = 'block' 
        }                        
      },
      moduleLeave(){
        var modules = document.getElementById('modules')
        this.show = false        
        modules.style.opacity = '0'           
        modules.style.display = 'block'          
      },
      logoutUser(){            
        this.logout()
        .then(() => {
          this.$router.push({name: 'LoginTrader'})
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }  
}
</script>

<style scoped>

</style>