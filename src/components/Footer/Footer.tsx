import {Box} from '@mui/material';
import logoNoaaNcei from '../../assets/logo-noaa-ncei.svg';
import logoBlueFuture from '../../assets/logo-blue-future.svg';
import logoFiap from '../../assets/logo-fiap.svg';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 4,
                backgroundColor: 'primary.main',
                width: '100%',
                maxWidth: 'xl'
            }}
        >
            <img src={logoNoaaNcei} alt="Logo NOAA NCEI" style={{height: '40px'}}/>
            <img src={logoBlueFuture} alt="Logo Blue Future" style={{height: '40px'}}/>
            <img src={logoFiap} alt="Logo FIAP" style={{height: '40px'}}/>
        </Box>
    );
}

export default Footer;
