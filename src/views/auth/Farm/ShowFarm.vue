<template>
  <div class="showFarm" style="position:relative; height:100%;">
    <router-link to="/farms" style="position:absolute; top: 1%; left:1%; z-index:99999"><h3>&LeftTriangle; Back</h3></router-link>
    <div class="grid">
      <div class="farm-image">        
        <img alt="" width="100%" style="border-radius:10%;" :src="`http://localhost:8000/api/farm/images/${getFarmDetails.farm.farm_imageUrl}`" 
        v-if="getFarmDetails.farm.farm_imageUrl">
      </div>
      <div class="location">              
        <h2>{{ getFarmDetails.farm.farm_name }}</h2>
        <p>{{ getFarmDetails.farm.farm_hectares }} hectares of land</p>
      </div>
      <div class="edit-profile">
        <p>Edit Profile</p>
      </div>
      <div class="address">
        <h5>Address</h5>       
        <p>{{ getFarmDetails.address.farm_address }}</p>
        <div class="d-flex justify-content-between">
          <div>
            <h5>Province:</h5>
            <p>{{ getFarmDetails.address.farm_province }}</p>
          </div>
          <div>
            <h5>City:</h5>
            <p>{{ getFarmDetails.address.farm_city }}</p>
          </div>
          <div>
            <h5>Zipcode:</h5>
            <p>{{ getFarmDetails.address.farm_zipcode }}</p>
          </div>        
        </div>
        <p>Check in Google Maps</p>
      </div>
      <div class="farm-partners d-flex align-items-center justify-content-center" style="position:relative">
        <h2 style="position:absolute; right:2%; top:2%;">+</h2>
        <h3 v-if="getFarmDetails.farm_partners"></h3>
        <h3 v-else>NO FARM PARTNERS</h3>
      </div> 
      <div class="primary-image">
        <img src="https://media.istockphoto.com/vectors/sample-stamp-sample-square-grunge-sign-sample-vector-id1172218730?k=20&m=1172218730&s=612x612&w=0&h=0iTFUtb2WJtRAfg4Lbx7oh2lfVtH5pBsQAMxhCWKZH0="
         alt="" width="100%">
      </div>   
      <div class="second-image">
        <img src="https://media.istockphoto.com/vectors/sample-stamp-sample-square-grunge-sign-sample-vector-id1172218730?k=20&m=1172218730&s=612x612&w=0&h=0iTFUtb2WJtRAfg4Lbx7oh2lfVtH5pBsQAMxhCWKZH0="
         alt="" width="100%">         
      </div>
      <div class="third-image">
        <img src="https://media.istockphoto.com/vectors/sample-stamp-sample-square-grunge-sign-sample-vector-id1172218730?k=20&m=1172218730&s=612x612&w=0&h=0iTFUtb2WJtRAfg4Lbx7oh2lfVtH5pBsQAMxhCWKZH0="
        alt="" width="100%">
      </div>                       
      <div class="farm-produces d-flex align-items-center justify-content-center" style="position:relative">
        <h2 style="position:absolute; right:2%; top:2%;">+</h2>
        <h3 v-if="getFarmDetails.produces"></h3>
        <h3 v-else>NO PRODUCES</h3>
      </div>
      <div class="title-num">
        <h5>Title Number</h5>
        <p>{{ getFarmDetails.farm.farm_titleNum }}</p>
      </div>        
      <div class="farm-owner">
        <h5>Farm Owner</h5>
        <p>{{ getFarmDetails.owner.owner_firstName }} {{ getFarmDetails.owner.owner_lastName }}</p>
      </div>        
    </div>

   
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'ShowFarm',
    created(){    
      this.readyApp()
      .then(() => {
        this.fetchFarm(this.$route.params.id)               
      })         
      
    },
    computed:{
      ...mapGetters(['getFarmDetails'])
    },
    methods:{
      ...mapActions(['readyApp', 'fetchFarm']),      
    }
}
</script>

<style>
.grid{
  width:78%;    
  display:grid;
  gap: 1rem;
  grid-template-columns: repeat(6, 1fr);
  position:absolute;     
  top: 6%;
  left: 10%;
  z-index:9999;  
}


.farm-image{
  grid-column-start: 1;
  grid-column-end: span 1;
}

.location{
  grid-column-start: 2;
  grid-column-start: span 4;
}


.edit-profile :first-child{
  float:right;
}

.address{
  grid-column-start: 2;
  grid-column-end: span 3;  
}

.farm-partners{
  grid-column-start: 5;
  grid-column-end: span 2;
  background:lightgreen;
}

.farm-produces{
  grid-row-start: 2;
  grid-row-end: span 3;
  background:lightgreen;
}

.primary-image{
  background:red;
  grid-column-start:2;
  grid-column-end:span 4;  
  grid-row-end:span 2;
}

.second-image{ 
  grid-column-start:6;   
  grid-row-start:3;    
}
.third-image{
  grid-column-start:6;   
  grid-row-start:4;    
}

.title-num, .farm-owner{
  margin-top:1.5rem
}

.title-num{
  grid-column-start:2;
}

.farm-owner{
  grid-column-start:3;
}

</style>