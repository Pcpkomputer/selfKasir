import React from "react";
import { TouchableOpacity, StyleSheet, TextInput, TouchableHighlight, Text, View, Button, ImageBackground, Dimensions, Image, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { BoxShadow } from 'react-native-shadow';
import { Font } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import EStyleSheet, { value } from 'react-native-extended-stylesheet';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScreenKatalog extends React.Component {


    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.formatrupiah = this.formatrupiah.bind(this);
    }

    async componentDidMount() {
        //setTimeout(() => {
        //   this.setState({ barangbelanjaan: [] })
        //}, 1000);
        await Font.loadAsync({
            'open-sans-bold': require('../fonts/OpenSans-Regular.ttf'),
            'open-sans-boldd': require('../fonts/OpenSans-Bold.ttf'),
            'open-sans-extrabold': require('../fonts/OpenSans-ExtraBold.ttf'),
        });
        let databarang = await fetch("https://serverselfkasir.herokuapp.com/tampilDataBarang");
        let payload = await databarang.json();

        this.setState({ listRender: payload, contentIsLoaded: true });
        this.setState({ fontLoaded: true });
    }

    state = {
        contentIsLoaded: false,
        fontLoaded: false,
        katakunci: "",
        listRender: []
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

    cariDataBarangKategori = (res) => {
        fetch(`https://serverselfkasir.herokuapp.com/tampilDataBarang?katakunci=${this.state.katakunci}&kategori=${res}`)
            .then((val) => {
                return val.json();
            }).then((json) => {
                this.setState({
                    listRender: json
                })
            })
    }

    cariDataBarang = (res) => {
        fetch(`https://serverselfkasir.herokuapp.com/tampilDataBarang?katakunci=${res}`)
            .then((val) => {
                return val.json();
            }).then((json) => {
                this.setState({
                    listRender: json
                })
            })
    }

    render() {
        const styles = EStyleSheet.create({
            header: {
                zIndex: 100,
                height: '60rem',
                width: '100%',
                backgroundColor: '#03a2cb',
                paddingTop: '18rem',
                position: 'absolute'
            },
            headerRemoved: {
                paddingLeft: '10rem',
                paddingRight: '10rem',
                height: '40rem',
                alignItems: 'center',
                flexDirection: 'row',

            },
            textInputHeader: {
                borderColor: 'white',
                paddingLeft: '5rem',
                borderWidth: '1rem',
                backgroundColor: 'white',
                width: '333rem',
                marginRight: '9rem'
            },
            gambarPencarian: {
                width: '20rem',
                height: '20rem'
            },
            containerLabel: {

                height: '25rem',
                backgroundColor: '#03a2cb',
                paddingLeft: '10rem',
                paddingRight: '10rem',
                flexDirection: 'row'
            },
            itemLabel: {
                paddingLeft: '5rem',
                marginRight: '5rem',
                paddingRight: '5rem',
                width: '50rem',
                height: '15rem',
                backgroundColor: 'white',
                borderRadius: '2rem'
            },
            textItemLabel: {
                width: '40rem',
            },
            containerBarang: {
                paddingLeft: '10rem',
                flex: 1,
                paddingTop: '90rem',
                flexDirection: 'row',
                flexWrap: 'wrap'
            },
            itemContainerBarang: {
                borderWidth: '1rem',
                borderColor: 'grey',
                height: '170rem',
                width: '115rem',
                marginRight: '8rem',
                marginBottom: '8rem',
                alignItems: 'center',
                justifyContent: 'center'
            },
            gambarProduk: {
                width: '100rem',
                height: '100rem'
            },
            containerTextGambarProduk: {
                paddingTop: '5rem',
                paddingLeft: '5rem',
                paddingRight: '5rem'
            }

        })

        if (this.state.fontLoaded && this.state.contentIsLoaded) {
            return (
                <View style={{ flex: 1 }}>

                    <View style={styles.header}>
                        <View style={styles.headerRemoved}>
                            <TextInput onChangeText={(res) => { this.setState({ katakunci: res }) }} placeholder="Masukkan Kata Kunci Barang" style={styles.textInputHeader}></TextInput>
                            <TouchableHighlight underlayColor="#ff000000" onPress={() => { this.cariDataBarang(this.state.katakunci) }}><Image source={require("../icon/search.png")} style={styles.gambarPencarian}></Image></TouchableHighlight>
                        </View>
                        <View style={styles.containerLabel}>

                        </View>
                    </View>

                    <ScrollView>
                        <View style={styles.containerBarang}>

                            {
                                this.state.listRender.map((val, index) => {
                                    return (
                                        <TouchableOpacity key={index}>
                                            <View style={styles.itemContainerBarang}>
                                                <Image style={styles.gambarProduk} source={{ uri: val.gambar }}></Image>
                                                <View style={styles.containerTextGambarProduk}>
                                                    <Text numberOfLines={1} ellipsizeMode='tail'>{val.nama_barang}</Text>
                                                    <Text numberOfLines={1} ellipsizeMode='tail'>Rp. {this.formatrupiah(val.harga)}</Text>
                                                    <Text numberOfLines={1} ellipsizeMode='tail'>{val.kode_barang}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }



                        </View>
                    </ScrollView>

                </View >
            )
        }
        else {
            return (
                <View style={{ flex: 1, backgroundColor: '#03a2cb', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="white" ></ActivityIndicator>
                </View>
            )

        }
    }

}