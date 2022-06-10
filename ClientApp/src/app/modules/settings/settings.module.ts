import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SubpageReposComponent } from "./components/subpage-repos/subpage-repos.component";
import { SectionListComponent } from "./components/section-list/section-list.component";
import { SettingsComponent } from "./settings.component";

/**
 * Contains everything related to settings.
 */
@NgModule({
    imports: [CommonModule, SettingsRoutingModule],
    declarations: [
        SettingsComponent,
        SubpageReposComponent,
        SectionListComponent,
    ],
    exports: [SettingsComponent],
})
export class SettingsModule {}
