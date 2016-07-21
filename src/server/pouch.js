
const http = require('http');
const PouchDB = require('pouchdb');
const PouchSync = require('pouch-websocket-sync');

const server = http.createServer();

const DB_NAME = 'todos-server';
const SYNC_PORT = 3001;
const DB_REMOTE = `http://localhost:5984/${DB_NAME}`;

const db = new PouchDB(DB_NAME);

const rdb = new PouchDB(DB_REMOTE, {
  ajax: {
    cache: false,
    timeout: 10000,
  },
});

db.sync(rdb, { live: true })
  .on('change', () => {})
  .on('error', (err) => { console.log(err); });

server.listen(SYNC_PORT, () => {
  console.log(new Date(), ' Server is listening on', server.address());
});

function onRequest(credentials, dbName, callback) {
  if (dbName === DB_NAME) {
    callback(null, db);
  } else {
    callback(new Error('database not allowed'));
  }
}

const wss = PouchSync.createServer(server, onRequest);
wss.on('error', (err) => {
  console.error(err.stack);
});

