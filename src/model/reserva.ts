import { Sequelize, DataTypes } from "sequelize";

const tableName: string = "reservas";

export const defineReservaModel = (sequelize: Sequelize) => {
	return sequelize.define(
		tableName,
		{
			cliente: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			habitacion: {
				type: DataTypes.STRING,
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
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			estado: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: tableName,
		}
	);
};
