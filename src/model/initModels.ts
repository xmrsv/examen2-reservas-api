import { Sequelize } from "sequelize";
import { defineReservaModel } from "./reserva";

export const initModels = (sequelize: Sequelize) => {
    const Reserva = defineReservaModel(sequelize);
    return {
        Reserva,
    };
};