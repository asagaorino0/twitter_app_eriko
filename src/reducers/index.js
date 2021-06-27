import { USER_LINE } from '../actions/index'

const reducer = (state, action) => {
    switch (action.type) {
        case USER_LINE:
            console.log(action.nName)
            return { nName: action.nName, name: action.name, avatar: action.avatar }

        default:
            return state
    }
}

export default reducer