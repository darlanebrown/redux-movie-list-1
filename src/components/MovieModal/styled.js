import styled from 'styled-components';
import { Modal, Col } from 'react-bootstrap';

export const StyledRBModalHeader = styled(Modal.Header)`
  border: 1px solid lightgray;
  background-color: whitesmoke;
`

export const StyledRBCol = styled(Col)`
  background-color: lightgray;
  padding: 0vw;

  & + & {
    background-color: white;
  }
`

export const StyledRBModalBody = styled(Modal.Body)`
  border: 1px solid lightgray;
  overflow: auto;
`;

