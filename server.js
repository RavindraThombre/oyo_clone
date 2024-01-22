const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const cors = require('cors');

const app = express();
const port = 3001;

//mongodb connection  
mongoose.connect('mongodb://localhost:27017/fileapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((data) => {
    console.log(`Mongodb connected with server: ${data}`);
}).catch((err) => {
    console.log(err)
});






// User and File Schemas 

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const fileSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    filename: String,
    code: String,
});

// Create model
const User = mongoose.model('User', userSchema);
const File = mongoose.model('File', fileSchema);



// set up multer for upload file 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
});

const upload = multer({
    storage: storage
});


// cors 
app.use(cors());
app.use(express.json());



// User Register 
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });

    await user.save();

    res.status(201).json({
        message: 'User Registered Successfully...'
    });
});

// login user
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = new User.findOne({ username, password });

    if (user) {
        res.json({ message: 'Login Successfully...' });
    } else {
        res.status(401).json({ message: 'Invalid Username & Password...' });
    }
});

// upload file
app.post('/upload', upload.single('file'), async (req, res) => {
    const { userId } = req.body;
    const { filename } = req.body;
    //generate 6 digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const file = new File({ userId, filename, code });
    await file.save();
    res.status(201).json({ message: 'File Upload Successfully...' }, code);
});


// get the user list
app.get('/files/:userId', async (req, res) => {
    const { userId } = req.body;
    const files = await File.find({ userId });
    res.json(files);
});

// delete files
app.delete('files/:fileId', async (req, res) => {
    const { fileId } = req.body;
    await File.findByIdAndDelete(fileId);
    res.json({ message: 'File Deleted Successfully...' });
})


// start server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});