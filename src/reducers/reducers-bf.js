import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as types from '../constants/ActionTypes';

const initialState = {
  isWorking: false,
  error: null,
  userId: '',
  nodes: {
    posts:[],
    goods:[{title:'商品a',price:98}]
  },
  activeNode:{}
};

function nodeReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER_ID:
      return Object.assign({}, state, {
        userId: action.userId
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
      nodes: action.nodeObj
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

    case types.ADD_NODE_REQUEST:
    return Object.assign({}, state, {
      isWorking: true,
      error: null
    });
    case types.ADD_NODE_SUCCESS:

    console.log("Action", action);
    return Object.assign({}, state, {
      isWorking: false,
      error: null,
      nodes: Object.assign({}, state.nodes, {
        [action.nodeModel]: [action.nodeObj, ...state.nodes[action.nodeModel]]
      })
      
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
      nodes: state.nodes.filter(node =>
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
      nodes: state.nodes.map(node =>
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
  nodeState: nodeReducer,
  formState: formReducer
});

export default rootReducer;