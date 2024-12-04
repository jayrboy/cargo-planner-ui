import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResult } from '../../services/ResultService';
import { Container, Card, ListGroup, Col, Row } from 'react-bootstrap';
import { Truck, Item, defaultTruck } from '../../models/Result';
import { solveInstance } from '../../services/InstanceService';
import ViewResultCanvas from './ViewResultCanvas';

function ViewResult() {
  const { instanceId, resultId, truckIndex } = useParams(); // ดึงค่าพารามิเตอร์จาก URL
  const navigate = useNavigate(); // ใช้แทน history
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [truck, setTruck] = useState<Truck>(defaultTruck());
  const [selectedItem, setSelectedItem] = useState<Item>();

  useEffect(() => {
    const fetchResult = async () => {
      if (resultId === 'solve') {
        const newResultId = await solveInstance(instanceId!);
        navigate(`/result/${instanceId}/${newResultId}/0`, { replace: true });
        return;
      }

      const loadedResult = await getResult(resultId!);
      setTruck({
        ...loadedResult.trucks[Number(truckIndex!)],
        items: [...loadedResult.trucks[Number(truckIndex!)].items],
      });
      setTrucks(loadedResult.trucks);
    };

    fetchResult();
  }, [instanceId, resultId, truckIndex, navigate]);

  function SelectedItem() {
    if (selectedItem != null) {
      return (
        <Card style={{ margin: 10 }}>
          <Card.Body>
            <Card.Title>Selected item </Card.Title>
            <Card.Text>
              {selectedItem.description === ''
                ? 'No description'
                : selectedItem.description}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              {selectedItem.depth}0 x {selectedItem.width}0 x{' '}
              {selectedItem.height}0 cm
            </ListGroup.Item>
            <ListGroup.Item>{selectedItem.weight}0 kg</ListGroup.Item>
          </ListGroup>
        </Card>
      );
    } else {
      return (
        <Card style={{ margin: 10 }}>
          <Card.Body>
            <Card.Title>No item selected </Card.Title>
          </Card.Body>
        </Card>
      );
    }
  }

  return (
    <div
      style={{
        height: '100%',
        position: 'absolute',
        left: '0px',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Container fluid>
        <Row>
          <ViewResultCanvas truck={truck} boxClickHandler={setSelectedItem} />
        </Row>
        <Row>
          <Col>
            <ListGroup>
              {trucks.map((truck, i) => (
                <button
                  key={i}
                  onClick={() =>
                    navigate(`/result/${instanceId}/${resultId}/${i}`)
                  }
                >
                  Truck {i + 1}
                </button>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <SelectedItem />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ViewResult;
