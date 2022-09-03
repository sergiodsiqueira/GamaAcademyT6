import { Link } from 'react-router-dom';
import StyledContainer from './style';

function Contato() {
  return (
    <StyledContainer>
      <h1>Contato</h1>
      <Link to='/'>
        <button>VOLTAR</button>
      </Link>
    </StyledContainer>
  );
}

export default Contato;