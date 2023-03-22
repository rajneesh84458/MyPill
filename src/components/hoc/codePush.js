import React, {useEffect, useState, memo} from 'react';
import {Text, View, Modal, StyleSheet, ActivityIndicator, Platform} from 'react-native';
import codePush from 'react-native-code-push';
const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
};

const withCodePush = WrappedComponent => {
  const WrappedApp = () => {
    const [progress, setProgress] = useState(false);

    useEffect(() => {
      if(Platform.OS =='android'){
        codePush.notifyAppReady();
        codePush.sync(
          {
            updateDialog: true,
            installMode: codePush.InstallMode.IMMEDIATE,
          },
          codePushStatusDidChange, // syncStatusChangedCallback
          codePushDownloadDidProgress, // download progress
        );
      }
     
    }, []);
    const codePushStatusDidChange = status => {
      switch (status) {
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          console.log('Checking for update.');
          break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          console.log('Downloading package.');
          break;
        case codePush.SyncStatus.AWAITING_USER_ACTION:
          console.log('Awaiting user action.');
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          console.log('Installing update.');
          setProgress(false);
          break;
        case codePush.SyncStatus.UP_TO_DATE:
          console.log('App up to date.');
          setProgress(false);
          break;
        case codePush.SyncStatus.UPDATE_IGNORED:
          console.log('Update cancelled by user.');
          setProgress(false);
          break;
        case codePush.SyncStatus.UPDATE_INSTALLED:
          console.log('Update installed and will be applied on restart.');
          setProgress(false);
          break;
        case codePush.SyncStatus.UNKNOWN_ERROR:
          console.log('An unknown error occurred.');
          setProgress(false);
          break;
      }
    };

    const codePushDownloadDidProgress = progress => {
      setProgress(progress);
    };

    const showProgressView = () => {
      console.log('calling.......');
      return (
        <Modal visible={true} transparent>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.8)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                // width: 200,
                backgroundColor: '#fff',
                borderRadius: 10,
                padding: 16,
              }}>
              <Text style={{color: '#000'}}>Progress View</Text>
              <View style={{alignItems: 'center'}}>
                <Text style={{marginTop: 8}}>{`${(
                  Number(progress?.receivedBytes) / 1048576
                ).toFixed(2)} MB/${(
                  Number(progress?.totalBytes) / 1048576
                ).toFixed(2)}`}</Text>

                <ActivityIndicator
                  style={{marginVertical: 10}}
                  color="orange"
                />
                <Text style={{textAlign: 'center'}}>
                  {(
                    (Number(progress?.receivedBytes) /
                      Number(progress?.totalBytes)) *
                    100
                  ).toFixed(0)}{' '}
                  %
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      );
    };

    console.log('progress ====', progress);
    return (
      <>
        <View>{!!progress ? showProgressView() : null}</View>

        <WrappedComponent></WrappedComponent>
      </>
    );
  };
  return memo(codePush(codePushOptions)(WrappedApp));
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'while',
    borderRadius: 8,
    padding: 16,
  },
  messages: {
    marginTop: 30,
    textAlign: 'center',
  },
});
export default withCodePush;
