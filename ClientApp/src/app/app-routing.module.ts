import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageHomeComponent } from "./components/page-home/page-home.component";
import { PageLinkToolComponent } from "./components/page-link-tool/page-link-tool.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
    { path: "", component: PageHomeComponent },
    {
        path: "signout",
        component: PageHomeComponent,
        data: { command: "signout" },
    },
    { path: "link-tool", component: PageLinkToolComponent },
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
