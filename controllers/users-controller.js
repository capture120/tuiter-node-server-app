import * as usersDao from '../users/users-dao.js';

// use express instance app to declare HTTP GET
// request pattern /api/users to call a function
const UserController = (app) => {
    app.get('/api/users', findUsers)
    app.get('/api/users/:id', findUserById);
    // map URL pattern to handler function
    app.post('/api/users', createUser);
    app.delete('/api/users/:id', deleteUser);
    app.put('/api/users/:id', updateUser);
}

// function invoked if URL matches pattern
const createUser = async (req, res) => {
    const newUser = await usersDao.createUser(req.body);
    res.json(newUser);
}

// handle PUT /api/users/:uid
const updateUser = async (req, res) => {
    const id = req.params.id;
    const status = await usersDao.updateUser(id, req.body);
    const user = await usersDao.findUserById(id);
    req.session["currentUser"] = user;
    res.json(status);
}


const deleteUser = async (req, res) => {
    const id = req.params.id;
    const status = await usersDao.deleteUser(id);
    res.json(status);
}

// function called if URL matches pattern
const findUserById = async (req, res) => {
    const id = req.params.id;
    const user = await usersDao.findUserById(id);
    res.json(user);
}

// function runs when /api/users requested
// responds with JSON array of users
const findUsers = async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    if (username && password) {
        const user = await usersDao.findUserByCredentials(username, password);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } else if (username) {
        const user = await usersDao.findUserByUsername(username);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } else {
        const users = await usersDao.findAllUsers();
        res.json(users);
    }
}

// exports so app.js can import
export default UserController;