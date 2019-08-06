const mutation = {
    increment: (state) => {
        state.count++
    },
    decrement: (state) => {
        state.count--
    },
    changTxt: (state, v) => {
        state.show = v
    }
}

export default mutation;