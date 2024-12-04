import { Navbar } from 'react-bootstrap';

const Footer = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Text>
      Cargo Planner by Jan Pajdak &amp; Wojciech Słowiński, 2020-
      {new Date().getFullYear()}
    </Navbar.Text>
  </Navbar>
);

export default Footer;
