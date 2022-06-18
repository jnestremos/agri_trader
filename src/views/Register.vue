<template>
  <div class="register vw-100 vh-100" style="background-color:green; position:relative;">
  <div v-if="errors">
    <div v-for="(error, index) in errors" :key="index">
      {{error[0]}}
    </div>    
  </div>
    <div class="container-fluid">
      <router-link to="/login/distributor" v-if="$route.name == 'RegisterDistributor'"><h3>&LeftTriangle; Back</h3></router-link>
      <router-link to="/login/trader" v-else><h3>&LeftTriangle; Back</h3></router-link>
      <h2 class="d-flex justify-content-end" v-if="$route.name == 'RegisterTrader'">Sign-up As Trader</h2>    
      <h2 class="d-flex justify-content-end" v-else>Sign-up As Distributor</h2>    
      <div class="container-fluid float-left" style="width:60%;">
        <form action="" @submit.prevent="registerAcc()">          
          <div class="row mt-4">
            <div class="col-4">
              <label for="firstName" class="form-label">FIRST NAME</label>
            </div>
            <div class="col-4">
              <label for="lastName" class="form-label">LAST NAME</label>              
            </div>      
          </div>
          <div class="row mb-5">
            <div class="col-4">
              <input type="text" name="firstName" class="form-control" v-model="user.firstName">
            </div>
            <div class="col-4">
              <input type="text" name="lastName"  class="form-control" v-model="user.lastName">
            </div>            
          </div>  
          <div class="row mb-3">
            <div class="col-4">
              <h4>Address</h4>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <label for="province" class="form-label">PROVINCE</label>
            </div>
            <div class="col-4">
              <label for="address" class="form-label">ADDRESS</label>              
            </div>      
            <div class="col-4">
              <label for="zipcode" class="form-label">ZIPCODE</label>              
            </div>      
          </div>
          <div class="row mb-5">
            <div class="col-4">
              <input type="text" name="province" class="form-control" v-model="user.province">
            </div>
            <div class="col-4">
              <input type="address" name="address"  class="form-control" v-model="user.address">
            </div>            
            <div class="col-4">
              <input type="text" name="zipcode"  class="form-control" v-model="user.zipcode">
            </div>            
          </div>
          
          
          <div class="row">
            <div class="col-4">
              <label for="contactNum" class="form-label">CONTACT NUMBER</label>              
            </div>        
            <div class="col-4">
              <label for="gender" class="form-label">GENDER</label>              
            </div>        
            <div class="col-4">
              <label for="birthDate" class="form-label">DATE OF BIRTH</label>              
            </div>        
          </div>
          <div class="row mb-4">
            <div class="col-4 d-flex align-items-center">              
              <input type="tel" name="contactNum" class="me-2 form-control" v-model="user.contactNum">
              <font-awesome-icon icon="fa-solid fa-circle-plus" id="plus-icon" style="font-size:20px;" @click="triggerModal()"/>
            </div>   
            <b-modal id="modal-1" title="Contact Number">
              <h5 class="mb-4">Please add up to 2 more contact numbers</h5>
              <label for="contactNum2" class="form-label">Contact Number #2</label>
              <input type="tel" name="contactNum2" id="contactNum2" class="form-control mb-5" v-model="user.contactNum2">
              <label for="contactNum3" class="form-label">Contact Number #3</label>
              <input type="tel" name="contactNum3" id="contactNum3" class="form-control" v-model="user.contactNum3">
            </b-modal>         
            <div class="col-4">
              <select name="gender"  class="form-select" v-model="user.gender">
                <option value="M" selected>Male</option>
                <option value="F">Female</option>
              </select>
            </div> 
            <div class="col-4">
              <input type="date" name="birthDate"  class="form-control" v-model="user.birthDate">
            </div>            
          </div>
          
          
          <div class="row">               
            <div class="col-4">
              <label for="password" class="form-label">PASSWORD</label>
            </div>        
            <div class="col-4">
              <label for="password_confirmation" class="form-label">CONFIRM PASSWORD</label>
            </div>        
          </div>
          <div class="row mb-4">                       
            <div class="col-4">
              <input type="password" name="password" class="form-control" v-model="user.password">
            </div>            
            <div class="col-4">
              <input type="password" name="password_confirmation" class="form-control" v-model="user.password_confirmation">
            </div>            
          </div>
          
          
          <div class="row">
            <div class="col-4">
              <label for="email" class="form-label">EMAIL</label>
            </div>                                            
          </div>
          <div class="row mb-4">                     
            <div class="col-4">
              <input type="email" name="email" class="form-control" v-model="user.email">
            </div>                                 
          </div>
          <input type="submit" value="CREATE ACCOUNT" class="position-absolute" 
          style="bottom:5%; right:5%; background-color:white; width:300px; color:green; 
          font-weight:bold; height:50px; border-color:transparent;">
        </form>
      </div>         
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data(){
    return {
      user: {
        firstName: '',
        lastName: '',
        gender: 'M',
        province: '',
        address: '',
        zipcode: '',
        contactNum: '',
        contactNum2: '',
        contactNum3: '',       
        password: '',        
        email: '',
        role: '',
        birthDate: '',
        password_confirmation: ''
      },
      errors: null  
    }
  },  
  mounted() {  
    if(this.$route.name == "RegisterDistributor"){
      this.user.role = 2
    }
    else{
      this.user.role = 1
    }  
    this.$root.$on('bv::modal::hide', (bvEvent) => {      
      if(bvEvent.trigger == 'cancel'){        
        this.user.contactNum2 = ''
        this.user.contactNum3 = ''
      }                 
    })
  }, 
  methods:{
    ...mapActions(['register']),
    triggerModal(){
      this.$bvModal.show('modal-1');   
    },    
    registerAcc(){     
      this.register(this.user)
      .then(() => {
        if(this.$router.currentRoute.name == 'RegisterTrader'){ 
          this.$router.push({name: 'Dashboard'})
        } 
        else{          
          this.$router.push({name: 'ErrorPage'})
        }                                                 
      })
      .catch((err) => {
        console.log(err)
        this.errors = err.response.data.errors
        // if(this.$router.currentRoute.path == "/register/distributor"){
        //   this.$router.push({name: 'RegisterDistributor'})
        // }
        // else{
        //   this.$router.push({name: 'RegisterTrader'})
        // }
      })
    }
  }
  
}
</script>
 
<style scoped>
#plus-icon:hover{
  cursor: pointer;
}
</style>
