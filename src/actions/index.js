export const SET_CONTRACTS = 'SET_CONTRACTS'
export const setContractsActionCreator = (contracts) => {
    return {
        type: SET_CONTRACTS,
        payload: contracts
    }
}