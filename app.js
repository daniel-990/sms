const express = require('express')
const body_parser = require('body-parser')
const config = require('config')
const app = express()
const port = 3000


//archivo de configuracion
const ID = config.get('tokens.accountSid');
const Token = config.get('tokens.authToken');

//Twilio
const accountSid = ID;
const authToken = Token;
const client = require('twilio')(accountSid, authToken);

app.set('view engine', 'ejs');
app.use(express.static('public'));

//body parser
app.use(body_parser.urlencoded(
  {
    extended:true
  }
));
app.use(body_parser.json());

app.post('/enviarmensaje', (req, res) => {

  const cuerpoMensaje = req.body.mensaje;
  const desdeDonde = req.body.wap;
  const donde = req.body.destino;
  res.send("mensaje enviado con exito");

  //se imprime la respuesta en la terminal
  console.log(req.body);
  
  //wp que se envia
  client.messages 
  .create({ 
      body: cuerpoMensaje, 
      from: `whatsapp:${desdeDonde}`,       
      to: `whatsapp:+57${donde}` 
    }) 
  .then(message => console.log(`Mensaje enviado: ${message.sid}`))
  .done();

});

app.get('/tomarmensajes', (req, res) =>{

  res.send("mensajes del wap");
  //------
  client.messages.list({limit: 5})
  .then(messages => messages.forEach(
    m = (m) =>{
      if(m.from == "whatsapp:+573205936059"){
        const cuerpoMensajeWap = m.body;
        console.log(cuerpoMensajeWap);
      }
    } 
  ));
})

app.get('/', (req, res) => {
    res.render('pages/index.ejs');
})

app.listen(port, () => {
  console.log(`Puerto: http://localhost:${port}`);
})