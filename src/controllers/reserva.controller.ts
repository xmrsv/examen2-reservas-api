import { Request, Response } from "express";
import { Model, FindOptions, DestroyOptions, ModelStatic } from "sequelize";

export const getAllReservas = async (Reserva: ModelStatic<Model>, req: Request, res: Response): Promise<any> => {
    const reservations = await Reserva.findAll();
    return res.status(200).send(reservations);
};

export const createReserva = async (Reserva: ModelStatic<Model>, req: Request, res: Response): Promise<any> => {
    const reserva = await Reserva.create({
        cliente: req.body.cliente.trim(),
        habitacion: req.body.habitacion,
        fecha_entrada: req.body.fecha_entrada,
        fecha_salida: req.body.fecha_salida,
        costo: req.body.costo,
        estado: req.body.estado,
    });
    return res.status(201).send(reserva);
};

export const updateReserva = async (Reserva: ModelStatic<Model>, req: Request, res: Response): Promise<any> => {
    const reserva = await Reserva.findOne({
        where: {
            id: req.params.id,
        },
    } as FindOptions);

    if (!reserva) {
        return res.status(404).send("Reservation not found");
    }

    const [numberOfAffectedRows] = await Reserva.update(
        {
            cliente: req.body.cliente ? req.body.cliente.trim() : reserva.get('cliente'),
            habitacion: req.body.habitacion ? req.body.habitacion : reserva.get('habitacion'),
            fecha_entrada: req.body.fecha_entrada ? req.body.fecha_entrada : reserva.get('fecha_entrada'),
            fecha_salida: req.body.fecha_salida ? req.body.fecha_salida : reserva.get('fecha_salida'),
            costo: req.body.costo ? req.body.costo : reserva.get('costo'),
            estado: req.body.estado ? req.body.estado : reserva.get('estado'),
        },
        {
            where: {
                id: req.params.id,
            },
        }
    );

    if (numberOfAffectedRows >= 1) {
        return res.status(200).send("Reservation updated");
    } else {
        return res.status(500).send("Couldn't update reservation");
    }
};

export const deleteReserva = async (Reserva: ModelStatic<Model>, req: Request, res: Response): Promise<any> => {
    const reservationFound = await Reserva.findOne({
        where: { id: req.params.id },
    } as FindOptions);

    if (reservationFound === null) {
        return res.status(404).send("Reservation not found");
    }

    const deleted = await Reserva.destroy({
        where: {
            id: req.params.id,
        },
    } as DestroyOptions);

    if (deleted >= 1) {
        return res.status(204).send();
    } else {
        return res.status(500).send("Couldn't delete reservation");
    }
};