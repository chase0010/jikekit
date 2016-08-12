import socketClient from 'socket.io-client';

export function setupRealtime(store, actions) {
  const io = socketClient();

  io.on('node-change', (nodeModel, change) => {
    let state = store.getState();
    if (!change.old_val) {
      store.dispatch(actions.addNodeSuccess(nodeModel, change.new_val));
    } else if (!change.new_val) {
      store.dispatch(actions.deleteNodeSuccess(nodeModel, change.old_val));
    } else {
      store.dispatch(actions.updateNodeSuccess(nodeModel, change.new_val));
    }
  });

  return io;
}