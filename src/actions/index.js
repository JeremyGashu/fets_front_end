export const SET_CONTRACTS = 'SET_CONTRACTS'
export const SAVE_ADDRESS = 'SAVE_ADDRESS'

export const setContractsActionCreator = (contracts) => {
    return {
        type: SET_CONTRACTS,
        payload: contracts
    }
}

export const saveContractAddress = (address) => {
    return {
        type: SAVE_ADDRESS,
        payload: address
    }
}