import r from 'rethinkdb';
import config from 'config';
import xss from 'xss';

function dbConnect() {
  return r.connect(config.get('rethinkdb'));
}

export function liveUpdates(nodeModel, io) {
  console.log('准备实时监听...');
  dbConnect()
  .then(conn => {
    r
    .table(nodeModel)
    .changes().run(conn, (err, cursor) => {
      console.log('监听内容变化...');
      cursor.each((err, change) => {
        console.log('内容发生变化', nodeModel, change);
        io.emit('node-change', nodeModel, change);
      });
    });
  });
}


export function getNodes(nodeModel) {
  return dbConnect()
  .then(conn => {
    return r
    .table(nodeModel)
    .orderBy(r.desc('created')).run(conn)
    .then(cursor => cursor.toArray());
  });
}

export function getActiveNode(nodeModel, id) {
  return dbConnect()
  .then(conn => {
    return r
    .table(nodeModel)
    .get(id).run(conn)
    .then(post => post);
  });
}

export function addNode(nodeModel, nodeObj) {
  return dbConnect()
  .then(conn => {
    nodeObj.created = new Date();
    nodeObj.text = xss(nodeObj.text);
    return r
    .table(nodeModel)
    .insert(nodeObj).run(conn)
    .then(response => {
      return Object.assign({}, nodeObj, {id: response.generated_keys[0]});
    });
  });
}

export function deleteNode(nodeModel, id) {
  return dbConnect()
  .then(conn => {
    return r
    .table(nodeModel)
    .get(id).delete().run(conn)
    .then(() => ({id: id, deleted: true}));
  });
}

export function updateNode(nodeModel, id, nodeObj) {
  nodeObj.updated = new Date();
  nodeObj.text = xss(nodeObj.text);
  return dbConnect()
  .then(conn => {
    return r
    .table(nodeModel)
    .get(id).update(nodeObj).run(conn)
    .then(() => nodeObj);
  });
}