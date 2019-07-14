import React from "react";
import { StyleSheet, TouchableHighlight, Text, View, Button, ImageBackground, Dimensions, Image, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { BoxShadow } from 'react-native-shadow';
import { Font } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import EStyleSheet, { value } from 'react-native-extended-stylesheet';
import { BarCodeScanner } from 'expo-barcode-scanner';
var credentials = null;

export default class ScreenTransaksi extends React.Component {

    static navigationOptions = {
        header: null
    }
    async componentDidMount() {
        //setTimeout(() => {
        //   this.setState({ barangbelanjaan: [] })
        //}, 1000);
        this.getPermissionsAsync();
        await Font.loadAsync({
            'open-sans-bold': require('../fonts/OpenSans-Regular.ttf'),
            'open-sans-boldd': require('../fonts/OpenSans-Bold.ttf'),
            'open-sans-extrabold': require('../fonts/OpenSans-ExtraBold.ttf'),
        });
        this.setState({ fontLoaded: true });
    }
    constructor(props) {
        super(props);
        this._onRefresh = this._onRefresh.bind(this);
        this.handleBarCodeScanned = this.handleBarCodeScanned.bind(this);
        this.tambahKuantitas = this.tambahKuantitas.bind(this);
        this.hitungTotalHarga = this.hitungTotalHarga.bind(this);
        this.kurangKuantitas = this.kurangKuantitas.bind(this);
        this.hapusBelanjaan = this.hapusBelanjaan.bind(this);
        this.keDetailTransaksi = this.keDetailTransaksi.bind(this);
        this.formatrupiah = this.formatrupiah.bind(this);
        credentials = this.props.navigation.getParam('credentials');
    }

    componentWillMount() {
        this.hitungTotalHarga();

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

    hapusBelanjaan = (index) => {
        //alert(index);
        let arr = this.state.barangbelanjaan;
        delete arr[index];
        arr = arr.filter((val) => val !== null);
        this.setState({
            barangbelanjaan: arr
        })
    }


    kurangKuantitas = function (index) {
        let arr = this.state.barangbelanjaan;
        if (arr[index].jumlah === 1) {
            arr[index].jumlah = 1;
        } else {
            arr[index].jumlah = arr[index].jumlah - 1;
        }
        this.setState({
            barangbelanjaan: arr
        })
    }

    tambahKuantitas = function (index) {
        let arr = this.state.barangbelanjaan;
        arr[index].jumlah = arr[index].jumlah + 1;
        this.setState({
            barangbelanjaan: arr
        })
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.Permissions.askAsync(Permissions.Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    handleBarCodeScanned = ({ type, data }) => {
        //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        this.setState({ scanned: true });
        sudahada = false;
        this.state.barangbelanjaan.map((res) => {
            if (res.kodebarang === data) {
                sudahada = true;
            }
        })

        if (sudahada === false) {
            fetch(`https://serverselfkasir.herokuapp.com/mencariDataBarang?kodebarang=${data}`).then((res) => res.json())
                .then((json) => {
                    let payload = {
                        kodebarang: json.kode_barang,
                        namabarang: json.nama_barang,
                        harga: json.harga,
                        jumlah: 1,
                    }
                    let arr = this.state.barangbelanjaan;
                    arr.push(payload);
                    this.setState({
                        barngbelanjaan: arr
                    })
                    this.hitungTotalHarga();
                    this.setState({ scanned: false });
                }).catch(err => {
                    alert("Barang tidak ditemukan!");
                    this.setState({ scanned: false });
                })
        } else {
            this.setState({ scanned: false });
        }
    };

    keDetailTransaksi = () => {
        if (this.state.barangbelanjaan.length > 0) {
            this.props.navigation.navigate('DetailTransaksi', { token: credentials.token, barangbelanjaan: this.state.barangbelanjaan });
        }
    }
    _onRefresh = () => {
        this.setState({ refreshing: true });
        alert("123");
        this.setState({ refreshing: false });
    }

    hitungTotalHarga = () => {
        let total = 0;
        this.state.barangbelanjaan.map((res) => {
            total = total + (res.harga * res.jumlah);
        })
        this.setState({ totaldibayar: total });
    }

    state = {
        refreshing: false,
        elementShadowWidth: Dimensions.get('screen').width,
        elementShadowHeight: 500,
        fontLoaded: false,
        hasCameraPermission: null,
        scanned: false,
        barangbelanjaan: [

        ],
        totaldibayar: 0
    }

    render() {

        const styles = EStyleSheet.create({
            container: {
                flex: 1,
                height: '140rem'
            },
            containerCamera: {
                height: '300rem',
                padding: '50rem',
                paddingBottom: '0rem',
                paddingLeft: '60rem',
                paddingRight: '60rem'
            },
            containerDetailBelanjaan: {
                flex: 1,
            },
            penengahContainerDetailBelanjaan: {
                height: '70rem',
                borderBottomColor: '#efefef',
                borderTopColor: '#efefef',
                borderBottomWidth: '10rem',
                borderTopWidth: '10rem',
                paddingLeft: '60rem',
                paddingRight: '60rem'

            },
            isiPenengah: {
                flex: 1,

            },
            itemPenengah: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            },
            gambarKeranjang: {
                width: '30rem',
                height: '30rem'
            },
            containerListBarang: {
                flex: 1,
                paddingRight: '10rem',
                paddingLeft: '10rem'
            },
            childListBarang: {
                flex: 1,
                paddingTop: '10rem'
            },
            leftListBarang: {
                flexDirection: 'column'
            },
            scrollViewListBarang: {
                flex: 1,
                padding: '5rem',
            },
            imageEnter: {
                width: '20rem',
                height: '20rem',
                marginRight: '10rem'
            },
            Footer: {
                paddingLeft: '10rem',
                paddingRight: '10rem',
                height: '35rem',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            listBarang: {
                flexDirection: 'row',
                backgroundColor: '#e6e6e6',
                padding: '10rem',
                marginBottom: '10rem',
                justifyContent: 'space-between'
            },
            containerTextDetailBelanjaan: {
                paddingRight: '10rem'
            },
            textMiddleArrow: {
                marginLeft: '5rem',
                marginRight: '5rem'
            },
            textDetailBelanjaan: {
                marginLeft: '10rem',
                fontSize: '16rem'
            },
            leftListBarang1: {
                fontSize: '14rem'
            },
            leftListBarang2: {
                fontSize: '9rem'
            },
            kotakCamera: {
                width: '100%',
                height: '220rem',
                backgroundColor: 'white'
            },
            barcode: {
                backgroundColor: 'red',
                height: '220rem',
            },
            gambarKamera: {
                width: '30rem',
                height: '30rem'
            }
        })

        const shadowOpt = {
            width: this.state.elementShadowWidth - 100,
            height: 300,
            color: "#000",
            border: 5,
            radius: 0,
            opacity: 0.1,
            x: 0,
            y: 1,
            style: { marginTop: 30 }

        }



        if (this.state.fontLoaded && this.state.hasCameraPermission) {
            return (
                <ImageBackground source={require("../icon/background.png")} style={styles.container}>
                    <View style={styles.containerCamera}>
                        <View style={styles.kotakCamera}>
                            <BarCodeScanner
                                onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                                style={styles.barcode}
                            />
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require("../icon/camera.png")} style={styles.gambarKamera}></Image>
                            </View>
                        </View>
                    </View>

                    <View style={styles.containerDetailBelanjaan}>
                        <View style={styles.penengahContainerDetailBelanjaan}>
                            <View style={styles.isiPenengah}>
                                <View style={styles.itemPenengah}>
                                    <Image source={require("../icon/cart.png")} style={styles.gambarKeranjang}></Image>
                                    <View style={styles.containerTextDetailBelanjaan}><Text style={styles.textDetailBelanjaan}>Detail Belanjaan</Text></View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.containerListBarang}>
                            <View style={styles.childListBarang}>
                                <ScrollView style={styles.scrollViewListBarang}>

                                    {
                                        this.state.barangbelanjaan.map((value, index) => {
                                            return (
                                                <TouchableHighlight key={index} underlayColor="#ff000000" onLongPress={() => { this.hapusBelanjaan(index); this.hitungTotalHarga(); }}>
                                                    <View style={styles.listBarang}>
                                                        <View style={styles.leftListBarang}>
                                                            <Text style={styles.leftListBarang1}>{value.namabarang}</Text>
                                                            <Text style={styles.leftListBarang2}>Harga: Rp. {this.formatrupiah(value.harga)}</Text>
                                                            <Text style={styles.leftListBarang2}>Kode Barang: {value.kodebarang}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                            <Button onPress={() => { this.kurangKuantitas(index); this.hitungTotalHarga(); }} style={styles.leftArrow} title="<"></Button>
                                                            <Text style={styles.textMiddleArrow}>{value.jumlah}</Text>
                                                            <Button onPress={() => { this.tambahKuantitas(index); this.hitungTotalHarga(); }} style={styles.rightArrow} title=">"></Button>
                                                        </View>
                                                    </View>
                                                </TouchableHighlight>
                                            )
                                        })
                                    }



                                </ScrollView>
                            </View>
                        </View>
                        <View style={styles.Footer}>
                            <Text>Total : {this.state.totaldibayar}</Text>
                            <TouchableHighlight underlayColor="#ff000000" onPress={() => { this.keDetailTransaksi(); }}>
                                <Image style={styles.imageEnter} source={require('../icon/enter.png')}></Image>
                            </TouchableHighlight>
                        </View>
                    </View>
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