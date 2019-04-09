import React, { Component } from "react";
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import { Body, Button, Card, CardItem, Container, Icon, Left, Header, Title ,Right} from 'native-base';
import styles from "./style";
import axios from 'axios';
import CONFIG from '../../config';
import { connect } from 'react-redux';
import { updateText } from "../../actions/index";

class SupportScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            agentType: '',
            agent_data: [],
            agentId: '',
            agentPhoneNumber: '',
            agentName: '',
            agentEmail: '',
            dataAgent: [],
            loader: 0
        }
    }

    componentDidMount = () => {
        let idnrole = this.props.updateText_1.updateText.split('|__|');
        this.setState({ agentType: idnrole[0], agentId: idnrole[1], agentName: idnrole[2], agentPhoneNumber: idnrole[4], agentEmail: idnrole[5] })
        if (idnrole[0] == 'admin') {
            axios({
                method: 'get',
                url: `${CONFIG.url}/reademail.php?userType=admin`,
                // responseType: 'json'
            })
                .then((response) => {
                    console.log(response);

                    response.data.records != undefined && response.data.records != '' && response.data.records != 'undefined' && response.data.records != 'error' ?
                        this.setState({ data: response.data.records, loader: 1 })
                        :
                        this.setState({ data: [], loader: 1 })
                });
        }
        if (idnrole[0] == 'agent') {
            axios({
                method: 'get',
                url: `${CONFIG.url}/reademail.php?userType=agent&agentId=${idnrole[1]}`,
                // responseType: 'json'
            })
                .then((response) => {
                    console.log(response);

                    response.data.records != undefined && response.data.records != '' && response.data.records != 'undefined' && response.data.records != 'error' ?
                        this.setState({ dataAgent: response.data.records, loader: 1 })
                        :
                        this.setState({ dataAgent: [], loader: 1 })
                });
        }
    }

    render() {

        const { goBack } = this.props.navigation;
        return (
            <Container style={{}}>
                <Header androidStatusBarColor='#000' style={styles.blackBackground}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={() => goBack()} >
                            <Icon name='arrow-back' style={{ color: '#ffffff' }} />
                        </Button>
                    </Left>
                    <Body style={{alignItems:'center',justifyContent:'center', flex:1}}>
                        <Title style={styles.bodyTitleText}>SUPPORT</Title>
                    </Body>
                    <Right style={{flex:1}}>
                        <Button transparent >
                            <Icon />
                        </Button>
                    </Right>
                </Header>
                <ImageBackground source={require('../../assets/bg.png')} style={styles.imgBackground}>
                    <View style={styles.imgBackgroundInnerView}>
                        <TouchableOpacity style={{ padding: 20 }}>
                            <Text style={styles.buttonTopBar}>LIVE CHAT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inboxButton}>
                            <Text style={styles.buttonTopBar} >INBOX</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.data.length > 0 && this.state.agentType == 'admin' ?
                            <FlatList
                                data={this.state.data}
                                extraData={this.state}
                                renderItem={({ item, key, index }) =>
                                    (
                                        <Card style={styles.cardWrapper}>
                                            <CardItem style={styles.backgroundColor}>
                                                <Body style={styles.backgroundColor}>
                                                    <Text style={styles.cardFirstText}>Email ID: {item.id}</Text>
                                                    <Text style={styles.textItem_time}>SUBJECT: {item.subject}</Text>
                                                    <Text style={styles.textItem_time}>MESSAGE:</Text>
                                                    <Text style={styles.cardFourthText}>{item.message} </Text>
                                                    <View style={styles.cardFifthTextWrapper}>
                                                        <Text style={styles.topBarAgentName}>CUSTOMER: </Text>
                                                        <Text style={styles.topBarAgentNameM}>{item.from}</Text>
                                                    </View>
                                                    <Text style={styles.textItem_time}>Time: {item.date}</Text>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    )}
                                keyExtractor={item => item.id.toString()}
                            />
                            :
                            <View style={styles.cardFirstText}>
                                {
                                    this.state.loader == 0 ?
                                        <ActivityIndicator size="large" color="#ffffff" />
                                        :
                                        <Text style={styles.cardFirstTextNop}></Text>
                                }
                            </View>
                    }

                    {
                        this.state.dataAgent.length > 0 && this.state.agentType == 'agent' ?
                            <FlatList
                                data={this.state.dataAgent}
                                extraData={this.state}
                                renderItem={({ item, key, index }) =>
                                    (
                                        <Card style={styles.cardWrapper}>
                                            <CardItem style={styles.backgroundColor}>
                                                <Body style={styles.backgroundColor}>
                                                    <Text style={styles.cardFirstText}>Email ID: {item.id}</Text>
                                                    <Text style={styles.textItem_time}>SUBJECT: {item.subject.replace("Re:", '')}</Text>
                                                    <Text style={styles.textItem_time}>MESSAGE:</Text>
                                                    <Text style={styles.cardFourthText}>{item.message} </Text>
                                                    <View style={styles.cardFifthTextWrapper}>
                                                        <Text style={styles.topBarAgentName}>CUSTOMER: </Text>
                                                        <Text style={styles.topBarAgentNameM}>{item.from}</Text>
                                                    </View>
                                                    <Text style={styles.textItem_time}>Time: {item.date}</Text>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    )}
                                keyExtractor={item => item.id.toString()}
                            />
                            :
                            <View style={styles.cardFirstText}>
                                {
                                    this.state.loader == 0 ?
                                        // <ActivityIndicator size="large" color="#ffffff" />
                                        <Text></Text>
                                        :
                                        <Text style={styles.cardFirstTextNop}></Text>
                                }
                            </View>
                    }
                    <View style={{ padding: 30 }} />
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
)(SupportScreen)