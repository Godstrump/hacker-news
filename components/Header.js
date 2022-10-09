import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import HamburgerIcon from '../components/Ham';

const Header = ({theme, handleNav, children}) => (
  <Appbar.Header style={styles.headerContainer}>
    {children}
    <HamburgerIcon handleNav={handleNav} theme={theme} />
  </Appbar.Header>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 19,
  },
});

export default Header;
