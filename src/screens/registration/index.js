import React, { Component } from "react";
import { View, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import { Body, Button, Container, Left, Form, Icon, Input, Item, Header, Title } from 'native-base';
import styles from "./style";
import axios from 'axios';
import MultiSelect from 'react-native-quick-select';


const items = [
    {
        id: 'TEAM-A',
        name: 'PS4 TEAM A',

    }, {
        id: 'TEAM-B',
        name: 'PS4 TEAM B',
    }, {
        id: 'TEAM_A',
        name: 'XBC TEAM A',
    },
    {
        id: 'TEAM_B',
        name: 'XBC TEAM B',
    },
    {
        id: 'TEAM A',
        name: 'PC TEAM A',
    },
    {
        id: 'TEAM B',
        name: 'PC TEAM B',
    }
];


const items2 = [
    {
        id: 'TEAM-A',
        name: 'PS4 TEAM A',

    }, {
        id: 'TEAM-B',
        name: 'PS4 TEAM B',
    }, {
        id: 'TEAM_A',
        name: 'XBC TEAM A',
    },
    {
        id: 'TEAM_B',
        name: 'XBC TEAM B',
    },
    {
        id: 'TEAM A',
        name: 'PC TEAM A',
    },
    {
        id: 'TEAM B',
        name: 'PC TEAM B',
    }
];
const icon = require('../../assets/network.png');


export default class RegistrationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uname: '',
            password: '',
            name: '',
            // teamname: '',
            email: '',
            error: 0,
            navigate: this.props.navigation.navigate,
            signInBox: 0,
            success: 0,
            pnumber: '',
            teamname: [],
            teamname2: [],

        }

    }
    onSelectedItemsChange = (teamname) => {
        this.setState({ teamname });
    }
    onSelectedItemsChange2 = (teamname2) => {
        this.setState({ teamname2 });
    }




    _signUpFormClick = () => {

        // const email=this.state.email
        // const teamname=this.state.teamname
        // const uname=this.state.uname
        // const name=this.state.name
        // const password=this.state.password
        // const pnumber=this.state.pnumber
        // const finalData={
        //     email,
        //     teamname,
        //     uname,
        //     name,
        //     password,
        //     pnumber,

        // }

        if (this.state.uname == '' && this.state.password == '' && this.state.name == '' && this.state.teamname == [] && this.state.email == '' && this.state.pnumber == '') {
            alert('All Fields are Required');
        } else {
            axios({
                method: 'post',
                url: `https://shopify.wpfruits.com/client/jobList/insertUserDetails.php?email=${this.state.email}&teamname=${this.state.teamname}&name=${this.state.name}&username=${this.state.uname}&password=${this.state.password}&pnumber=${this.state.pnumber}`,
            })

                .then((response) => {
                    console.log(response)

                    if (response.data == 'alreadyexistusername') {
                        alert('Username Already Exist, Please try with different username')
                    } else {
                        this.setState({ uname: '', password: '', name: '', teamname: [], email: '', error: 0, signInBox: 0, success: 0, pnumber: '' })
                        alert('Agent Registered');
                    }
                });
            // console.log(response.data)
        }
    }

    render() {
        console.log(this.state.teamname2)

        console.log(this.state.teamname)
        const { goBack } = this.props.navigation;
        return (
            <Container>
                <Header androidStatusBarColor='#000' style={styles.blckBackground}>
                    <Left>
                        <Button transparent onPress={() => goBack()} >
                            <Icon name='arrow-back' style={{ color: '#ffffff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.bodyTitleText}>SIGN UP</Title>
                    </Body>
                </Header>
                <ImageBackground source={require('../../assets/bg.png')} style={styles.imgBackgroundW}>
                    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                        <View style={styles.viewWrapper}>
                            <Image source={require('../../assets/logoapp.png')} style={styles.imgDimensions} />
                        </View>
                        <ScrollView>
                            <Form style={styles.formContainer}>

                                <Item style={styles.formItem}>
                                    <Image source={require('../../assets/user.png')} style={styles.imageDimensions} />
                                    <Input
                                        placeholder="NAME"
                                        placeholderTextColor="#FFFFFF"
                                        onChangeText={(name) => { this.setState({ name }); }}
                                        value={this.state.name}
                                        style={styles.formInput}
                                    />
                                    {this.state.error == 1 ? <Icon style={styles.error} name='close-circle' /> : null}
                                </Item>
                                <Item style={styles.formInputDropDown} >
                                    <Image source={require('../../assets/network.png')} style={styles.imageDimensions} />
                                    {/* <Input
                                    placeholder="TEAM NAME"
                                    placeholderTextColor="#FFFFFF"
                                    onChangeText={(teamname) => { this.setState({ teamname }); }}
                                    value={this.state.teamname}
                                    style={styles.formInput}
                                />
                                {this.state.error == 1 ? <Icon style={styles.error} name='close-circle' /> : null} */}
                                    <MultiSelect
                                        items={items}
                                        uniqueKey="id"
                                        onSelectedItemsChange={this.onSelectedItemsChange}
                                        selectedItems={this.state.teamname}
                                        selectText="TEAM NAME(PVE)"
                                        searchInputPlaceholderText="Search Items..."
                                        // altFontFamily="Enter-The-Grid"
                                        tagRemoveIconColor="#CCC"
                                        tagBorderColor="#CCC"
                                        tagTextColor="#CCC"
                                        selectedItemTextColor="#CCC"
                                        selectedItemIconColor="#CCC"
                                        itemTextColor="#000"
                                        searchInputStyle={{ color: '#CCC' }}
                                        submitButtonColor="gray"
                                        submitButtonText="Submit"
                                        style={styles.multiSelectBackground} />
                                </Item>

                                <Item style={styles.formInputDropDown} >
                                    <Image source={require('../../assets/network.png')} style={styles.imageDimensionsMultilsect} />
                                    <MultiSelect
                                        items={items2}
                                        uniqueKey="id"
                                        onSelectedItemsChange={this.onSelectedItemsChange2}
                                        selectedItems={this.state.teamname2}
                                        selectText="TEAM NAME(PVP)"
                                        searchInputPlaceholderText="Search Items..."
                                        tagRemoveIconColor="#CCC"
                                        tagBorderColor="#CCC"
                                        tagTextColor="#CCC"
                                        selectedItemTextColor="#CCC"
                                        selectedItemIconColor="#CCC"
                                        itemTextColor="#000"
                                        searchInputStyle={{ color: '#CCC' }}
                                        submitButtonColor="gray"
                                        submitButtonText="Submit" />
                                </Item>


                                <Item style={styles.formItem}>
                                    <Image source={require('../../assets/mail.png')} style={styles.imageDimensions} />
                                    <Input
                                        placeholder="EMAIL"
                                        placeholderTextColor="#FFFFFF"
                                        onChangeText={(email) => { this.setState({ email }); }}
                                        value={this.state.email}
                                        style={styles.formInput}
                                        keyboardType='email-address'
                                    />
                                    {this.state.error == 1 ? <Icon style={styles.error} name='close-circle' /> : null}
                                </Item>
                                <Item style={styles.formItem}>
                                    <Image source={require('../../assets/id-card.png')} style={styles.imageDimensions} />
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
                                    <Image source={require('../../assets/id-card.png')} style={styles.imageDimensions} />
                                    <Input
                                        placeholder="Phone Number"
                                        placeholderTextColor="#FFFFFF"
                                        keyboardType='numeric'
                                        onChangeText={(pnumber) => { this.setState({ pnumber }); }}
                                        value={this.state.pnumber}
                                        style={styles.formInput}
                                    />
                                    {this.state.error == 1 ? <Icon style={styles.error} name='close-circle' /> : null}
                                </Item>
                                <Item style={styles.formItem}>
                                    <Image source={require('../../assets/lock.png')} style={styles.passwordFieldImgDimensions} />
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
                                <View style={styles.formSubmit}>
                                    <TouchableOpacity onPress={() => this._signUpFormClick()}>
                                        <Image source={require('../../assets/login.png')} style={styles.formSubmitImgBtn} />
                                    </TouchableOpacity>
                                </View>
                            </Form>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </Container>
        );
    }
}