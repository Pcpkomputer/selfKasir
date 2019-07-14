import React from "react";
import { Dimensions, StyleSheet, TouchableHighlight, Text, View, ImageBackground, Image, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { BoxShadow } from 'react-native-shadow';
import { Font } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenKatalog from './screenKatalog'
import ScreenSuksesPembayaran from './screenSuksesPembayaran';
import ScreenDetailTransaksi from './screenDetailTransaksi';
import ScreenRiwayatTransaksi from './screenRiwayatTransaksi';
import ScreenDetailRiwayatTransaksi from './screenDetailRiwayatTransaksi';
import ScreenTataCaraTopup from './screenTataCaraTopup';
import AuthScreen from "./authScreen";
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import ScreenTransaksi from "./screenTransaksi";
import ScreenUbahPengguna from "./screenUbahPengguna";
import { createBottomTabNavigator, createAppContainer, createDrawerNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
var credentials = null;
var berpindah = null;


export default class DashboardScreen extends React.Component {
    constructor(props) {
        super(props);
        credentials = this.props.navigation.getParam('payload');
        var { navigate } = this.props.navigation;
        berpindah = navigate
    }
    render() {
        return (
            <Main />
        )
    }
}

class DashboardScreen_ extends React.Component {

    constructor(props) {
        super(props);
        var { navigate } = this.props.navigation;
        berpindah = navigate
        this._onRefresh = this._onRefresh.bind(this);
        //
        let currentJam = new Date().getHours();
        if (currentJam >= 7 && currentJam < 12) {
            sapaan = "Selamat Pagi";
        }
        else if (currentJam >= 12 && currentJam < 15) {
            sapaan = "Selamat Siang";
        }
        else if (currentJam >= 15 && currentJam < 18) {
            sapaan = "Selamat Sore";
        }
        else {
            sapaan = "Selamat Malam";
        }
        //

        this.state = {
            refreshing: false,
            sapaan: sapaan,
            saldo: 0,
            contentIsLoaded: false,
            refreshing: false,
            elementShadowWidth: 0,
            elementShadowHeight: 1,
            fontLoaded: false,
        }

        this.formatrupiah = this.formatrupiah.bind(this);
    }


    static navigationOptions = {
        header: null
    }

    async refreshData() {
        let cc = await fetch(`https://serverselfkasir.herokuapp.com/ubahDetailPengguna`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                token: credentials.token
            })
        })
        cc = await cc.json();
        let saldo = await fetch(`https://serverselfkasir.herokuapp.com/checkSaldo?token=${credentials.token}`);
        saldo = await saldo.json();
        credentials.nama = cc.parsed.nama;
        this.setState({ saldo: saldo.total, contentIsLoaded: true });
        this.setState({ fontLoaded: true });
    }


    formatrupiah = (angka) => {
        var rupiah = "";
        var angkarev = angka
            .toString()
            .split("")
            .reverse()
            .join("");
        for (var i = 0; i < angkarev.length; i++)
            if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
        return rupiah
            .split("", rupiah.length - 1)
            .reverse()
            .join("");
    }

    async componentDidMount() {
        await Font.loadAsync({
            'open-sans-bold': require('../fonts/OpenSans-Regular.ttf'),
            'open-sans-boldd': require('../fonts/OpenSans-Bold.ttf'),
            'open-sans-extrabold': require('../fonts/OpenSans-ExtraBold.ttf'),
            'roboto-regular': require('../fonts/Roboto-Regular.ttf')
        });
        let cc = await fetch(`https://serverselfkasir.herokuapp.com/ubahDetailPengguna`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                token: credentials.token
            })
        })
        cc = await cc.json();
        let saldo = await fetch(`https://serverselfkasir.herokuapp.com/checkSaldo?token=${credentials.token}`);
        saldo = await saldo.json();
        credentials.nama = cc.parsed.nama;
        this.setState({ saldo: saldo.total, contentIsLoaded: true });
        this.setState({ fontLoaded: true });


    }

    async _onRefresh() {
        this.setState({ refreshing: true });
        let a = await this.refreshData();
        this.setState({ refreshing: false });
    }





    render() {

        const styles = EStyleSheet.create({
            container: {
                flex: 1,
                height: '140rem'
            },
            containerAtas: {
                height: '390rem'
            },
            header: { flexDirection: 'row', paddingLeft: '20rem', paddingRight: '20rem', height: '70rem', paddingTop: '5rem' },
            containerSaldo: { flexDirection: 'row', height: '140 rem', paddingLeft: '20rem', paddingRight: '20rem', paddingTop: '10rem', paddingBottom: '20rem' },
            boyImage: { width: '40rem', height: '40rem', marginTop: '25rem' },
            besideBoyImage: { flex: 1, justifyContent: 'center', alignItems: 'center' },
            textInBesideBoyImage: { fontFamily: 'open-sans-bold', color: 'white', marginTop: '28rem', fontSize: '12rem', marginRight: '25rem' },
            saldo: { width: '100%', height: '100%' },
            ballonHeight: { height: '120rem', width: '340rem' },
            itemPilihan: {
                flex: 1,
                paddingLeft: '5rem',
                paddingRight: '5rem',
                marginBottom: '25rem',
                justifyContent: 'center',
                alignItems: 'center'
            },
            subItemPilihan: {
                flex: 3
            },
            imageSubItemPilihan: {
                height: '35rem',
                width: '35rem'
            },
            subItemPilihan2: {
                flex: 1,
                marginTop: '35rem',

            },
            textPilihan: {
                fontFamily: 'roboto-regular',
                fontSize: '10rem'
            },
            containerPilihan: {
                flex: 1,
                marginTop: '15rem',
                paddingLeft: '10rem',
                paddingRight: '10rem',
                paddingBottom: '10rem',
                borderBottomWidth: '10rem',
                borderBottomColor: '#efefef'
            },
            coinImage: {
                marginTop: '15rem',
                marginLeft: '5rem',
                width: '90rem',
                height: '90rem'
            },
            gayabaru: {
                color: "#383838",
                fontWeight: 'bold',
                fontFamily: 'open-sans-boldd',
                fontSize: '13rem',
                padding: '10rem'
            },
            saldokamu: {
                color: '#06a3cc',
                fontFamily: 'open-sans-boldd',
                fontSize: '10rem'
            },
            nominal: {
                fontFamily: 'open-sans-extrabold',
                fontSize: '18rem',
                color: '#06a3cc'
            },
            wrapperNominal: {
                paddingLeft: '10rem',
                paddingBottom: '10rem'
            }
        });

        const shadowOpt = {
            color: "#000",
            border: 5,
            width: styles.ballonHeight.width,
            height: styles.ballonHeight.height,
            radius: 15,
            opacity: 0.1,
            x: 0,
            y: 1,


        }





        if (this.state.fontLoaded && this.state.contentIsLoaded) {
            return (
                <ImageBackground source={require("../icon/background.png")} style={styles.container}>
                    <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>
                        <View style={styles.containerAtas}>
                            <View style={styles.header}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Image style={styles.boyImage} source={require("../icon/boy.png")}></Image>
                                    <View style={styles.besideBoyImage}>
                                        <Text style={styles.textInBesideBoyImage}>{this.state.sapaan}, {credentials.nama}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.containerSaldo}>
                                <BoxShadow setting={shadowOpt}>
                                    <View style={{ backgroundColor: '#ffffff', flex: 1, borderRadius: 15, flexDirection: 'row' }}>
                                        <View style={{ flex: 2, justifyContent: 'space-between' }}>
                                            <View><Text style={styles.gayabaru}>Gaya baru dalam bertransaksi di minimarket</Text></View>

                                            <View style={styles.wrapperNominal}>
                                                <Text style={styles.saldokamu}>Saldo kamu :</Text>
                                                <Text style={styles.nominal}>Rp. {this.formatrupiah(this.state.saldo)}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Image style={styles.coinImage} source={require('../icon/coin.png')}></Image>
                                        </View>
                                    </View>
                                </BoxShadow>
                            </View>
                            <View style={styles.containerPilihan}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <TouchableHighlight underlayColor="#ff000000" onPress={() => { this.props.navigation.navigate('Transaksi', { credentials: credentials }) }} style={{ flex: 1 }}>
                                            <View style={styles.itemPilihan}>
                                                <View style={styles.subItemPilihan}>
                                                    <Image style={styles.imageSubItemPilihan} source={require("../icon/transaction.png")}></Image>
                                                </View>
                                                <View style={styles.subItemPilihan2}>
                                                    <Text style={styles.textPilihan}>Transaksi</Text>
                                                </View>
                                            </View>
                                        </TouchableHighlight>

                                        <TouchableHighlight underlayColor="#ff000000" onPress={() => { this.props.navigation.navigate('Katalog') }} style={{ flex: 1 }}>
                                            <View style={styles.itemPilihan}>
                                                <View style={styles.subItemPilihan}>
                                                    <Image style={styles.imageSubItemPilihan} source={require("../icon/book.png")}></Image>
                                                </View>
                                                <View style={styles.subItemPilihan2}>
                                                    <Text style={styles.textPilihan}>Katalog Barang</Text>
                                                </View>
                                            </View>
                                        </TouchableHighlight>

                                        <TouchableHighlight style={{ flex: 1 }}>
                                            <View style={styles.itemPilihan}>
                                                <View style={styles.subItemPilihan}>
                                                    <Image style={styles.imageSubItemPilihan} source={require("../icon/error.png")}></Image>
                                                </View>
                                                <View style={styles.subItemPilihan2}>
                                                    <Text>...</Text>
                                                </View>
                                            </View>
                                        </TouchableHighlight>

                                        <TouchableHighlight style={{ flex: 1 }}>
                                            <View style={styles.itemPilihan}>
                                                <View style={styles.subItemPilihan}>
                                                    <Image style={styles.imageSubItemPilihan} source={require("../icon/error.png")}></Image>
                                                </View>
                                                <View style={styles.subItemPilihan2}>
                                                    <Text>...</Text>
                                                </View>
                                            </View>
                                        </TouchableHighlight>


                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>

                                            <View style={styles.itemPilihan}>
                                                <View style={styles.subItemPilihan}>
                                                    <Image style={styles.imageSubItemPilihan} source={require("../icon/error.png")}></Image>
                                                </View>
                                                <View style={styles.subItemPilihan2}>
                                                    <Text>...</Text>
                                                </View>
                                            </View>

                                            <View style={styles.itemPilihan}>
                                                <View style={styles.subItemPilihan}>
                                                    <Image style={styles.imageSubItemPilihan} source={require("../icon/error.png")}></Image>
                                                </View>
                                                <View style={styles.subItemPilihan2}>
                                                    <Text>...</Text>
                                                </View>
                                            </View>

                                            <View style={styles.itemPilihan}>
                                                <View style={styles.subItemPilihan}>
                                                    <Image style={styles.imageSubItemPilihan} source={require("../icon/error.png")}></Image>
                                                </View>
                                                <View style={styles.subItemPilihan2}>
                                                    <Text>...</Text>
                                                </View>
                                            </View>

                                            <View style={styles.itemPilihan}>
                                                <View style={styles.subItemPilihan}>
                                                    <Image style={styles.imageSubItemPilihan} source={require("../icon/error.png")}></Image>
                                                </View>
                                                <View style={styles.subItemPilihan2}>
                                                    <Text>...</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={{ flex: 1 }}></View>
                </ImageBackground>
            )
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: '#03a2cb', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="white" ></ActivityIndicator>
                </View>
            )
        }
    }
}

