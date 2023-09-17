const accountModel = require('../models/account-model')
const noteModel = require('./note-controllers')
const bcrypt = require('bcrypt')
const jwt = require('../jwt/index')
const util = require('../utilities/index')


async function buildLogin(req, res){
    console.log('building login');
    res.render('pages/login',{
        message : false
    })
}

async function buildRegister(req, res){
    res.render('pages/register')
}

async function register(req, res){
    const {
        account_username,
        account_password,
        account_firstname, 
        account_lastname
    } = req.body
    const accountExists = await accountModel.checkForExistingUser(account_username)

    if (! accountExists.rows.length){  // Checks if this username doesn't exists already

        hashPassword = await bcrypt.hash(account_password, 12)

        const result = await accountModel.registerNewAccount(
            account_username,
            hashPassword,
            account_firstname, 
            account_lastname
        )
        return res.redirect('/')
    }

    res.redirect('/account/register')
}

async function login(req, res){
    const {
        account_username,
        account_password
    } = req.body

    const accountExists = await accountModel.checkForExistingUser(account_username)

    if (accountExists.rows.length){  // Checks if this username is in the DB
        const hashPasswordInDB = await accountModel.getPasswordByAccountUsername(account_username)
        
        const passwordMatch = await bcrypt.compare(account_password, hashPasswordInDB.rows[0].account_password)

        if (passwordMatch){
            token = jwt.generateToken(account_username)
            res.cookie('jwt', token, {httpOnly: true, maxAge: 60 * 60 * 1000})
            const query = await accountModel.getUserIdByAccountUsername(account_username)
            req.session.account_id = query.rows[0].account_id
            
            const account_id = req.session.account_id
            notes = await util.buildNoteList(account_id)
            res.render('pages/dashboard', {
                notes: notes
            })
            
        }else{
            req.flash('notice', 'No match for user/password provided')
            res.redirect('/')
        }

    }
}

function logout(req, res){
    res.clearCookie("jwt")
    res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });
    res.redirect('/'); // Redirect the user to the desired location after logout
    delete req.session.cookie
    delete req.session.account_id
    req.session.destroy()
    console.log(req.session);
}

module.exports = {
    buildLogin,
    buildRegister,
    register,
    login,
    logout
}