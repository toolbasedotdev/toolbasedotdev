import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageSettingsComponent } from "./components/page-settings/page-settings.component";
import { SubpageReposComponent } from "./components/subpage-repos/subpage-repos.component";

const routes: Routes = [
    {
        path: "",
        component: PageSettingsComponent,
        children: [{ path: "repos", component: SubpageReposComponent }],
    },
];

/**
 * Used to define the app's routing patterns
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule {}
