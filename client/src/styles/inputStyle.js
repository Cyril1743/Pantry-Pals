import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    components: {
        Input: {
            baseStyle: {
                borderRadius: '10px',
                boxShadow: "#FFFDC 0px 0px 0px 2px, #FF9191 0px 4px 6px -1px"
            }
        }
    }
})

