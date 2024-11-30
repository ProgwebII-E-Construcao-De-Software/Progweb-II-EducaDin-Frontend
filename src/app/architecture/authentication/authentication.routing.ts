import {Routes} from '@angular/router';
import {AuthenticationHomeComponent} from "./authentication-home/authentication-home.component";
import {AuthenticationComponent} from "./authentication-component/authentication.component";

export const authenticationRoutes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: AuthenticationHomeComponent,
        children: [{
            path: "",
            component: AuthenticationComponent
        }
        ]
    },
];

