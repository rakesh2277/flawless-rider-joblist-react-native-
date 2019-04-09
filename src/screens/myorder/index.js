import React, { Component } from "react";
import { View, BackHandler, Text, FlatList, ActivityIndicator, Platform, ImageBackground, Image, ScrollView, TouchableOpacity, Alert, TextInput, Modal, TouchableHighlight } from "react-native";
import { Header, Title, Left, Button, Icon, Body, Card, CardItem, Right } from 'native-base';
import axios from 'axios';
import { Col, Row, Grid } from "react-native-easy-grid";
import { SearchBar } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet'
import styles from "./style";

import CONFIG from '../../config';
import { connect } from 'react-redux';
import { updateText } from "../../actions/index";
import RNFetchBlob from 'rn-fetch-blob';
//  import moment from 'moment';

class MyOrderScreen extends Component {
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
            tempState: 0,
            modalVisible: false,
            agentId: '',
            totalPrice: '',
            filterType: 'week',
            _orderName: '',
            _order_line_item_detail: '',
            customer_name: ''
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonMyOrder);
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        let idnrole = this.props.updateText_1.updateText.split('|__|');
        this.setState({ agentId: idnrole[1], agentName: idnrole[2] })

        let that = this;
        axios({
            method: 'get',
            url: `${CONFIG.url}/orders_by_status.php?data_filter=alldata`,
            responseType: 'json'
        })
            .then(function (response) {
                that.setState({ data: response.data.records, arrayholder: response.data.records, loader: 1, totalPrice: response.data.records['0'].totalPrice });
            });
    }

    __onPressButton_filter = (data) => {
        let that = this;
        that.setState({ data: [], arrayholder: [], loader: 0 })
        console.log(data);
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
            url: `${CONFIG.url}/orders_by_status.php?data_filter=${data}`,
            responseType: 'json'
        })
            .then(function (response) {
                console.log(response.data);
                response.data != null && response.data != 'null' && response.data != '' ?
                    that.setState({ filterType: data, data: response.data.records, arrayholder: response.data.records, totalPrice: response.data.records['0'].totalPrice })
                    :
                    that.setState({ data: [], arrayholder: [], loader: 1 })
            });
    }

    searchFilterFunction = text => {
        const newData = this.state.arrayholder.filter(item => {
            const itemData = `${item.line_item_title.toUpperCase()}${item.line_item_title.toUpperCase()}${item.line_item_title.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        })
        this.setState({ data: newData });
    };

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

    _imgStatus = (key) => {
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
        this.props.navigation.navigate('OrderSingleScreen', { index: index, id: id, orderId: orderId, _updateStatus: this._statusUpdate })
    }

    _statusUpdate = (key, index, agentId, agentName) => {
        alert('Status Updated');
        this.state.data[index]['status'] = key
        this.state.arrayholder[index]['status'] = key
        this.state.data[index]['agentName'] = agentName
        this.state.arrayholder[index]['agentId'] = agentId
        this.setState({ tempState: 1 });
    }

    showActionSheet = (key, id, orderId, email, customer_name, ordername, lineitem, lineitem_id) => {
        // alert(customer_name);
        this.setState({ keyId: id, _orderId: orderId, dataIndex: key, email: email, customer_name: customer_name, _orderName: ordername, _order_line_item_detail: lineitem, lineitem_id: lineitem_id });
        this.ActionSheet.show()
    }

    handlePress = (buttonIndex) => {
        let that = this;
        if (buttonIndex == '0') {
            axios({
                method: 'post',
                url: `${CONFIG.url}/updateStatus.php?customer_name=${this.state.customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&status=active&id=${this.state.keyId}&orderId=${this.state._orderId}`,
            }).then((response) => {
                console.log(response.data);

                if (response.data.trim() == 'Already Reserved') {
                    alert('Already Reserved Order');
                } else {
                    this.state.data[that.state.dataIndex]['status'] = 'active'
                    this.state.arrayholder[that.state.dataIndex]['status'] = 'active'
                    this.state.data[that.state.dataIndex]['agentName'] = this.state.agentName
                    this.state.arrayholder[that.state.dataIndex]['agentId'] = this.state.agentId
                    this.setState({ tempState: 0 });
                }
            })
        }
        if (buttonIndex == '1') {
            axios({
                method: 'post',
                url: `${CONFIG.url}/updateStatus.php?customer_name=${this.state.customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&status=active&id=${this.state.keyId}&orderId=${this.state._orderId}`,
            }).then((response) => {
                if (response.data.trim() == 'Already Reserved') {
                    alert('Already Reserved Order');
                } else {
                    this.state.data[that.state.dataIndex]['status'] = 'active'
                    this.state.arrayholder[that.state.dataIndex]['status'] = 'active'
                    this.state.data[that.state.dataIndex]['agentName'] = this.state.agentName
                    this.state.arrayholder[that.state.dataIndex]['agentId'] = this.state.agentId
                    this.setState({ tempState: 1 });
                }
            })
        }

        if (buttonIndex == '2') {
            this.setState({ tempState: 4 });
            axios({
                method: 'post',
                url: `${CONFIG.url}/updateStatus.php?customer_name=${this.state.customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&status=priority&id=${this.state.keyId}&orderId=${this.state._orderId}`,
            }).then((response) => {
                if (response.data.trim() == 'Already Reserved') {
                    alert('Already Reserved Order');
                } else {
                    this.state.data[this.state.dataIndex]['status'] = 'priority'
                    this.state.arrayholder[this.state.dataIndex]['status'] = 'priority'
                    this.state.data[that.state.dataIndex]['agentName'] = this.state.agentName
                    this.state.arrayholder[that.state.dataIndex]['agentId'] = this.state.agentId
                    this.setState({ tempState: 2 });
                }
            })
        }
        if (buttonIndex == '3') {
            axios({
                method: 'post',
                url: `${CONFIG.url}/updateStatus.php?customer_name=${this.state.customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&status=stuck&id=${this.state.keyId}&orderId=${this.state._orderId}`,
            }).then((response) => {
                if (response.data.trim() == 'Already Reserved') {
                    alert('Already Reserved Order');
                } else {
                    this.state.data[this.state.dataIndex]['status'] = 'stuck'
                    this.state.arrayholder[this.state.dataIndex]['status'] = 'stuck'
                    this.state.data[that.state.dataIndex]['agentName'] = this.state.agentName
                    this.state.arrayholder[that.state.dataIndex]['agentId'] = this.state.agentId
                    this.setState({ tempState: 4 });
                }
            })
        }
        if (buttonIndex == '4') {
            this.setModalVisible(true);
        }
        if (buttonIndex == '5') {
            axios({
                method: 'post',
                url: `${CONFIG.url}/updateStatus.php?customer_name=${this.state.customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&lineitem_id=${this.state.lineitem_id}&status=completed&id=${this.state.keyId}&orderId=${this.state._orderId}`,
            }).then((response) => {
                if (response.data.trim() == 'Already Reserved') {
                    alert('Already Reserved Order');
                } else {
                    this.state.data[this.state.dataIndex]['status'] = 'completed'
                    this.state.arrayholder[this.state.dataIndex]['status'] = 'completed'
                    this.state.data[that.state.dataIndex]['agentName'] = this.state.agentName
                    this.state.arrayholder[that.state.dataIndex]['agentId'] = this.state.agentId
                    this.setState({ tempState: 5 });
                }
            })
        }
    }


    handleAddMore = (text, itemId, itemOrderId) => {
        (text == '') || (text.indexOf(',') > -1) ?
            console.log('Enter Price')
            :
            axios({
                method: 'post',
                url: `${CONFIG.url}/priceChange.php?price=${text}&id=${itemId}&orderId=${itemOrderId}`,
            }).then(function (response) {
                // console.log(response);
            })
    }

    sendMailSupport = (supportdata) => {
        axios({
            method: 'post',
            url: `${CONFIG.url}/sendemail.php?supportdata=${supportdata}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&id=${this.state.keyId}&order_id=${this.state._orderId}&emailId=${this.state.email}&customer_name=${this.state.customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}`
        }).then((response) => {
            alert('Email Sent');
            console.log(response.data);
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonMyOrder);
    }

    componentWillReceiveProps = () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonMyOrder);
    }

    handleBackButtonMyOrder = () => {
        this.props.navigation.navigate('Home')
        return true;
    };

    orderExport = () => {
        //  alert( this.state.filterType );

        axios({
            method: 'get',
            url: `${CONFIG.url}/ordercsv/create.php?hitfile=createcsv&filtertype=${this.state.filterType}`,
        }).then((response) => {
            // alert(JSON.stringify(response))
            console.log('downloadResponse', response)
            if (response.data.trim() == 'done') {
                let dirs = RNFetchBlob.fs.dirs;
                RNFetchBlob
                    .config({
                        addAndroidDownloads: {
                            useDownloadManager: true, // <-- this is the only thing required
                            // Optional, override notification setting (default to true)
                            notification: true,
                            // Optional, but recommended since android DownloadManager will fail when
                            // the url does not contains a file extension, by default the mime type will be text/plain
                            mime: 'text/csv',
                            description: 'File downloaded by download manager.'
                        },
                        IOSDownloadTask: true,
                        path: Platform.OS === 'ios' ? `${dirs.DocumentDir}/joblist___order.csv` : ''
                    })
                    .fetch('GET', `${CONFIG.url}/ordercsv/joblist___order.csv`)
                    .then((resp) => {
                        resp.path();
                        alert('File Downloaded');
                    })
            }
        })
    }

    render() {

        // console.log(this.state.data.item.created_date)



        const { goBack } = this.props.navigation;
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
                <Text style={styles.actionSheetTextStyle_c}>Cancel</Text>
            </View>
        ]
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
                <Header androidStatusBarColor='#000' style={{ backgroundColor: '#000' }}>
                    <Left>
                        <Button transparent onPress={() => goBack()} >
                            <Icon name='arrow-back' style={{ color: '#ffffff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.headerBodyText}>MY ORDERS</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.orderExport()} >
                            <Icon name='download' style={{ color: '#ffffff' }} />
                        </Button>
                    </Right>
                </Header>
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
                            <Col onPress={() => this.__onPressButton_filter('today')} style={{ backgroundColor: this.state.colorCodeStatusFilterButtonT, height: 45, borderRightColor: '#000', margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.filterText} >Today</Text>
                            </Col>
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
                    {this.state.data.length > 0 && (
                        <View style={{ height: 60 }}>
                            <View style={styles.filterWrapper}>
                                <Col style={{ backgroundColor: '#3f3f3f', height: 45, borderRightColor: '#000', margin: 10, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={styles.filterText} >{this.state.filterType == 'week' ? 'Grand Total' : (this.state.filterType + 'ly Total')}</Text>
                                    <Text style={styles.filterText_pr} >${this.state.totalPrice}</Text>
                                </Col>
                            </View>
                        </View>)}
                    <Grid>
                        {
                            this.state.data.length > 0 ?
                                <View>
                                    <FlatList
                                        data={this.state.data}
                                        extraData={this.state}
                                        renderItem={({ item, key, index }) =>

                                            (

                                                <Row style={{ height: 90 }} key onPress={() => this._orderSingle(index, item.id, item.order_id)}>
                                                    <Col style={styles.wrapperMyOrder}>
                                                        <Image source={this._imgStatus(item.order_attribute)} style={{ maxWidth: 50, resizeMode: 'contain' }} />
                                                        <Text style={styles.orderidstyle}>{item.order_name}</Text>
                                                    </Col>
                                                    <Col style={styles.itemTitleWrapper}>
                                                        <Text style={styles.itemTitle}>
                                                            {
                                                                item.line_item_title.length < 25 ? item.line_item_title : item.line_item_title.substring(1, 20) + '. . .'
                                                            }
                                                           
                                                        </Text>
                                                        <Text style={styles.createdDate}>{item.created_date.split('T')[0]}</Text>
                                                        <Text style={styles.createdDate}>{item.created_date.split('T')[1]}</Text>
                                                        {/* <Text style={styles.createdDate}>{moment(item.created_date).format('HH:MM')}-{moment(item.created_date).format('HH:MM')}</Text> */}

                                                    </Col>

                                                    <Col onPress={() => this.showActionSheet(index, item.id, item.order_id, item.email, item.customer_name, item.order_name, item.order_line_item_detail, item.lineitem_id)}
                                                        style={{ backgroundColor: this._colorCodeStatus(item.status), width: '20%', zIndex: 99, height: 78, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                                        <View style={styles.itemStatus}>
                                                            <Text style={styles.itemStatusText}>{item.status}</Text>
                                                        </View>
                                                        <View style={styles.itemStatus}>
                                                            {item.agentId != '0' && item.agentName != '' ?
                                                                <Text style={styles.reservedAgent}>#{item.agentId} {item.agentName}</Text> :
                                                                <Text></Text>
                                                            }
                                                        </View>
                                                    </Col>

                                                    <Col style={styles.itemPrice}>
                                                        <TextInput
                                                            style={styles.itemPriceInputField}
                                                            onChangeText={(text) => { this.handleAddMore(text, item.id, item.order_id); }}
                                                            value={this.state.text}
                                                            placeholder={`$ ${item.price}`}
                                                            placeholderTextColor='#ffffff'
                                                            keyboardType='numeric'
                                                        />
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
                                            <ImageBackground source={require('../../assets/bg.png')} style={{ width: '100%', height: '100%' }}>
                                                <Card style={styles.cardMain}>
                                                    <CardItem style={styles.backGroundColorMyOrder}>
                                                        <TouchableHighlight
                                                            onPress={() => {
                                                                this.setModalVisible(!this.state.modalVisible);
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
)(MyOrderScreen)