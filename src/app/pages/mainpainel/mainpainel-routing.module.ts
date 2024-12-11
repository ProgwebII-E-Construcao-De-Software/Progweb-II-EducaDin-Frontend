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

            }
        ],
    }
];