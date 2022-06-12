import axiosClient from '../../../axios'


const state = {
    user : {
        api_token : sessionStorage.getItem('api_token')
    },    
};

const getters = {};

const actions = {  
    register({ commit }, user){
        var contactNumArr = [user.contactNum, user.contactNum2, user.contactNum3];
        contactNumArr = contactNumArr.filter((num) => {
            return num !== ''
        })
        delete user['contactNum2']
        delete user['contactNum3']
        user.contactNum = contactNumArr
        return axiosClient.post('/register',user)
        .then((res)=>{
            commit('setToken', res.data)
            console.log(res.data);                                     
        })        
    },
    logout({ commit }){
        return axiosClient.post('/logout')
        .then((res)=>{            
            console.log(res.data);               
            commit('logoutUser');                                  
        })
        .catch((err)=>{           
            console.log(err)                          
        })
    },
    login({ commit }, data){
        return axiosClient.post('/login', data)
        .then((res)=>{            
            console.log(res.data);               
            commit('setToken', res.data);            
        })        
    },    
};

const mutations = {
    setToken: (state, data) => {
        state.user.api_token = data.token
        sessionStorage.setItem('api_token', data.token)        
    },
    logoutUser: () => {
        state.user.api_token = null
        sessionStorage.clear()
    }     
};


export default {
    state,
    getters,
    actions,
    mutations
}
