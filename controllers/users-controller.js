import people from '../users/users.js';

// import the array of users. Include the extension
let users = people;

// use express instance app to declare HTTP GET
// request pattern /api/users to call a function
const UserController = (app) => {
    app.get('/api/users', findUsers)
    app.get('/api/users/:uid', findUserById);
    // map URL pattern to handler function
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

// function invoked if URL matches pattern
const createUser = (req, res) => {
    // extract new user from BODY in request
    const newUser = req.body;
    // add an _id property with unique timestamp
    newUser._id = (new Date()).getTime() + '';
    users.push(newUser);
    // respond with new user to client
    res.json(newUser);
}

// handle PUT /api/users/:uid
const updateUser = (req, res) => {
    // get user ID from path
    const userId = req.params['uid'];
    // BODY includes updated fields
    const updates = req.body;
    users = users.map((usr) =>
    usr._id === userId ? // merge old usr with new updates, otherwise keep the old user
            { ...usr, ...updates } :
            usr
    );
    res.sendStatus(200);
}


const deleteUser = (req, res) => {
    // get user ID from path parameter uid filter out the user
    const userId = req.params['uid'];
    users = users.filter(usr => usr._id !== userId);
    // respond with success code
    res.sendStatus(200);
}

// function called if URL matches pattern
const findUserById = (req, res) => {
    // get uid from request parameter map
    const uid = req.params["uid"]; // or req.params.uid
    const userWithId = users.find(user => user._id === uid);
    // respond to client with user found
    res.json(userWithId);
}

// function runs when /api/users requested
// responds with JSON array of users
const findUsers = (req, res) => {
    const type = req.query.type;
    // if the type parameter exists in the query, respond with users of that type, otherwise display all
    if (type) {
        const usersOfType = users.filter(user => user.type === type);
        res.json(usersOfType);
        return;
    }
    res.json(users)
}

// exports so app.js can import
export default UserController;