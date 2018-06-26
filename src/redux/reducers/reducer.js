import {combineReducers, createStore} from 'redux';


const userReducer = (state={}, action) => {
    switch(action.type){
        case "CHANGE_NAME": {
            state = {...state, name: action.payload};
            break;
        }
        case "CHANGE_AGE": {
            state = {...state, age: action.payload};
            break;
        }
    }
    return state;
}

const configReducer = (state={}, action) => {
    switch(action.type){
        case "CHANGE_SETTING": {
            state = {...state, setting: action.payload};
            break;
        }
        case "CHANGE_COUNT": {
            state = {...state, count: action.payload};
            break;
        }
    }
    return state;
}

const reducers = combineReducers({
    user: userReducer,
    config: configReducer,
})

const store = createStore(reducers);

store.subscribe(()=>{
    console.log("store changed: "+JSON.stringify(store.getState()));
});

store.dispatch({type: "CHANGE_NAME", payload: "Chris"});
store.dispatch({type: "CHANGE_AGE", payload: 44});
store.dispatch({type: "CHANGE_COUNT", payload: 2});
store.dispatch({type: "CHANGE_COUNT", payload: 3});
store.dispatch({type: "CHANGE_SETTING", payload: "Mobile"});