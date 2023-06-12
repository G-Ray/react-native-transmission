import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import Transmission from 'react-native-transmission';

export default function App() {
  const [response, setResponse] = React.useState('');
  let tr = React.useRef<null | Transmission>(null);

  const handleInit = () => {
    tr.current = new Transmission(
      '/data/data/com.transmissionexample/files/transmission',
      'transmission'
    );

    tr.current?.request(
      {
        method: 'session-set',
        arguments: {
          'download-dir': '/data/data/com.transmissionexample/files/downloads',
        },
      },
      (err: string, res: string) => {
        if (err) {
          setResponse('Error: ' + err);
        }
        setResponse(res);
      }
    );

    tr.current?.request(
      {
        method: 'session-get',
        arguments: {
          fields: ['download-dir'],
        },
      },
      (err: string, res: string) => {
        if (err) {
          setResponse('Error: ' + err);
        }
        setResponse(res);
      }
    );
  };

  const handleRequest = async () => {
    const res = await tr.current?.request({
      method: 'port-test',
    });
    setResponse(res);
  };

  const handleAddTorrent = () => {
    tr.current?.request(
      {
        method: 'torrent-add',
        arguments: {
          filename: 'https://webtorrent.io/torrents/sintel.torrent',
        },
      },
      (err: string, res: string) => {
        if (err) {
          setResponse('Error: ' + err);
        }
        setResponse(res);
      }
    );
  };

  const handleListTorrents = () => {
    tr.current?.request(
      {
        method: 'torrent-get',
        arguments: {
          fields: [
            'id',
            'percentComplete',
            'error',
            'errorString',
            'downloadDir',
            'doneDate',
          ],
        },
      },
      (err: string, res: string) => {
        if (err) {
          setResponse('Error: ' + err);
        }
        setResponse(res);
      }
    );
  };

  const handleClose = () => {
    tr.current?.close();
  };

  return (
    <View style={styles.container}>
      <Button title="Init()" onPress={handleInit} />
      <Button title="request()" onPress={handleRequest} />
      <Button title="addTorrent()" onPress={handleAddTorrent} />
      <Button title="listTorrents" onPress={handleListTorrents} />
      <Button title="Close()" onPress={handleClose} />
      <Text>{JSON.stringify(response)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
