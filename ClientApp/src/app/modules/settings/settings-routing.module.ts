import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SubpageReposComponent } from "./components/subpage-repos/subpage-repos.component";
import { SettingsComponent } from "./settings.component";

const routes: Routes = [
    {
        path: "",
        component: SettingsComponent,
        children: [{ path: "repositories", component: SubpageReposComponent }],
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
