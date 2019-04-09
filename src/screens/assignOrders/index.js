import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, ImageBackground, Image, TouchableOpacity, Modal } from "react-native";
import { Header, Title, Left, Button, Icon, Body } from 'native-base';
import axios from 'axios';
import { Col, Row, Grid } from "react-native-easy-grid";
import { SearchBar } from 'react-native-elements';
import styles from "./style";

import CONFIG from '../../config';
import { connect } from 'react-redux';
import { updateText } from "../../actions/index";

class AssignOrders extends Component {
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
            agent_data: [],
            assignid: '',
            assignorderid: ''
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    componentDidMount() {
        let idnrole = this.props.updateText_1.updateText.split('|__|');
        this.setState({ agentId: idnrole[1], agentName: idnrole[2] })
        let that = this;

        // Initially fetch all orders
        axios({
            method: 'get',
            url: `${CONFIG.url}/orders_by_status.php?data_filter=alldata`,
            responseType: 'json'
        })
            .then(function (response) {
                that.setState({ data: response.data.records, arrayholder: response.data.records, loader: 1 });
            });

        axios({
            method: 'get',
            url: `${CONFIG.url}/getAllAgents.php`,
            responseType: 'json'
        })
            .then(function (response) {
                response.data != null && response.data != 'null' && response.data != '' ?
                    that.setState({ agent_data: response.data.records, arrayholder: response.data.records })
                    :
                    that.setState({ agent_data: [], arrayholder: [], loader: 1 })
            });
    }

    __onPressButton_filter = (data) => {
        let that = this;
        // onClick Filter orders
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
                    that.setState({ data: response.data.records, arrayholder: response.data.records })
                    :
                    that.setState({ data: [], arrayholder: [], loader: 1 })
            });
    }

    searchFilterFunction = text => {
        // Search filter function
        const newData = this.state.arrayholder.filter(item => {
            const itemData = `${item.line_item_title.toUpperCase()}${item.line_item_title.toUpperCase()}${item.line_item_title.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        })
        this.setState({ data: newData });
    };

    _colorCodeStatus = (key) => {
        // Show button colors based on order status
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

    AssignOrdersToAgent = (index, id, orderid) => {
        // Show ActionSheet( Agent List )
        this.setState({ assignid: id, assignorderid: orderid, dataIndex: index });
        this.setModalVisible(!this.state.modalVisible);
    }

    changeStatus = (id, name) => {
        axios({
            method: 'post',
            url: `${CONFIG.url}/assignordersToAgent.php?usertype=assignAgent&agentId=${id}&agentName=${name}&status=active&id=${this.state.assignid}&orderId=${this.state.assignorderid}`,
        }).then((response) => {
            if (response.data.trim() == 'Already Reserved') {
                alert('Already Reserved Order');
            } else {
                this.state.data[this.state.dataIndex]['status'] = 'active'
                this.state.arrayholder[this.state.dataIndex]['status'] = 'active'
                this.state.data[this.state.dataIndex]['agentName'] = id
                this.state.arrayholder[this.state.dataIndex]['agentId'] = name
                this.setState({ tempState: 4 });
            }
        })
        this.setModalVisible(!this.state.modalVisible);
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={{}}>
                <Header androidStatusBarColor='#000' style={{ backgroundColor: '#000' }}>
                    <Left>
                        <Button transparent onPress={() => goBack()} >
                            <Icon name='arrow-back' style={{ color: '#ffffff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.headerBodyText}>ASSIGN ORDERS</Title>
                    </Body>
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
                                                        <Image source={this._imgStatus(item.order_attribute)} style={{ maxWidth: 50, resizeMode: 'contain' }} />
                                                    </Col>
                                                    <Col style={styles.itemTitleWrapper}>
                                                        <Text style={styles.itemTitle}>{item.line_item_title}</Text>
                                                        <Text style={styles.createdDate}>Created At: {item.created_date}</Text>
                                                    </Col>
                                                    <Col style={{ backgroundColor: this._colorCodeStatus(item.status), width: '20%', zIndex: 99, height: 78, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                                        <TouchableOpacity style={styles.itemStatus}>
                                                            <Text style={styles.itemStatusText}>{item.status}</Text>
                                                        </TouchableOpacity>
                                                        {
                                                            item.agentId != '0' && item.agentName != '' ?
                                                                <Text style={styles.reservedAgent}>#{item.agentId} {item.agentName}</Text> :
                                                                <Text></Text>
                                                        }
                                                    </Col>
                                                    <Col style={styles.itemPrice}>
                                                        <TouchableOpacity style={styles.assignOrder} onPress={() => this.AssignOrdersToAgent(index, item.id, item.order_id)}>
                                                            <Text style={styles.assignText}>Assign</Text>
                                                        </TouchableOpacity>
                                                    </Col>
                                                </Row>
                                            )}
                                        keyExtractor={item => item.id}
                                    />

                                    <Modal
                                        animationType="slide"
                                        transparent={false}
                                        visible={this.state.modalVisible}
                                        onRequestClose={() => {
                                            this.setModalVisible(!this.state.modalVisible)
                                        }}>
                                        <View>
                                            <ImageBackground source={require('../../assets/bg.png')} style={{ width: '100%', height: '100%' }}>
                                                <Header androidStatusBarColor='#000' style={{ backgroundColor: '#000' }}>
                                                    <Left>
                                                        <Button transparent onPress={() => this.setModalVisible(!this.state.modalVisible)} >
                                                            <Icon name='arrow-back' style={{ color: '#ffffff' }} />
                                                        </Button>
                                                    </Left>
                                                    <Body>
                                                        <Title style={styles.headerBodyText}>SELECT AGENT</Title>
                                                    </Body>
                                                </Header>
                                                {
                                                    this.state.agent_data.length > 0 &&
                                                    (
                                                        <View style={{ marginBottom: 60 }}>
                                                            <FlatList
                                                                data={this.state.agent_data}
                                                                extraData={this.state}
                                                                renderItem={({ item, key, index }) =>
                                                                    (
                                                                        <Row style={{ height: 78 }} key onPress={() => this.changeStatus(item.id, item.agentname)}>
                                                                            <Col style={styles.itemTitleWrapper_1}>
                                                                                <Text style={styles.createdDate}>#{item.id}</Text>
                                                                            </Col>
                                                                            <Col style={styles.itemTitleWrapper_1}>
                                                                                <Text style={styles.itemTitle}>{item.agentname}</Text>
                                                                            </Col>
                                                                            <Col style={styles.itemTitleWrapper_1}>
                                                                                <Text style={styles.itemTitle}>{item.username}</Text>
                                                                            </Col>
                                                                        </Row>
                                                                    )}
                                                                keyExtractor={item => item.id}
                                                            />
                                                        </View>
                                                    )
                                                }
                                            </ImageBackground>
                                        </View>
                                    </Modal>
                                </View>
                                :
                                <View style={styles.emptyData}>
                                    {
                                        this.state.loader == 0 ?
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
)(AssignOrders)