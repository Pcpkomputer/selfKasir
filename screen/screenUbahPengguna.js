import React from "react";
import { TextInput, StyleSheet, TouchableHighlight, Text, View, Button, ImageBackground, Dimensions, Image, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { BoxShadow } from 'react-native-shadow';
import { Font } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import EStyleSheet, { value } from 'react-native-extended-stylesheet';
import { BarCodeScanner } from 'expo-barcode-scanner';
var credentials = null;

export default class ScreenUbahPengguna extends React.Component {

    static navigationOptions = {
        title: "Ubah Detail Pengguna",
        headerStyle: { backgroundColor: '#03a2cb' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white'
    }

    constructor(props) {
        super(props)
        credentials = this.props.navigation.getParam('credentials');
        this.state = {
            prosesmenyimpan: false,
            contentIsLoaded: false,
            id: "1",
            nama: "tes123",
            alamat: "asdsadad",
            tanggallahir: "1998/06/12",
            username: "padang",
            password: "nigga",
        }
        this.simpanDetailPengguna = this.simpanDetailPengguna.bind(this)
        this.loadDataPengguna = this.loadDataPengguna.bind(this)
    }

    simpanDetailPengguna = () => {

        if (this.state.id.toString().length > 0 && this.state.nama.length > 0 && this.state.alamat.length > 0 && this.state.tanggallahir.length > 0 && this.state.username.length > 0 && this.state.password.length > 0 && this.state.tanggallahir.match(/\d\d\d\d\/(\d|\d\d)\/(\d\d|\d)/)) {
            this.setState({ prosesmenyimpan: true });
            let { id, nama, alamat, tanggallahir, username, password } = this.state;
            fetch(`https://serverselfkasir.herokuapp.com/simpanDetailPengguna`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    token: credentials.token,
                    body: {
                        id: id,
                        nama: nama,
                        alamat: alamat,
                        tanggallahir: tanggallahir,
                        username: username,
                        password: password
                    }
                })
            }).then((res) => {
                return res.json();
            }).then(json => {
                if (json.status) {
                    alert("Data berhasil diubah!");
                    this.loadDataPengguna();
                    this.props.navigation.navigate('Da', { aksi: 'refresh' });
                }
            })
        }


    }

    loadDataPengguna = () => {
        fetch('https://serverselfkasir.herokuapp.com/ubahDetailPengguna', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                token: credentials.token
            })
        }).then((res) => {
            return res.json()
        }).then((json) => {
            console.log(json.parsed.tanggallahir)
            let tgl = new Date(json.parsed.tanggallahir);
            this.setState({

                id: json.parsed.id_pengguna,
                alamat: json.parsed.alamat,
                nama: json.parsed.nama,
                password: json.parsed.password,
                tanggallahir: `${tgl.getFullYear()}/${tgl.getUTCMonth() + 1}/${tgl.getDate()}`,
                username: json.parsed.username,
                contentIsLoaded: true
            })
        }).catch(err => {
            alert(err);
        })
    }

    componentDidMount() {
        this.loadDataPengguna();

    }

    render() {

        const styles = EStyleSheet.create({
            container: {
                flex: 1,
                padding: '10rem'
            },
            containerInputanText: {
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: '10rem'
            },
            containerButton: {
                width: '100%',
                flexDirection: 'row',
                marginBottom: '10rem'
            },
            textKeterangan: {
                width: '100rem',
                fontSize: '10rem'
            },
            inputanText: {
                borderWidth: '1rem',
                borderColor: 'grey',
                borderRadius: '2rem',
                padding: '5rem',
                color: 'grey',
                flex: 1
            },
            indikator: {
                marginTop: '20rem'
            },
            indikatorButton: {
                marginLeft: '4rem'
            }
        })

        if (this.state.contentIsLoaded) {
            return (
                <View style={styles.container}>
                    <View style={styles.containerInputanText}>
                        <Text style={styles.textKeterangan}>ID :</Text>
                        <TextInput value={this.state.id.toString()} editable={false} style={styles.inputanText}></TextInput>
                    </View>

                    <View style={styles.containerInputanText}>
                        <Text style={styles.textKeterangan}>Nama : </Text>
                        <TextInput onChangeText={(val) => { this.setState({ nama: val }) }} value={this.state.nama} style={styles.inputanText}></TextInput>
                    </View>

                    <View style={styles.containerInputanText}>
                        <Text style={styles.textKeterangan}>Alamat : </Text>
                        <TextInput onChangeText={(val) => { this.setState({ alamat: val }) }} value={this.state.alamat} style={styles.inputanText}></TextInput>
                    </View>

                    <View style={styles.containerInputanText}>
                        <Text style={styles.textKeterangan}>Tanggal Lahir : </Text>
                        <TextInput onChangeText={(val) => { this.setState({ tanggallahir: val }) }} value={this.state.tanggallahir} style={styles.inputanText}></TextInput>
                    </View>

                    <View style={styles.containerInputanText}>
                        <Text style={styles.textKeterangan}>Username : </Text>
                        <TextInput editable={false} value={this.state.username} style={styles.inputanText}></TextInput>
                    </View>

                    <View style={styles.containerInputanText}>
                        <Text style={styles.textKeterangan}>Password : </Text>
                        <TextInput onChangeText={(val) => { this.setState({ password: val }) }} value={this.state.password} style={styles.inputanText}></TextInput>
                    </View>

                    <View style={styles.containerButton}>
                        {
                            (this.state.prosesmenyimpan) ? (<ActivityIndicator style={styles.indikatorButton}></ActivityIndicator>) : (<Button onPress={() => { this.simpanDetailPengguna() }} color="#03a2cb" title="Simpan"></Button>)
                        }


                    </View>

                </ View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <ActivityIndicator size="large" style={styles.indikator}></ActivityIndicator>
                </View>
            )
        }


    }
}