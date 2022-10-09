import {Alert as AlertMod} from 'react-native';

const Alert = (navigate, msg, title) => {
  return AlertMod.alert(
    `${title ? title : msg?.includes('success') ? 'Success' : 'Failed'}`,
    `${msg}`,
    [
      {
        text: 'Ok',
        onPress: () => navigate(),
      },
    ],
    {cancelable: false},
  );
};

export default Alert;
