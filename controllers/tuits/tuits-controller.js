import posts from "./tuits.js";
let tuits = posts;

// retrieve data from HTTP body
const createTuit = (req, res) => { 
    const newTuit = req.body;
    newTuit._id = (new Date()).getTime()+'';
    newTuit.likes = 0;
    newTuit.liked = false;
    // newTuit.image = 'owl.jpg';
    // newTuit.replies = 0;
    // newTuit.retuits = 0;
    // newTuit.username = "Nice Owl";
    // newTuit.handle = "@niceowl";
    tuits.push(newTuit);
    res.json(newTuit);
}

const findTuits = (req, res) => {
    res.json(tuits);
}

const updateTuit = (req, res) => { 
    const tuitdId = req.params.tid;
    const updates = req.body;
    const tuitIndex = tuits.findIndex((t) => t._id === tuitdId)
    tuits[tuitIndex] = {...tuits[tuitIndex], ...updates};
    res.sendStatus(200);
}

const deleteTuit = (req, res) => { 
    const tuit_id_to_delete = req.params["tid"];
    tuits = tuits.filter(tuit => tuit._id !== tuit_id_to_delete);
    res.sendStatus(200);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
