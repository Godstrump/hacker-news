import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

enablePromise(true);
const tableName = 'hackers';

export const dbConnection = async () => {
  try {
    const dbc = await openDatabase({
      name: 'HackerNewsDB.db',
      location: 'default',
      createFromLocation: '~www/HackerNewsDB.db',
    });
    return dbc;
  } catch (error) {
    console.log('*error', error.message);
  }
};

export const createTables = async dbc => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL)`;
  await dbc.executeSql(query);
  console.log('table created successfully');
};

export const initDb = async () => {
  const db = await dbConnection();
  await createTables(db);
  db.close();
};

export const saveHacker = async (dbc, hackers) => {
  try {
    const query = `INSERT INTO ${tableName} (username, password) values ('${hackers.username}', '${hackers.password}')`;
    return await dbc.executeSql(query);
  } catch (error) {
    console.log('*error', error.message);
    throw Error('*error', error.message);
  }
};

export const getHackers = async dbc => {
  let hackers = [];
  const query = `SELECT * FROM '${tableName}'`;
  const results = await dbc.executeSql(query);
  results.forEach(resultSet => {
    let len = resultSet.rows.length;
    for (let i = 0; i < len; i++) {
      let item = resultSet.rows.item(i);
      hackers.push({
        id: item?.id,
        username: item?.username,
        password: item?.password,
      });
    }
  });
  return hackers;
};

export const deleteHacker = async (dbc, id) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await dbc.executeSql(deleteQuery);
};

export const deleteTable = async dbc => {
  const query = `drop table ${tableName}`;

  await dbc.executeSql(query);
};
