import React, { Component } from "react";
import { Text, ImageBackground, FlatList, View, ActivityIndicator, Platform } from "react-native";
import { Body, Button, Container, Icon, Header, Title, Right,Left } from 'native-base';
import styles from "./style";
import axios from 'axios';
import { Col, Row, Grid } from "react-native-easy-grid";
import CONFIG from '../../config';
import RNFetchBlob from 'rn-fetch-blob'

export default class NewsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loader: 0
        }
    }

    downloadForm = () => {
        // Download tax form
        axios({
            method: 'get',
            url: `${CONFIG.url}/getAllBlogPost.php?hitfile=downloadlink`,
        }).then((response) => {
            s = `${response.data.records['0']['link']}`
            var final = s.substr(s.lastIndexOf('/') + 1);
            if (response.data.records['0']['link'].trim() != '') {
                RNFetchBlob
                    .config({
                        addAndroidDownloads: {
                            useDownloadManager: true,
                            notification: true,
                            mime: 'text/csv',
                            description: 'File downloaded by download manager.'
                        },
                        IOSDownloadTask: true,
                        path: Platform.OS === 'ios' ? `${dirs.DocumentDir}/${final}` : ''
                    })
                    .fetch('GET', `${response.data.records['0']['link']}`)
                    .then((resp) => {
                        resp.path();
                        alert('File Downloaded');
                    })
            }

        })
    }

    componentDidMount = () => {
        // Fetch Blog posts
        axios({
            method: 'get',
            url: `${CONFIG.url}/getAllBlogPost.php`,
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ data: response.data.records, arrayholder: response.data.records, loader: 1 });
            });
    }

    render() {
        console.log(this.state.data);
        const { goBack } = this.props.navigation;
        return (
            <Container style={{}}>
                <Header androidStatusBarColor='#000' style={{ backgroundColor: '#000' }}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={() => goBack()} >
                            <Icon name='arrow-back' style={{ color: '#ffffff' }}/>
                        </Button>
                    </Left>
                    <Body style={{alignItems:'center',justifyContent:'center' ,flex:1}}>
                        <Title style={styles.bodyTitle}>News</Title>
                    </Body>
                    <Right style={{flex:1}}>
                        <Button transparent >
                            <Icon />
                        </Button>
                    </Right>
                </Header>
                <ImageBackground source={require('../../assets/bg.png')} style={styles.imageBackground}>
                    <Row style={{ height: 50, paddingBottom: 5 }}>
                        <Col style={styles.rowFirstColumnDownload} onPress={() => this.downloadForm()}>
                            <Text style={styles.rowFirstColumnText}>Download Tax Form</Text>
                        </Col>
                    </Row>
                    <Grid style={{ marginBottom: 50 }}>
                        {
                            this.state.data.length > 0 ?
                                <FlatList
                                    data={this.state.data}
                                    extraData={this.state}
                                    renderItem={({ item, key, index }) =>
                                        (
                                            <Row style={{ minHeight: 150, paddingBottom: 25 }}>
                                                <Col size={38} style={styles.rowFirstColumn}>
                                                    <Text style={styles.rowFirstColumnText}>{item.post_title}</Text>
                                                </Col>
                                                <Col size={62} style={styles.rowSecColumn}>
                                                    <Text style={styles.rowSecColumnText}>{item.post_body}</Text>
                                                </Col>
                                            </Row>
                                        )}
                                    keyExtractor={item => item.id}
                                />
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
                </ImageBackground>
            </Container>
        );
    }
}
