import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StyledContainer from './style';

import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import {
  Button,
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  IconButton,
  TextField,
  Container,
  CircularProgress
} from '@mui/material';
import { text } from 'stream/consumers';

function Home() {
  const [isLoad, setIsLoad] = useState(true);
  return (
    <StyledContainer>
      {
        isLoad ? (Login()) : (Loading)
      }
    </StyledContainer>
  );
}

export default Home;

const urlBase = 'https://raw.githubusercontent.com/sergiodsiqueira/GamaAcademyT6/main/resources';
const uri = "https://bepsychologycenter.com/wp-content/uploads/2021/03/how-to-encourage-someone-to-see-a-psychologist.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const login = (pUsuario: string, pSenha: string) => {
    if (pUsuario == 'sergio@local.com' && pSenha == '123456') {
      navigate('/contato');
    }
  }
  
  return (
    <Grid container direction="row" justifyContent="space-between" overflow="hidden">

      <Grid width="50%" justifyContent="center">
        <form onSubmit={() => { }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", marginTop: '5%' }}>
            <img className='logomarca' src={urlBase + '/img/mentesa_logomarca_m.png'} style={{ width: 150 }}></img>
            <InputLabel></InputLabel>
            <TextField className='inputEmail' label="Email" onChange={e => { setEmail(e.target.value) }} />
            <TextField className='inputSenha' label="Senha" onChange={e => { setSenha(e.target.value) }} />
            <Button className='buttonLogin' onClick={() => {login(email,senha)}}>LOGIN</Button>
          </Box>
        </form>
      </Grid>

      <Grid width="50%" justifyContent="center" alignItems="center">
        <Box sx={{ display: 'flex' }}>
          <img src={uri} style={{ height: "100vh", justifyContent: 'center', objectFit: 'cover' }} />
        </Box>
      </Grid>

    </Grid>
  )
}

const Loading = (
  <Box sx={{
    display: 'flex',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <CircularProgress />
  </Box>
)