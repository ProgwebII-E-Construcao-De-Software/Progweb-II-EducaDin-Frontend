import {Routes} from "@angular/router";
import {HomeComponent} from "../../core/home/home.component";
import {SettingsHomeComponent} from "./settings.home/settings.home.component";
import {SettingsFormComponent} from "./settings.form/settings.form.component";
import {SecurityGuard} from "../../arquitetura/security/security.guard";

export const settingsRoutes: Routes = [
    {
        path: "settings",
        component: SettingsHomeComponent,
        canActivate: [SecurityGuard],
        children: [
            {
                path: ":id",
                component: SettingsFormComponent
            }
        ],

    }
]