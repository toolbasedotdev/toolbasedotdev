/* eslint-disable jsdoc/require-jsdoc */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageHomeComponent } from "./components/page-home/page-home.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const modules = {
    settings: "./modules/settings/settings.module",
};

const routes: Routes = [
    { path: "", component: PageHomeComponent },
    {
        path: "signout",
        component: PageHomeComponent,
        data: { command: "signout" },
    },
    {
        path: "settings",
        data: { auth: true },
        loadChildren: () =>
            import(modules.settings).then((m) => m.SettingsModule),
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
