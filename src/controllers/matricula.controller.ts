import { Request, Response } from "express";
import { Model, FindOptions, DestroyOptions, ModelStatic } from "sequelize";

export const getAllMatriculas = async (
	Matricula: ModelStatic<Model>,
	req: Request,
	res: Response
): Promise<any> => {
	const matriculas = await Matricula.findAll();
	return res.status(200).send(matriculas);
};

export const createMatricula = async (
	Matricula: ModelStatic<Model>,
	req: Request,
	res: Response
): Promise<any> => {
	const matricula = await Matricula.create({
		curso: req.body.curso.trim(),
		estudiante: req.body.estudiante.trim(),
		horas: req.body.horas,
		creditos: req.body.creditos,
		estado: req.body.estado.trim(),
	});
	return res.status(201).send(matricula);
};

export const updateMatricula = async (
	Matricula: ModelStatic<Model>,
	req: Request,
	res: Response
): Promise<any> => {
	const matricula = await Matricula.findOne({
		where: {
			id: req.params.id,
		},
	} as FindOptions);

	if (!matricula) {
		return res.status(404).send("Matricula not found");
	}

	const [numberOfAffectedRows] = await Matricula.update(
		{
			curso: req.body.curso ? req.body.curso.trim() : matricula.get("curso"),
			estudiante: req.body.estudiante
				? req.body.estudiante
				: matricula.get("estudiante"),
			horas: req.body.horas ? req.body.horas : matricula.get("horas"),
			creditos: req.body.creditos
				? req.body.creditos
				: matricula.get("creditos"),
			estado: req.body.estado ? req.body.estado : matricula.get("estado"),
		},
		{
			where: {
				id: req.params.id,
			},
		}
	);

	if (numberOfAffectedRows >= 1) {
		return res.status(200).send("Matricula updated");
	} else {
		return res.status(500).send("Couldn't update matricula");
	}
};

export const deleteMatricula = async (
	Matricula: ModelStatic<Model>,
	req: Request,
	res: Response
): Promise<any> => {
	const reservationFound = await Matricula.findOne({
		where: { id: req.params.id },
	} as FindOptions);

	if (reservationFound === null) {
		return res.status(404).send("Matricula not found");
	}

	const deleted = await Matricula.destroy({
		where: {
			id: req.params.id,
		},
	} as DestroyOptions);

	if (deleted >= 1) {
		return res.status(204).send();
	} else {
		return res.status(500).send("Couldn't delete matricula");
	}
};
