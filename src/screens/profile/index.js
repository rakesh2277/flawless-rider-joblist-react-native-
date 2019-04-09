import React, { Component } from "react";
import { Dimensions, View, Text, ImageBackground, Image, ScrollView, Clipboard, TouchableOpacity, BackHandler, Modal, FlatList, AsyncStorage, Animated } from "react-native";
import { Container, Header, Title, Icon, Left, Button, Body, CardItem, Card } from 'native-base';
import { Col, Grid, Row } from "react-native-easy-grid";
import styles from "./style";
import { connect } from 'react-redux';
import { updateText } from "../../actions/index";
import CONFIG from '../../config';
import RNFetchBlob from 'rn-fetch-blob'
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';

let { width, height } = Dimensions.get('window');
class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agentType: '',
            modalVisible: false,
            agent_data: [],
            agentId: '',
            agentPhoneNumber: '',
            agentName: '',
            agentEmail: '',
            PS4: '',
            PS4TeamA: '',
            XBC: '',
            PC4: '',
            PS4teama: '',
            PS4teamb: '',
            XBCteama: '',
            XBCteamb: '',
            PCteama: '',
            PCteamb: '',
            ImageSource: null,
            data: null,
            ageid: '1403',
            ageprourl: ''
            // allAgentData: [],
            // agentArrayholder: []
        }
    }

    setClipboardContent = (msg) => {
        Clipboard.setString(msg);
        alert('Copied Number');
    };

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    ImageSource: source,
                    data: response.data,
                    ageprourl: response.uri
                });
            }
        });
    }

    customMessageScreen = () => {
        this.props.navigation.navigate('CustomMessage')
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    redirectToAdminPower = (data) => {
        data == 'createAccount' ?
            this.props.navigation.navigate('Registration') :
            this.props.navigation.navigate('AssignOrders')
    }
    redirectDeletAgent = () => {
        this.props.navigation.navigate('DeletAgent')
    }

    downloadExcelSheetAgentBased = (id, name) => {
        axios({
            method: 'get',
            url: `${CONFIG.url}/ordercsv/create.php?hitfile=createcsv&agentid=${id}&agentname=${name}`,
        }).then((response) => {
            if (response.data.trim() == 'done') {
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
                        alert('File Downloaded');
                    })
                this.setState({ modalVisible: false })
            } else {
                alert(`No data Available for ${name} Agent`);
            }
        })
    }

    OrdersToAgent = () => {
        this.setModalVisible(!this.state.modalVisible);
    }

    postBlogs = () => {
        this.props.navigation.navigate('BlogPost')
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonProfile);
        let idnrole = this.props.updateText_1.updateText.split('|__|');
        this.setState({ agentType: idnrole[0], agentId: idnrole[1], agentName: idnrole[2], agentPhoneNumber: idnrole[4], agentEmail: idnrole[5] })
        axios({
            method: 'get',
            url: `${CONFIG.url}/getAllAgents.php`,
            responseType: 'json'
        })
            .then((response) => {
                response.data != null && response.data != 'null' && response.data != '' ?
                    this.setState({ agent_data: response.data.records, arrayholder: response.data.records })
                    :
                    this.setState({ agent_data: [], arrayholder: [], loader: 1 })
            });


        this.setState({
            teamNAME: this.props.updateText_1.updateText.split('#')[1],
            PS4teama: this.props.updateText_1.updateText.split(',')[0],
            PS4teamb: this.props.updateText_1.updateText.split(',')[1],
            XBCteama: this.props.updateText_1.updateText.split(',')[2],
            XBCteamb: this.props.updateText_1.updateText.split(',')[3],
            PCteama: this.props.updateText_1.updateText.split(',')[4],
            PCteamb: this.props.updateText_1.updateText.split(',')[5],

        })
    }

    logout = () => {
        AsyncStorage.removeItem('userflawLogin');
        this.props.navigation.navigate('Login', { "logout": 'done' });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonProfile);

    }

    componentWillReceiveProps = () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonProfile);
    }

    handleBackButtonProfile = () => {
        this.props.navigation.navigate('Home')
        return true;
    };


    render() {
        const { PS4teama, PS4teamb, XBCteama, XBCteamb, PCteama, PCteamb, teamNAME, PS4, XBC, PC4, PS4TeamA } = this.state
        return (
            <Container style={{}}>
                <Header androidStatusBarColor='#000' style={styles.blackBackground}>
                    <Title style={styles.headerTitle}>PROFILE</Title>
                </Header>
                <ImageBackground source={require('../../assets/bg.png')} style={styles.imgBackground}>
                    <ScrollView>
                        <View style={styles.firstView}>
                            <Text style={styles.firstViewText}>{this.state.agentName}</Text>
                            <TouchableOpacity style={styles.logoutTitle} onPress={() => this.logout()}>
                                <Text style={styles.logoutTitle}>( Logout )</Text>
                            </TouchableOpacity>
                        </View>
                        <Grid style={{ height: 180 }}>





                            <Col style={styles.secViewText}>
                                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                    <View style={styles.imgHeightWid} >
                                        {this.state.ImageSource === null ?  <Image source={require('../../assets/asaArtwork_ios.jpg')} style={styles.imgHeightWid} />  :
                                            <Image style={styles.imgHeightWid} source={this.state.ImageSource} />
                                        }
                                    </View>
                                </TouchableOpacity>

                                {/* <Image source={require('../../assets/asaArtwork_ios.jpg')} style={styles.imgHeightWid} /> */}


                            </Col>



                        </Grid>
                        <Grid style={styles.rowHeight}>
                            <Col onPress={() => this.setClipboardContent(this.state.agentPhoneNumber)} size={20} style={styles.alignItemCenter}>
                                <Icon name='call' style={styles.iconColor} />
                            </Col>
                            <Col size={60} style={styles.alignItemCenter}></Col>
                            <Col onPress={() => this.customMessageScreen()} size={20} style={styles.alignItemCenter}>
                                <Icon name='md-chatboxes' style={styles.iconColor} />
                            </Col>
                        </Grid>

                        <Grid style={{ marginTop: 20 }}>
                            <Row style={styles.rowHeight}>
                                <Col style={styles.firstRowFirstCol}>
                                    <Text style={styles.insideGridRowColText}></Text>
                                </Col>
                                <Col style={styles.insideGridRowCol}>
                                    <Text style={styles.rowSecondColumnText}>PVE</Text>
                                </Col>
                                <Col style={styles.insideGridRowCol}>
                                    <Text style={styles.rowThirdColumnText}>PVP</Text>
                                </Col>
                                <Col style={styles.rowLastColumn}>
                                    <Text style={styles.rowLastColumnText}></Text>
                                </Col>
                            </Row>



                            <Row style={styles.rowHeight}>
                                <Col style={styles.secondRowCol}>
                                    <Text style={styles.insideGridRowColText}>PS4</Text>
                                </Col>
                                <Col style={styles.insideGridRowCol}>
                                    <Text style={styles.insideGridRowColText}>{PS4teamb}</Text>
                                </Col>
                                <Col style={styles.insideGridRowCol}>
                                    <Text style={styles.rowLastColumnText}>{PS4teamb}</Text>
                                </Col>
                                <Col style={styles.rowLastColumn}>
                                    <Text style={styles.rowLastColumnText}></Text>
                                </Col>
                            </Row>
                            <Row style={styles.rowHeight}>
                                <Col style={styles.rowThirdWrp}>
                                    <Text style={styles.insideGridRowColText}>XB1</Text>
                                </Col>
                                <Col style={styles.insideGridRowCol}>
                                    <Text style={styles.insideGridRowColText}>{XBCteama}</Text>
                                </Col>
                                <Col style={styles.insideGridRowCol}>
                                    <Text style={styles.rowLastColumnText}>{XBCteamb}</Text>
                                </Col>
                                <Col style={styles.rowLastColumn}>
                                    <Text style={styles.rowLastColumnText}></Text>
                                </Col>
                            </Row>
                            <Row style={styles.rowHeight}>
                                <Col style={styles.rowFourthColWrp}>
                                    <Text style={styles.insideGridRowColText}>PC</Text>
                                </Col>
                                <Col style={styles.insideGridRowCol}>
                                    <Text style={styles.insideGridRowColText}>{PCteama}</Text>
                                </Col>
                                <Col style={styles.insideGridRowCol}>
                                    <Text style={styles.rowLastColumnText}>{PCteamb}</Text>
                                </Col>
                                <Col style={styles.rowLastColumn}>
                                    <Text style={styles.rowLastColumnText}></Text>
                                </Col>
                            </Row>
                        </Grid>
                        {this.state.agentType == 'admin' ?
                            <View style={{ marginTop: 20 }}>
                                <Card style={styles.cardMain}>
                                    <CardItem style={styles.backGroundColorMyOrder}>
                                        <TouchableOpacity onPress={() => this.redirectToAdminPower('createAccount')}>
                                            <Text style={styles.signupButton}>Create Agent Account</Text>
                                        </TouchableOpacity>
                                    </CardItem>
                                </Card>
                                <Card style={styles.cardMain}>
                                    <CardItem style={styles.backGroundColorMyOrder}>
                                        <TouchableOpacity onPress={() => this.redirectToAdminPower('assignOrders')}>
                                            <Text style={styles.signupButton}>Assign Orders to Agent</Text>
                                        </TouchableOpacity>
                                    </CardItem>
                                </Card>

                                <Card style={styles.cardMain}>
                                    <CardItem style={styles.backGroundColorMyOrder}>
                                        <TouchableOpacity onPress={() => this.redirectDeletAgent()}>
                                            <Text style={styles.signupButton}>Agent Info</Text>
                                        </TouchableOpacity>
                                    </CardItem>
                                </Card>


                                <Card style={styles.cardMain}>
                                    <CardItem style={styles.backGroundColorMyOrder}>
                                        <TouchableOpacity onPress={() => this.OrdersToAgent()}>
                                            <Text style={styles.csvdownload}>Download CSV(Agent Based)</Text>
                                        </TouchableOpacity>
                                    </CardItem>
                                </Card>
                                <Card style={styles.cardMain}>
                                    <CardItem style={styles.backGroundColorMyOrder}>
                                        <TouchableOpacity onPress={() => this.postBlogs()}>
                                            <Text style={styles.csvdownload}>Post Blogs</Text>
                                        </TouchableOpacity>
                                    </CardItem>
                                </Card>
                            </View>
                            : console.log('Agent')
                        }
                        <View style={{ padding: 40 }} />
                    </ScrollView>
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
                                        <Title style={styles.headerBodyText}>DOWNLOAD AGENT DATA</Title>
                                    </Body>
                                </Header>
                                {
                                    this.state.agent_data.length > 0 ?
                                        <View style={{ marginBottom: 130 }}>
                                            <Row style={{ height: 78 }} key onPress={() => this.downloadExcelSheetAgentBased('', '')}>
                                                <Col style={styles.itemTitleWrapper_1}>
                                                    <Text style={styles.itemTitle}>#All</Text>
                                                </Col>
                                                <Col style={styles.itemTitleWrapper_1}>
                                                    <Text style={styles.itemTitle}>Get All Data</Text>
                                                </Col>
                                                <Col style={styles.itemTitleWrapper_1}>
                                                    <Text style={styles.itemTitle}>flawless</Text>
                                                </Col>
                                            </Row>
                                            <FlatList
                                                data={this.state.agent_data}
                                                extraData={this.state}
                                                renderItem={({ item, key, index }) =>
                                                    (
                                                        <Row style={{ height: 78 }} key onPress={() => this.downloadExcelSheetAgentBased(item.id, item.agentname)}>
                                                            <Col style={styles.itemTitleWrapper_1}>
                                                                <Text style={styles.itemTitle}>#{item.id}</Text>
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
                                        :
                                        console.log('')
                                }
                            </ImageBackground>
                        </View>
                    </Modal>
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
)(ProfileScreen)