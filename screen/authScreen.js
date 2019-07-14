import React from "react";
import { TextInput, Button, Dimensions, StyleSheet, TouchableHighlight, Text, View, ImageBackground, Image, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { BoxShadow } from 'react-native-shadow';
import { Font } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';
import { createBottomTabNavigator, createAppContainer, createDrawerNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';


export default class AuthScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.loginHandler = this.loginHandler.bind(this);
        //console.log(this.navigate);
    }
    state = {
        username: "",
        password: "",
    }

    loginHandler = function (navigate) {
        let username = this.state.username;
        let password = this.state.password;
        if (username.length === 0 || password.length === 0) {
            alert("Masukkan semua data!");
        } else {
            fetch(`https://serverselfkasir.herokuapp.com/checkLogin?username=${decodeURIComponent(username)}&password=${decodeURIComponent(password)}`)
                .then((res) => {
                    return res.json();
                })
                .then((val) => {
                    //alert(val.token);
                    //this.props.navigaion.setParam({ token: val.token });
                    this.props.navigation.navigate('Dashboard', { payload: val });
                })
                .catch((err) => {
                    alert(err);
                })
        }
    }

    render() {
        const styles = EStyleSheet.create({
            containerLogo: {
                justifyContent: 'center',
                alignItems: 'center',
                height: '240rem'
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
                justifyContent: 'space-between',
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
                    <View><Text style={styles.textStore}>..... Store</Text></View>
                </View>
                <View style={styles.containerLogin}>
                    <View style={styles.childContainerLogin}>
                        <View style={styles.containerUsername}><TextInput onChangeText={(val) => { this.setState({ username: val }) }} placeholder="Masukkan Username Kamu" style={styles.inputUsername}></TextInput></View>
                        <View style={styles.containerUsername}><TextInput onChangeText={(val) => { this.setState({ password: val }) }} secureTextEntry={true} placeholder="Masukkan Password Kamu" style={styles.inputUsername}></TextInput></View>
                        <View style={styles.containerButton}>
                            <TouchableHighlight onPress={() => { this.props.navigation.navigate('Daftar'); }}><Text style={{ color: 'white' }}>Daftar sekarang!</Text></TouchableHighlight>
                            <TouchableHighlight underlayColor="#ff000000" onPress={
                                () => {
                                    this.loginHandler();
                                }
                            } ><Image style={styles.gambarLogin} source={require("../icon/login.png")}></Image></TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View >
        )
    }

}