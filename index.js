import express from 'express'
import path from 'path'
import cors from 'cors'

const app = express();
const __dirname = path.resolve();
const dadosRecebidos = [];

app.use(express.static(path.join(__dirname, 'static')));

app.use(express.json({type:['text/*', '*/json']}))
app.use(cors())

app.post('/', (req, resp) =>{
    console.log('Nova mensagem recebida... (POST)')

    if(req.body.SubscribeURL){
        console.log('-> URL para inscrição: '+req.body.SubscribeURL)
    }
    if(req.body.Message){
        console.log('-> Message: '+req.body.Message)
    }

    dadosRecebidos.push({
        message: req.body.Message,
        timestamp: Date.now()
    })

    resp.send({ok:true})
})

app.get('/', (requisicao,resposta) =>{
    console.log('Obtenção de resultados... (GET)')
    resposta.send(dadosRecebidos)
})

const porta = process.argv[2]

app.listen(porta, () => {
    console.log('Serviço iniciado');
    
})