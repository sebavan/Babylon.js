// eslint-disable-next-line import/no-internal-modules
import { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { Material } from "core/Materials/material";

import type { FunctionComponent } from "react";

import { DropdownPropertyLine } from "shared-ui-components/fluent/hoc/dropdownPropertyLine";
import { SwitchPropertyLine } from "shared-ui-components/fluent/hoc/switchPropertyLine";
import { SyncedSliderLine } from "shared-ui-components/fluent/hoc/syncedSliderLine";
import { AlphaModeOptions } from "shared-ui-components/constToOptionsMaps";
import { BoundPropertyLine } from "./boundPropertyLine";

const TransparencyModeOptions = [
    { label: "<Not Defined>", value: Number.MAX_SAFE_INTEGER },
    { label: "Opaque", value: PBRMaterial.PBRMATERIAL_OPAQUE },
    { label: "Alpha test", value: PBRMaterial.PBRMATERIAL_ALPHATEST },
    { label: "Alpha blend", value: PBRMaterial.PBRMATERIAL_ALPHABLEND },
    { label: "Alpha blend and test", value: PBRMaterial.PBRMATERIAL_ALPHATESTANDBLEND },
];

export const MaterialTransparencyProperties: FunctionComponent<{ material: Material }> = (props) => {
    const { material } = props;

    return (
        <>
            <BoundPropertyLine component={SyncedSliderLine} key="Alpha" label="Alpha" target={material} propertyKey="alpha" min={0} max={1} step={0.01} />
            {(material as any).transparencyMode !== undefined && (
                <BoundPropertyLine
                    component={DropdownPropertyLine}
                    key="Transparency mode"
                    label="Transparency mode"
                    target={material}
                    propertyKey="transparencyMode"
                    options={TransparencyModeOptions}
                />
            )}
            <BoundPropertyLine component={DropdownPropertyLine} key="Alpha mode" label="Alpha mode" target={material} propertyKey="alphaMode" options={AlphaModeOptions} />
            {(material as any).diffuseTexture && (
                <BoundPropertyLine
                    component={SwitchPropertyLine}
                    key="Diffuse texture has alpha"
                    label="Diffuse texture has alpha"
                    target={(material as any).diffuseTexture}
                    propertyKey="hasAlpha"
                />
            )}
            {(material as any).useAlphaFromDiffuseTexture !== undefined && (
                <BoundPropertyLine
                    component={SwitchPropertyLine}
                    key="Use alpha from diffuse texture"
                    label="Use alpha from diffuse texture"
                    target={material}
                    propertyKey="useAlphaFromDiffuseTexture"
                />
            )}
            {(material as any).albedoTexture && (
                <BoundPropertyLine
                    component={SwitchPropertyLine}
                    key="Albedo texture has alpha"
                    label="Albedo texture has alpha"
                    target={(material as any).albedoTexture}
                    propertyKey="hasAlpha"
                />
            )}
            {(material as any).useAlphaFromAlbedoTexture !== undefined && (
                <BoundPropertyLine
                    component={SwitchPropertyLine}
                    key="Use alpha from albedo texture"
                    label="Use alpha from albedo texture"
                    target={material}
                    propertyKey="useAlphaFromAlbedoTexture"
                />
            )}
            <BoundPropertyLine component={SwitchPropertyLine} key="Separate culling pass" label="Separate culling pass" target={material} propertyKey="separateCullingPass" />
        </>
    );
};
