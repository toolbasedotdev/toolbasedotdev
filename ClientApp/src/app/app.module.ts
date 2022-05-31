// Modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppRoutingModule } from "./app-routing.module";

// Components
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { BannerComponent } from "./components/banner/banner.component";
import { BannerSearchbarComponent } from "./components/banner-searchbar/banner-searchbar.component";
import { NavComponent } from "./components/nav/nav.component";
import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";

// Services
import { GithubService } from "./services/github.service";
import { AccountService } from "./services/account.service";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        BannerComponent,
        BannerSearchbarComponent,
        NavComponent,
        NavMenuComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        FontAwesomeModule,
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
    ],
    providers: [AccountService, GithubService],
    bootstrap: [AppComponent],
})
export class AppModule {}
