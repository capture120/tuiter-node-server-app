import * as tuitsDao from '../tuits/tuits-dao.js';

// retrieve data from HTTP body
const createTuit = async (req, res) => { 
    const newTuit = req.body;
    newTuit.likes = 0;
    newTuit.liked = false;
    // actual tuit inserted in database with DAO's createTuit
    const insertedTuit = await tuitsDao.createTuit(newTuit);
    // respond with actual inserted tuit
    res.json(insertedTuit);
}

const findTuits = async (req, res) => {
    // retrieve tuits from database
    const tuits = await tuitsDao.findTuits();
    res.json(tuits);
}

const updateTuit = async (req, res) => { 
    const tuit_id_to_update = req.params.tid;
    const updates = req.body;
    const status = await tuitsDao.updateTuit(tuit_id_to_update, updates);
    res.sendStatus(200);
}

const deleteTuit = async (req, res) => { 
    const tuit_id_to_delete = req.params["tid"];
    // success/failer status deleting record from database
    const status = await tuitsDao.deleteTuit(tuit_id_to_delete);
    // respond with status object
    res.json(status);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
