import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import DashboardScreen from "./screen/dashboardScreen";
import AuthScreen from "./screen/authScreen";
import ScreenTransaksi from "./screen/screenTransaksi";
import ScreenPendaftaran from "./screen/screenPendaftaran";
import { createBottomTabNavigator, createAppContainer, createDrawerNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import ScreenSuksesPembayaran from './screen/screenSuksesPembayaran';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'
//import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenKatalog from './screen/screenKatalog';
import ScreenDetailTransaksi from './screen/screenDetailTransaksi';
import ScreenUbahPengguna from './screen/screenUbahPengguna';
import ScreenRiwayatTransaksi from './screen/screenRiwayatTransaksi';
import ScreenDetailRiwayatTransaksi from './screen/screenDetailRiwayatTransaksi';
import ScreenTataCaraTopup from './screen/screenTataCaraTopup';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainContainer />
    );
  }
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });





const StackContainer = createStackNavigator({
  Dashboard: {
    screen: DashboardScreen
  },
  UbahPengguna: {
    screen: ScreenUbahPengguna,
  },
  Transaksi: {
    screen: ScreenTransaksi,
  },
  Katalog: {
    screen: ScreenKatalog
  },
  DetailTransaksi: {
    screen: ScreenDetailTransaksi
  },
  SuksesPembayaran: {
    screen: ScreenSuksesPembayaran
  },
  Riwayat: {
    screen: ScreenRiwayatTransaksi
  },
  DetailRiwayat: {
    screen: ScreenDetailRiwayatTransaksi
  },
  TataCaraTopup: {
    screen: ScreenTataCaraTopup
  }
}, {
    initialRouteName: 'TataCaraTopup',
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    })
  })



const Drawer = createDrawerNavigator({
  Dashboard: StackContainer
}, {
    contentComponent: () => {
      return (
        <View style={{ flex: 1 }}>

          <View style={{ flex: 2, backgroundColor: '#03a2cb' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ width: 150, height: 150 }} source={require("./icon/boy.png")}></Image>
              <Text style={{ marginTop: 20, fontSize: 15, color: 'white' }}>Halo, Padang Perwira Yudha</Text>
            </View>
          </View>

          <View style={{ flex: 5, justifyContent: 'space-between' }}>

            <View style={{ height: 50, flexDirection: 'row' }}>

            </View>

            <View style={{ height: 50, flexDirection: 'row', backgroundColor: '#e6e6e6' }}>
              <View style={{ width: 100, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}><Image style={{ width: 20, height: 20, marginRight: 15 }} source={require("./icon/tools.png")}></Image></View>
              <View style={{ flex: 1, justifyContent: 'center' }}><Text>Pengaturan Profil</Text></View>
            </View>

          </View>

        </View>
      )
    }
  })




const AuthContainer = createSwitchNavigator({
  Auth: createStackNavigator({
    Auth: AuthScreen,
    Daftar: ScreenPendaftaran
  }),
  Dashboard: DashboardScreen
}, {
    initialRouteName: 'Auth'
  })



const MainContainer = createAppContainer(AuthContainer);

const styles = StyleSheet.create({

});
