import React from "react";
import { TouchableOpacity, StyleSheet, TextInput, TouchableHighlight, Text, View, Button, ImageBackground, Dimensions, Image, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { BoxShadow } from 'react-native-shadow';
import { Font } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import EStyleSheet, { value } from 'react-native-extended-stylesheet';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScreenDetailTransaksi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sedangdalamproses: false,
            saldo: 0,
            totaldibayar: 0,
            barangbelanjaan: this.props.navigation.getParam('barangbelanjaan'),
            token: this.props.navigation.getParam('token')
        }
        this.hitungTotalHarga = this.hitungTotalHarga.bind(this);
        this.prosesPembayaran = this.prosesPembayaran.bind(this);
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


    prosesPembayaran = () => {
        if (this.state.saldo - this.state.totaldibayar < 0) {
            alert("Saldo tidak cukup lakukan top-up!");
            this.props.navigation.navigate('Da');
        } else {
            this.setState({ sedangdalamproses: true });
            fetch("https://serverselfkasir.herokuapp.com/prosesPembayaran", {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    token: this.state.token,
                    barangbelanjaan: this.state.barangbelanjaan,
                    totalbayar: this.state.totaldibayar
                })
            }).then((res) => {
                return res.json();
            }).then((val) => {
                console.log(val);
                this.props.navigation.navigate('Pembayaran', { gambar: val.gambar, kodetransaksi: val.kodetransaksi });
            }).catch((err) => {
                alert("Terjadi kesalahan!");
            })
        }
    }

    hitungTotalHarga = () => {
        let total = 0;
        this.state.barangbelanjaan.map((res) => {
            total = total + (res.harga * res.jumlah);
        })
        this.setState({ totaldibayar: total });
    }

    async componentDidMount() {
        this.hitungTotalHarga();
        let saldo = await fetch(`https://serverselfkasir.herokuapp.com/checkSaldo?token=${this.state.token}`);
        saldo = await saldo.json();
        this.setState({ saldo: saldo.total });
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
                            <View style={styles.containerDaftarBarang}>

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


                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.containerTampilSaldo}>
                        <Text style={styles.textTotalHarga}>Saldo Kamu : Rp. {this.formatrupiah(this.state.saldo)}</Text>
                    </View>
                    <View style={styles.containerTampilHarga}>
                        <Text style={styles.textTotalHarga}>Total Harga : Rp. {this.formatrupiah(this.state.totaldibayar)}</Text>
                    </View>
                    <View style={styles.containerTampilSaldo}>
                        <Text style={styles.textTotalHarga}>Sisa : Rp. {this.formatrupiah(this.state.saldo - this.state.totaldibayar)}</Text>
                    </View>
                    <View style={styles.containerPilihan}>
                        <TouchableHighlight underlayColor="#ff000000" onPress={() => { this.props.navigation.goBack(); }}>
                            <Image source={require("../icon/cancel.png")} style={styles.gambarCancel}></Image>
                        </TouchableHighlight>
                        {
                            (this.state.sedangdalamproses) ? (<View><ActivityIndicator size="large" color="white"></ActivityIndicator></View>) : (<TouchableHighlight underlayColor="#ff000000" onPress={() => { this.prosesPembayaran(); }} >
                                <Image source={require("../icon/checked.png")} style={styles.gambarCancel}></Image>
                            </TouchableHighlight>)
                        }

                    </View>
                </View>

            </View>
        )
    }
}