import React from "react";
import { StyleSheet, TouchableHighlight, Text, View, Button, ImageBackground, Dimensions, Image, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { BoxShadow } from 'react-native-shadow';
import { Font } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import EStyleSheet, { value } from 'react-native-extended-stylesheet';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScreenSuksesPembayaran extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gambar: this.props.navigation.getParam('gambar') || "",
            kodetransaksi: this.props.navigation.getParam('kodetransaksi') || ""
        }
    }


    static navigationOptions = {
        header: null,
    }

    render() {

        styles = EStyleSheet.create({
            gambarQR: {
                width: '200rem',
                height: '200rem'
            },
            tulisanKodeTransaksi: {
                alignSelf: 'center',
                fontSize: '15rem',
                color: 'white',
                marginTop: '10rem',
                marginBottom: '7rem'

            },
            btnSelesai: {
                marginTop: '0rem'
            }
        })

        return (
            <View style={{ flex: 1, backgroundColor: '#03a2cb', justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <Image style={styles.gambarQR} source={{ uri: this.state.gambar }}></Image>
                    <Text style={styles.tulisanKodeTransaksi}>Kode Transaksi : {this.state.kodetransaksi}</Text>
                    <Button onPress={() => { this.props.navigation.navigate('Utama'); }} style={styles.btnSelesai} title="Selesai"></Button>
                </View>
            </View>
        )
    }
}