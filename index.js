import express from "express";
import { Sequelize, DataTypes } from "sequelize";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


const sequelize = new Sequelize(
	"postgresql://postgres:YHOQvlrzfJxsFjDJeTdtkfSIAHpqPrNM@autorack.proxy.rlwy.net:45410/railway"
);

const Reserva = sequelize.define("reserva", {
	cliente: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	habitacion: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	fechaEntrada: {
		type: DataTypes.DATE,
		allowNull: false,
		field: "fecha_entrada",
	},
	fechaSalida: {
		type: DataTypes.DATE,
		allowNull: false,
		field: "fecha_salida",
	},
	costo: {
		type: DataTypes.DOUBLE,
		allowNull: false,
	},
	estado: {
		type: DataTypes.ENUM("reservado", "cancelado"),
		allowNull: false,
	},
});

try {
	await sequelize.authenticate();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

app.get("/reservas", async (req, res) => {
	res.send(await Reserva.findAll());
});

app.post("/reservas", async (req, res) => {
	console.log(req.body);
	const reserva = await Reserva.create({
		cliente: req.body.cliente.trim(),
		habitacion: req.body.habitacion,
		fechaEntrada: req.body.fecha_entrada,
		fechaSalida: req.body.fecha_salida,
		costo: req.body.costo,
		estado: req.body.estado,
	});
	return res.send(reserva).status(201);
});

app.put("/reservas/:id", async (req, res) => {
	const reserva = Reserva.findOne({
		where: {
			id: req.params.id,
		},
	});

	const reservaActualizada = await Reserva.update(
		{
			cliente: req.body.cliente === null ? reserva.cliente : req.body.cliente.trim(),
			habitacion:
				req.body.habitacion === null ? reserva.habitacion : req.body.habitacion,
			fechaEntrada:
				req.body.fecha_entrada === null
					? reserva.fechaEntrada
					: req.body.fecha_entrada,
			fechaSalida:
				req.body.fecha_salida === null
					? reserva.fechaSalida
					: req.body.fecha_salida,
			costo: req.body.costo === null ? reserva.costo : req.body.costo,
			estado: req.body.estado === null ? reserva.estado : req.body.estado,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	);

	if (reservaActualizada >= 1) {
		res.send("Reservation updated").status(200);
	} else {
		res.send("Couldn't update reservation").status(500);
	}
});

app.delete("/reservas/:id", async (req, res) => {
	if (await Reserva.findOne({ where: { id: req.params.id } }) === null) {
		return res.status(404).send("Not found");
	}

	const deleted = await Reserva.destroy({
		where: {
			id: req.params.id,
		},
	});

	if (deleted >= 1) {
		res.status(204);
	} else {
		res.status(500).send("Couldn't delete reservation");
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
