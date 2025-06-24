import type { ServiceDefinition } from "../../../modularity/serviceDefinition";
import type { IPropertiesService } from "./propertiesService";
import type { ISelectionService } from "../../selectionService";

import { GeneralPropertiesSectionIdentity } from "./commonPropertiesService";
import { PropertiesServiceIdentity } from "./propertiesService";
import { SelectionServiceIdentity } from "../../selectionService";

import { Material } from "core/Materials";
import { MaterialGeneralProperties } from "../../../components/properties/materialGeneralProperties";
import { MaterialTransparencyProperties } from "../../../components/properties/materialTransparencyProperties";
import { MaterialStencilProperties } from "../../../components/properties/materialStencilProperties";

export const TransparencyPropertiesSectionIdentity = Symbol("Transparency");
export const StencilPropertiesSectionItentity = Symbol("Stencil");

export const MaterialPropertiesServiceDefinition: ServiceDefinition<[], [IPropertiesService, ISelectionService]> = {
    friendlyName: "Material Properties",
    consumes: [PropertiesServiceIdentity, SelectionServiceIdentity],
    factory: (propertiesService) => {
        // Transparency
        const transparencySectionRegistration = propertiesService.addSection({
            order: 1,
            identity: TransparencyPropertiesSectionIdentity,
        });

        // Stencil
        const stencilSectionRegistration = propertiesService.addSection({
            order: 2,
            identity: StencilPropertiesSectionItentity,
        });

        const abstractMeshContentRegistration = propertiesService.addSectionContent({
            key: "Material Properties",
            // Meshes without vertices are effectively TransformNodes, so don't add mesh properties for them.
            predicate: (entity: unknown): entity is Material => entity instanceof Material,
            content: [
                // "GENERAL" section.
                {
                    section: GeneralPropertiesSectionIdentity,
                    order: 2,
                    component: ({ context }) => <MaterialGeneralProperties material={context} />,
                },

                // "Transparency" section.
                {
                    section: TransparencyPropertiesSectionIdentity,
                    order: 0,
                    component: ({ context }) => <MaterialTransparencyProperties material={context} />,
                },

                // "Stencil" section.
                {
                    section: StencilPropertiesSectionItentity,
                    order: 0,
                    component: ({ context }) => <MaterialStencilProperties material={context} />,
                },

                // TODO: Animation grid section, if applicable.
                // <AnimationGridComponent globalState={this.props.globalState} animatable={material} scene={material.getScene()} lockObject={this.props.lockObject} />
            ],
        });

        // const outlineOverlaySectionRegistration = propertiesService.addSection({
        //     order: 0,
        //     identity: OutlineOverlayPropertiesSectionItentity,
        // });

        // const meshPropertiesContentRegistration = propertiesService.addSectionContent({
        //     key: "Mesh Properties",
        //     predicate: (entity: unknown): entity is Mesh => entity instanceof Mesh,
        //     content: [
        //         // "OUTLINES & OVERLAYS" section.
        //         {
        //             section: OutlineOverlayPropertiesSectionItentity,
        //             order: 0,
        //             component: ({ context }) => <MeshOutlineOverlayProperties mesh={context} />,
        //         },
        //     ],
        // });

        return {
            dispose: () => {
                abstractMeshContentRegistration.dispose();
                transparencySectionRegistration.dispose();
                stencilSectionRegistration.dispose();
            },
        };
    },
};
