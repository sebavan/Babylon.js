// eslint-disable-next-line import/no-internal-modules
import type { Material } from "core/Materials/material";
import { Constants } from "core/Engines/constants";

import type { FunctionComponent } from "react";

import { DropdownPropertyLine } from "shared-ui-components/fluent/hoc/dropdownPropertyLine";
import { SwitchPropertyLine } from "shared-ui-components/fluent/hoc/switchPropertyLine";
import { HexPropertyLine } from "shared-ui-components/fluent/hoc/hexLineComponent";
import { FloatInputPropertyLine } from "shared-ui-components/fluent/hoc/inputPropertyLine";
import { BoundPropertyLine } from "./boundPropertyLine";
import { useInterceptObservable } from "../../hooks/instrumentationHooks";
import { useObservableState } from "../../hooks/observableHooks";

const StencilFunctionOptions = [
    { label: "Never", value: Constants.NEVER },
    { label: "Always", value: Constants.ALWAYS },
    { label: "Equal", value: Constants.EQUAL },
    { label: "Less", value: Constants.LESS },
    { label: "Less or equal", value: Constants.LEQUAL },
    { label: "Greater", value: Constants.GREATER },
    { label: "Greater or equal", value: Constants.GEQUAL },
    { label: "Not equal", value: Constants.NOTEQUAL },
];

const StencilOperationOptions = [
    { label: "Keep", value: Constants.KEEP },
    { label: "Zero", value: Constants.ZERO },
    { label: "Replace", value: Constants.REPLACE },
    { label: "Incr", value: Constants.INCR },
    { label: "Decr", value: Constants.DECR },
    { label: "Invert", value: Constants.INVERT },
    { label: "Incr wrap", value: Constants.INCR_WRAP },
    { label: "Decr wrap", value: Constants.DECR_WRAP },
];

export const MaterialStencilProperties: FunctionComponent<{ material: Material }> = (props) => {
    const { material } = props;

    const stencil = useObservableState(() => material.stencil, useInterceptObservable("property", material, "stencil"));

    return (
        material.stencil && (
            <>
                <BoundPropertyLine component={SwitchPropertyLine} key="Stencil Enabled" label="Enabled" target={stencil} propertyKey="enabled" />
                <BoundPropertyLine component={HexPropertyLine} key="Stencil Mask" label="Mask" target={stencil} propertyKey="mask" />
                <BoundPropertyLine component={DropdownPropertyLine} key="Stencil Function" label="Function" target={stencil} propertyKey="func" options={StencilFunctionOptions} />
                <BoundPropertyLine component={FloatInputPropertyLine} key="Stencil Function reference" label="Function reference" target={stencil} propertyKey="funcRef" />
                <BoundPropertyLine component={HexPropertyLine} key="Stencil Function mask" label="Function mask" target={stencil} propertyKey="funcMask" />
                <BoundPropertyLine
                    component={DropdownPropertyLine}
                    key="Op stencil fail"
                    label="Op stencil fail"
                    target={stencil}
                    propertyKey="opStencilFail"
                    options={StencilOperationOptions}
                />
                <BoundPropertyLine
                    component={DropdownPropertyLine}
                    key="Op depth fail"
                    label="Op depth fail"
                    target={stencil}
                    propertyKey="opDepthFail"
                    options={StencilOperationOptions}
                />
                <BoundPropertyLine
                    component={DropdownPropertyLine}
                    key="Op stencil+depth pass"
                    label="Op stencil+depth pass"
                    target={stencil}
                    propertyKey="opStencilDepthPass"
                    options={StencilOperationOptions}
                />
            </>
        )
    );
};
