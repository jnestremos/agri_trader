<template>
  <div class="allFarms">    
    <div class="container-fluid w-100 d-flex pe-5 justify-content-between align-items-center" style="height:10%;">
        <h3>Farms and Owners</h3>
        <div class="d-flex justify-content-between align-items-center" style="width:200px;">
            <button class="btn btn-success" style="width:60px;" @click="toAddFarm()">Add</button>
            <button>Edit</button>
            <button>Search</button>
        </div>
    </div>
    <div class="container-fluid w-100 d-flex flex-wrap" style="height:90%; position: relative;">
        <div class="w-100" v-if="getFarms.length > 0">            
            <div class="row mb-5 justify-content-center" v-for="(farm, index) in filtered" :key="index">                     
                <div class="col-4" style="height:30vh" v-for="(f, i) in farm" :key="i">                
                    <div class="d-flex farm" style="height:100%; border-radius:50px; position: relative;" @click="showFarm(f.id)">
                        <div class="" style="position: absolute; top:5%; left:5%; 
                        width:85%;">
                            <div class="d-flex mb-4">
                                <font-awesome-icon icon="fa-brands fa-pagelines" style="font-size:40px;" class="me-3"/>
                                <h3 class="mb-4">{{ f.farm_name }}</h3>
                            </div>                                                                                
                            <h4 class="d-flex">Owner: <p class="ms-3">{{ getOwner(f.farm_owner_id) }}</p></h4>
                            <h4 class="d-flex">Produces Owned: <p class="ms-3">{{ getProduces(f.id) }}</p></h4>
                        </div>                                                
                    </div>
                </div>                
            </div>            
        </div>
        <div class="" style="top:42%; left:42%; position: absolute" v-else>
           <h2 class="text-black">No Farms Added!</h2>
        </div>  
        <!-- <pre>{{getFarmData}}</pre>         -->
        <div class="" style="position:absolute; right:5%; bottom:5%" v-if="getFarmData.total > 6">
            <p class="text-center">Page {{ getFarmData.current_page }} out of {{ getFarmData.last_page }}</p>
            <ul class="pagination" id="pagination">
                <li :class="[getFarmData.current_page != 1 ? 'page-item ' : 'page-item disabled']"><a class="page-link" @click="showPrevious()">Previous</a></li>
                <li :class="[getFarmData.current_page == page.label ? 'page-item active' : 'page-item']" v-for="(page,index) in getFarmData.links" :key="index" @click="showPage(page.label)">
                    <a class="page-link">{{page.label}}</a>
                </li>                
                <li :class="[getFarmData.current_page != getFarmData.last_page ?'page-item ' : 'page-item disabled']" @click="showNext()"><a class="page-link">Next</a></li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import farm from '../../../store/modules/Farm/farm'

export default {
    name: "allFarms",
    created(){
        this.readyApp()                       
        this.fetchAllFarms()
        .then(() => {
            //this.loading = true                           
            if(this.getFarmData.current_page){ 
                var query = `page=${this.getFarmData.current_page}`               
                this.fetchAllFarms(query)                
            }
            this.filtered = this.filteredFarmArray()   
                     
        })
        this.fetchAllOwners()        
    },   
    data(){
        return {
            filtered: null,                       
        }
    },
    computed: {
        ...mapGetters(['getOwners', 'getFarms', 'getFarmData']),
        getPages(){
            var pages = []
            for(var i = 1; i <= this.getFarmData.last_page; i++){
                if(i >= this.getFarmData.current_page){
                    pages.push(i)
                }
            }
            return pages
        },                                      
    },   
    methods:{
        ...mapActions(['fetchAllFarms', 'fetchAllOwners', 'readyApp', 'fetchFarm']),
        toAddFarm(){                        
            if(this.getOwners.length == 0){
                this.$router.push({name: 'AddFarmOwner'})                
            } 
            else{
                this.$router.push({name: 'AddFarm'})
            }                  
        },
        filteredFarmArray(){
            var filtered = [];
            var arr = this.getFarms;             
            var arr1 = arr.slice(0,3)
            var arr2 = arr.slice(3,arr.length)

            filtered.push(arr1)
            if(arr2.length > 0){
                filtered.push(arr2)
            }            
            return filtered
        },
        showFarm(id){
            this.fetchFarm(id)
            .then(() => {
                this.$router.push({path : `/farm/${id}`})
            })
            .catch((err) => {
                console.log(err)
            })
        },
        getProduces(id){
            if(this.$store.state.loading){
                var produces =  farm.state.farm_produces.filter((farm_produce) => {
                    return farm_produce.farm_id === id
                })
                if(produces.length > 0){
                    var value = ''
                    if(produces.length <= 3){                        
                        for(var i = 0; i < produces.length; i++){
                            if(i == produces.length - 1){
                                value += produces[i]
                            }
                            else{
                                value += produces[i] + ','
                            }
                        }
                        return value
                    }
                    else{
                        return produces[0] + ',' + produces[1] + ',' + produces[2] + '...'
                    }
                }
                else{
                    return 'None'
                }
            }          
        },
        getOwner(id){
            if(this.$store.state.loading){
                var owners = farm.state.owners.filter((owner) => {
                    return owner.id === id
                })            
                owners = owners[0].owner_firstName + ' ' + owners[0].owner_lastName               
            }
            return owners                        
        },                
        showPrevious(){
            var query = this.getFarmData.prev_page_url.split('?')[1]
            this.fetchAllFarms(query)
            .then(() => {
                this.filtered = this.filteredFarmArray()   
            })
            
        },
        showNext(){
            var query = this.getFarmData.next_page_url.split('?')[1]
            this.fetchAllFarms(query)
            .then(() => {
                this.filtered = this.filteredFarmArray()   
            })  
        },
        showPage(page){
            var query = `page=${page}`
            this.fetchAllFarms(query)
            .then(() => {
                this.filtered = this.filteredFarmArray()   
            })
        }        
    },      
}
</script>

<style>

.farm{
    background-color:greenyellow;
}

.farm:hover{
    transition: 0.5s;
    background-color:grey;
    cursor:pointer;
}

.page-item a{
    cursor:pointer;
}

</style>