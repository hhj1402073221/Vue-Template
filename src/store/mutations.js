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
    getUserList: (state, user) => {
        state.user = user
    }
}

export default mutation;