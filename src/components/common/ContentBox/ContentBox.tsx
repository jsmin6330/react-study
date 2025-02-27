import { FC } from "react";
import { Box, Title } from "./styled";

export interface IContentBoxProps {
    children?: React.ReactNode | React.ReactNode[];
}

interface ContentBoxProps {
    title?: string;
    variant?: "default" | "primary" | "danger" | "success" | "warning" | "info" | "dark" | "light";
    fullWidth?: boolean;
    bordered?: boolean;
    fontSize?: "small" | "medium" | "large";
    children?: React.ReactNode;
}

export const ContentBox: FC<ContentBoxProps> = ({
    title,
    variant = "default",
    fullWidth = false,
    bordered = false,
    fontSize = "medium",
    children,
}) => {
    return (
        <Box variant={variant} fullWidth={fullWidth} bordered={bordered} fontSize={fontSize}>
            {title && <Title>{title}</Title>}
            {children}
        </Box>
    );
};
