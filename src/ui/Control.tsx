import { styled } from "@mui/material";
import type { FormControlProps } from "@mui/material/FormControl";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import type { ReactNode } from "react";

const SmallLabel = styled(FormLabel)({
    fontSize: "0.75rem",
    marginBottom: 4,
});

export function Control({
    label,
    children,
    ...props
}: { label: string; children: ReactNode } & FormControlProps) {
    return (
        <FormControl {...props}>
            <SmallLabel>{label}</SmallLabel>
            {children}
        </FormControl>
    );
}
