import { IClinique } from 'app/shared/model/clinique.model';

export interface IPatient {
    id?: number;
    nom?: string;
    adresse?: string;
    telephone?: string;
    fax?: string;
    email?: string;
    clinique?: IClinique;
}

export class Patient implements IPatient {
    constructor(
        public id?: number,
        public nom?: string,
        public adresse?: string,
        public telephone?: string,
        public fax?: string,
        public email?: string,
        public clinique?: IClinique
    ) {}
}
