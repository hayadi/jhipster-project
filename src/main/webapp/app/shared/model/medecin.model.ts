import { ISpecialite } from 'app/shared/model/specialite.model';
import { IClinique } from 'app/shared/model/clinique.model';
import { IVisite } from 'app/shared/model/visite.model';

export const enum EtatMedecin {
    ACTIF = 'ACTIF',
    CONGE = 'CONGE',
    INACTIF = 'INACTIF'
}

export interface IMedecin {
    id?: number;
    nom?: string;
    adresse?: string;
    telephone?: string;
    fax?: string;
    email?: string;
    etat?: EtatMedecin;
    specialite?: ISpecialite;
    clinique?: IClinique;
    visites?: IVisite[];
    cliniques?: IClinique[];
}

export class Medecin implements IMedecin {
    constructor(
        public id?: number,
        public nom?: string,
        public adresse?: string,
        public telephone?: string,
        public fax?: string,
        public email?: string,
        public etat?: EtatMedecin,
        public specialite?: ISpecialite,
        public clinique?: IClinique,
        public visites?: IVisite[],
        public cliniques?: IClinique[]
    ) {}
}
