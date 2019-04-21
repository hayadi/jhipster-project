import { IMedecin } from 'app/shared/model/medecin.model';
import { IPatient } from 'app/shared/model/patient.model';
import { IVisite } from 'app/shared/model/visite.model';

export interface IClinique {
    id?: number;
    nom?: string;
    dirigeant?: string;
    adresse?: string;
    telephone?: string;
    fax?: string;
    email?: string;
    horaireTravail?: string;
    medecins?: IMedecin[];
    medecins?: IMedecin[];
    patients?: IPatient[];
    visites?: IVisite[];
}

export class Clinique implements IClinique {
    constructor(
        public id?: number,
        public nom?: string,
        public dirigeant?: string,
        public adresse?: string,
        public telephone?: string,
        public fax?: string,
        public email?: string,
        public horaireTravail?: string,
        public medecins?: IMedecin[],
        public medecins?: IMedecin[],
        public patients?: IPatient[],
        public visites?: IVisite[]
    ) {}
}
