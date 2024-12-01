import express from "express";
import bodyParser from "body-parser";
import root from './routes/root.js';
import user from './routes/user.js'
import voluntario from './routes/voluntario.js'
import atendido from './routes/atendido.js'
import agendaVoluntario from "./routes/agendaVoluntario.js";
import atendimentoColetivo from "./routes/atendimentoColetivo.js";
import atendimentoIndividual from "./routes/atendimentoIndividual.js";
import aula from "./routes/aula.js";
import consulta from "./routes/consulta.js";
import turma from "./routes/turma.js";
import cors from "cors"
import { swaggerDocs } from './swagger.js';
import swaggerUi from 'swagger-ui-express';

const app = express()
app.use(bodyParser.json())

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use('/', root);
app.use('/user', user);
app.use('/voluntario', voluntario);
app.use('/atendido', atendido);
app.use('/agendavoluntario', agendaVoluntario);
app.use('/atendimentocoletivo', atendimentoColetivo);
app.use('/atendimentoindividual', atendimentoIndividual);
app.use('/aula', aula);
app.use('/consulta', consulta);
app.use('/turma', turma);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`)
})