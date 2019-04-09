import React, { Component } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Container, Form, Icon, Input, Item, Header, Title, Left, Body, Button } from 'native-base';
import styles from "./style";

export default class customMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toEmail: null,
            messageText: null,
            error: 0,
            navigate: this.props.navigation.navigate,
            signInBox: 0,
            success: 0,
        }
    }

    sendMessage = () => {
        alert('Coming soon...');
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <Container style={{}}>
                <Header androidStatusBarColor='#000' style={{ backgroundColor: '#000' }}>
                    <Left>
                        <Button transparent onPress={() => goBack()} >
                            <Icon name='arrow-back' style={{ color: '#ffffff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.headerTitle}>Custom Message</Title>
                    </Body>
                </Header>
                <ImageBackground source={require('../../assets/bg.png')} style={styles.ImageBackground}>
                    <Form style={styles.formContainer}>
                        <Item style={styles.formItem}>
                            <Input
                                placeholder="To"
                                placeholderTextColor="#FFFFFF"
                                onChangeText={(toEmail) => { this.setState({ toEmail }); }}
                                value={this.state.toEmail}
                                style={styles.formInput}
                            />
                            {this.state.error == 1 ? <Icon style={styles.error} name='close-circle' /> : null}
                        </Item>
                        <Item style={styles.formItem}>
                            <Input
                                secureTextEntry={true}
                                placeholder="Message Text"
                                placeholderTextColor="#FFFFFF"
                                onChangeText={(messageText) => { this.setState({ messageText }); }}
                                value={this.state.messageText}
                                style={styles.formInput}
                            />
                            {this.state.error == 1 ? <Icon style={styles.error} name='close-circle' /> : null}
                        </Item>
                        {/* <View style={styles.loginButton}>
                            <TouchableOpacity onPress={() => this.sendMessage()}>
                                <Text style={styles.signupButton}>Send</Text>
                            </TouchableOpacity>
                        </View> */}
                        <View style={styles.loginButton}>
                            <Text style={styles.signupButton}>Coming Soon...</Text>
                        </View>
                    </Form>
                </ImageBackground>
            </Container>
        );
    }
}