/**
 * This module sets up the application's routing.
 * It defines the routes that the application can navigate to,
 * and maps those routes to specific components.
 * @author Vincent Obahiagbon
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { SDGComponent } from './components/sdg/sdg.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TermsComponent } from './components/terms/terms.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { UploadComponent } from './components/Youri/upload/upload.component';
import { AccountComponent } from './components/account/account.component';
import { ContentComponent } from './components/content/content.component';
import { HomeComponent } from './components/home/home.component';
import { CommentComponent } from './components/Youri/comment/comment.component';
import { TestComponent } from './components/test/test.component';

/**
 * The application's routes.
 * Each route maps a URL path to a component.
 * @author Vincent Obahiagbon
 */

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'SDG', component: SDGComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'edit-account', component: EditAccountComponent },
    { path: 'upload', component: UploadComponent },
    { path: 'content', component: ContentComponent },
    { path: 'account', component: AccountComponent },
    { path: 'account/:username', component: AccountComponent },
    { path: 'project', component: CommentComponent },
    { path: 'test', component: TestComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
