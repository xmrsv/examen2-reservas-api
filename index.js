import express from "express";
import { Sequelize, DataTypes } from "sequelize";

const app = express();
app.use(express.json());

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
	fecha_entrada: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	fecha_salida: {
		type: DataTypes.DATE,
		allowNull: false,
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
	const reserva = await Reserva.create({
		cliente: req.body.cliente,
		habitacion: req.body.habitacion,
		fecha_entrada: req.body.fecha_entrada,
		fecha_salida: req.body.fecha_salida,
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
			cliente: req.body.cliente === null ? reserva.cliente : req.body.cliente,
			habitacion:
				req.body.habitacion === null ? reserva.habitacion : req.body.habitacion,
			fecha_entrada:
				req.body.fecha_entrada === null
					? reserva.fecha_entrada
					: req.body.fecha_entrada,
			fecha_salida:
				req.body.fecha_salida === null
					? reserva.fecha_salida
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
		res.send("Reserva actualizada").status(200);
	} else {
		res.send("no se actualizo la reserva").status(500);
	}
});

app.delete("/reservas/:id", async (req, res) => {
	const deleted = await Reserva.destroy({
		where: {
			id: req.params.id,
		},
	});

	if (deleted >= 1) {
		res.send("Reserva eliminada").status(200);
	} else {
		res.send("no se elimino la reserva").status(500);
	}
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
