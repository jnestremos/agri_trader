<template>
  <div id="dashboard" class="vh-100 px-5 py-5 d-flex flex-column justify-content-between" style="width:92vw;">
    <div>
      <h3>Welcome!</h3>
      <h2 class="mb-5">Joshua Estremos</h2>
    </div>
    <div class="mb-5">      
      <div class="container-fluid">
      <div class="row">
        <div class="col-4">
          <div style="height:300px; background-color:yellow; border-radius:20px;">

          </div>
        </div>
        <div class="col-4">
          <div style="height:300px; background-color:blue; border-radius:20px;">

          </div>
        </div>
        <div class="col-4">
          <div style="height:300px; background-color:orange; border-radius:20px;">

          </div>
        </div>
      </div>
    </div>
    </div>     
    
    <div>
      <h3>Expenses</h3>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div style="height:350px; background-color:grey; border-radius:20px;">

            </div>
          </div>
        </div>
      </div> 
    </div>    
  </div>
</template>

<script>
//import { mapGetters } from 'vuex'
export default {
    name: 'Dashboard',      
    // computed: {
    //     ...mapGetters(['getToken'])
    // },
    
}
</script>

<style>

</style>