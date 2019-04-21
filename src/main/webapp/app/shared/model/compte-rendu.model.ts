import { Moment } from 'moment';
import { IVisite } from 'app/shared/model/visite.model';

export interface ICompteRendu {
    id?: number;
    dateCompteRendu?: Moment;
    visite?: IVisite;
}

export class CompteRendu implements ICompteRendu {
    constructor(public id?: number, public dateCompteRendu?: Moment, public visite?: IVisite) {}
}
