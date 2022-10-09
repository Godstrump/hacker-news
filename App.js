import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import AppNavigator from './navigators/AppNavigator';
import SplashScreen from 'react-native-splash-screen';
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {PreferencesContext} from './PreferencesContext';
import {customThemeColors, customThemeFonts} from './utils/constants';
import {Provider as StoreProvider} from 'react-redux';
import store from './reduxers/store';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  myOwnProperty: true,
  colors: {
    ...PaperDefaultTheme?.colors,
    ...NavigationDefaultTheme?.colors,
    ...customThemeColors,
  },
  fonts: {
    ...customThemeFonts,
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme?.colors,
    ...NavigationDarkTheme?.colors,
    ...customThemeColors,
  },
  fonts: {
    ...customThemeFonts,
  },
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isThemeDark, setIsThemeDark] = React.useState(true);
  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  return (
    <StoreProvider store={store}>
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider
          settings={{
            icon: props => <Ionicons {...props} />,
          }}
          theme={theme}>
          <NavigationContainer theme={theme}>
            <AppNavigator />
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
    </StoreProvider>
  );
};

export default App;
