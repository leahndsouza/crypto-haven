import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: null
};

const setCryptoData = (state, action) => {
    console.log('success', action.cryptoStats);
    let updatedObject = {
        data: action.cryptoStats
    }

    return {...state, ...updatedObject}; 
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CRYPTO_STATS: return setCryptoData(state,action);
        default:
            return state;
    }
}

export default reducer;