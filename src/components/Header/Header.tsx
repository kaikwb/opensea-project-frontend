import {AppBar, Box, Button, Link, Toolbar} from "@mui/material";
import logo from '../../assets/logo.svg';

function Header() {
    return (
        <AppBar position="static" component="header" sx={{py: 2, maxWidth: "xl"}}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex'}}>
                    <Button color="inherit" component={Link} href="/">
                        Dados
                    </Button>
                    <Button color="inherit" component={Link} href="/about">
                        Sobre o Projeto
                    </Button>
                </Box>
                <Box sx={{position: 'absolute', left: '50%', transform: 'translateX(-50%)', height: '100%', py: 1}}>
                    <Link href="/">
                        <img src={logo} alt="Logo" style={{height: '100%'}}/>
                    </Link>
                </Box>
                <Box sx={{display: 'flex'}}/>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
