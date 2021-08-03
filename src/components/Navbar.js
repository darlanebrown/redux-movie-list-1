import RBNavbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <RBNavbar bg="light" expand="lg">
      <Container>
        <RBNavbar.Brand as={Link} to="/">Movie Database</RBNavbar.Brand>
        <RBNavbar.Toggle />
        <RBNavbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/movie-list">Movie List</Nav.Link>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
}

export default Navbar;
