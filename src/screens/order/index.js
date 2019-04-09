import React, { Component } from "react";
import { View, Text, List, FlatList, ActivityIndicator, ImageBackground, Image, ScrollView, TouchableOpacity, Alert, Platform, Modal, TextInput, TouchableHighlight } from "react-native";
import { Header, Title, Container, Left, Button, Icon, Body, Card, CardItem, Right } from 'native-base';
import axios from 'axios';
import { Col, Row, Grid } from "react-native-easy-grid";
import { SearchBar } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet'
import styles from "./style";
import CONFIG from '../../config';
import { connect } from 'react-redux';
import { updateText } from "../../actions/index";
import RNFetchBlob from 'rn-fetch-blob';

class OrderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            arrayholder: [],
            blankdata: [],
            loader: 0,
            colorCodeStatusFilterButtonT: '#3f3f3f',
            colorCodeStatusFilterButtonM: '#014198',
            colorCodeStatusFilterButtonW: '#3f3f3f',
            colorCodeStatusFilterButtonA: '#3f3f3f',
            keyId: '',
            _orderId: '',
            _orderName: '',
            _order_line_item_detail: '',
            dataIndex: 0,
            tempState: 0,
            modalVisible: false,
            modalVisiblePrice: false,
            agentId: '',
            agentName: '',
            userType: '',
            _emailId: '',
            _customer_name: '',
            filterType: 'month',
            lineitem_id: ''
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    componentDidMount() {
        let idnrole = this.props.updateText_1.updateText.split('|__|');
        this.setState({ userType: idnrole[0], agentId: idnrole[1], agentName: idnrole[2] })
        let that = this;
        // initially Fetch order details
        axios({
            method: 'get',
            url: `${CONFIG.url}/orders_by_status.php?data_filter=month`,
            responseType: 'json'
        })
            .then(function (response) {
                that.setState({ data: response.data.records, arrayholder: response.data.records, loader: 1 });
            });
    }

    __onPressButton_filter = (data) => {
        // onClick button-filter fetch order details
        let that = this;
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
            url: `${CONFIG.url}/orders_by_status.php?data_filter=${data}`,
            responseType: 'json'
        })
            .then(function (response) {
                response.data != null && response.data != 'null' && response.data != '' && response.data.records != 'No products found' ?
                    that.setState({ filterType: data, data: response.data.records, arrayholder: response.data.records })
                    :
                    that.setState({ data: [], arrayholder: [], loader: 1 })
            });
    }

    searchFilterFunction = text => {
        // Search onKeyUp
        const newData = this.state.arrayholder.filter(item => {
            const itemData = `${item.line_item_title.toUpperCase()}${item.line_item_title.toUpperCase()}${item.line_item_title.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        })
        this.setState({ data: newData });
    };

    _colorCodeStatus = (key) => {
        // Show status color based on item status
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
        // Show icon based on item status
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
        // Redirect to order single screen
        this.props.navigation.navigate('OrderSingleScreen', { index: index, id: id, orderId: orderId, _updateStatus: this._statusUpdate })
    }

    _statusUpdate = (key, index, agentId, agentName) => {
        // send funtion as a props to order single screen
        alert('Status Updated');
        this.state.data[index]['status'] = key
        this.state.arrayholder[index]['status'] = key
        this.state.data[index]['agentName'] = agentName
        this.state.arrayholder[index]['agentId'] = agentId
        this.setState({ tempState: 1 });
    }

    showActionSheet = (key, id, orderId, emailId, customer_name, ordername, lineitem, lineitem_id) => {
        // onclick status, show actionsheet
        this.setState({ keyId: id, _orderId: orderId, dataIndex: key, _emailId: emailId, _customer_name: customer_name, _orderName: ordername, _order_line_item_detail: lineitem, lineitem_id: lineitem_id });
        this.ActionSheet.show()
    }

    handlePress = (buttonIndex) => {
        // update order status( Actionsheet handle press )
        let that = this;
        if (this.state.userType == 'agent') {
            if (buttonIndex == '0') {
                axios({
                    method: 'post',
                    url: `${CONFIG.url}/updateStatus.php?customer_name=${this.state._customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&usertype=${this.state.userType}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&status=active&id=${this.state.keyId}&orderId=${this.state._orderId}&emailId=${this.state._emailId}`,
                }).then((response) => {
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
                    url: `${CONFIG.url}/updateStatus.php?customer_name=${this.state._customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&usertype=${this.state.userType}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&status=active&id=${this.state.keyId}&orderId=${this.state._orderId}&emailId=${this.state._emailId}`,
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
                    url: `${CONFIG.url}/updateStatus.php?customer_name=${this.state._customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&usertype=${this.state.userType}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&status=priority&id=${this.state.keyId}&orderId=${this.state._orderId}&emailId=${this.state._emailId}`,
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
                    url: `${CONFIG.url}/updateStatus.php?customer_name=${this.state._customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&usertype=${this.state.userType}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&status=stuck&id=${this.state.keyId}&orderId=${this.state._orderId}&emailId=${this.state._emailId}`,
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
                    url: `${CONFIG.url}/updateStatus.php?customer_name=${this.state._customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&usertype=${this.state.userType}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&lineitem_id=${this.state.lineitem_id}&status=completed&id=${this.state.keyId}&orderId=${this.state._orderId}&emailId=${this.state._emailId}`,
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
        } else {
            if (buttonIndex == '0') {
                axios({
                    method: 'post',
                    url: `${CONFIG.url}/updateStatus.php?customer_name=${this.state._customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&status=active&id=${this.state.keyId}&orderId=${this.state._orderId}&emailId=${this.state._emailId}`,
                }).then((response) => {
                    this.state.data[that.state.dataIndex]['status'] = 'active'
                    this.state.arrayholder[that.state.dataIndex]['status'] = 'active'
                    this.state.data[that.state.dataIndex]['agentName'] = this.state.agentName
                    this.state.arrayholder[that.state.dataIndex]['agentId'] = this.state.agentId
                    this.setState({ tempState: 0 });

                })
            }
            if (buttonIndex == '1') {
                axios({
                    method: 'post',
                    url: `${CONFIG.url}/updateStatus.php?customer_name=${this.state._customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&status=active&id=${this.state.keyId}&orderId=${this.state._orderId}&emailId=${this.state._emailId}`,
                }).then((response) => {
                    this.state.data[that.state.dataIndex]['status'] = 'active'
                    this.state.arrayholder[that.state.dataIndex]['status'] = 'active'
                    this.state.data[that.state.dataIndex]['agentName'] = this.state.agentName
                    this.state.arrayholder[that.state.dataIndex]['agentId'] = this.state.agentId
                    this.setState({ tempState: 1 });

                })
            }

            if (buttonIndex == '2') {
                this.setState({ tempState: 4 });
                axios({
                    method: 'post',
                    url: `${CONFIG.url}/updateStatus.php?customer_name=${this.state._customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&status=priority&id=${this.state.keyId}&orderId=${this.state._orderId}&emailId=${this.state._emailId}`,
                }).then((response) => {
                    this.state.data[this.state.dataIndex]['status'] = 'priority'
                    this.state.arrayholder[this.state.dataIndex]['status'] = 'priority'
                    this.state.data[that.state.dataIndex]['agentName'] = this.state.agentName
                    this.state.arrayholder[that.state.dataIndex]['agentId'] = this.state.agentId
                    this.setState({ tempState: 2 });
                })
            }
            if (buttonIndex == '3') {
                axios({
                    method: 'post',
                    url: `${CONFIG.url}/updateStatus.php?customer_name=${this.state._customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&status=stuck&id=${this.state.keyId}&orderId=${this.state._orderId}&emailId=${this.state._emailId}`,
                }).then((response) => {
                    this.state.data[this.state.dataIndex]['status'] = 'stuck'
                    this.state.arrayholder[this.state.dataIndex]['status'] = 'stuck'
                    this.state.data[that.state.dataIndex]['agentName'] = this.state.agentName
                    this.state.arrayholder[that.state.dataIndex]['agentId'] = this.state.agentId
                    this.setState({ tempState: 4 });
                })
            }
            if (buttonIndex == '4') {
                this.setModalVisible(true);
            }
            if (buttonIndex == '5') {
                axios({
                    method: 'post',
                    url: `${CONFIG.url}/updateStatus.php?customer_name=${this.state._customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}&lineitem_id=${this.state.lineitem_id}&status=completed&id=${this.state.keyId}&orderId=${this.state._orderId}&emailId=${this.state._emailId}`,
                }).then((response) => {
                    this.state.data[this.state.dataIndex]['status'] = 'completed'
                    this.state.arrayholder[this.state.dataIndex]['status'] = 'completed'
                    this.state.data[that.state.dataIndex]['agentName'] = this.state.agentName
                    this.state.arrayholder[that.state.dataIndex]['agentId'] = this.state.agentId
                    this.setState({ tempState: 5 });
                })
            }
        }
    }

    sendMailSupport = (supportdata) => {
        axios({
            method: 'post',
            url: `${CONFIG.url}/sendemail.php?supportdata=${supportdata}&agentId=${this.state.agentId}&agentName=${this.state.agentName}&id=${this.state.keyId}&order_id=${this.state._orderId}&emailId=${this.state._emailId}&customer_name=${this.state._customer_name}&order_name=${this.state._orderName.replace('#', '')}&order_line_item_detail=${this.state._order_line_item_detail}`
        }).then((response) => {
            this.setState({ modalVisible: false });
        })
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

    orderExport = () => {
        axios({
            method: 'get',
            url: `${CONFIG.url}/ordercsv/create.php?hitfile=createcsv`,
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

    modalVisiblePrice_show = () => {
        // Modal show/hide
        this.setState({ modalVisiblePrice: true })
    }

    __orderPriceChange = (data) => {
        // Order bulk Price Change( percentage basis )
        axios({
            method: 'get',
            url: `${CONFIG.url}/bulkpriceEdit.php?percentage=${data}&usingapp=joblist`,
        }).then((response) => {
            let idnrole = this.props.updateText_1.updateText.split('|__|');
            this.setState({ userType: idnrole[0], agentId: idnrole[1], agentName: idnrole[2] })
            let that = this;
            axios({
                method: 'get',
                url: `${CONFIG.url}/orders_by_status.php?data_filter=${this.state.filterType}`,
                responseType: 'json'
            })
                .then(function (response) {
                    that.setState({ data: response.data.records, arrayholder: response.data.records, loader: 1 });
                });
            alert('Price Updated');
        });
        this.setState({ modalVisiblePrice: false })
    }

    render() {
        const { goBack } = this.props.navigation;
        // Actionsheet options for Android
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
        // Actionsheet options for IOS
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
                        <Title style={styles.headerBodyText}>ORDER LIST</Title>
                    </Body>
                    {this.state.userType == 'admin' ?
                        <Right>
                            <Button transparent onPress={() => this.orderExport()} >
                                <Icon name='download' style={{ color: '#ffffff' }} />
                            </Button>
                        </Right>
                        :
                        <Right>
                            <Button transparent>
                            </Button>
                        </Right>
                    }
                </Header>

                <ImageBackground source={require('../../assets/bg.png')} style={{ width: '100%', height: '100%' }}>
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
                            {this.state.userType == 'admin' && (
                                <Col onPress={() => this.modalVisiblePrice_show()} style={{ backgroundColor: 'red', height: 45, borderRightColor: '#000', margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.filterText} >Price Change</Text>
                                </Col>)}
                        </View>
                    </View>
                    <Grid>
                        {
                            this.state.data.length > 0 ?
                                <View>
                                    <FlatList
                                        data={this.state.data}
                                        extraData={this.state}
                                        renderItem={({ item, key, index }) =>
                                            (
                                                <Row style={{ height: 90 }} key >
                                                    <Col style={styles.wrapperMyOrder}>
                                                        <TouchableOpacity onPress={() => this._orderSingle(index, item.id, item.order_id)}>
                                                            <Image source={this._imgStatus(item.order_attribute)} style={{ maxWidth: 50, resizeMode: 'contain' }} />
                                                            <Text style={styles.orderidstyle}>{item.order_name}</Text>
                                                        </TouchableOpacity>

                                                    </Col>
                                                    <Col style={styles.itemTitleWrapper}>
                                                        <TouchableOpacity onPress={() => this._orderSingle(index, item.id, item.order_id)}>
                                                            <Text style={styles.itemTitle}>
                                                                {
                                                                    item.line_item_title.length < 25 ? item.line_item_title : item.line_item_title.substring(1, 20) + '. . .'
                                                                }
                                                            </Text>
                                                            <Text style={styles.createdDate}>{item.created_date.split('T')[0]}</Text>
                                                            <Text style={styles.createdDate}>{item.created_date.split('T')[1]}</Text>
                                                        </TouchableOpacity>
                                                    </Col>
                                                    <Col onPress={() => this.showActionSheet(index, item.id, item.order_id, item.email, item.customer_name, item.order_name, item.order_line_item_detail, item.line_item_id)}
                                                        style={{ backgroundColor: this._colorCodeStatus(item.status), width: '20%', zIndex: 99, height: 78, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                                        <View style={styles.itemStatus}>
                                                            <Text style={styles.itemStatusText}>{item.status}</Text>
                                                        </View>
                                                        <View style={styles.itemStatus}>
                                                            {item.agentId != '0' && item.agentName != '' &&
                                                                (<Text style={styles.reservedAgent}>#{item.agentId} {item.agentName}</Text>)
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
                                                        {/* <Text style={styles.itemPriceText}>${item.price}</Text> */}

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
                                        tintColor="#ffffff"
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

                                    <Modal
                                        animationType="slide"
                                        transparent={false}
                                        visible={this.state.modalVisiblePrice}
                                        onRequestClose={() => {
                                            Alert.alert('Modal has been closed.');
                                        }}>
                                        <View>
                                            <ImageBackground source={require('../../assets/bg.png')} style={styles.ImageBackgroundMyOrder}>
                                                <Card style={styles.cardMain}>
                                                    <CardItem style={styles.backGroundColorMyOrder}>
                                                        <TouchableHighlight
                                                            onPress={() => {
                                                                this.setState({ modalVisiblePrice: false });
                                                            }}>
                                                            <Text style={styles.cardItem}>CLOSE</Text>
                                                        </TouchableHighlight>
                                                    </CardItem>
                                                </Card>
                                                <ScrollView>
                                                    <Card style={styles.cardMain}>
                                                        <CardItem style={styles.backGroundColorMyOrder} >
                                                            <Body style={styles.backGroundColorBody}>
                                                                <Text onPress={() => this.__orderPriceChange('100')} style={styles.cardItem}>Original price</Text>
                                                            </Body>
                                                        </CardItem>
                                                        <CardItem style={styles.backGroundColorMyOrder} >
                                                            <Body style={styles.backGroundColorBody}>
                                                                <Text onPress={() => this.__orderPriceChange('90')} style={styles.cardItem}>90% of total price</Text>
                                                            </Body>
                                                        </CardItem>
                                                        <CardItem style={styles.backGroundColorMyOrder} >
                                                            <Body style={styles.backGroundColorBody}>
                                                                <Text onPress={() => this.__orderPriceChange('80')} style={styles.cardItem}>80% of total price</Text>
                                                            </Body>
                                                        </CardItem>
                                                        <CardItem style={styles.backGroundColorMyOrder} >
                                                            <Body style={styles.backGroundColorBody}>
                                                                <Text onPress={() => this.__orderPriceChange('70')} style={styles.cardItem}>70% of total price</Text>
                                                            </Body>
                                                        </CardItem>
                                                        <CardItem style={styles.backGroundColorMyOrder} >
                                                            <Body style={styles.backGroundColorBody}>
                                                                <Text onPress={() => this.__orderPriceChange('60')} style={styles.cardItem}>60% of total price</Text>
                                                            </Body>
                                                        </CardItem>
                                                        <CardItem style={styles.backGroundColorMyOrder} >
                                                            <Body style={styles.backGroundColorBody}>
                                                                <Text onPress={() => this.__orderPriceChange('50')} style={styles.cardItem}>50% of total price</Text>
                                                            </Body>
                                                        </CardItem>
                                                        <CardItem style={styles.backGroundColorMyOrder}>
                                                            <Body style={styles.backGroundColorBody}>
                                                                <Text onPress={() => this.__orderPriceChange('40')} style={styles.cardItem}>40% of total price</Text>
                                                            </Body>
                                                        </CardItem>
                                                        <CardItem style={styles.backGroundColorMyOrder}>
                                                            <Body style={styles.backGroundColorBody}>
                                                                <Text onPress={() => this.__orderPriceChange('30')} style={styles.cardItem}>30% of total price</Text>
                                                            </Body>
                                                        </CardItem>
                                                        <CardItem style={styles.backGroundColorMyOrder}>
                                                            <Body style={styles.backGroundColorBody}>
                                                                <Text onPress={() => this.__orderPriceChange('20')} style={styles.cardItem}>20% of total price</Text>
                                                            </Body>
                                                        </CardItem>
                                                        <CardItem style={styles.backGroundColorMyOrder}>
                                                            <Body style={styles.backGroundColorBody}>
                                                                <Text onPress={() => this.__orderPriceChange('10')} style={styles.cardItem}>10% of total price</Text>
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
)(OrderScreen)