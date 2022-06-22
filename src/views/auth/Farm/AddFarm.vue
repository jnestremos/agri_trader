<template>
  <div class="addFarm">
    <div class="container-fluid w-100 d-flex pe-5 align-items-center" style="height:10%;">
        <h3>Add Farm</h3>        
    </div>          
    <div class="container-fluid d-flex" style="height:90%; position:relative; z-index: 999;">
        <div style="width:55%; height:65%;" class="pb-5">
            <form enctype="multipart/form-data" action="POST" class="d-flex flex-column justify-content-between" style="height:100%;" @submit.prevent='sendFarm()'>
                <div class="d-flex justify-content-between align-items-center w-100">
                    <label for="farm_name" class="form-label me-4" style="width:15%;">Farm Name:</label>
                    <input type="text" name="farm_name" id="" class="form-control" v-model="farm.farm_name">
                </div>
                <div class="d-flex justify-content-between align-items-center w-100">
                    <label for="farm_address" class="form-label me-4" style="width:15%;">Farm Address:</label>
                    <input type="address" name="farm_address" id="" class="form-control" v-model="farm.farm_address">
                </div>
                <div class="d-flex justify-content-between align-items-center w-100">
                    <label for="farm_province" class="form-label me-4" style="width:15%;">Farm Province:</label>
                    <input type="text" name="farm_province" id="" class="form-control" v-model="farm.farm_province">
                </div>
                <div class="d-flex justify-content-between align-items-center w-100">
                    <label for="farm_city" class="form-label me-4" style="width:15%;">City:</label>
                    <input type="text" name="farm_city" id="" class="form-control" v-model="farm.farm_city">
                </div>
                <div class="d-flex justify-content-between align-items-center w-100">
                    <label for="farm_titleNum" class="form-label me-4" style="width:15%;">Title #:</label>
                    <input type="text" name="farm_titleNum" id="" class="form-control" v-model="farm.farm_titleNum">
                </div>
                <div class="d-flex justify-content-between align-items-center w-100">
                    <label for="farm_zipcode" class="form-label me-4" style="width:15%;">Zipcode:</label>
                    <input type="text" name="farm_zipcode" id="" class="form-control" v-model="farm.farm_zipcode">
                </div>
                <div class="d-flex justify-content-between align-items-center w-100">
                    <label for="farm_hectares" class="form-label me-4" style="width:15%;">Hectares:</label>
                    <input type="number" name="farm_hectares" id="" class="form-control" v-model="farm.farm_hectares">
                </div>
                <div class="d-flex justify-content-between align-items-center w-100">
                    <label for="farm_imageUrl" class="form-label me-4" style="width:15%;">Select Image:</label>
                    <input type="file" name="farm_imageUrl" id="" class="form-control" @change="setImageUrl($event)">                    
                </div>
                <div class="d-flex justify-content-between align-items-center" style="width:50%;" id="isExisting">
                    <label for="" class="form-label me-4">Is he/she an existing owner?</label>
                    <button style="width:100px;" class="btn btn-primary" @click.prevent="hideOption()">YES</button>
                    <router-link to="/farms/owners/add"><button style="width:100px;" class="btn btn-secondary">NO</button></router-link>
                </div>                
                <div class="d-none" id="showExisting">                   
                    <label for="owner_id" class="form-label me-4" style="width:15%;">Select Farm Owner:</label>
                    <select name="owner_id" id="ownerSelect" class="form-select" @change="setOwner($event)">
                        <option :value="owner.id" v-for="owner in getOwners" :key="owner.id">{{ owner.owner_firstName }} {{ owner.owner_lastName }}</option>
                    </select>
                </div>
                <div id="errors" v-if="errors">
                    {{errors}}
                </div>
                <input type="submit" v-if="farm.owner_id" value="Add Farm" class="btn btn-primary" style="position: absolute; bottom:5%; right:5%;">               
            </form>
        </div>
        <div style="width:45%;" class="d-flex justify-content-center align-items-start">
            <div style="width:90%; height:50%; background-color: grey;" id="coverBg" class="d-flex justify-content-center align-items-center">
                <h3 v-if="!previewUrl">NO IMAGE</h3>
                <img :src="previewUrl" alt="" width="100%" style="object-fit: cover;" v-else>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
var formData = new FormData()
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'AddFarm',
    data(){
        return {          
            farm:{
                owner_id: '',
                farm_hectares: '',
                farm_titleNum: '',
                farm_name: '',
                farm_imageUrl: '',
                farm_province: '',
                farm_address: '',
                farm_city: '',
                farm_zipcode: '',
            },
            previewUrl: '',
            errors: null
        }
    },
    created(){  
        this.readyApp()      
        this.fetchAllOwners()    
        .then(() => {
            if(this.getOwners.length > 10){
                var ownerSelect = document.getElementById('ownerSelect')
                var multiple = document.createAttribute('multiple')
                ownerSelect.setAttributeNode(multiple)       
                ownerSelect.setAttribute('size', '2')
            }                  
        })    
               
    },
    computed:{
        ...mapGetters(['getOwners'])
    },
    methods: {     
        ...mapActions(['fetchAllOwners', 'addFarm', 'readyApp']),
        hideOption(){
            var isExisting = document.getElementById('isExisting')
            isExisting.className = 'd-none'
            var showExisting = document.getElementById('showExisting')
            showExisting.className = 'd-flex justify-content-between align-items-center w-100'
            this.farm.owner_id = this.getOwners[0].id
        },
        setImageUrl(e){            
            const file = e.target.files[0]                                            
            var coverBg = document.getElementById('coverBg')
            if(file){                                      
                formData.append('farm_imageUrl', file, file.name)                     
                coverBg.style.backgroundColor = ''
                this.previewUrl = URL.createObjectURL(file)                      
            }
            else{ 
                this.farm_imageUrl = null  
                coverBg.style.backgroundColor = 'grey'              
                this.previewUrl = null
            }            
        },
        setOwner(e){
            this.farm.owner_id = e.target.value
        },
        sendFarm(){
            formData.append('owner_id', this.farm.owner_id)
            formData.append('farm_hectares', this.farm.farm_hectares)
            formData.append('farm_zipcode', this.farm.farm_zipcode)
            formData.append('farm_titleNum', this.farm.farm_titleNum)
            formData.append('farm_name', this.farm.farm_name)
            formData.append('farm_province', this.farm.farm_province)
            formData.append('farm_address', this.farm.farm_address)
            formData.append('farm_city', this.farm.farm_city)
            this.addFarm(formData)
            .then(() => {
                this.$router.push({name: 'Farms'})
            })
            .catch((err) => {
                console.log(err)
                this.errors = err.response.data.errors
            })
        }
    }
}
</script>

<style>

</style>