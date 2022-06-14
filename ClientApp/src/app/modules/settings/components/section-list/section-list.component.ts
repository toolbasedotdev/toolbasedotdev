import { Component } from "@angular/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faWrench } from "@fortawesome/free-solid-svg-icons";

/**
 * A section / page of settings all related to one topic.
 */
interface Section {
    /**
     * Human-readable name of the topic.
     */
    name: string;

    /**
     * Used in routerLink directive.
     */
    route: string | null;

    /**
     * Font Awesome icon definition.
     */
    icon: IconDefinition;
}

/**
 * A list used to navigate all the settings sub-pages.
 */
@Component({
    selector: "settings-section-list",
    templateUrl: "./section-list.component.html",
    styleUrls: ["./section-list.component.scss"],
})
export class SectionListComponent {
    /**
     * Defines the sections list.
     */
    public sections: Section[] = [
        { name: "Your tools", route: "tools", icon: faWrench },
    ];
}
