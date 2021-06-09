import { NAME_GOOGLE, RESET_GOOGLE, USER_PRO } from '../actions/index'

const reducer = (state, action) => {
    switch (action.type) {
        case NAME_GOOGLE:
            return { name: action.name, avater: action.avater };
        case USER_PRO:
            console.log(action.name)
            return { name: action.name, avater: action.avater, avaterUrl: action.avaterUrl }

        case RESET_GOOGLE:
            return { avater: action.avater = '0' };

        default:
            return state
    }
}

export default reducer