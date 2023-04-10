import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import './index.css';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState('');
  const { TextArea } = Input;
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      await axios
        .post('https://uniswap-contract-checker.herokuapp.com/', {
          filterName: search,
        })
        .then((respose) => {
          setData(JSON.stringify(respose.data, null, 4));
          setLoading(false);
        });
    } catch (err) {
      console.log('err', err);
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <h2 style={{ marginBottom: 0 }}>Uniswap Graph Checker</h2>
      <Space>
        <Input
          style={{ width: '20em' }}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Token name or symbol"
        ></Input>
        <Button
          type="primary"
          onClick={() => {
            fetchData();
          }}
          loading={loading}
        >
          Check
        </Button>
      </Space>
      <TextArea
        style={{ width: '80%' }}
        placeholder="Results will be shown here"
        rows={40}
        value={data.toString()}
      ></TextArea>
    </div>
  );
}

export default App;
