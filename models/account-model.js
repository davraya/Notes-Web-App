const pool = require('../database/index')

async function checkForExistingUser(account_username){
    try{ 
        const sql = "SELECT * FROM accounts WHERE account_username = $1"
        return await pool.query(sql, [account_username])
    }catch(error){
        return error.message
    }

}

async function registerNewAccount(account_username, account_password, account_firstname, account_lastname){
    try{ 
        const sql = "INSERT INTO accounts (account_username, account_password, account_firstname, account_lastname) VALUES($1, $2, $3, $4) RETURNING *"
        return await pool.query(sql, [account_username, account_password, account_firstname, account_lastname])
    }catch(error){
        return error.message
    }

}

async function getPasswordByAccountUsername(account_username){
    try{
        const sql = 'SELECT account_password FROM accounts WHERE account_username = $1'
        return await pool.query(sql, [account_username])
    } catch (err){
        return err.message
    }
}

async function getUserIdByAccountUsername(account_username){
    try{
        const sql = 'SELECT account_id FROM accounts WHERE account_username = $1'
        return await pool.query(sql, [account_username])
    } catch (err){
        return err.message
    }
}

module.exports = {
    registerNewAccount,
    checkForExistingUser,
    getPasswordByAccountUsername,
    getUserIdByAccountUsername
}