<template>
  <div class="addFarmOwner">
    <div class="container-fluid w-100 d-flex pe-5 align-items-center" style="height:10%;">
        <h3>Add Farm Owner</h3>        
    </div>
    <div v-if="errors">
        <div v-for="(error, index) in errors" :key="index">
        {{error[0]}}
        </div>    
    </div>       
    <div class="container-fluid w-100" style="height:90%;">    
        <div style="width:100%; height:100%;" class="pb-5">
            <form action="" class="d-flex flex-column justify-content-between" style="height:100%; position:relative; z-index: 999;" @submit.prevent="sendOwner()">
                <div class="d-flex align-items-center w-100">
                    <label for="firstName" class="form-label me-4" style="width:5%;">First Name:</label>
                    <input type="text" name="firstName" style="width:30%;" class="form-control" v-model="owner.firstName">
                </div>
                <div class="d-flex align-items-center w-100">
                    <label for="lastName" class="form-label me-4" style="width:5%;">Last Name:</label>
                    <input type="text" name="lastName" style="width:30%;" class="form-control" v-model="owner.lastName">
                </div>
                <div class="d-flex align-items-center w-100">
                    <label for="province" class="form-label me-4" style="width:5%;">Province:</label>
                    <input type="text" name="province" style="width:30%;" class="form-control" v-model="owner.province">
                </div>
                <div class="d-flex align-items-center w-100">
                    <label for="contactNum" class="form-label me-4" style="width:5%;">Contact Number:</label>
                    <input type="tel" name="contactNum" style="width:30%;" class="form-control me-2" v-model="owner.contactNum">
                    <font-awesome-icon icon="fa-solid fa-circle-plus" id="plus-icon" style="font-size:20px;" @click="triggerModal()"/>
                </div>
                <b-modal id="modal-2" title="Contact Number">
                    <h5 class="mb-4">Please add up to 2 more contact numbers</h5>
                    <label for="contactNum2" class="form-label">Contact Number #2</label>
                    <input type="tel" name="contactNum2" id="contactNum2" class="form-control mb-5" v-model="owner.contactNum2">
                    <label for="contactNum3" class="form-label">Contact Number #3</label>
                    <input type="tel" name="contactNum3" id="contactNum3" class="form-control" v-model="owner.contactNum3">
                </b-modal>  
                <div class="d-flex align-items-center w-100">
                    <label for="email" class="form-label me-4" style="width:5%;">Email:</label>
                    <input type="email" name="email" style="width:30%;" class="form-control" v-model="owner.email">
                </div>
                <div class="d-flex align-items-center w-100">
                    <label for="zipcode" class="form-label me-4" style="width:5%;">Zipcode:</label>
                    <input type="text" name="zipcode" style="width:30%;" class="form-control" v-model="owner.zipcode">
                </div>
                <div class="d-flex align-items-center w-100">
                    <label for="birthDate" class="form-label me-4" style="width:5%;">Birthdate:</label>
                    <input type="date" name="birthDate" style="width:30%;" class="form-control" v-model="owner.birthDate">
                </div>
                <div class="d-flex align-items-center w-100">
                    <label for="address" class="form-label me-4" style="width:5%;">Address:</label>
                    <input type="address" name="address" style="width:30%;" class="form-control" v-model="owner.address">
                </div>
                <div class="d-flex align-items-center w-100" style="width:50%;">
                    <label for="password" class="form-label me-4" style="width:5%;">Password:</label>
                    <input type="password" name="password" style="width:30%;" class="form-control" v-model="owner.password">
                </div>                
                <div class="d-flex align-items-center w-100" style="width:50%;">
                    <label for="password_confirmation" class="form-label me-4" style="width:5%;">Confirm Password:</label>
                    <input type="password" name="password_confirmation" style="width:30%;" class="form-control" v-model="owner.password_confirmation">
                </div>                                               
                <div class="d-flex align-items-center w-100" style="width:50%;">                   
                    <label for="gender" class="form-label me-4" style="width:5%;">Gender:</label>
                    <select name="gender" class="form-select" style="width:30%;" @change="setGender($event)">
                        <option value="M" selected>Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>
                <input type="submit" value="Add Owner" class="btn btn-primary" style="position:absolute; right:2%; bottom:0%;">
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: "AddFarmOwner",
    data(){
        return {
        owner: {
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
            role: 3,
            birthDate: '',
            password_confirmation: ''
        },
        errors: null  
        }
    },
    created(){
        this.readyApp()
    },
    mounted(){
        this.$root.$on('bv::modal::hide', (bvEvent) => {      
        if(bvEvent.trigger == 'cancel'){        
            this.owner.contactNum2 = ''
            this.owner.contactNum3 = ''
            }                 
        }) 
    },
    methods:{
        ...mapActions(['registerOwner', 'readyApp']),
        triggerModal(){
            this.$bvModal.show('modal-2')
        },
        setGender(e){
            this.owner.gender = e.target.value
        },
        sendOwner(){
            this.registerOwner(this.owner)
            .then(() => {
                this.$router.push({name: 'AddFarm'})
            })
            .catch((err) => {
                console.log(err)
                this.errors = err.response.data.errors
            })
        }
    },
    
    
}
</script>

<style>

</style>