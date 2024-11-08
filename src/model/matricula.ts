import { Sequelize, DataTypes } from "sequelize";

const tableName: string = "matriculas";

export const defineMatriculaModel = (sequelize: Sequelize) => {
	return sequelize.define(
		tableName,
		{
			curso: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			estudiante: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			horas: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			creditos: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			estado: {
				type: DataTypes.ENUM("activo", "inactivo"),
				allowNull: false,
			},
		},
		{
			tableName: tableName,
		}
	);
};
