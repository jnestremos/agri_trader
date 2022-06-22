// import store from '../..';
import axiosClient from '../../../axios'


const state = {
    farm_data: {
        farms: [],
        current_page: null,
        first_page_url: null,
        last_page: null,
        last_page_url: null,
        next_page_url: null,
        per_page: null,
        prev_page_url: null,
        total: null,
        links: null        
    },
    farm_produces: [],
    owners: [],       
    farm_details: {
        farm: {
            farm_hectares: null,
            farm_imageUrl: null,
            farm_name: null,
            farm_titleNum: null,
        },        
        owner: {
            owner_firstName: null,
            owner_lastName: null
        },
        produces: null,
        address: {
            farm_address: null,
            farm_city: null,
            farm_province: null,
            farm_zipcode: null,
        },
        farm_partners: null
    }
};


const getters = {
    getFarms(){
        return state.farm_data.farms
    },
    getOwners(){
        return state.owners
    },
    getFarmData(){
        return state.farm_data
    },
    getFarmDetails(){
        return state.farm_details
    }
};


const actions = {
    fetchAllFarms({ commit }, query = null){
        if(query){
            return axiosClient.get('/farm?'+query)
            .then((res) => {                
                console.log(res.data);            
                commit('setFarms', res.data)                                  
            })
            .catch((err) => {
                console.log(err)
            })
        }
        else{            
            return axiosClient.get('/farm')
            .then((res) => {               
                //console.log(res.data);            
                commit('setFarms', res.data)                                               
            })
            .catch((err) => {
                console.log(err)
            })
        }
        
    },
    registerOwner({ commit }, owner){        
        var contactNumArr = [owner.contactNum, owner.contactNum2, owner.contactNum3];
        contactNumArr = contactNumArr.filter((num) => {
            return num !== ''
        })
        delete owner['contactNum2']
        delete owner['contactNum3']
        owner.contactNum = contactNumArr
        return axiosClient.post('/farm/owner/add', owner)
        .then((res) => {
            console.log(res.data);    
            commit('asd')        
        })        
    },
    fetchAllOwners({ commit }){
        return axiosClient.get('/farm/owners')
        .then((res) => {           
            console.log(res.data);
            commit('setOwners', res.data)                   
        })
        .catch((err) => {
            console.log(err)
        })
    },
    addFarm({ commit }, farm){                     
        return axiosClient.post('/farm/add', farm, {
            headers: {
                'Content-type' : 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res.data);
            commit('asd')
        })
    },
    fetchFarm({ commit }, id){
        return axiosClient.get(`/farm/details/${id}`)
        .then((res) => {
            console.log(res.data)
            commit('setFarm', res.data)
        })
    },    
};


const mutations = {
    setFarms: (state, data) => {
        if(data.farms.data){
            state.farm_data.farms = data.farms.data
            state.farm_data.current_page = data.farms.current_page
            state.farm_data.first_page_url = data.farms.first_page_url
            state.farm_data.last_page = data.farms.last_page
            state.farm_data.last_page_url = data.farms.last_page_url
            state.farm_data.next_page_url = data.farms.next_page_url
            state.farm_data.per_page = data.farms.per_page
            state.farm_data.prev_page_url = data.farms.prev_page_url
            state.farm_data.total = data.farms.total                        
            state.farm_data.links = data.farms.links
            state.farm_data.links.splice(0, 1)
            state.farm_data.links.splice(state.farm_data.links.length - 1, 1)            
        }
        else{
            state.farm_data.farms = data.farms
        }        
        state.farm_produces = data.farm_produces          
        
    },
    setOwners: (state, data) => {
        state.owners = data.owners
    },
    asd: () => {
        console.log(1)
    },
    setFarm: (state, data) => {
        state.farm_details.farm.farm_hectares = data.farm.farm_hectares
        state.farm_details.farm.farm_imageUrl = data.farm.farm_imageUrl
        state.farm_details.farm.farm_name = data.farm.farm_name
        state.farm_details.farm.farm_titleNum = data.farm.farm_titleNum
        state.farm_details.owner.owner_firstName = data.owner.owner_firstName
        state.farm_details.owner.owner_lastName = data.owner.owner_lastName
        if(data.produces.length > 0){
            state.farm_details.produces = data.produces
        }
        state.farm_details.address.farm_address = data.farm_address.farm_address
        state.farm_details.address.farm_zipcode = data.farm_address.farm_zipcode
        state.farm_details.address.farm_city = data.farm_address.farm_city
        state.farm_details.address.farm_province = data.farm_address.farm_province
        if(data.farm_partners.length > 0){
            state.farm_details.farm_partners = data.farm_partners
        }
        
    },    
};





export default {
    state,
    getters,
    actions,
    mutations
}