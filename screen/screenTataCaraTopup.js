import React from "react";
import { StyleSheet, TouchableHighlight, TouchableOpacity, Text, View, Button, ImageBackground, Dimensions, Image, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { BoxShadow } from 'react-native-shadow';
import { Font } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import EStyleSheet, { value } from 'react-native-extended-stylesheet';
import { BarCodeScanner } from 'expo-barcode-scanner';
var credentials = null

export default class ScreenTataCaraTopup extends React.Component {

    static navigationOptions = {
        title: "Tata Cara Topup",
        headerStyle: { backgroundColor: '#03a2cb' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white'
    }

    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            pilihan: "BCA"
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'open-sans-bold': require('../fonts/OpenSans-Regular.ttf'),
            'open-sans-boldd': require('../fonts/OpenSans-Bold.ttf'),
            'open-sans-extrabold': require('../fonts/OpenSans-ExtraBold.ttf'),
            'roboto-regular': require('../fonts/Roboto-Regular.ttf')
        });
        this.setState({
            fontLoaded: true
        })
    }


    render() {

        const styles = EStyleSheet.create({
            container: {
                flex: 1,
                padding: '10rem'
            },
            containerPilihBank: {
                width: '100%',
                height: '30rem',
                flexDirection: 'row'
            },
            gambarBank: {
                height: '30rem',
                width: '60rem',
                marginRight: '10rem'
            },
            gambarBankBNI: {
                height: '30rem',
                width: '85rem'
            },
            containerDetailBank: {
                paddingTop: '10rem',
                paddingLeft: '15rem',
                marginTop: '15rem',
                width: '100%',
                height: '65rem',
                borderRadius: '3rem',
                backgroundColor: '#03a2cb'
            },
            textAtasNama: {
                fontFamily: 'open-sans-boldd',
                color: 'white',
                fontSize: '18rem'
            },
            textNoRek: {
                fontFamily: 'open-sans-boldd',
                color: 'white',
                fontSize: '12rem'
            },
            containerPenjelasan: {
                marginTop: '5rem'
            },
            paragraf: {
                flexDirection: 'row',
                marginTop: '5rem'
            },
            paragrafdua: {
                marginTop: '5rem'
            },
            aktivitas: {
                marginTop: '15rem'
            },
            textParagraf: {
                fontFamily: 'roboto-regular'
            }
        })

        if (this.state.fontLoaded) {
            return (
                <View style={styles.container}>
                    <View style={styles.containerPilihBank}>
                        <TouchableOpacity onPress={() => { this.setState({ pilihan: 'BCA' }) }}>
                            <Image style={styles.gambarBank} source={{ uri: 'https://ponimu-public.s3-ap-southeast-1.amazonaws.com/1532493169459' }}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { this.setState({ pilihan: 'Mandiri' }) }}>
                            <Image style={styles.gambarBank} source={{ uri: 'https://ponimu-public.s3-ap-southeast-1.amazonaws.com/1532493200966' }}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { this.setState({ pilihan: 'BNI' }) }}>
                            <Image style={styles.gambarBankBNI} source={{ uri: 'https://ponimu-public.s3-ap-southeast-1.amazonaws.com/1532493185464' }}></Image>
                        </TouchableOpacity>
                    </View>

                    {
                        (this.state.pilihan === 'BCA') ?
                            (<View style={styles.containerDetailBank}>
                                <Text style={styles.textAtasNama}>A/N : PT Anita Rahayu Angkasa</Text>
                                <Text style={styles.textNoRek}>No. Rek : 11111111111111111</Text>
                            </View>
                            ) : (this.state.pilihan === 'Mandiri') ? (<View style={styles.containerDetailBank}>
                                <Text style={styles.textAtasNama}>A/N : PT Anita Rahayu Angkasa</Text>
                                <Text style={styles.textNoRek}>No. Rek : 2222222222222222</Text>
                            </View>) : (this.state.pilihan === "BNI") ? (<View style={styles.containerDetailBank}>
                                <Text style={styles.textAtasNama}>A/N : PT Anita Rahayu Angkasa</Text>
                                <Text style={styles.textNoRek}>No. Rek : 33333333333333333</Text>
                            </View>) : (<View></View>)
                    }

                    <View style={styles.containerPenjelasan}>
                        <View style={styles.paragraf}>
                            <Text style={styles.textParagraf}>Pilih opsi bank yang terdapat di atas, kemudian akan ditampilkan rekening yang digunakan untuk melakukan top-up.
                        </Text>
                        </View>

                        <View style={styles.paragraf}>
                            <Text style={styles.textParagraf}>Untuk melakukan top-up
                            isikan sejumlah saldo yang diingikan ke rekening yang telah dicantumkan dengan kombinasi saldo sebagai berikut :</Text>
                        </View>

                        <View style={styles.paragraf}>
                            <Text style={{ fontSize: styles.textAtasNama.fontSize, color: 'red' }}>XXXXXXX</Text><Text style={{ fontSize: styles.textAtasNama.fontSize, color: 'blue' }}>Y</Text>
                        </View>

                        <View style={styles.paragrafdua}>
                            <Text style={styles.textParagraf}>Keterangan : </Text>
                            <Text style={styles.textParagraf}>X = Nominal yang ingin di top-up </Text>
                            <Text style={styles.textParagraf}>Y = ID Akun Kamu </Text>
                        </View>

                        <View style={styles.paragraf}>
                            <Text style={{ fontSize: styles.textAtasNama.fontSize, color: 'black', fontFamily: 'roboto-regular' }}>ID akun dapat dilihat dengan men-swipe kiri layar dan memilih pilihan Pengaturan Pengguna</Text>
                        </View>


                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator style={styles.aktivitas} size="large"></ActivityIndicator></View>
            )
        }

    }
} 