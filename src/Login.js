import { Button, ThemeProvider} from "@material-ui/core"
import theme from "./Theme"


export default function Login() {
    return(
        <ThemeProvider theme={theme}>
            <Button href="/auth/login" variant="contained" color="primary" style={{borderRadius: "32px"}} >Connect To Spotify</Button>
        </ThemeProvider>
    )
}
