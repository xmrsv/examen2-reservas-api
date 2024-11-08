import { Sequelize } from "sequelize";
import { defineReservaModel } from "./reserva";
import { defineMatriculaModel } from "./matricula";

export const initModels = (sequelize: Sequelize) => {
    const Reserva = defineReservaModel(sequelize);
    const Matricula = defineMatriculaModel(sequelize);
    return {
        Reserva,
        Matricula,
    };
};