import { SAVE_ADDRESS, SET_CONTRACTS } from "../actions";

export const contractsReducer = (state = {}, action) => {
    console.log(action.payload)
    switch (action.type) {
        case SET_CONTRACTS:
            return {
                ...state,
                ...action.payload
            }

        case SAVE_ADDRESS:
            return {
                ...state,
                address: action.payload
            }

        default:
            return state
    }
}