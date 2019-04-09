import React, { Component } from "react";
import { View, Text, ImageBackground, TouchableHighlight, TouchableOpacity, ScrollView, ActivityIndicator, Modal } from "react-native";
import { Body, Button, Card, CardItem, Container, Icon, Header, Title, Left } from 'native-base';
import styles from "./style";

import axios from 'axios';
import CONFIG from '../../config';
import { Col } from "react-native-easy-grid";
import { connect } from 'react-redux';
import { updateText } from "../../actions/index";
class OrderSingleScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            variantTitle: '',
            hideCUstomerNote: false,
            MessageTemplate: '',
            modalVisible: false,
            agentId: '',
            agentName: '',
            userType: '',
            order_line_item_detail: ''
        }
    }

    componentDidMount() {
        console.log('GETEGETE');
        let idnrole = this.props.updateText_1.updateText.split('|__|');
        this.setState({ userType: idnrole[0], agentId: idnrole[1], agentName: idnrole[2] })

        let { navigation } = this.props;
        let itemId = navigation.getParam('id');
        let orderId = navigation.getParam('orderId');
        let that = this;
        axios({
            method: 'post',
            url: `${CONFIG.url}/responseClient.php?id=${orderId}&agentid=${idnrole[1]}`,
        })
            .then(function (responsedata) {
                console.log(responsedata);
                console.log('Client Response Recorded');
                
            });

        console.log(`${CONFIG.url}/orders_single.php?id=${itemId}&orderId=${orderId}`);
        axios({
            method: 'get',
            url: `${CONFIG.url}/orders_single.php?id=${itemId}&orderId=${orderId}`,
            responseType: 'json'
        })
        .then(function (response) {
            console.log(response)
                response.data != null && response.data != 'null' && response.data != '' ?
                    that.setState({ data: response.data.records, variantTitle: JSON.parse(response.data.records['0']['order_line_item_detail'])['variant_title'] })
                    :
                    that.setState({ data: [] })
            });
    }

    _startClick = (data) => {
        this.setState({ hideCUstomerNote: true });
        axios.get(`${CONFIG.url}/sendemail.php?status=start&emailid=` + data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    _stopClick = (data) => {
        this.setState({ hideCUstomerNote: false });
        axios.get(`${CONFIG.url}/sendemail.php?status=stop&emailid=` + data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    _ststusClick = (key, id, orderid) => {
        if(key == 'Available'){
            this.setState({ hideCUstomerNote: false });
        }else{
            this.setState({ hideCUstomerNote: true });
        }

        
        let index = this.props.navigation.getParam('index');
        axios({
            method: 'post',
            url: `${CONFIG.url}/updateStatus.php?usertype=${this.state.userType}&emailId=${this.state.data[0].email}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&lineitem_id=${this.state.data[0].lineitem_id}&status=${key}&id=${id}&orderId=${orderid}&customer_name=${this.state.data[0].customer_name}&order_name=${this.state.data[0].order_name.replace('#', '')}&order_line_item_detail=${this.state.data[0].order_line_item_detail}`
        }).then((response) => {
            // console.log(response.data);
            if (response.data.trim() == 'Already Reserved') {
                alert('Already Reserved Order');
            } else {
                if (key == 'Available') {
                    console.log(`usertype=${this.state.userType}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&status=${key}&id=${id}&orderId=${orderid}`);

                    this.props.navigation.state.params._updateStatus(key, index, '', '');
                } else {
                    console.log(`usertype=${this.state.userType}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&status=${key}&id=${id}&orderId=${orderid}`);

                    this.props.navigation.state.params._updateStatus(key, index, this.state.agentId, this.state.agentName);
                }
            }
            // console.log(key);
        })
    }

    _ststusSupportClick = (key, id, orderid) => {
        this.setState({ modalVisible: true });
    }

    sendMailSupport = (supportdata) => {
        this.setState({ modalVisible: false });
        console.log(`${CONFIG.url}/sendemail.php?supportdata=${supportdata}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&email=${this.state.data[0].email}&order_id=${this.state.data[0].order_id}&status=${this.state.data[0].status}&id=${this.state.data[0].id}&customer_name=${this.state.data[0].customer_name}&order_name=${this.state.data[0].order_name.replace('#', '')}&order_line_item_detail=${this.state.data[0].order_line_item_detail}`);
        axios({
            method: 'post',
            url: `${CONFIG.url}/sendemail.php?supportdata=${supportdata}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&email=${this.state.data[0].email}&order_id=${this.state.data[0].order_id}&status=${this.state.data[0].status}&id=${this.state.data[0].id}&customer_name=${this.state.data[0].customer_name}&order_name=${this.state.data[0].order_name.replace('#', '')}&order_line_item_detail=${this.state.data[0].order_line_item_detail}`
        }).then((response) => {
            alert('Email Sent');
            console.log(response.data);
        })
    }

    _colorCodeStatus = (key) => {
        switch (key) {
            case 'start':
                return 'yellow'
                break;
            case 'active':
                return 'yellow'
                break;
            case 'completed':
                return '#6FDA44'
                break;
            case 'stuck':
                return '#FE0000'
                break;
            case 'priority':
                return '#f26522'
                break;
            case 'support':
                return 'purple'
                break;
            default:
                return '#2D7E08'
                break;
        }
    }


    render() {
        const { goBack } = this.props.navigation;
        return (
            <Container style={{}}>
                <Header androidStatusBarColor='#000' style={styles.blackBackground}>
                    <Left>
                        <Button transparent onPress={() => goBack()} >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.bodyTitle}>ORDER DETAILS</Title>
                    </Body>
                </Header>
                {this.state.data.length > 0 ?
                    <ImageBackground source={require('../../assets/bg.png')} style={styles.imageBackground}>
                        <ScrollView>
                            <Card style={styles.firstCard}>
                                <CardItem style={styles.backgroundColor}>
                                    <Body style={styles.firstCardBody}>
                                        {/* <Text style={styles.firstCardBodyText}>ORDER Name</Text> */}
                                        <Text style={styles.firstCardBodyText_sec}>{this.state.data['0']['line_item_title']}</Text>
                                        <Text style={styles.firstCardBodyText_sec}>Order-Id:{this.state.data['0']['order_name']}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            <View style={styles.secondView}>
                                <Text style={styles.secondViewText}>{'\u00A9'} An Email has been sent to {this.state.data['0']['email']}</Text>
                            </View>
                            <CardItem style={{ backgroundColor: '#111111' }}>
                                <Body style={styles.statusAllWrapperFirstInner}>
                                    <TouchableOpacity onPress={() => this._ststusClick('active', this.state.data['0']['id'], this.state.data['0']['order_id'])} style={styles.startStatusWrp}>
                                        <Text style={styles.startStopStatus}>START</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this._ststusClick('Available', this.state.data['0']['id'], this.state.data['0']['order_id'])} style={styles.stopStatusWrp}>
                                        <Text style={styles.startStopStatus} >STOP</Text>
                                    </TouchableOpacity>
                                </Body>
                            </CardItem>

                            {this.state.data['0']['customer_email_na'] != '' && this.state.hideCUstomerNote &&
                                (<Card style={styles.customerInfoWrp}>
                                    <CardItem style={styles.blackBackground}>
                                        <Body style={styles.customernotewrapcust}>
                                            <Text style={styles.firstCardBodyText_sec}>Email: {this.state.data['0']['customer_email_na']}</Text>
                                            <Text style={styles.firstCardBodyText_sec}>Password: {this.state.data['0']['customer_password_na']}</Text>
                                            <Text style={styles.firstCardBodyText_sec}>Gamertag: {this.state.data['0']['customer_gamertag_na']}</Text>
                                            <Text style={styles.firstCardBodyText_sec}>Browser Ip: {this.state.data['0']['browser_ip']}</Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                                )
                            }


                            {this.state.data['0']['note'] != ''  &&
                                <Card style={styles.customerInfoWrp}>
                                    <CardItem style={styles.blackBackground}>
                                        <Body style={styles.customernotewrap}>
                                            <Text style={styles.firstCardBodyText}>CUSTOMER NOTE</Text>
                                            <Text style={styles.firstCardBodyText_sec}>{this.state.data['0']['note']}</Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            }

                            <Card style={styles.additionalDetails}>
                                <CardItem style={styles.backgroundColor}>
                                    <Body style={styles.firstCardBody}>
                                        {/* <Text style={styles.firstCardBodyText}>ADDITIONAL DETAILS</Text> */}
                                        <Text style={styles.firstCardBodyText_sec}>{this.state.data['0']['order_attribute']}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            {this.state.variantTitle != '' ?
                                <Card style={styles.additionalDetails}>
                                    <CardItem style={styles.backgroundColor}>
                                        <Body style={styles.firstCardBody}>
                                            {/* <Text style={styles.firstCardBodyText}>VARIANTS</Text> */}
                                            <Text style={styles.firstCardBodyText_sec}>{this.state.variantTitle}</Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                                : <Text></Text>}

                            {this.state.data['0']['agentHistory'] != '' ?
                                <Card style={styles.agentHistory}>
                                    <CardItem style={styles.backgroundColor}>
                                        <Body style={styles.firstCardBody}>
                                            <Text style={styles.firstCardBodyText}>ORDER HISTORY</Text>
                                            <Text style={styles.firstCardBodyText_sec}>Started by: #{this.state.agentId} {this.state.agentName}</Text>
                                            <Text style={styles.firstCardBodyText_sec}>Current Status: <Text style={{ backgroundColor: this._colorCodeStatus(this.state.data['0']['status']), color: '#000' }}>{this.state.data['0']['status']}</Text></Text>
                                            {
                                                this.state.data['0']['agentHistory']['status'] == undefined && JSON.parse(this.state.data['0']['agentHistory']).length != undefined ? (
                                                    <View>
                                                        {
                                                            JSON.parse(this.state.data['0']['agentHistory']).map((item, index, array) => {
                                                                return (
                                                                    <Text key={index} style={{ color: '#ffffff', borderLeftWidth:1, borderLeftColor:'#ffffff', paddingBottom:5, paddingLeft:5 }}>{`-- `} {item.status} at {item.time}</Text>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                ) :
                                                    <Text style={{ color: '#ffffff' }}>{JSON.parse(this.state.data['0']['agentHistory'])['status']} at {JSON.parse(this.state.data['0']['agentHistory'])['time']}</Text>
                                            }
                                        </Body>
                                    </CardItem>
                                </Card>
                                :
                                <Text></Text>
                            }

                            <Card style={styles.allTransparent}>
                                <CardItem style={styles.statusAllWrapper}>
                                    <Body style={styles.statusAllWrapperFirstInner}>
                                        {/* <Col style={styles.statusAllWrapperInner}> */}
                                            <TouchableOpacity onPress={() => this._ststusClick('active', this.state.data['0']['id'], this.state.data['0']['order_id'])} style={styles.activeStatus}>
                                                <Text style={styles.statusTextActive}>ACTIVE</Text>
                                            </TouchableOpacity>
                                        {/* </Col>
                                        <Col style={styles.statusAllWrapperInner}> */}
                                            <TouchableOpacity onPress={() => this._ststusClick('completed', this.state.data['0']['id'], this.state.data['0']['order_id'])} style={styles.completedStatus}>
                                                <Text style={styles.statusofOrder} >COMPLETED</Text>
                                            </TouchableOpacity>
                                        {/* </Col> */}
                                        {/* <Col style={styles.statusAllWrapperInner}> */}
                                            <TouchableOpacity onPress={() => this._ststusClick('stuck', this.state.data['0']['id'], this.state.data['0']['order_id'])} style={styles.stuckStatus}>
                                                <Text style={styles.statusofOrder} >STUCK</Text>
                                            </TouchableOpacity>
                                        {/* </Col> */}
                                        {/* <Col style={styles.statusAllWrapperInner}> */}
                                            <TouchableOpacity onPress={() => this._ststusClick('priority', this.state.data['0']['id'], this.state.data['0']['order_id'])} style={styles.priorityStatus}>
                                                <Text style={styles.statusofOrder} >PRIORITY</Text>
                                            </TouchableOpacity>
                                        {/* </Col> */}
                                    </Body>
                                </CardItem>
                            </Card>

                            <Card style={styles.statusNeedSupport}>
                                <CardItem style={styles.backgroundTranparent}>
                                    <Body style={styles.wrapperNeedSupportText}>
                                        <TouchableOpacity onPress={() => this._ststusSupportClick('support', this.state.data['0']['id'], this.state.data['0']['order_id'])} style={styles.backgroundNeedSupport}>
                                            <Text style={styles.backgroundNeedSupportText} >Need Support</Text>
                                        </TouchableOpacity>
                                    </Body>
                                </CardItem>
                            </Card>
                        </ScrollView>

                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                            }}>
                            <View>
                                <ImageBackground source={require('../../assets/bg.png')} style={styles.imageBackground}>
                                    <Card style={styles.firstCard}>
                                        <CardItem style={styles.backgroundColor}>
                                            <TouchableHighlight
                                                onPress={() => {
                                                    // this.setModalVisible(!this.state.modalVisible);
                                                    this.setState({ modalVisible: false });
                                                }}>
                                                <Text style={styles.firstCardBodyText}>CLOSE</Text>
                                            </TouchableHighlight>
                                        </CardItem>
                                    </Card>
                                    <ScrollView>
                                        <Card style={styles.firstCard}>
                                            <CardItem style={styles.backgroundColor} >
                                                <Body style={styles.firstCardBody}>
                                                    <Text onPress={() => this.sendMailSupport('password')} style={styles.firstCardBodyText}>Wrong Password or email</Text>
                                                </Body>
                                            </CardItem>
                                            <CardItem style={styles.backgroundColor}>
                                                <Body style={styles.firstCardBody}>
                                                    <Text onPress={() => this.sendMailSupport('character')} style={styles.firstCardBodyText}>Which Character?</Text>
                                                </Body>
                                            </CardItem>
                                            <CardItem style={styles.backgroundColor}>
                                                <Body style={styles.firstCardBody}>
                                                    <Text onPress={() => this.sendMailSupport('vcode')} style={styles.firstCardBodyText}>Need Verification code</Text>
                                                </Body>
                                            </CardItem>
                                            <CardItem style={styles.backgroundColor}>
                                                <Body style={styles.firstCardBody}>
                                                    <Text onPress={() => this.sendMailSupport('other')} style={styles.firstCardBodyText}>Other..</Text>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    </ScrollView>
                                </ImageBackground>
                            </View>
                        </Modal>

                    </ImageBackground>
                    :
                    <View style={styles.dataEmpty}>
                        <ActivityIndicator size="large" color="#3f3f3f" />
                    </View>
                }
            </Container>
        )
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
)(OrderSingleScreen)