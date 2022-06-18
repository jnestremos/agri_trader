<template>
  <div class="showFarm">
    this is the show farm page # {{ $route.params.id }}
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'ShowFarm',
    created(){
      this.readyApp()
    },
    methods:{
      ...mapActions(['readyApp'])
    }
}
</script>

<style>

</style>