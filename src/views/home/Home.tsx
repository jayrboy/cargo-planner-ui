import logo from '../../assets/react.svg';
import './Home.css';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Container, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="jumbotron">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1>Cargo Planner</h1>
          <Image src={logo} alt="logo" fluid />
          <p>
            Cargo Planner provides 3D solutions for truck loading problem. Begin
            by creating a new instance, or loading an existing one.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md="auto">
          {' '}
          <Link to="/cargo-edit/new">
            <Button variant="primary" size="lg">
              New cargo
            </Button>
          </Link>{' '}
          <Link to="/cargo-list">
            <Button variant="primary" size="lg">
              Load cargo
            </Button>
          </Link>{' '}
          <Link to="/result-list">
            <Button variant="primary" size="lg">
              View results
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
