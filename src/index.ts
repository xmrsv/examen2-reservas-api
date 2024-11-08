import express from "express";
import cors from "cors";
import { Sequelize } from "sequelize";
import { initModels } from "./model/initModels";
import {
	getAllReservas,
	createReserva,
	updateReserva,
	deleteReserva,
} from "./controllers/reserva.controller";
import {
	createMatricula,
	deleteMatricula,
	getAllMatriculas,
	updateMatricula,
} from "./controllers/matricula.controller";
import dotenv from "dotenv";

const app: express.Application = express();
const PORT: string | number = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use(cors());

const sequelize = new Sequelize(
	process.env.PG_CONNECTION_URL ||
		"postgres://postgres:password@localhost:5432/hotel"
);

const models = initModels(sequelize);
const { Reserva, Matricula } = models;

(async () => {
	try {
		await sequelize.authenticate();
        await sequelize.sync();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
})();

app.get("/reservas", (req, res) => getAllReservas(Reserva, req, res));
app.post("/reservas", (req, res) => createReserva(Reserva, req, res));
app.put("/reservas/:id", (req, res) => updateReserva(Reserva, req, res));
app.delete("/reservas/:id", (req, res) => deleteReserva(Reserva, req, res));

app.get("/matriculas", (req, res) => getAllMatriculas(Matricula, req, res));
app.post("/matriculas", (req, res) => createMatricula(Matricula, req, res));
app.put("/matriculas/:id", (req, res) => updateMatricula(Matricula, req, res));
app.delete("/matriculas/:id", (req, res) =>
	deleteMatricula(Matricula, req, res)
);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
