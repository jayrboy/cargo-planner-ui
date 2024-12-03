import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInstances } from '../../services/InstanceService';
import { Instance } from '../../models/ListItem';
import { Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { getUserId } from '../../services/UserService';

function CargoList() {
  const userId: string = getUserId();
  const navigate = useNavigate(); // ใช้ useNavigate แทน history.push

  const [instances, setInstances] = useState<Instance[]>([]);

  useEffect(() => {
    const fetchInstances = async () => {
      const loadedInstances: Instance[] = await getInstances(userId);
      setInstances(loadedInstances);
    };

    fetchInstances();
  }, [userId]);

  function handleEdit(instanceId: string) {
    navigate('/cargo-edit/' + instanceId); // ใช้ navigate แทน history.push
  }

  function handleSolve(instanceId: string) {
    navigate('/result/' + instanceId + '/solve/0'); // ใช้ navigate แทน history.push
  }

  return (
    <ListGroup>
      {instances.map((instance, i) => {
        return (
          <ListGroup.Item key={i}>
            {instance.display + ', ' + instance.itemCount + ' items'}

            <ButtonGroup className="float-right">
              <Button
                variant="secondary"
                onClick={() => handleEdit(instance.id)}
              >
                Edit
              </Button>
              <Button
                variant="primary"
                onClick={() => handleSolve(instance.id)}
              >
                Solve
              </Button>
            </ButtonGroup>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default CargoList;