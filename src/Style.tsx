import {Box, GridItem, Text} from "@chakra-ui/react";
import * as React from "react";

export { Box } from '@chakra-ui/react';

export const Explanation = ({children}) => (
    <Text align={"center"} color={"gray.500"} fontSize={"sm"}>
        {children}
    </Text>
);
export const DateExpression = ({children}) => (
    <Text align={"center"} color={"gray.500"}>
        {children}
    </Text>
);
export const Result = ({children, ...props}) => (
    <Text align={"center"} fontSize={"2xl"} {...props}>
        {children}
    </Text>
);
export const Pill = ({children, ...props}) => (
    <Box px={2} borderRadius={"xl"} cursor={"pointer"} {...props}>
        {children}
    </Box>
);
export const SelectedPill = ({children, ...props}) => (
    <Pill bg={"cyan.500"} color={"white"} {...props}>
        {children}
    </Pill>
);
export const MidTitle: React.FC = ({children}) => (
    <GridItem display="flex" alignItems="center" justifyContent="flex-end">
        {children}
    </GridItem>
);
export const ContentItem: React.FC = ({children}) => (
    <GridItem display="flex" justifyContent="center">
        {children}
    </GridItem>
);