const express = require('express');
const Pusher = require('pusher');
const bodyParser = require('body-parser');
const cors = require('cors');
const os = require('os');

const app = express();

app.use(express.static('build'));

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username })); //os.userInfo().username


const pusher = new Pusher({
	appId: '590918',
	key: '223aca0f0c8175acf4b3',
	secret: 'fe63bf18750b70ecbb5c',
	cluster: 'ap1',
	encrypted: true
});

app.set('PORT', process.env.PORT || 8080);

app.post('/message', (req, res) => {
	const payload = req.body;
	pusher.trigger('chat', 'message', payload);
	res.send(payload)
});

app.post('/results', (req, res) => {
	const payload = req.body;
	pusher.trigger('comp', 'results', payload);
	res.send(payload)
});

app.post('/users', (req, res) => {
	const payload = req.body;
	pusher.trigger('user', 'users', payload);
	res.send(payload)
});

app.post('/notes', (req, res) => {
	const payload = req.body;
	pusher.trigger('note', 'notes', payload);
	res.send(payload);
});

app.post('/record', (req, res) => {
	console.log(req.body);
	pusher.trigger('records', 'new-record', req.body);
	res.send('Pushed');
})
  
app.listen(app.get('PORT'), () => 
console.log('Listening at ' + app.get('PORT')))
