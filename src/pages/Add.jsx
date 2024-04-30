import React, { useState } from "react";
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View, Dimensions } from "react-native";
// Keyboard Aware Scroll View
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Import Pages
import Header from '../components/header';
import DownModal from '../components/DownModal';
import MidModal from "../components/MidModal";
import CalendarModal from "components/CalendarModal";
import FileModal from "components/FileModal";

// Images
const clear = require('../assets/icons/add/clear.png');
const feedAdd = require('../assets/icons/add/feed_add.png');
const arrowDown = require('../assets/icons/add/arrow_down.png');
const arrowRight = require('../assets/icons/add/arrow_right.png');
const calendarOn = require('../assets/icons/add/calendar_on.png');
const calendarOff = require('../assets/icons/add/calendar_off.png');
const storiesOn = require('../assets/icons/add/stories_on.png');
const storiesOff = require('../assets/icons/add/stories_off.png');
const pasteOn = require('../assets/icons/add/paste_on.png');
const pasteOff = require('../assets/icons/add/paste_off.png');
const reviewsOn = require('../assets/icons/add/reviews_on.png');
const reviewsOff = require('../assets/icons/add/reviews_off.png');
const attachFile = require('../assets/icons/add/attach_file.png');
const attachFileOn = require('../assets/icons/add/attach_file_on.png');

const { width, height } = Dimensions.get("window");

const Add = ({ navigation, route }) => {
    // 커뮤니티 선택
    const [communityVisible, setCommunityVisible] = useState(false);
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const onSelectCommunity = (community) => {
        setSelectedCommunity(community);
    };

    // 준비 기간
    const [dateVisible, setDateVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const onSelectDate = (startDate, endDate) => {
        setSelectedDate({ startDate, endDate });
    };

    // 교재
    const { book } = route.params ? route.params : {};

    // 결과
    const [resultVisible, setResultVisible] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);
    const onSelectResult = (result) => {
        setSelectedResult(result);
    };

    // 공부 방법
    const [text, setText] = useState('');
    const onChangeText = (inputText) => {
        setText(inputText);
    };

    // 자료
    const [fileVisible, setFileVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const onSelectFile = (file) => {
        setSelectedFile(file);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <Header
                left={clear}
                leftClick={"Home"}
                title={"새 게시물"}
                right={feedAdd}
                rightClick={["Home", { selectedCommunity }]}
            />
            <KeyboardAwareScrollView style={{ marginHorizontal: 20, marginVertical: 16 }}>
                {/* 커뮤니티 선택 */}
                <TouchableOpacity
                    onPress={() => setCommunityVisible(!communityVisible)}
                    style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#BDBDBD' }}
                >
                    {selectedCommunity ? (
                        <Text style={{ fontSize: 16, color: '#7A7A7A' }}>{selectedCommunity.name}</Text>
                    ) : (
                        <Text style={{ fontSize: 16, color: '#BDBDBD' }}>커뮤니티 선택</Text>
                    )}
                    <Image source={arrowDown} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>

                {/* 준비 기간 */}
                <TouchableOpacity
                    onPress={() => setDateVisible(!dateVisible)}
                    style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#BDBDBD' }}
                >
                    {selectedDate ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={calendarOn} style={{ width: 24, height: 24, marginRight: 8 }} />
                            <Text style={{ fontSize: 16, color: '#7A7A7A' }}>{selectedDate.startDate} ~ {selectedDate.endDate}</Text>
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={calendarOff} style={{ width: 24, height: 24, marginRight: 8 }} />
                            <Text style={{ fontSize: 16, color: '#BDBDBD' }}>준비 기간</Text>
                        </View>
                    )}
                    <Image source={arrowRight} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>

                {/* 교재 */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('Book')}
                    style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#BDBDBD' }}
                >
                    {book ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={storiesOn} style={{ width: 24, height: 24, marginRight: 8 }} />
                            <Text style={{ fontSize: 16, color: '#7A7A7A' }}>{book.name}</Text>
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={storiesOff} style={{ width: 24, height: 24, marginRight: 8 }} />
                            <Text style={{ fontSize: 16, color: '#BDBDBD' }}>교재</Text>
                        </View>
                    )}
                    <Image source={arrowRight} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>

                {/* 결과 */}
                <TouchableOpacity
                    onPress={() => setResultVisible(!resultVisible)}
                    style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#BDBDBD' }}
                >
                    {selectedResult ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={pasteOn} style={{ width: 24, height: 24, marginRight: 8 }} />
                            <Text style={{ fontSize: 16, color: '#7A7A7A' }}>{selectedResult}</Text>
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={pasteOff} style={{ width: 24, height: 24, marginRight: 8 }} />
                            <Text style={{ fontSize: 16, color: '#BDBDBD' }}>결과</Text>
                        </View>
                    )}
                    <Image source={arrowRight} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>

                {/* 공부 방법 */}
                <View style={{ marginTop: 4 }}>
                    {text ? (
                        <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 }}>
                            <Image source={reviewsOn} style={{ width: 24, height: 24, marginRight: 8 }} />
                            <Text style={{ fontSize: 16, color: '#7A7A7A' }}>공부 방법</Text>
                        </View>
                    ) : (
                        <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 }}>
                            <Image source={reviewsOff} style={{ width: 24, height: 24, marginRight: 8 }} />
                            <Text style={{ fontSize: 16, color: '#BDBDBD' }}>공부 방법</Text>
                        </View>
                    )}
                    <TextInput
                        autoCapitalize='none'
                        spellCheck={false}
                        autoCorrect={false}
                        onChangeText={onChangeText}
                        value={text}
                        placeholderTextColor="#7A7A7A"
                        multiline
                        style={{
                            height: height / 3, padding: 16, borderRadius: 4, backgroundColor: '#F1F1F1', color: '#7A7A7A', fontSize: 16, lineHeight: 18, letterSpacing: 1
                        }}
                    />

                    {/* 자료 */}
                    <TouchableOpacity
                        onPress={() => setFileVisible(!fileVisible)}
                        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, padding: 8, borderRadius: 4, borderWidth: 1, borderColor: '#BDBDBD', flex: 1 }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                            {selectedFile ? (
                                <>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={attachFileOn} style={{ width: 24, height: 24 }} />
                                        <Text style={{ fontSize: 16, color: '#7A7A7A' }}>{selectedFile.name}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => setSelectedFile(null)}
                                        style={{ justifyContent: 'flex-end' }}
                                    >
                                        <Image source={clear} style={{ width: 24, height: 24 }} />
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={attachFile} style={{ width: 24, height: 24 }} />
                                    <Text style={{ fontSize: 16, color: '#BDBDBD' }}>자료</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Modal */}
                <DownModal isVisible={communityVisible} setIsVisible={setCommunityVisible} onSelectCommunity={onSelectCommunity} />
                <MidModal isVisible={resultVisible} setIsVisible={setResultVisible} onSelectResult={onSelectResult} />
                <CalendarModal isVisible={dateVisible} setIsVisible={setDateVisible} onSelectDate={onSelectDate} />
                <FileModal isVisible={fileVisible} setIsVisible={setFileVisible} onSelectFile={onSelectFile} />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default Add;
