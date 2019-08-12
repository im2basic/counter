const express = require("express");
const app = express();
const session = require('express-session');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static"));
app.use(session({
    secret: 'StayHumble',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
//ROUTES
app.get('/', (req, res) => {
    req.session.counter = req.session.counter + 1;
    console.log(req.session.counter);
    res.render('index', {counting: req.session.counter});
});

app.post('/count', (req, res) => {
    res.redirect('/');
});

app.post('/destroy', (req,res) => {
    req.session.destroy();
    res.redirect('/')
})


app.listen(8000, () => console.log("listening on port 8000"));


// def home():
// if 'count' in session:
//     print('key exists!')
//     session['count'] = session['count'] + 1 
// else:
//     print("key 'key_name' does NOT exist")  
//     session['count'] = 0      
// return render_template('session.html', count=session['count'])