import React from "react";
import { StyleSheet, TouchableHighlight, TouchableOpacity, Text, View, Button, ImageBackground, Dimensions, Image, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { BoxShadow } from 'react-native-shadow';
import { Font } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import EStyleSheet, { value } from 'react-native-extended-stylesheet';
import { BarCodeScanner } from 'expo-barcode-scanner';
var credentials = null


export default class screenRiwayatTransaksi extends React.Component {
    constructor(props) {
        super(props);
        credentials = this.props.navigation.getParam('credentials');
        this.state = {
            contentIsLoaded: false,
            riwayat: [
            ]
        }
        this.tanggalHandler = this.tanggalHandler.bind(this);
        this.menujuDetail = this.menujuDetail.bind(this);
    }

    menujuDetail = (idtransaksi, tanggaldanwaktu) => {
        this.props.navigation.navigate('DetailRiwayat', { kodetransaksi: idtransaksi, tanggaldanwaktu: tanggaldanwaktu, credentials: credentials })
    }

    tanggalHandler = (tgl) => {
        let tanggal = new Date(tgl);
        return `${(tanggal.getDate().toString().length === 1) ? '0' + tanggal.getDate() : tanggal.getDate()}-${(tanggal.getMonth().toString().length === 1) ? '0' + (tanggal.getMonth() + 1) : tanggal.getMonth() + 1}-${tanggal.getFullYear()}`
    }


    static navigationOptions = {
        title: "Riwayat Transaksi",
        headerStyle: { backgroundColor: '#03a2cb' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white'
    }

    componentDidMount() {
        fetch(`https://serverselfkasir.herokuapp.com/tampilRiwayatTransaksi`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                token: credentials.token
            })
        }).then(res => res.json())
            .then((json) => {
                this.setState({
                    riwayat: json,
                    contentIsLoaded: true
                })
            }).catch(err => {
                alert(err);
            })
    }

    render() {
        const styles = EStyleSheet.create({
            container: {
                flex: 1,
                padding: '10rem'
            },
            itemRiwayat: {
                width: '100%',
                height: '50rem',
                backgroundColor: '#03a2cb',
                paddingLeft: '10rem',
                paddingTop: '10rem',
                borderRadius: '3rem'
            },
            tulisanKodeTransaksi: {
                color: 'white'
            },
            aktivitas: {
                marginTop: '15rem'
            },
            touchable: {
                marginBottom: '10rem'
            }
        })

        if (this.state.contentIsLoaded) {
            return (
                <View style={styles.container}>
                    <ScrollView>
                        {
                            this.state.riwayat.map((val, i) => {
                                return (
                                    <TouchableOpacity onPress={() => { this.menujuDetail(val.id_transaksi, this.tanggalHandler(val.tanggaldanwaktu)) }} key={i} style={styles.touchable}>
                                        <View style={styles.itemRiwayat}>
                                            <Text style={styles.tulisanKodeTransaksi}>Kode Transaksi : {val.id_transaksi}</Text>
                                            <Text style={styles.tulisanKodeTransaksi}>Tanggal dan Waktu Transaksi : {this.tanggalHandler(val.tanggaldanwaktu)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            )
        } else {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator style={styles.aktivitas} size="large"></ActivityIndicator></View>
            )
        }

    }
}