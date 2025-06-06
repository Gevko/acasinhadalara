// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from './widgets/footer/footer';
import { HeaderComponent } from './widgets/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, HeaderComponent, FooterComponent],
  templateUrl: `./app.html`,
  styleUrls: ['./app.scss']
})
export class AppComponent {
  constructor(_translateService: TranslateService) {
    _translateService.setDefaultLang('en');
  }
}