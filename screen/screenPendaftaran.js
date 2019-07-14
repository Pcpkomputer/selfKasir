import React from "react";
import { TextInput, Button, Dimensions, StyleSheet, TouchableHighlight, Text, View, ImageBackground, Image, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { BoxShadow } from 'react-native-shadow';
import { Font } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';
import { createBottomTabNavigator, createAppContainer, createDrawerNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';


export default class ScreenPendaftaran extends React.Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            dalamproses: false,
            nama: "",
            alamat: "",
            tanggallahir: "",
            username: "",
            password: ""
        }
        this.daftarHandler = this.daftarHandler.bind(this);
    }

    daftarHandler = (navigation) => {
        let { nama, alamat, tanggallahir, username, password } = this.state;
        if (nama.length > 0 && alamat.length > 0 && tanggallahir.length > 0 && username.length > 0 && password.length > 0) {
            if (!tanggallahir.match(/\d\d\d\d\/\d\d\/\d\d/)) {
                alert("Masukkan format tanggal yang benar!")
            }
            else {
                this.setState({
                    dalamproses: true
                })
                let xml = new XMLHttpRequest();
                xml.open("POST", 'https://serverselfkasir.herokuapp.com/prosesPendaftaran', true);
                xml.setRequestHeader('content-type', 'application/json');
                xml.onload = function (res) {
                    let response = JSON.parse(res.target.response);
                    if (response.status) {
                        alert("Berhasil mendaftar, silakan masuk!");
                        navigation('Auth');
                    }
                }
                xml.send(JSON.stringify({
                    nama: nama,
                    alamat: alamat,
                    tanggallahir: tanggallahir,
                    username: username,
                    password: password
                }))
            }
        }
        else {
            alert("Masukkan semua data!");
        }
    }

    render() {

        const styles = EStyleSheet.create({
            containerLogo: {
                justifyContent: 'center',
                alignItems: 'center',
                height: '150rem'
            },
            containerLogin: {
                flex: 1,
                paddingLeft: '35rem',
                paddingRight: '35rem'
            },
            textStore: {
                marginTop: '5rem',
                color: 'white',
                fontSize: '40rem'

            },
            childContainerLogin: {
                flex: 1,

            },
            containerUsername: {
                backgroundColor: '#f8f8f8',
                width: '100%',
                borderRadius: '10rem',
                height: '50rem',
                marginBottom: '40rem'
            },
            containerButton: {
                width: '100%',
                borderRadius: '10rem',
                height: '50rem',
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '40rem'
            },
            inputUsername: {
                color: 'grey',
                padding: '15rem',
                fontSize: '15rem'
            },
            gambarLogin: {
                width: '50rem',
                marginRight: '5rem',
                height: '50rem'
            }
        })


        return (
            <View style={{ flex: 1, backgroundColor: '#03a2cb' }}>
                <View style={styles.containerLogo}>
                    <View><Text style={styles.textStore}>Pendaftaran</Text></View>
                </View>
                <View style={styles.containerLogin}>
                    <View style={styles.childContainerLogin}>
                        <View style={styles.containerUsername}><TextInput onChangeText={(val) => { this.setState({ nama: val }) }} placeholder="Masukkan Nama Kamu" style={styles.inputUsername}></TextInput></View>
                        <View style={styles.containerUsername}><TextInput onChangeText={(val) => { this.setState({ alamat: val }) }} placeholder="Masukkan Alamat Kamu" style={styles.inputUsername}></TextInput></View>
                        <View style={styles.containerUsername}><TextInput onChangeText={(val) => { this.setState({ tanggallahir: val }) }} placeholder="Tanggal Lahir (cth: 1998/08/16)" style={styles.inputUsername}></TextInput></View>
                        <View style={styles.containerUsername}><TextInput onChangeText={(val) => { this.setState({ username: val }) }} placeholder="Username" style={styles.inputUsername}></TextInput></View>
                        <View style={styles.containerUsername}><TextInput onChangeText={(val) => { this.setState({ password: val }) }} secureTextEntry={true} placeholder="Password" style={styles.inputUsername}></TextInput></View>

                        <View style={styles.containerButton}>
                            {
                                (this.state.dalamproses) ? (<View><ActivityIndicator size="large" color="white"></ActivityIndicator></View>) : (<TouchableHighlight underlayColor="#ff000000" onPress={
                                    () => {
                                        let { navigate } = this.props.navigation;
                                        this.daftarHandler(navigate);
                                    }
                                } ><Image style={styles.gambarLogin} source={require("../icon/login.png")}></Image></TouchableHighlight>)
                            }

                        </View>
                    </View>
                </View>
            </View>
        )
    }
}