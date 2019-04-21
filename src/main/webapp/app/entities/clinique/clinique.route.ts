import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Clinique } from 'app/shared/model/clinique.model';
import { CliniqueService } from './clinique.service';
import { CliniqueComponent } from './clinique.component';
import { CliniqueDetailComponent } from './clinique-detail.component';
import { CliniqueUpdateComponent } from './clinique-update.component';
import { CliniqueDeletePopupComponent } from './clinique-delete-dialog.component';
import { IClinique } from 'app/shared/model/clinique.model';

@Injectable({ providedIn: 'root' })
export class CliniqueResolve implements Resolve<IClinique> {
    constructor(private service: CliniqueService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClinique> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Clinique>) => response.ok),
                map((clinique: HttpResponse<Clinique>) => clinique.body)
            );
        }
        return of(new Clinique());
    }
}

export const cliniqueRoute: Routes = [
    {
        path: '',
        component: CliniqueComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.clinique.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CliniqueDetailComponent,
        resolve: {
            clinique: CliniqueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.clinique.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CliniqueUpdateComponent,
        resolve: {
            clinique: CliniqueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.clinique.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CliniqueUpdateComponent,
        resolve: {
            clinique: CliniqueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.clinique.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cliniquePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CliniqueDeletePopupComponent,
        resolve: {
            clinique: CliniqueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.clinique.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
