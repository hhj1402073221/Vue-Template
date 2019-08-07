let axios = require('axios')

export const getUserAction = function(context){
    axios.get('/user')
    .then(function (response) {
        console.log('调用action的方法');
        context.commit('getUserList', response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
}