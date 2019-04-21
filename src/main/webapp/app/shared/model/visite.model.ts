import { Moment } from 'moment';
import { IMedecin } from 'app/shared/model/medecin.model';
import { IClinique } from 'app/shared/model/clinique.model';
import { ICompteRendu } from 'app/shared/model/compte-rendu.model';

export interface IVisite {
    id?: number;
    dateVisite?: Moment;
    medecin?: IMedecin;
    clinique?: IClinique;
    compteRendu?: ICompteRendu;
}

export class Visite implements IVisite {
    constructor(
        public id?: number,
        public dateVisite?: Moment,
        public medecin?: IMedecin,
        public clinique?: IClinique,
        public compteRendu?: ICompteRendu
    ) {}
}
