import { Sequelize, DataTypes } from "sequelize";

export const defineReservaModel = (sequelize: Sequelize) => {
    return sequelize.define("reserva", {
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
    });
};