import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageSettingsComponent } from "./components/page-settings/page-settings.component";

/**
 * Contains everything related to settings.
 */
@NgModule({
    declarations: [PageSettingsComponent],
    imports: [CommonModule],
})
export class SettingsModule {}
