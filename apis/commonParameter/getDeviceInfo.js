import NetInfo from '@react-native-community/netinfo';
export function getNetInfo () {
    NetInfo.fetch().then(state => {
        console.log('Connection type', state);
        console.log('Is connected?', state.isConnected);
      });
}

