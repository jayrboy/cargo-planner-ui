import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Result } from '../../models/ListItem';
import { getResults } from '../../services/ResultService';
import { ListGroup, ButtonGroup } from 'react-bootstrap';
import { getUserId } from '../../services/UserService';

function ResultList() {
  const userId: string = getUserId();
  const navigate = useNavigate();
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const fetchInstances = async () => {
      const loadedResults: Result[] = await getResults(userId);
      setResults(loadedResults);
    };

    fetchInstances();
  }, []);

  function handleView(instanceId: string, resultId: string) {
    navigate('/result/' + instanceId + '/' + resultId + '/0');
  }

  return (
    <ListGroup>
      {results.map((result, i) => {
        return (
          <ListGroup.Item key={i}>
            {result.display + ', Instance [' + result.instanceId + ']'}

            <ButtonGroup className="float-right">
              <button
                className="btn btn-primary"
                onClick={() => handleView(result.instanceId, result.id)}
              >
                View result
              </button>
            </ButtonGroup>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default ResultList;
