import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LangSelectionScreen from '../Screens/LanguageSelection/LangSelectionScreen';
import NamePhoneScreen from '../Screens/NamePhone/NamePhoneScreen';
import PasswordScreen from '../Screens/Password/PasswordScreen';
import LocationInformationScreen from '../Screens/LocationInformation/LocationInformationScreen';
import RoleInformationScreen from '../Screens/RoleInformation/RoleInformationScreen';
import downloadPDFScreen from '../Screens/DownloadPDF/downloadPDFScreen';
import ForestFiSplashScreen from '../Screens/ForestFiSplash/ForestFiSplashScreen';
import RatiFiSplashScreen from '../Screens/RatiFiSplash/RatiFiSplashScreen';
import {useSelector} from 'react-redux';
import Loader from '../components/Loader';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const {registrationScreenCode, loading} = useSelector(
    state => state.entities.appUtil.appUtil,
  );

  return (
    <NavigationContainer>
      {loading && <Loader />}
      <Stack.Navigator
        initialRouteName="ForestFiSplash"
        screenOptions={{
          headerStyle: {
            // backgroundColor: 'green',
          },
          headerTitleStyle: {
            // color: 'white'
          },
        }}
      >
        <Stack.Screen
          name="ForestFiSplash"
          component={ForestFiSplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RatiFiSplash"
          component={RatiFiSplashScreen}
          options={{
            headerShown: false,
          }}
        />
        {
          <Stack.Screen
            name="LangSelection"
            component={LangSelectionScreen}
            options={{
              // headerShown: false,
              headerTitle: 'Please select a language',
            }}
          />
        }
        <Stack.Screen
          name="NamePhone"
          component={NamePhoneScreen}
          options={{
            // headerShown: false,
            headerTitle: 'Please enter Phone Number',
          }}
        />
        <Stack.Screen
          name="Password"
          component={PasswordScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LocationInformation"
          component={LocationInformationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RoleInformation"
          component={RoleInformationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DownloadPDF"
          component={downloadPDFScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
