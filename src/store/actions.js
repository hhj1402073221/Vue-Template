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

export const addUserAction = function(context, user){
    axios.post('/user',user)
    .then(function (response) {
        console.log(response, '新增之后的返回值');
        // context.commit('addUser', response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const updateUserAction = function(context, user){
    axios.put('/user/'+ user.id, user)
    .then(function (response) {
        console.log(response, '修改之后的返回值');
        // context.commit('updateUser', user);
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const deleteUserAction = function(context, id){
    axios.delete('/user/'+ id)
    .then(function (response) {
        console.log('调用action的方法');
        console.log(response, '删除之后的返回值');
        // context.commit('deleteUser', id);
    })
    .catch(function (error) {
        console.log(error);
    });
}