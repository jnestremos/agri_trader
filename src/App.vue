<template>
  <div id="app"> 
    <div style="position:absolute; background-color: white; z-index:999999999999999999" class="vw-100 vh-100 d-flex justify-content-center align-items-center" v-if="!loading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: "App", 
  computed:{
    ...mapState(['loading'])
  },  
}
</script>
<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
} */

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
