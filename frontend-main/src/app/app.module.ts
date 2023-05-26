import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/Youri/navbar/navbar.component';
import { FooterComponent } from './components/Youri/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { SDGComponent } from './components/sdg/sdg.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TermsComponent } from './components/terms/terms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './components/alert/alert.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { MaterialExampleModule } from './material.module';
import { UploadComponent } from './components/Youri/upload/upload.component';
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './components/home/home.component';
import { ContentComponent } from './components/content/content.component';
import { ContentListComponent } from './components/content-list/content-list.component';
import { AmountOfResultsDropdownComponent } from './components/amount-of-results-dropdown/amount-of-results-dropdown.component';
import { ContentCardComponent } from './components/content-card/content-card.component';
import { CommentComponent } from './components/Youri/comment/comment.component';
import { ReplyComponent } from './components/Youri/reply/reply.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        ContactComponent,
        SDGComponent,
        AdminComponent,
        RegisterComponent,
        LoginComponent,
        TermsComponent,
        AlertComponent,
        EditAccountComponent,
        UploadComponent,
        AccountComponent,
        HomeComponent,
        ContentComponent,
        ContentListComponent,
        AmountOfResultsDropdownComponent,
        ContentCardComponent,
        CommentComponent,
        ReplyComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatIconModule,
        NgbAlertModule,
        MaterialExampleModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
