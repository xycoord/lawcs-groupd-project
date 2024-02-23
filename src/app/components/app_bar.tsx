import { Container } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export default function CustomAppBar() {
  return (
    <AppBar position="static" elevation={0}>
        <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SmartToyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Cormorant Garamond',
              fontWeight: 600,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PrivacyPilot (alpha)
          </Typography>      
        </Toolbar>
        </Container>
      </AppBar>
  );
} 