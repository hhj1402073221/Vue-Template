const mutation = {
    increment: (state) => {
        state.count++
    },
    decrement: (state) => {
        state.count--
    },
    changTxt: (state, v) => {
        state.show = v
    },
    // user方法逻辑
    getUserList: (state, user) => {
        state.user = user
    },
    addUser: (state, user) =>{
        state.user.push(user);
    },
    updateUser: (state, user) =>{
        var index = state.user.findIndex((item) => {
            if(item.id == user.id){
              return true;
            }
        });
        return state.user[index] = {
            id: user.id,
            name: user.name,
            address: user.address,
            date: user.date
        }
    },
    deleteUser: (state, id) => {
        state.user.some((item, i) => {
            if (item.id == id) {
                state.user.splice(i, 1);
                return true;
            }
        });
    }
}

export default mutation;