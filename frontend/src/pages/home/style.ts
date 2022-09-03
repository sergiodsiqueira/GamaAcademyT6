import styled from 'styled-components';

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
   
    .logomarca{
        margin-top: 10px;
        margin-bottom: 50px;
    }
    .inputEmail, .inputSenha{
        margin-top: 30px;
        width: 50%;
        min-width: 200px;
    }
    .buttonLogin{
        margin-top: 30px;
        padding: 10px 50px 10px 50px;
    }

`

export default StyledContainer;