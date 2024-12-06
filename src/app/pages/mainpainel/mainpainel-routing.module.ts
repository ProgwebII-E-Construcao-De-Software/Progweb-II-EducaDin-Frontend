import {Routes} from "@angular/router";
import {MainpainelHomeComponent} from "./mainpainel-home/mainpainel-home.component";
import {MainpainelSystemComponent} from "./mainpainel-system/mainpainel-system.component";

export const mainpainelRoutes: Routes = [
    {
        path: "painel",
        component: MainpainelHomeComponent,
        children: [
            {
                path: "",
                component: MainpainelSystemComponent,
                //canActivate: [SecurityGuard],
                //data: {security: {roles: ['ROLE_PRODUTO_INCLUIR', 'ROLE_PRODUTO_ALTERAR']}}

            }
        ],
        // canActivate: [SecurityGuard],
        // data: {security: {roles: ['ROLE_INCOME_REMOVEALL']}}
    }
];