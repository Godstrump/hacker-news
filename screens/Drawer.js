import React from 'react';
import {useTheme, TouchableRipple, Switch} from 'react-native-paper';
import {PreferencesContext} from '../PreferencesContext';
import {StyleSheet} from 'react-native';

const Drawer = () => {
  const theme = useTheme();
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);

  return (
    <TouchableRipple style={styles.switch} onPress={() => toggleTheme()}>
      <Switch
        style={[{backgroundColor: theme.colors.accent}]}
        color={'red'}
        value={isThemeDark}
      />
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  switch: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export default Drawer;
