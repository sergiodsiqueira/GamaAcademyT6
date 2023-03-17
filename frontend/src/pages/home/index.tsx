import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import StyledContainer from './style';
import { api } from '../../services/api';
import { isEmail } from '../../lib/validators';

import { useSnackbar } from 'notistack';

import {
  InputLabel,
  TextField,
  Button,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material';

import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [open, setOpen] = useState(false);

  const login = (pUsuario: string, pSenha: string) => {
    if (pUsuario === 'sergio@local.com' && pSenha === '123456') {
      navigate('/contato');
    }
  }

  return (
    <StyledContainer>
      <Grid container direction="row" justifyContent="space-between" overflow="hidden">

        <Grid width="50%" justifyContent="center">
          <form onSubmit={() => { }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", marginTop: '5%' }}>
              <img id='logomarca' src={urlBase + '/img/mentesa_logomarca_m.png'} style={{ width: 150 }}></img>
              <InputLabel></InputLabel>
              <TextField className='inputEmail' label="Email" onChange={e => { setEmail(e.target.value) }} size='small' />
              <TextField className='inputSenha' label="Senha" onChange={e => { setSenha(e.target.value) }} size='small' />
              <Button className='buttonLogin' onClick={() => { login(email, senha) }}>LOGIN</Button>
              <Button className='buttonCadastrar' onClick={() => setOpen(true)}>CADASTRAR</Button>
            </Box>
          </form>

        </Grid>

        <Grid width="50%" justifyContent="center" alignItems="center">
          <Box sx={{ display: 'flex' }}>
            <img src={uri} style={{ height: "100vh", justifyContent: 'center', objectFit: 'cover' }} />
          </Box>
        </Grid>

      </Grid>
      <FormProfissional open={open} setOpen={setOpen} />
    </StyledContainer>
  );
}

export default Home;

const urlBase = 'https://raw.githubusercontent.com/sergiodsiqueira/GamaAcademyT6/main/resources';
const uri = "https://bepsychologycenter.com/wp-content/uploads/2021/03/how-to-encourage-someone-to-see-a-psychologist.jpg";

const FormProfissional = (props: any) => {
  const { open, setOpen } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [agree, setAgree] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);

  const handleSubmit = useCallback(() => {
    api.post('',)
  }, []);

  function clear() {
    setName('');
    setEmail('');
    setPass('');
    setPassConfirm('');
    setAgree(false);
    setShowPass(false);
    setShowPassConfirm(false);
    setOpen(false);
  }

  function confirm() {
    if (validate()) {
      enqueueSnackbar('Profissional cadastrado com sucesso!', {variant:'success'});
      clear();
    }
  }

  function validate() {
    if (name === '') {
      enqueueSnackbar('Nome do profissional em branco!', {variant:'error'});
      return false;
    }

    if (email === '') {
      enqueueSnackbar('Email do profissional em branco!', {variant:'error'});
      return false;
    }

    if (!isEmail(email)) {
      enqueueSnackbar('Email inválido!', {variant:'error'});
      return false;
    }

    if (pass === '' || passConfirm === '') {
      enqueueSnackbar('Verificar o preenchimento da senha!', {variant:'error'});
      return false;
    }

    if (pass !== passConfirm) {
      enqueueSnackbar('Senha não confere!', {variant:'error'});
      return false;
    }

    if (!agree) {
      enqueueSnackbar('E necessário aceitar os termos para completar seu cadastro!', {variant:'warning'});
      return false;
    }

    return true;
  }

  return (
    <Dialog open={open} onClose={setOpen}>
      <DialogTitle sx={{ justifyItems: 'center' }}>
        <img id='logomarca' src={urlBase + '/img/mentesa_marca_p.png'} style={{ width: 100 }} />
      </DialogTitle>
      <DialogContent className='divModalProfissional'>
        <Box display='flex' flexDirection='column' width='350px'>
          <Typography variant='h6' align='center'>Cadastro de Profissionais</Typography>
          <Typography variant='caption' align='center' color='gray' sx={{ marginBottom: '20px' }}>Crie sua conta e comece a desfrutar de nosso sistema</Typography>
          <TextField className='inputCadNome' label="Nome Completo" onChange={e => { setName(e.target.value) }} size='small' sx={{ marginBottom: '15px' }} />
          <TextField className='inputCadEmail' label="Email" onChange={e => { setEmail(e.target.value) }} size='small' sx={{ marginBottom: '15px' }} />

          <FormControl size='small' variant="outlined" sx={{ marginBottom: '15px' }}>
            <InputLabel htmlFor="inputCadSenha">Senha</InputLabel>
            <OutlinedInput
              className="inputCadSenha"
              type={showPass ? 'text' : 'password'}
              value={pass}
              onChange={(e) => { setPass(e.target.value) }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPass(!showPass)}
                    edge="end"
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Senha"
            />
          </FormControl>

          <FormControl size='small' variant="outlined" sx={{ marginBottom: '15px' }}>
            <InputLabel htmlFor="inputCadConfSenha">Confirmar Senha</InputLabel>
            <OutlinedInput
              className="inputCadConfSenha"
              type={showPassConfirm ? 'text' : 'password'}
              value={passConfirm}
              onChange={(e) => { setPassConfirm(e.target.value) }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassConfirm(!showPassConfirm)}
                    edge="end"
                  >
                    {showPassConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirmar Senha"
            />
          </FormControl>
          <FormGroup>
            <FormControlLabel control={
              <Checkbox className='checkAceitar' checked={agree} onChange={() => setAgree(!agree)} />
            } label="Aceito os termos e politicas de privacidade" />
          </FormGroup>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button className='buttonCadastrar' onClick={ confirm }>CADASTRAR</Button>
        <Button className='buttonCancelar' onClick={ clear }>CANCELAR</Button>
      </DialogActions>
    </Dialog>
  );
}
