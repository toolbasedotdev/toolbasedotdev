import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    {
        path: "signout",
        component: HomeComponent,
        data: { command: "signout" },
    },
    { path: "**", pathMatch: "full", component: PageNotFoundComponent },
];

/**
 * Used to define the app's routing patterns
 */
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
