import { DataSource } from "typeorm";


export const dataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/entity/*.js"],
    synchronize: true,
});

dataSource.initialize()
  .then(() => {
    console.log("Data Source inicializado com sucesso!");
  })
  .catch((error) => console.log("Erro ao inicializar o Data Source", error));


  export default dataSource