const drawerStyle = EStyleSheet.create({
    gambar: {
        width: '150rem',
        height: '150rem'
    },
    textHalo: {
        marginTop: '10rem', fontSize: '13rem', color: 'white'
    },
    gambarOptions: { width: '10rem', height: '10rem', marginRight: '5rem' },
    containerNav: {
        backgroundColor: '#e6e6e6',
        height: '40rem',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: '1rem',
        borderBottomColor: 'white'
    }
});



const StackContainer = createStackNavigator({
    Da: {
        screen: DashboardScreen_
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
    UbahPengguna: {
        screen: ScreenUbahPengguna
    },
    RiwayatTransaksi: {
        screen: ScreenRiwayatTransaksi
    },
    DetailRiwayat: {
        screen: ScreenDetailRiwayatTransaksi
    },
    TataCaraTopup: {
        screen: ScreenTataCaraTopup
    }
}, {
        transitionConfig: () => ({
            screenInterpolator: StackViewStyleInterpolator.forHorizontal,
        })
    })

const switchContainer = createSwitchNavigator({
    Utama: StackContainer,
    Pembayaran: ScreenSuksesPembayaran
})


const DrawerContainer = createDrawerNavigator({
    Main: switchContainer
}, {
        contentComponent: () => {
            return (
                <View style={{ flex: 1 }}>

                    <View style={{ flex: 2, backgroundColor: '#03a2cb' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={drawerStyle.gambar} source={require("../icon/boy.png")}></Image>
                            <Text style={drawerStyle.textHalo}>Halo, {credentials.nama}</Text>
                        </View>
                    </View>

                    <View style={{ flex: 5, justifyContent: 'space-between' }}>

                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableHighlight onPress={() => {
                                berpindah('TataCaraTopup');
                            }} style={drawerStyle.containerNav} underlayColor="#ffffff00">
                                <View style={drawerStyle.containerNav}>
                                    <Text>Tata Cara Topup</Text>
                                </View>
                            </TouchableHighlight>


                            <TouchableHighlight style={drawerStyle.containerNav} onPress={() => {
                                berpindah('RiwayatTransaksi', { credentials: credentials })
                            }} underlayColor="#ffffff00">
                                <View style={drawerStyle.containerNav}>
                                    <Text>Riwayat Transaksi</Text>
                                </View>
                            </TouchableHighlight>

                        </View>




                        <View style={{ height: 50, flexDirection: 'row', backgroundColor: '#e6e6e6' }}>
                            <View style={{ width: 100, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}><Image style={drawerStyle.gambarOptions} source={require("../icon/tools.png")}></Image></View>
                            <TouchableHighlight underlayColor="#ffffff00" onPress={() => {
                                berpindah('UbahPengguna', { credentials: credentials })
                            }}><View style={{ flex: 1, justifyContent: 'center' }}><Text>Pengaturan Profil</Text></View></TouchableHighlight>
                        </View>

                    </View>

                </View>
            )
        }
    })


const Main = createAppContainer(DrawerContainer);
