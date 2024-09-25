import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {MatTableModule} from "@angular/material/table";
import {BrowserModule} from "@angular/platform-browser";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        NavbarComponent,
        FooterComponent,
        HeaderComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'

})
export class AppComponent {
    title = 'Progweb-II-EducaDin-Frontend';
}
