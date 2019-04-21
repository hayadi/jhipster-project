import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CompteRendu } from 'app/shared/model/compte-rendu.model';
import { CompteRenduService } from './compte-rendu.service';
import { CompteRenduComponent } from './compte-rendu.component';
import { CompteRenduDetailComponent } from './compte-rendu-detail.component';
import { CompteRenduUpdateComponent } from './compte-rendu-update.component';
import { CompteRenduDeletePopupComponent } from './compte-rendu-delete-dialog.component';
import { ICompteRendu } from 'app/shared/model/compte-rendu.model';

@Injectable({ providedIn: 'root' })
export class CompteRenduResolve implements Resolve<ICompteRendu> {
    constructor(private service: CompteRenduService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICompteRendu> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CompteRendu>) => response.ok),
                map((compteRendu: HttpResponse<CompteRendu>) => compteRendu.body)
            );
        }
        return of(new CompteRendu());
    }
}

export const compteRenduRoute: Routes = [
    {
        path: '',
        component: CompteRenduComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.compteRendu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CompteRenduDetailComponent,
        resolve: {
            compteRendu: CompteRenduResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.compteRendu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CompteRenduUpdateComponent,
        resolve: {
            compteRendu: CompteRenduResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.compteRendu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CompteRenduUpdateComponent,
        resolve: {
            compteRendu: CompteRenduResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.compteRendu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const compteRenduPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CompteRenduDeletePopupComponent,
        resolve: {
            compteRendu: CompteRenduResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.compteRendu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
