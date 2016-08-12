import r from 'rethinkdb';
import config from 'config';

const rethinkdb = config.get('rethinkdb');
let DATABASE = rethinkdb.db;
let TABLES = ['posts']; 

let dbSetup = function(){
	r.connect(rethinkdb)
	.then(conn => {
	  console.log(' [-] 检测数据连接');
	  return createDbIfNotExists(conn)
	  .then(() => Promise.all(TABLES.map((table) => createTableIfNotExists(conn, table))))
	  .then(() => closeConnection(conn));
	});
}

function createDbIfNotExists(conn){
  return getDbList(conn)
  .then((list) => {
    if(list.indexOf(DATABASE) === -1) {
      return createDatabase(conn);
    } else {
      console.log(' [!] 数据库已存在:', DATABASE);
      return Promise.resolve(true);
    }
  });
}

function createTableIfNotExists(conn, table) {
  return getTableList(conn)
  .then((list) => {
    if(list.indexOf(table) === -1) {
      return createTable(conn, table);
    } else {
      console.log(' [!] 表已存在:', table);
      return Promise.resolve(true);
    }
  });
}

function getDbList(conn) {
  return r.dbList().run(conn);
}

function getTableList(conn) {
  return r.db(DATABASE).tableList().run(conn);
}

function createDatabase(conn) {
  console.log(' [-] 创建数据库:', DATABASE);
  return r.dbCreate(DATABASE).run(conn);
}

function createTable(conn, table) {
  console.log(' [-] 创建表:', table);
  return r.db(DATABASE).tableCreate(table).run(conn);
}

function closeConnection(conn) {
  console.log(' [x] 关闭数据库连接!');
  return conn.close();
}

module.exports = dbSetup;