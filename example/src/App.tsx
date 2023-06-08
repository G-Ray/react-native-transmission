import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import * as tr from 'react-native-transmission';

export default function App() {
  const [response, setResponse] = React.useState('');

  const handleInit = () => {
    tr.init(
      '/data/data/com.transmissionexample/files/transmission',
      'transmission'
    );

    tr.request(
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

    tr.request(
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

  const handleRequest = () => {
    tr.request(
      {
        method: 'port-test',
        // arguments: {
        //   fields: ['version'],
        // },
      },
      (err: string, res: string) => {
        if (err) {
          setResponse('Error: ' + err);
        }
        setResponse(res);
      }
    );
  };

  const handleAddTorrent = () => {
    tr.request(
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
    tr.request(
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
    tr.close();
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
