import { RouterModule, Routes } from "@angular/router";

import { EntriesComponent } from "./entries/entries.component";
import { NewEntryComponent } from "./new-entry/new-entry.component";
import { NgModule } from "@angular/core";
import { DeleteEntryComponent } from "./delete-entry/delete-entry.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AuthService } from "./auth.service";

const routes: Routes = [
    { path: '', component: EntriesComponent },
    { path: 'entries', component: EntriesComponent },
    { path: 'new-entry', component: NewEntryComponent, canActivate: [AuthService] },
    { path: 'delete-entry/:id', component: DeleteEntryComponent, canActivate: [AuthService] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouterModule { }
