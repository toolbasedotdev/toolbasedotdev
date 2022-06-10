import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageSettingsComponent } from "./components/page-settings/page-settings.component";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SubpageReposComponent } from './components/subpage-repos/subpage-repos.component';

/**
 * Contains everything related to settings.
 */
@NgModule({
    imports: [CommonModule, SettingsRoutingModule],
    declarations: [PageSettingsComponent, SubpageReposComponent],
    exports: [PageSettingsComponent],
})
export class SettingsModule {}
