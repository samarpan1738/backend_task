//Get the client
const mysql = require('mysql2')

//Synchronous Task
let config={
  host: 'localhost',
  database: 'mytestdb',
  user: 'myuser',
  password: 'mypass123',

}

//creating connection to the database with our specific config
const connection = mysql.createConnection(config);

//Async Function
connection.query(
  
  //Backticks for multi-lining strings
  `
    CREATE TABLE IF NOT EXISTS final(
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        age INTEGER NOT NULL,
        city VARCHAR(30),
        college VARCHAR(40)
    )
    `,
  //Call-back Function.Runs after query has ended.
  //results have the data we queried for(if any)
  (err, results) => {
    if (err)
      console.error(err);
    else
      console.log("Table Created Succesfully");

  }
);

//Getting all person's DATA from database 
function getAllPersons() {
    return new Promise(
        (resolve, reject) => {
            connection.query('SELECT * FROM final',
                (err, rows, cols) => {
                    if (err)
                        reject(err)
                    else
                        resolve(rows)
                })
        }
    )
}

//Getting info of person having specified ID
function getPersonById(id) 
{
    return new Promise(
        (resolve, reject) => {
            connection.query(`SELECT * FROM final WHERE id = ?`,
            [id],
                (err, rows, cols) => {
                    if (err)
                        reject(err)
                    else
                        resolve(rows)
                })
        }
    )
}

//Adding new person's data to database
function addNewPerson(name, age, city,collegeName) {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO final (name,age,city,college) VALUES (?,?,?,?)`,
            [name, age, city,collegeName],
            (err, results) => {
                if (err)
                    reject(err)
                else
                    resolve()
            }
        )
    })
}

//GET persons having specified collegeName
function searchByCollegeName(collegeName)
{
    return new Promise(
        (resolve,reject)=>
        {
            connection.query(`SELECT * FROM final WHERE college = ?`,
            [collegeName],
            (err,rows,cols)=>
            {
                if(err)
                reject(err);
                else
                resolve(rows);
            })
        }
    )
}

function deletePersonById(id) 
{
    return new Promise(
        (resolve, reject) => {
            connection.query(`DELETE FROM final WHERE id=?`,
            [id],
                (err, rows, cols) => {
                    if (err)
                        reject(err)
                    else
                        resolve()
                })
        }
    )
}

//Exporting functions

module.exports = {
    getAllPersons,
    addNewPerson,
    getPersonById,
    deletePersonById,
    searchByCollegeName
}