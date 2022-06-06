// Modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppRoutingModule } from "./app-routing.module";

// Components
import { AppComponent } from "./app.component";
import { PageHomeComponent } from "./components/page-home/page-home.component";
import { BannerComponent } from "./components/banner/banner.component";
import { BannerSearchbarComponent } from "./components/banner-searchbar/banner-searchbar.component";
import { NavComponent } from "./components/nav/nav.component";
import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";

// Services
import { GithubService } from "./services/github/github.service";
import { AccountService } from "./services/account/account.service";
import { NavMenuItemComponent } from "./components/nav-menu-item/nav-menu-item.component";
import { NavMenuSeparatorComponent } from "./components/nav-menu-separator/nav-menu-separator.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { LogoComponent } from "./components/logo/logo.component";
import { PageLinkToolComponent } from "./components/page-link-tool/page-link-tool.component";

@NgModule({
    declarations: [
        AppComponent,
        PageHomeComponent,
        PageNotFoundComponent,

        BannerComponent,
        BannerSearchbarComponent,
        NavComponent,
        NavMenuComponent,
        NavMenuItemComponent,
        NavMenuSeparatorComponent,
        LogoComponent,
        PageLinkToolComponent,
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
// eslint-disable-next-line jsdoc/require-jsdoc
export class AppModule {}
