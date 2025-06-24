// eslint-disable-next-line import/no-internal-modules
import { Engine } from "core/Engines/engine";
import { Material } from "core/Materials/material";

import type { FunctionComponent } from "react";

import { DropdownPropertyLine } from "shared-ui-components/fluent/hoc/dropdownPropertyLine";
import { SwitchPropertyLine } from "shared-ui-components/fluent/hoc/switchPropertyLine";
import { ButtonLine } from "shared-ui-components/fluent/hoc/buttonLine";
import { SyncedSliderLine } from "shared-ui-components/fluent/hoc/syncedSliderLine";
import { BoundPropertyLine } from "./boundPropertyLine";

const OrientationOptions = [
    { label: "<None>", value: Number.MAX_SAFE_INTEGER },
    { label: "Clockwise", value: Material.ClockWiseSideOrientation },
    { label: "Counterclockwise", value: Material.CounterClockWiseSideOrientation },
];

const DepthFunctionOptions = [
    { label: "<Engine Default>", value: 0 },
    { label: "Never", value: Engine.NEVER },
    { label: "Always", value: Engine.ALWAYS },
    { label: "Equal", value: Engine.EQUAL },
    { label: "Less", value: Engine.LESS },
    { label: "Less or equal", value: Engine.LEQUAL },
    { label: "Greater", value: Engine.GREATER },
    { label: "Greater or equal", value: Engine.GEQUAL },
    { label: "Not equal", value: Engine.NOTEQUAL },
];

export const MaterialGeneralProperties: FunctionComponent<{ material: Material }> = (props) => {
    const { material } = props;

    return (
        <>
            <BoundPropertyLine component={SwitchPropertyLine} key="Backface culling" label="Backface culling" target={material} propertyKey="backFaceCulling" />
            <BoundPropertyLine
                component={DropdownPropertyLine}
                key="Orientation"
                label="Orientation"
                target={material}
                propertyKey="sideOrientation"
                options={OrientationOptions}
            />
            <BoundPropertyLine component={SwitchPropertyLine} key="Disable lighting" label="Backface culling" target={material} propertyKey="disableLighting" />
            <BoundPropertyLine component={SwitchPropertyLine} key="Disable color write" label="Disable color write" target={material} propertyKey="disableColorWrite" />
            <BoundPropertyLine component={SwitchPropertyLine} key="Disable depth write" label="Disable depth write" target={material} propertyKey="disableDepthWrite" />
            <BoundPropertyLine
                component={DropdownPropertyLine}
                key="Depth function"
                label="Depth function"
                target={material}
                propertyKey="depthFunction"
                options={DepthFunctionOptions}
            />
            <BoundPropertyLine component={SwitchPropertyLine} key="Need depth pre-pass" label="Need depth pre-pass" target={material} propertyKey="needDepthPrePass" />
            <BoundPropertyLine component={SwitchPropertyLine} key="Wireframe" label="Wireframe" target={material} propertyKey="wireframe" />
            <BoundPropertyLine component={SwitchPropertyLine} key="Point cloud" label="Point cloud" target={material} propertyKey="pointsCloud" />
            <BoundPropertyLine component={SyncedSliderLine} key="Point size" label="Point size" target={material} propertyKey="pointSize" min={0} max={100} step={0.1} />
            <BoundPropertyLine component={SyncedSliderLine} key="Z-offset Factor" label="Z-offset Factor" target={material} propertyKey="zOffset" min={-10} max={10} step={0.1} />
            <BoundPropertyLine
                component={SyncedSliderLine}
                key="Z-offset Units"
                label="Z-offset Units"
                target={material}
                propertyKey="zOffsetUnits"
                min={-10}
                max={10}
                step={0.1}
            />
            <ButtonLine
                label="Dispose"
                onClick={() => {
                    material.dispose();
                }}
            />
        </>
    );
};
