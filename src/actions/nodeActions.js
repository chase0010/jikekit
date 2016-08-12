import * as types from '../constants/ActionTypes';
import request from 'superagent';


const serverApiUrl = '';
const nodeApiUrl = `${serverApiUrl}/api/node`;

export function setUserId(userId) {
  return {
    type: types.SET_USER_ID,
    userId
  };
}

export function addNode(nodeModel, nodeObj) {
  return dispatch => {
   dispatch(addNodeRequest());
   return request
   .post(nodeApiUrl + '/' + nodeModel)
   .send(nodeObj)
   .set('Accept', 'application/json')
   .end((err, res) => {
    if (err) {
      dispatch(addNodeFailure(err));
    } else {
      dispatch(addNodeSuccess(nodeModel, res.body));
    }
  });

 };
};
export function addNodeRequest() {
  return {
    type: types.ADD_NODE_REQUEST
  };
};
export function addNodeSuccess(nodeModel, nodeObj) {
  return {
    type: types.ADD_NODE_SUCCESS,
    nodeModel,
    nodeObj
  };
};
export function addNodeFailure(error) {
  return {
    type: types.ADD_NODE_FAILURE,
    error
  };
};

export function deleteNode(nodeModel,nodeObj) {
  return dispatch => {
    dispatch(deleteNodeRequest());
    return request
      .del(nodeApiUrl + '/' + nodeModel + '/' + nodeObj.id)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(deleteNodeFailure(err));
        } else {
          dispatch(deleteNodeSuccess(nodeModel, res.body));
        }
      });
  };
}

export function deleteNodeRequest() {
  return {
    type: types.DELETE_NODE_REQUEST
  };
}

export function deleteNodeSuccess(nodeModel,nodeObj) {
  return {
    type: types.DELETE_NODE_SUCCESS,
    nodeModel,
    nodeObj
  };
}

export function deleteNodeFailure(error) {
  return {
    type: types.DELETE_NODE_FAILURE,
    error
  };
}

export function updateNode(nodeModel, nodeObj) {
  return dispatch => {
    dispatch(updateNodeRequest());
    return request
      .post(nodeApiUrl + '/' + nodeModel + '/' + nodeObj.id)
      .send(nodeObj)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(updateNodeFailure(err));
        } else {
          dispatch(updateNodeSuccess(nodeModel, res.body));
        }
      });
  };
}

export function updateNodeRequest(nodeObj) {
  return {
    type: types.UPDATE_NODE_REQUEST
  };
}

export function updateNodeSuccess(nodeModel, nodeObj) {
  return {
    type: types.UPDATE_NODE_SUCCESS,
    nodeModel,
    nodeObj
  };
}

export function updateNodeFailure(error) {
  return {
    type: types.UPDATE_NODE_FAILURE,
    error
  };
}


export function getNodes(nodeModel) {
  return dispatch => {
    dispatch(getNodesRequest());
    return request
    .get(nodeApiUrl + '/' + nodeModel)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        dispatch(getNodesFailure(err));
      } else {
        dispatch(getNodesSuccess(nodeModel, res.body));
      }
    });

  };
};
export function getNodesRequest() {
  return {
    type: types.GET_NODES_REQUEST
  };
};
export function getNodesSuccess(nodeModel, nodeArray) {
  return {
    type: types.GET_NODES_SUCCESS,
    nodeModel,
    nodeArray
  };
};
export function getNodesFailure(error) {
  return {
    type: types.GET_NODES_FAILURE,
    error
  };
};

export function getActiveNode(nodeModel, nodeId) {
  return dispatch => {
    dispatch(getActiveNodeRequest());
    return request
    .get(nodeApiUrl + '/' + nodeModel + '/' + nodeId)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        dispatch(getActiveNodeFailure(err));
      } else {
        dispatch(getActiveNodeSuccess(nodeModel,res.body));
      }
    });

  };
};
export function getActiveNodeRequest() {
  return {
    type: types.GET_ACTIVE_NODE_REQUEST
  };
};
export function getActiveNodeSuccess(nodeModel, nodeObj) {
  return {
    type: types.GET_ACTIVE_NODE_SUCCESS,
    nodeModel,
    nodeObj
  };
};
export function getActiveNodeFailure(error) {
  return {
    type: types.GET_ACTIVE_NODE_FAILURE,
    error
  };
};



