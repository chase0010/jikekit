import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as types from '../constants/ActionTypes';

const initialState = {
  isWorking: false,
  error: null,
  userId: '',
  posts: [],
  activeNode:{}
};

function nodeReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER_ID:
      return Object.assign({}, state, {
        userId: action.userId
      });

    case types.ADD_NODE_REQUEST:
    return Object.assign({}, state, {
      isWorking: true,
      error: null
    });
    case types.ADD_NODE_SUCCESS:
    let nodeArray = state[action.nodeModel];
    if (nodeArray.findIndex(nodeObj => nodeObj.id === action.nodeObj.id) === -1) {
        nodeArray = [action.nodeObj, ...state[action.nodeModel]];
      }
    return Object.assign({}, state, {
      isWorking: false,
      error: null,
      [action.nodeModel]: nodeArray
    });

    case types.GET_NODES_REQUEST:
    return Object.assign({}, state, {
      isWorking: true,
      error: null
    });
    case types.GET_NODES_SUCCESS:
    return Object.assign({}, state, {
      isWorking: false,
      error: null,
      [action.nodeModel]: action.nodeArray
    });

    case types.GET_ACTIVE_NODE_REQUEST:
    return Object.assign({}, state, {
      isWorking: true,
      error: null
    });
    case types.GET_ACTIVE_NODE_SUCCESS:
    return Object.assign({}, state, {
      isWorking: false,
      error: null,
      activeNode: action.nodeObj
    });

    case types.DELETE_NODE_REQUEST:
    return Object.assign({}, state, {
      isWorking: true,
      error: null
    });

    case types.DELETE_NODE_SUCCESS:
    return Object.assign({}, state, {
      isWorking: false,
      error: null,
      [action.nodeModel]: state[action.nodeModel].filter(node =>
        node.id !== action.nodeObj.id)
    });

    case types.UPDATE_NODE_REQUEST:
    return Object.assign({}, state, {
      isWorking: true,
      error: null
    });

    case types.UPDATE_NODE_SUCCESS:
    return Object.assign({}, state, {
      isWorking: false,
      error: null,
      [action.nodeModel]: state[action.nodeModel].map(node =>
        node.id === action.nodeObj.id ?
        action.nodeObj :
        node
        )
    });

    case types.ADD_NODE_FAILURE: 
    case types.GET_ACTIVE_NODE_FAILURE: 
    case types.GET_NODES_FAILURE:
    case types.DELETE_NODE_FAILURE:
    case types.UPDATE_NODE_FAILURE:
    return Object.assign({}, state, {
      isWorking: false,
      error: action.error,
    }); 

    default:
    return state;
  }
};

const rootReducer = combineReducers({
  node: nodeReducer,
  form: formReducer
});

export default rootReducer;