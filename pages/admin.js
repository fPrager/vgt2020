import { useEffect, useState } from 'react';
import {
  Select, Button, Divider, InputNumber, Row, Col, Skeleton, Input,
} from 'antd';

import Data from '../mock/data.json';

const { TextArea } = Input;

const { Option } = Select;

export default () => {
  const [scores, setScores] = useState({});
  const [rules, setRules] = useState('');
  const [notes, setNotes] = useState('');
  const [gameId, setGameId] = useState(Data.games[0].id);
  const [loading, setLoading] = useState(false);
  const [savings, setSavings] = useState({});

  const requestScore = async () => {
    setLoading(true);

    const resScores = await fetch('./api/get-scores');
    const dataScores = await resScores.json();
    const scoresOfGame = Data.players.reduce((obj, p) => ({
      ...obj,
      [p.id]: (dataScores[p.id].find((s) => s.gameId === gameId) || {}).score || 0,
    }), {});
    setScores(scoresOfGame);

    const resGame = await fetch(`./api/get-game?gameId=${gameId}`);
    const dataGame = await resGame.json();

    setRules(dataGame.rules);
    setNotes(dataGame.notes);

    await new Promise((resolve) => (setTimeout(resolve, 1000)));
    setLoading(false);
  };

  const saveScores = async () => {
    setSavings({ ...savings, scores: true });
    const res = await fetch('./api/set-scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scores,
        gameId,
      }),
    });
    await new Promise((resolve) => (setTimeout(resolve, 1000)));
    setSavings({ ...savings, scores: false });
  };

  useEffect(() => {
    requestScore();
    return () => {};
  }, [gameId]);

  const GameSettings = (
    <>
      <Divider><div className="headline">Rules</div></Divider>
      <Row>
        <Col span="12">
          <TextArea value={rules} onChange={(e) => (setRules(e.target.value))} />
        </Col>
        <Col span="12" />
      </Row>
      <Button>Save</Button>
      <Divider><div className="headline">Notes</div></Divider>
      <Row>
        <Col span="12">
          <TextArea value={notes} onChange={(e) => (setNotes(e.target.value))} />
        </Col>
        <Col span="12">
          {notes}
        </Col>
      </Row>
      <Button>Save</Button>
      <Divider><div className="headline">Scores</div></Divider>
      {
        Object.keys(scores).map((pId) => {
          const player = Data.players.find((p) => p.id === pId);
          return (
            <Row>
              <Col span="4">
                <h3>{player.name}</h3>
              </Col>
              <Col span="12">
                <InputNumber
                  min={0}
                  value={scores[pId]}
                  onChange={(value) => {
                    setScores({
                      ...scores,
                      [pId]: value,
                    });
                  }}
                />
              </Col>
            </Row>
          );
        })
      }
      <Button loading={savings.scores} onClick={saveScores}>
        Save
      </Button>
    </>
  );

  return (
    <>
      <Select defaultValue={Data.games[0].id} style={{ width: 600 }} onChange={setGameId}>
        {Data.games.map((g) => (<Option value={g.id}>{g.title}</Option>))}
      </Select>
      { loading ? (<Skeleton />) : GameSettings }
    </>
  );
};
