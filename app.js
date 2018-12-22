const express = require('express');
const hbs = require('hbs');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
const say = require('say');


app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.render('index');
}) 


app.post("/check-num", (req, res, next) => {
  // const number = req.body.number;
  const { number } = req.body;
  axios.get(`http://api.elpais.com/ws/LoteriaNavidadPremiados?n=${number}`)
    .then(response => {
      const json = JSON.parse(response.data.split('=')[1])
      // console.log('json:', json);
      let num = json.numero;
      let premio = json.premio;
      say.speak(`${premio} eeeeeuuuuroooossss!`);
      // res.send('prueba')
      res.render('check', {num, premio});
    })
})




app.listen(PORT, () => {
  console.info(`App listen at ${PORT} port`);
});