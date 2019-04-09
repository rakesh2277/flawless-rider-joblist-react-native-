import React, { Component } from "react";
import { View, Platform, Text, FlatList, ActivityIndicator, ImageBackground, Image, ScrollView, TouchableOpacity, Alert, Modal, TouchableHighlight, BackHandler } from "react-native";
import { Header, Title, Left, Button, Icon, Body, Card, CardItem, Right } from 'native-base';
import axios from 'axios';
import { Col, Row, Grid } from "react-native-easy-grid";
import { SearchBar } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet'
import styles from "./style";

import CONFIG from '../../config';
import { connect } from 'react-redux';
import { updateText } from "../../actions/index";
import { MyOrderScreen } from '../myorder';
import RNFetchBlob from 'rn-fetch-blob';

let totalPrice = 0;
class MyOrdersAgent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            arrayholder: [],
            blankdata: [],
            loader: 0,
            colorCodeStatusFilterButtonT: '#3f3f3f',
            colorCodeStatusFilterButtonM: '#3f3f3f',
            colorCodeStatusFilterButtonW: '#3f3f3f',
            colorCodeStatusFilterButtonA: '#014198',
            keyId: '',
            _orderId: '',
            dataIndex: 0,
            _orderName: '',
            _order_line_item_detail: '',
            tempState: 0,
            modalVisible: false,
            agentId: '',
            userType: '',
            customer_name: '',
            email: '',
            filterType: 'alldata',
            lineitem_id: ''
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonMyAgent);
        let idnrole = this.props.updateText_1.updateText.split('|__|');

        idnrole[0] == 'agent' && (this.setState({ userType: idnrole[0], agentId: idnrole[1], agentName: idnrole[2] }))
        let that = this;

        // Intially fetch agent orders
        axios({
            method: 'get',
            url: `${CONFIG.url}/orders_by_agentid.php?agentid=${idnrole[1]}`,
            responseType: 'json'
        })
            .then(function (response) {
                response.data.records != undefined && response.data.records != '' && response.data.records != 'undefined' && response.data.records != 'No products found' ?
                    that.setState({ data: response.data.records, arrayholder: response.data.records, loader: 1 })
                    :
                    that.setState({ data: [], arrayholder: [], loader: 1 })
            });
    }

    searchFilterFunction = text => {
        // Search data
        const newData = this.state.arrayholder.filter(item => {
            const itemData = `${item.line_item_title.toUpperCase()}${item.line_item_title.toUpperCase()}${item.line_item_title.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        })
        this.setState({ data: newData });
    };

    _colorCodeStatus = (key) => {
        // Based on item status show button colors
        switch (key) {
            case 'start':
                return 'grey'
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

    _imgStatus = (key) => {
        // Based on item status show order icon 
        switch (key) {
            case 'PC':
                return require('../../assets/orderStatusImg/driver.png')
                break;
            case 'PS4':
                return require('../../assets/orderStatusImg/ps4.png')
                break;
            case 'XB1':
                return require('../../assets/orderStatusImg/xbox.png')
                break;
            default:
                return require('../../assets/orderStatusImg/driver.png')
                break;
        }
    }

    _orderSingle = (index, id, orderId) => {
        // Navigate to order single page
        this.props.navigation.navigate('OrderSingleScreen', { index: index, id: id, orderId: orderId, _updateStatus: this._statusUpdate })
    }

    _statusUpdate = (key, index) => {
        // Send function as a prop to order single page
        alert('Status Updated');
        this.state.data[index]['status'] = key
        this.state.arrayholder[index]['status'] = key
        this.setState({ tempState: 1 });
    }

    showActionSheet = (key, id, orderId, email, customer_name, ordername, lineitem, lineitem_id) => {
        //onClick item status Show actionSheet
        this.setState({ keyId: id, _orderId: orderId, dataIndex: key, email: email, customer_name: customer_name, _orderName: ordername, _order_line_item_detail: lineitem, lineitem_id: lineitem_id });
        this.ActionSheet.show()
    }

    handlePress = (buttonIndex) => {
        // onClick options available in Actionsheet
        if (buttonIndex == '0') {
            this.state.data[this.state.dataIndex]['status'] = 'start'
            this.state.arrayholder[this.state.dataIndex]['status'] = 'start'
            this.setState({ tempState: 1 });
            axios({
                method: 'post',
                url: `${CONFIG.url}/updateStatus.php?usertype=agent&customer_name=${this.state.customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&agentId=${this.state.agentId}&status=active&id=${this.state.keyId}&orderId=${this.state._orderId}`,
            }).then(function (response) {
            })
        }

        if (buttonIndex == '1') {
            this.state.data[this.state.dataIndex]['status'] = 'active'
            this.state.arrayholder[this.state.dataIndex]['status'] = 'active'
            this.setState({ tempState: 1 });
            axios({
                method: 'post',
                url: `${CONFIG.url}/updateStatus.php?usertype=agent&customer_name=${this.state.customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&agentId=${this.state.agentId}&status=active&id=${this.state.keyId}&orderId=${this.state._orderId}`,
            }).then(function (response) {
            })
        }

        if (buttonIndex == '2') {
            this.state.data[this.state.dataIndex]['status'] = 'priority'
            this.state.arrayholder[this.state.dataIndex]['status'] = 'priority'
            this.setState({ tempState: 4 });

            axios({
                method: 'post',
                url: `${CONFIG.url}/updateStatus.php?usertype=agent&customer_name=${this.state.customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&agentId=${this.state.agentId}&status=priority&id=${this.state.keyId}&orderId=${this.state._orderId}`,
            }).then(function (response) {
            })
        }

        if (buttonIndex == '3') {
            this.state.data[this.state.dataIndex]['status'] = 'stuck'
            this.state.arrayholder[this.state.dataIndex]['status'] = 'stuck'
            this.setState({ tempState: 3 });

            axios({
                method: 'post',
                url: `${CONFIG.url}/updateStatus.php?usertype=agent&customer_name=${this.state.customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&agentId=${this.state.agentId}&status=stuck&id=${this.state.keyId}&orderId=${this.state._orderId}`,
            }).then(function (response) {
            })
        }

        if (buttonIndex == '4') {
            this.setModalVisible(true);
        }

        if (buttonIndex == '5') {
            this.state.data[this.state.dataIndex]['status'] = 'completed'
            this.state.arrayholder[this.state.dataIndex]['status'] = 'completed'
            this.setState({ tempState: 2 });
            axios({
                method: 'post',
                url: `${CONFIG.url}/updateStatus.php?usertype=agent&customer_name=${this.state.customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&agentId=${this.state.agentId}&lineitem_id=${this.state.lineitem_id}&status=completed&id=${this.state.keyId}&orderId=${this.state._orderId}`,
            }).then(function (response) {
            })
        }
    }

    sendMailSupport = (supportdata) => {
        axios({
            method: 'post',
            url: `${CONFIG.url}/sendemail.php?supportdata=${supportdata}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&id=${this.state.keyId}&order_id=${this.state._orderId}&emailId=${this.state.email}&customer_name=${this.state.customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}`
        }).then((response) => {
            alert('Email Sent');
        })
    }

    orderExport = (id, name) => {
        // Order Export
        axios({
            method: 'get',
            url: `${CONFIG.url}/ordercsv/create.php?hitfile=createcsv&agentid=${id}&agentname=${name}&filtertype=${this.state.filterType}`,
        }).then((response) => {
            if (response.data.trim() == 'done') {
                let dirs = RNFetchBlob.fs.dirs;
                RNFetchBlob
                    .config({
                        addAndroidDownloads: {
                            useDownloadManager: true,
                            notification: true,
                            mime: 'text/csv',
                            description: 'File downloaded by download manager.'
                        },
                        IOSDownloadTask: true,
                        path: Platform.OS === 'ios' ? `${dirs.DocumentDir}/joblist_${name.replace(/ /g, "_")}_${id}_order.csv` : ''
                    })
                    .fetch('GET', `${CONFIG.url}/ordercsv/joblist_${name.replace(/ /g, "_")}_${id}_order.csv`)
                    .then((resp) => {
                        resp.path();
                    })
                this.setState({ modalVisible: false })
            } else {
                alert(`No data Available for ${name} Agent`);
            }
        })
    }

    componentWillUnmount() {
        // Remove Action Listener
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonMyAgent);
    }

    componentWillReceiveProps = () => {
        // Add Action Listener
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonMyAgent);
    }

    handleBackButtonMyAgent = () => {
        // Hardware Back Button Handler
        this.props.navigation.navigate('Home')
        return true;
    };

    __onPressButton_filter = (data) => {
        // Week-Month Filter
        let that = this;
        let idnrole = this.props.updateText_1.updateText.split('|__|');
        that.setState({ data: [], arrayholder: [], loader: 0 })
        if (data == 'month') {
            that.setState({ colorCodeStatusFilterButtonM: '#014198' })
            that.setState({ colorCodeStatusFilterButtonA: '#3f3f3f' })
            that.setState({ colorCodeStatusFilterButtonW: '#3f3f3f' })
            that.setState({ colorCodeStatusFilterButtonT: '#3f3f3f' })
        }
        if (data == 'week') {
            that.setState({ colorCodeStatusFilterButtonW: '#014198' })
            that.setState({ colorCodeStatusFilterButtonA: '#3f3f3f' })
            that.setState({ colorCodeStatusFilterButtonT: '#3f3f3f' })
            that.setState({ colorCodeStatusFilterButtonM: '#3f3f3f' })
        }
        if (data == 'alldata') {
            that.setState({ colorCodeStatusFilterButtonA: '#014198' })
            that.setState({ colorCodeStatusFilterButtonT: '#3f3f3f' })
            that.setState({ colorCodeStatusFilterButtonW: '#3f3f3f' })
            that.setState({ colorCodeStatusFilterButtonM: '#3f3f3f' })
        }
        if (data == 'today') {
            that.setState({ colorCodeStatusFilterButtonT: '#014198' })
            that.setState({ colorCodeStatusFilterButtonA: '#3f3f3f' })
            that.setState({ colorCodeStatusFilterButtonW: '#3f3f3f' })
            that.setState({ colorCodeStatusFilterButtonM: '#3f3f3f' })
        }
        axios({
            method: 'get',
            url: `${CONFIG.url}/orders_by_agentid.php?data_filter=${data}&agentid=${idnrole[1]}`
        })
            .then(function (response) {
                response.data != null && response.data != 'null' && response.data != '' && response.data.records != 'No products found' ?

                    that.setState({ filterType: data, data: response.data.records, arrayholder: response.data.records, totalPrice: response.data.records['0'].totalPrice })
                    :
                    that.setState({ data: [], arrayholder: [], loader: 1 })
            });
    }

    render() {
        totalPrice = 0
        const { goBack } = this.props.navigation;

        // ActionSheet options for Android
        const options = [
            <View style={styles.startAction}>
                <Text style={styles.actionSheetTextStyle}>Start</Text>
            </View>,
            <View style={styles.activeAction}>
                <Text style={styles.actionSheetTextStyle_c}>Active</Text>
            </View>,
            <View style={styles.priorityAction}>
                <Text style={styles.actionSheetTextStyle}>Priority</Text>
            </View>,
            <View style={styles.stuckAction}>
                <Text style={styles.actionSheetTextStyle}>Stuck</Text>
            </View>,
            <View style={styles.needSupportAction}>
                <Text style={styles.actionSheetTextStyle}>Need Support</Text>
            </View>,
            <View style={styles.completedAction}>
                <Text style={styles.actionSheetTextStyle}>Completed</Text>
            </View>,
            <View style={styles.cancleAction}>
                <Text style={styles.actionSheetTextStyle_c}>Cancle</Text>
            </View>
        ]

        // ActionSheet options for IOS
        const optionsIos = [
            'Start',
            'Active',
            'Priority',
            'Stuck',
            'Need Support',
            'Completed',
            'Cancle'
        ]
        return (
            <View style={{}}>
                <Header androidStatusBarColor='#000' style={styles.blackBackgroundColor}>
                    <Left>
                        <Button transparent onPress={() => goBack()} >
                            <Icon name='arrow-back' style={{ color: '#ffffff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.headerBodyText}>MY ORDERS</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.orderExport(this.state.agentId, this.state.agentName)} >
                            <Icon name='download' style={{ color: '#ffffff' }} />
                        </Button>
                    </Right>
                </Header>
                {this.state.userType == 'agent' ?
                    (
                        <ImageBackground source={require('../../assets/bg.png')} style={styles.ImageBackgroundMyOrder}>
                            <View style={{ height: 100 }}>
                                <SearchBar
                                    placeholder="Type Here..."
                                    containerStyle={styles.backGroundColorMyOrder}
                                    placeholderTextColor='#ffffff'
                                    inputStyle={styles.searchbarStyle}
                                    onChangeText={text => this.searchFilterFunction(text)}
                                    autoCorrect={false}
                                />
                                <View style={styles.filterWrapper}>
                                    <Col onPress={() => this.__onPressButton_filter('week')} style={{ backgroundColor: this.state.colorCodeStatusFilterButtonW, height: 45, borderRightColor: '#000', margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={styles.filterText}>Week</Text>
                                    </Col>
                                    <Col onPress={() => this.__onPressButton_filter('month')} style={{ backgroundColor: this.state.colorCodeStatusFilterButtonM, height: 45, borderRightColor: '#000', margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={styles.filterText} >Month</Text>
                                    </Col>
                                    <Col onPress={() => this.__onPressButton_filter('alldata')} style={{ backgroundColor: this.state.colorCodeStatusFilterButtonA, height: 45, borderRightColor: '#000', margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={styles.filterText}>All</Text>
                                    </Col>
                                </View>
                            </View>
                            <View style={{ height: 60 }}>
                                {this.state.data.length > 0 &&
                                    (<View style={styles.filterWrapper}>
                                        <Col style={{ backgroundColor: this.state.colorCodeStatusFilterButtonT, height: 50, borderRightColor: '#000', margin: 10, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }}>
                                            <Text style={styles.totalPrice}>Total Earning: </Text>
                                            <Text style={styles.totalPrice}>${this.state.data[0].totalPrice}</Text>
                                        </Col>
                                    </View>
                                    )
                                }
                            </View>

                            <Grid>
                                {
                                    this.state.data.length > 0 ?
                                        <View style={{ marginBottom: 180 }}>
                                            <FlatList
                                                data={this.state.data}
                                                extraData={this.state}
                                                renderItem={({ item, key, index }) =>
                                                    (
                                                        <Row style={{ height: 90 }} key onPress={() => this._orderSingle(index, item.id, item.order_id)}>
                                                            <Col style={styles.wrapperMyOrder}>
                                                                <Image source={this._imgStatus(item.order_attribute)} style={{ maxWidth: 50, resizeMode: 'contain' }} />
                                                            </Col>
                                                            <Col style={styles.itemTitleWrapper}>
                                                                <Text style={styles.itemTitle}>
                                                                    {
                                                                        item.line_item_title.length < 25 ? item.line_item_title : item.line_item_title.substring(1, 20) + '. . .'
                                                                    }
                                                                </Text>
                                                                <Text style={styles.createdDate}>{item.created_date.split('T')['0']}</Text>
                                                                <Text style={styles.createdDate}>{item.created_date.split('T')['1']}</Text>
                                                            </Col>
                                                            <Col style={{ backgroundColor: this._colorCodeStatus(item.status), width: '20%', zIndex: 99, height: 78, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                                                <TouchableOpacity onPress={() => this.showActionSheet(index, item.id, item.order_id, item.email, item.customer_name, item.order_name, item.order_line_item_detail, item.line_item_id)} style={styles.itemStatus}>
                                                                    <Text style={styles.itemStatusText}>{item.status}</Text>
                                                                </TouchableOpacity>
                                                            </Col>
                                                            <Col style={styles.itemPrice}>
                                                                <Text style={styles.itemPriceText}>${item.price}</Text>
                                                            </Col>
                                                        </Row>
                                                    )}
                                                keyExtractor={item => item.id}
                                            />
                                            <ActionSheet
                                                ref={o => this.ActionSheet = o}
                                                title={'Which one do you like ?'}
                                                options={Platform.OS === 'ios' ? optionsIos : options}
                                                onPress={this.handlePress}
                                                styles={{ titleText: styles.actionSheetElements }}
                                                tintColor={Platform.OS === 'ios' ? '#000000' : '#ffffff'}
                                            />
                                            <Modal
                                                animationType="slide"
                                                transparent={false}
                                                visible={this.state.modalVisible}
                                                onRequestClose={() => {
                                                    Alert.alert('Modal has been closed.');
                                                }}>
                                                <View>
                                                    <ImageBackground source={require('../../assets/bg.png')} style={styles.ImageBackgroundMyOrder}>
                                                        <Card style={styles.cardMain}>
                                                            <CardItem style={styles.backGroundColorMyOrder}>
                                                                <TouchableHighlight
                                                                    onPress={() => {
                                                                        this.setState({ modalVisible: false });
                                                                    }}>
                                                                    <Text style={styles.cardItem}>CLOSE</Text>
                                                                </TouchableHighlight>
                                                            </CardItem>
                                                        </Card>
                                                        <ScrollView>
                                                            <Card style={styles.cardMain}>
                                                                <CardItem style={styles.backGroundColorMyOrder} >
                                                                    <Body style={styles.backGroundColorBody}>
                                                                        <Text onPress={() => this.sendMailSupport('password')} style={styles.cardItem}>Wrong Password or email</Text>
                                                                    </Body>
                                                                </CardItem>
                                                                <CardItem style={styles.backGroundColorMyOrder}>
                                                                    <Body style={styles.backGroundColorBody}>
                                                                        <Text onPress={() => this.sendMailSupport('character')} style={styles.cardItem}>Which Character?</Text>
                                                                    </Body>
                                                                </CardItem>
                                                                <CardItem style={styles.backGroundColorMyOrder}>
                                                                    <Body style={styles.backGroundColorBody}>
                                                                        <Text onPress={() => this.sendMailSupport('vcode')} style={styles.cardItem}>Need Verification code</Text>
                                                                    </Body>
                                                                </CardItem>
                                                                <CardItem style={styles.backGroundColorMyOrder}>
                                                                    <Body style={styles.backGroundColorBody}>
                                                                        <Text onPress={() => this.sendMailSupport('other')} style={styles.cardItem}>Other..</Text>
                                                                    </Body>
                                                                </CardItem>
                                                            </Card>
                                                        </ScrollView>
                                                    </ImageBackground>
                                                </View>
                                            </Modal>
                                        </View>
                                        :
                                        <View style={styles.emptyData}>
                                            {this.state.loader == 0 ?
                                                <Col style={styles.emptyData}>
                                                    <ActivityIndicator size="large" color="#ffffff" />
                                                </Col>
                                                :
                                                <Col style={styles.emptyDataText}>
                                                    <Text style={styles.emptyDataInnerText}>Orders are Not Available</Text>
                                                </Col>
                                            }
                                        </View>
                                }
                            </Grid>
                        </ImageBackground >
                    )
                    :
                    <ImageBackground source={require('../../assets/bg.png')} style={styles.ImageBackgroundMyOrder}></ImageBackground>
                }
            </View>
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
)(MyOrdersAgent)