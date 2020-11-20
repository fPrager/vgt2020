import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import {
  Select, Button, Divider, InputNumber, Row, Col, Skeleton, Input, Switch,
} from 'antd';

import Data from '../mock/data.json';

const { TextArea } = Input;

const { Option } = Select;

const shuffle = (array) => {
  let currentIndex = array.length; let temporaryValue; let
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const formatWords = (words, symbol) => words.split(', ').reduce((str, w, index) => (
  `${str}
  ${index + 1}. ${symbol}${w}${symbol}`
), '');

const randomMapTeams = () => {
  const fabi = Data.players.find((p) => p.id === 'fabi');
  const dani = Data.players.find((p) => p.id === 'dani');
  const restPlayers = Data.players.filter((p) => p.id !== 'dani' && p.id !== 'fabi');
  shuffle(restPlayers);
  const half = Math.ceil(restPlayers.length / 2);
  const firstHalf = restPlayers.splice(0, half);
  const secondHalf = restPlayers.splice(-half);
  return [[dani, ...firstHalf], [fabi, ...secondHalf]];
};

const randomTeams = () => {
  const players = [...Data.players];
  shuffle(players);
  const half = Math.ceil(players.length / 2);
  const firstHalf = players.splice(0, half);
  const secondHalf = players.splice(-half);
  return [firstHalf, secondHalf];
};

export default () => {
  const [scores, setScores] = useState({});
  const [rules, setRules] = useState('');
  const [notes, setNotes] = useState('');
  const [gameId, setGameId] = useState(Data.games[0].id);
  const [loading, setLoading] = useState(false);
  const [savings, setSavings] = useState({});
  const [final, setFinal] = useState(false);

  // general team stuff
  const [outputTeams, setOutputTeams] = useState('');

  const formatRandomTeams = () => {
    const [teamO, teamB] = randomTeams();
    setOutputTeams(`${teamO.map((p) => p.name).join(', ')}#${teamB.map((p) => p.name).join(', ')}`);
  };

  // maps stuff
  const [outputMapTeams, setOutputMapTeams] = useState('');
  const [inputMapWords, setInputMapWords] = useState('?, ?, ?, ?, ?, ?, ?, ?, ?, ?#?, ?, ?, ?, ?, ?, ?, ?, ?, ?');
  const [outputMapWords, setOutputMapWords] = useState('');

  const formatInputMapWords = () => {
    const [orangeWords, blueWords] = inputMapWords.split('#');
    setOutputMapWords(`${formatWords(orangeWords, '*')}#${formatWords(blueWords, '**')}`);
  };

  const formatRandomMapTeams = () => {
    const [danisTeam, fabisTeam] = randomMapTeams();
    setOutputMapTeams(`${fabisTeam.map((p) => p.name).join(', ')}#${danisTeam.map((p) => p.name).join(', ')}`);
  };

  const requestGameData = async () => {
    setLoading(true);

    const resScores = await fetch('/api/get-scores');
    const dataScores = await resScores.json();
    const scoresOfGame = Data.players.reduce((obj, p) => ({
      ...obj,
      [p.id]: (dataScores[p.id].find((s) => s.gameId === gameId) || {}).score || 0,
    }), {});
    setScores(scoresOfGame);

    const resGame = await fetch(`/api/get-game?gameId=${gameId}`);
    const dataGame = await resGame.json();

    setRules(dataGame.rules);
    setNotes(dataGame.notes);

    await new Promise((resolve) => (setTimeout(resolve, 1000)));
    setLoading(false);

    const resFinal = await fetch('/api/get-final');
    const dataFinal = await resFinal.json();
    setFinal(dataFinal.final);
  };

  const changeFinalState = async (flag) => {
    setFinal(flag);
    await fetch('/api/set-final', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        final: flag,
      }),
    });
  };

  const saveScores = async () => {
    setSavings({ ...savings, scores: true });
    await fetch('/api/set-scores', {
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

  const saveRules = async () => {
    setSavings({ ...savings, rules: true });
    await fetch('/api/set-game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rules,
        gameId,
      }),
    });
    await new Promise((resolve) => (setTimeout(resolve, 1000)));
    setSavings({ ...savings, rules: false });
  };

  const saveNotes = async () => {
    setSavings({ ...savings, notes: true });
    await fetch('/api/set-game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notes,
        gameId,
      }),
    });
    await new Promise((resolve) => (setTimeout(resolve, 1000)));
    setSavings({ ...savings, notes: false });
  };

  useEffect(() => {
    requestGameData();
    return () => {};
  }, [gameId]);

  const MapsTeams = (
    <>
      <Divider />
      <Row gutter={[10, 10]}>
        <Col span="11">
          <Input addonBefore="Team Orange (Fabi): " value={outputMapTeams.split('#')[0]} readOnly />
        </Col>
        <Col span="2" />
        <Col span="11">
          <Input addonBefore="Team Blue (Dani): " value={outputMapTeams.split('#')[1]} readOnly />
        </Col>
      </Row>
      <Row justify="center">
        <Col><Button onClick={formatRandomMapTeams}>Shuffle Teams</Button></Col>
      </Row>

      <Divider />
      <Row gutter={[10, 10]}>
        <Col span="11">
          <Input addonBefore="Danis Words: " value={inputMapWords.split('#')[0]} onChange={(e) => (setInputMapWords(`${e.target.value}#${inputMapWords.split('#')[1]}`))} />
          <TextArea addonBefore="Formatted Words: " value={outputMapWords.split('#')[0]} readOnly />
        </Col>
        <Col span="2" />
        <Col span="11">
          <Input addonBefore="Fabis Words: " value={inputMapWords.split('#')[1]} onChange={(e) => (setInputMapWords(`${inputMapWords.split('#')[0]}#${e.target.value}`))} />
          <TextArea addonBefore="Formatted Words: " value={outputMapWords.split('#')[1]} readOnly />
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Button onClick={formatInputMapWords}>Format Words as Numbered List</Button>
        </Col>
      </Row>
    </>
  );

  const SplitTeams = (
    <>
      <Divider />
      <Row gutter={[10, 10]}>
        <Col span="11">
          <Input addonBefore="Orange Team: " value={outputTeams.split('#')[0]} readOnly />
        </Col>
        <Col span="2" />
        <Col span="11">
          <Input addonBefore="Blue Team: " value={outputTeams.split('#')[1]} readOnly />
        </Col>
      </Row>
      <Row justify="center">
        <Col><Button onClick={formatRandomTeams}>Shuffle Teams</Button></Col>
      </Row>
    </>
  );

  const GameSettings = (
    <>
      <Divider><div className="headline">Rules</div></Divider>
      <Row>
        <Col span="11">
          <TextArea className="clean-input" autoSize value={rules} onChange={(e) => (setRules(e.target.value))} />
        </Col>
        <Col span="2" />
        <Col span="11">
          <div className="rules">
            <ReactMarkdown>{rules}</ReactMarkdown>
          </div>
        </Col>
      </Row>
      <Button loading={savings.rules} onClick={saveRules}>Save</Button>
      <Divider><div className="headline">Notes</div></Divider>
      <Row>
        <Col span="11">
          <TextArea className="clean-input" autoSize value={notes} onChange={(e) => (setNotes(e.target.value))} />
        </Col>
        <Col span="2" />
        <Col span="11">
          <div className="notes">
            <ReactMarkdown>{notes}</ReactMarkdown>
          </div>
        </Col>
      </Row>
      <Button loading={savings.notes} onClick={saveNotes}>Save</Button>
      {
            gameId === 'maps' && MapsTeams
          }
      {
            (gameId === 'ball' || gameId === 'cs') && SplitTeams
          }
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
      <Row justify="end">
        <Col>
          <h3>Activate Confetti Power</h3>
          <Switch loading={loading} checked={final} onChange={changeFinalState} />
        </Col>
      </Row>
      <Divider />
      <Select defaultValue={Data.games[0].id} style={{ width: 600 }} onChange={setGameId}>
        {Data.games.map((g) => (<Option value={g.id}>{g.title}</Option>))}
      </Select>
      { loading ? (<Skeleton />) : GameSettings }
    </>
  );
};
