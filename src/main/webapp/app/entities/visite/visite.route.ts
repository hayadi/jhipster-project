import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Visite } from 'app/shared/model/visite.model';
import { VisiteService } from './visite.service';
import { VisiteComponent } from './visite.component';
import { VisiteDetailComponent } from './visite-detail.component';
import { VisiteUpdateComponent } from './visite-update.component';
import { VisiteDeletePopupComponent } from './visite-delete-dialog.component';
import { IVisite } from 'app/shared/model/visite.model';

@Injectable({ providedIn: 'root' })
export class VisiteResolve implements Resolve<IVisite> {
    constructor(private service: VisiteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVisite> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Visite>) => response.ok),
                map((visite: HttpResponse<Visite>) => visite.body)
            );
        }
        return of(new Visite());
    }
}

export const visiteRoute: Routes = [
    {
        path: '',
        component: VisiteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.visite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: VisiteDetailComponent,
        resolve: {
            visite: VisiteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.visite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: VisiteUpdateComponent,
        resolve: {
            visite: VisiteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.visite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: VisiteUpdateComponent,
        resolve: {
            visite: VisiteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.visite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const visitePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: VisiteDeletePopupComponent,
        resolve: {
            visite: VisiteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.visite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
