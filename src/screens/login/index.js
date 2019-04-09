import React, { Component } from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity, AsyncStorage, BackHandler, Animated, Dimensions } from "react-native";
import { Container, Form, Icon, Input, Item, Header, Title } from 'native-base';
import styles from "./style";
import axios from 'axios';

let { height } = Dimensions.get('window');

import { connect } from 'react-redux';
import { updateText } from "../../actions/index";
import CONFIG from '../../config';
import RNFetchBlob from 'rn-fetch-blob'

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(100);
        this.state = {
            uname: null,
            password: null,
            error: 0,
            navigate: this.props.navigation.navigate,
            signInBox: 0,
            success: 0,
            backClickCount: 0
        }
    }

    redirectToOrder = () => {
        axios({
            method: 'get',
            url: `${CONFIG.url}/Login_user_role.php?username=${this.state.uname}&password=${this.state.password}`,
        })
            .then((response) => {
                console.log(response.data);
                if (response.data == 'nulldata') {
                    alert('Invalid UserName and Password')
                } else {
                    this.props.updateText(response.data.records['0']['role'] + "|__|" + response.data.records['0']['id'] + "|__|" + response.data.records['0']['agentname'] + "|__|" + response.data.records['0']['numberofrecords'] + "|__|" + response.data.records['0']['phonenumber'] + "|__|" + response.data.records['0']['email']+"#"+response.data.records['0']['teamname'])
                    AsyncStorage.setItem('userflaw', response.data.records['0']['role']);
                    AsyncStorage.setItem('userflawLogin', 'login');
                    this.setState({ uname: '', password: '' })
                    this.props.navigation.navigate('Home')
                }
            });
    }

    componentDidMount = () => {
        // Add Hardware back button Event
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        // Remove Hardware back button Event
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillReceiveProps = () => {
        // Add Hardware back button Event
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    _spring() {
        // Exit App, Animated popup
        this.setState({ backClickCount: 1 }, () => {
            Animated.sequence([
                Animated.spring(
                    this.springValue,
                    {
                        toValue: -.02 * height,
                        friction: 5,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
            ]).start(() => {
                this.setState({ backClickCount: 0 });
            });
        });
    }


    handleBackButton = () => {
        // Back Button Handler
        this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
        return true;
    };

    render() {
        return (
            <Container>
                <Header androidStatusBarColor='#000' style={styles.headerBackground}>
                    <Title style={styles.headerTitle}>LOG IN</Title>
                </Header>
                <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                    <Text style={styles.exitTitleText}>Double press to exit the app</Text>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => BackHandler.exitApp()}
                    >
                        <Text style={styles.exitText}>Exit</Text>
                    </TouchableOpacity>

                </Animated.View>
                <ImageBackground source={require('../../assets/bg.png')} style={styles.ImageBackground}>
                    <View style={styles.logoWrapper}>
                        <Image source={require('../../assets/logoapp.png')} style={styles.logoInner} />
                    </View>
                    <Form style={styles.formContainer}>
                        <Item style={styles.formItem}>
                            <Image source={require('../../assets/id-card.png')} style={styles.username} />
                            <Input
                                placeholder="UserName"
                                placeholderTextColor="#FFFFFF"
                                onChangeText={(uname) => { this.setState({ uname }); }}
                                value={this.state.uname}
                                style={styles.formInput}
                            />
                            {this.state.error == 1 ? <Icon style={styles.error} name='close-circle' /> : null}
                        </Item>
                        <Item style={styles.formItem}>
                            <Image source={require('../../assets/lock.png')} style={styles.password} />
                            <Input
                                secureTextEntry={true}
                                placeholder="Password"
                                placeholderTextColor="#FFFFFF"
                                onChangeText={(password) => { this.setState({ password }); }}
                                value={this.state.password}
                                style={styles.formInput}
                            />
                            {this.state.error == 1 ? <Icon style={styles.error} name='close-circle' /> : null}
                        </Item>
                        <View style={styles.loginButton}>
                            <TouchableOpacity onPress={() => this.redirectToOrder()}>
                                <Image source={require('../../assets/login.png')} style={styles.loginButtonImage} />
                            </TouchableOpacity>
                        </View>
                    </Form>
                </ImageBackground>
            </Container>
        );
    }

}

function mapStateToProps(state) {
    return {
        updateText_1: state.userRole
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateText: (text) => dispatch(updateText(text)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen)