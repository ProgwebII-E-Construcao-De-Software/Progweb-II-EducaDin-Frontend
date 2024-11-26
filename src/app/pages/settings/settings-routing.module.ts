import {Routes} from "@angular/router";
import {HomeComponent} from "../../core/home/home.component";
import {SettingsHomeComponent} from "./settings.home/settings.home.component";
import {SettingsFormComponent} from "./settings.form/settings.form.component";

export const settingsRoutes: Routes = [
    {
        path: "settings",
        component: SettingsHomeComponent,
        children: [
            {
                path: ":id",
                component: SettingsFormComponent
            }
        ],
        canActivate: [],
    }
]