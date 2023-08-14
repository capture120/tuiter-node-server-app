import * as usersDao from "../users/users-dao.js";


const AuthController = (app) => {
    const register = async (req, res) => {
        const user = await usersDao.findUserByUsername(req.body.username);
        if (user) {
            res.sendStatus(409);
            return;
        }
        const newUser = await usersDao.createUser(req.body);
        req.session["currentUser"] = newUser;
        res.json(newUser);
    };

    const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            const user = await usersDao.findUserByCredentials(username, password);
            if (user) {
                req.session["currentUser"] = user;
                res.json(user);
                return;
            } 
        }
        res.sendStatus(403);
    };

    const profile = async (req, res) => {
        // console.log("CRAZYYYYYY");
        // console.log(req);
        const currentUser = req.session["currentUser"];
        // console.log(`CURRENT USER: ${JSON.stringify(currentUser)}`);
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        res.json(currentUser);
    };

    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const update = async (req, res) => {
        const user_id = req.params["tuit_id"];
        /* check to see if the user exists in the database */
        const user_in_db = await usersDao.findUserById(user_id);
        const updated_user = req.body;
        // console.log(`USER_ID ${JSON.stringify(user_id)}`);
        // console.log(`UPDATED USER ${JSON.stringify(updated_user)}`);
        
        if (user_in_db) {
            await usersDao.updateUser(user_id, updated_user);
            req.session["currentUser"] = updated_user;
            res.json(updated_user);
            return;
        }
        res.sendStatus(404);
    };


    // ################# TEMP
    app.get("/api/show_registered_users", async (req, res) => {res.json(await usersDao.findAllUsers())})


    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", profile);
    app.post("/api/users/logout", logout);
    app.put("/api/users_/:tuit_id", update);
};
export default AuthController;