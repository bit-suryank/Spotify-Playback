import { createTheme } from "@material-ui/core";

const theme = createTheme({
    palette:{
        primary:
        {
            main:"#1DB954"
        },
        secondary:
        {
            main:"#191414",
        }
    }
})

export const play = createTheme({
    palette:{
        primary:
        {
            main:"#191414"
        },
        secondary:
        {
            main:"#ffffff",
        }
    },
    components: {
        MuiSvgIcon: {
          style: {
            root: {
              width: '2rem',
              height: '2rem'
            },
          },
        },
      },
})

export default theme