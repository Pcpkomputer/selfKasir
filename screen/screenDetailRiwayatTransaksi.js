import React from "react";
import { TouchableOpacity, StyleSheet, TextInput, TouchableHighlight, Text, View, Button, ImageBackground, Dimensions, Image, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { BoxShadow } from 'react-native-shadow';
import { Font } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import EStyleSheet, { value } from 'react-native-extended-stylesheet';
import { BarCodeScanner } from 'expo-barcode-scanner';
var credentials = null

export default class ScreenDetailTransaksi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contentIsLoaded: false,
            kodetransaksi: this.props.navigation.getParam('kodetransaksi'),
            saldo: 0,
            totaldibayar: 0,
            barangbelanjaan: [],
            tanggaldanwaktu: this.props.navigation.getParam('tanggaldanwaktu')
        }
        credentials = this.props.navigation.getParam('credentials');
        this.hitungTotalHarga = this.hitungTotalHarga.bind(this);
        this.formatrupiah = this.formatrupiah.bind(this);
    }

    static navigationOptions = {
        header: null,
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


    hitungTotalHarga = () => {
        let total = 0;
        this.state.barangbelanjaan.map((res) => {
            total = total + (res.harga * res.jumlah);
        })
        this.setState({ totaldibayar: total });
    }

    async componentDidMount() {
        fetch(`https://serverselfkasir.herokuapp.com/tampilDetailRiwayatTransaksi`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                token: credentials.token,
                idtransaksi: this.state.kodetransaksi
            })
        }).then(res => res.json())
            .then((json) => {
                parsed = JSON.parse(json[0].json);
                this.setState({
                    barangbelanjaan: parsed,
                    contentIsLoaded: true
                })
                this.hitungTotalHarga();
            }).catch(err => {
                alert(err);
            })
    }

    render() {
        styles = EStyleSheet.create({
            notaContainer: {
                flex: 1,
                paddingTop: '40rem',
                paddingLeft: '20rem',
                paddingRight: '20rem'
            },
            childNotaContainer: {
                width: '340rem',
                height: '350rem',
                backgroundColor: 'white',
                borderRadius: '5rem'
            },
            daftarBarang: {
                width: '100%',
                borderBottomWidth: '1rem',
                height: '60rem',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            containerDaftarBarang: {
                padding: '10rem'
            },
            textNamaBarang: {
                fontSize: '15rem'
            },
            containerTextJumlah: {
                height: '100%',
                width: '100rem',
                justifyContent: 'center',
                alignItems: 'center'
            },
            textJumlah: {
                fontSize: '30rem',
                marginRight: '40rem'
            },
            containerDetail: {
                flexDirection: 'column',
                width: '270rem'
            },
            gambarCancel: {
                width: '100rem',
                height: '100rem'
            },
            containerTampilHarga: {
                marginTop: '10rem',
                borderBottomColor: 'white',
                paddingBottom: '15rem',
                borderBottomWidth: '1rem'
            },
            containerTampilSaldo: {
                marginTop: '10rem'
            },
            textTotalHarga: {
                color: 'white',
                fontSize: '15rem'
            },
            containerPilihan: {
                flex: 1,
                paddingLeft: '5rem',
                paddingRight: '5rem',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',

            },
            Indikator: {
                marginTop: '15rem'
            }
        })

        const shadowOpt = {
            color: "#000",
            border: 5,
            width: styles.childNotaContainer.width,
            height: styles.childNotaContainer.height,
            radius: 15,
            opacity: 0.1,
            x: 0,
            y: 1,


        }

        return (
            <View style={{ flex: 1, backgroundColor: '#03a2cb' }}>
                <View style={styles.notaContainer}>
                    <View style={styles.childNotaContainer}>
                        <ScrollView style={{ flex: 1 }}>
                            {
                                (this.state.contentIsLoaded) ? (<View style={styles.containerDaftarBarang}>

                                    {
                                        this.state.barangbelanjaan.map((value, index) => {
                                            return (
                                                <View style={styles.daftarBarang} key={index}>
                                                    <View style={styles.containerDetail}>
                                                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.textNamaBarang}>{value.namabarang}</Text>
                                                        <Text>Rp. {this.formatrupiah(value.harga)}</Text>
                                                        <Text>Kode : {value.kodebarang} </Text>
                                                    </View>
                                                    <View style={styles.containerTextJumlah}>
                                                        <Text style={styles.textJumlah}>{value.jumlah}</Text>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }


                                </View>) : (
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator style={styles.Indikator} size="large"></ActivityIndicator></View>

                                    )
                            }

                        </ScrollView>
                    </View>
                    <View style={styles.containerTampilSaldo}>
                        <Text style={styles.textTotalHarga}>Tanggal Transaksi : {this.state.tanggaldanwaktu}</Text>
                    </View>
                    <View style={styles.containerTampilSaldo}>
                        <Text style={styles.textTotalHarga}>Kode Transaksi : {this.state.kodetransaksi}</Text>
                    </View>
                    <View style={styles.containerTampilHarga}>
                        <Text style={styles.textTotalHarga}>Total Harga : Rp. {this.formatrupiah(this.state.totaldibayar)}</Text>
                    </View>

                </View>

            </View>
        )
    }
}