import { SET_CONTRACTS } from "../actions";

export const contractsReducer = (state = {}, action) => {
    console.log(action.payload)
    switch (action.type) {
        case SET_CONTRACTS:
            return {
                ...state,
                contracts: action.payload
            }

        default:
            return state
    }
}