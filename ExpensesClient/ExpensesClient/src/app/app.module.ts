import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EntriesComponent } from './entries/entries.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { EntryService } from './entry.service';
import { AppRouterModule } from './app-router.module';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatListModule  } from '@angular/material/list'
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatIconModule } from '@angular/material/icon'

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdateEntryComponent } from './update-entry/update-entry.component'
import { DeleteEntryComponent } from './delete-entry/delete-entry.component';
import { AuthService } from './auth.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { JwtModule, JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";

@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    NewEntryComponent,
    FooterComponent,
    HeaderComponent,
    UpdateEntryComponent,
    DeleteEntryComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,

    HttpClientModule,

    BrowserAnimationsModule, MatButtonModule, MatTableModule, MatInputModule, MatCardModule, MatSelectModule,
    MatToolbarModule, MatDialogModule, MatListModule, MatSortModule, MatPaginatorModule, MatIconModule,

    ReactiveFormsModule, FormsModule,

    AppRouterModule,

    JwtModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      },
    }),
  ],
  entryComponents: [UpdateEntryComponent],
  providers: [EntryService, AuthService, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => localStorage.getItem('token_value'),
    allowedDomains: ['https://localhost:7115'],
    disallowedRoutes: ['example.com/login'],
  };
}
