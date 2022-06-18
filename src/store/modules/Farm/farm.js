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
        farm: null,
        owner: null,
        produces: null
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
    }
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
        state.farm_details.farm = data.farm
        state.farm_details.owner = data.owner
        state.farm_details.produces = data.produces
    }
};





export default {
    state,
    getters,
    actions,
    mutations
}