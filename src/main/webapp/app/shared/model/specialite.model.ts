import { IMedecin } from 'app/shared/model/medecin.model';

export interface ISpecialite {
    id?: number;
    nom?: string;
    description?: string;
    medecins?: IMedecin[];
}

export class Specialite implements ISpecialite {
    constructor(public id?: number, public nom?: string, public description?: string, public medecins?: IMedecin[]) {}
}
