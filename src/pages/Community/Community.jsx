import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore"; // 파이어스토어 기능 검사 필요
// Header
import Header from "components/Tab/Header";

const tagImages = {
  code: require("assets/icons/Community/code.png"),
  palette: require("/assets/icons/Community/palette.png"),
};

const Community = () => {
  const navigation = useNavigation();
  const [communities, setCommunities] = useState([]);
  const bookmark = require("assets/icons/Community/bookmark.png");

  useEffect(() => {
    const fetchCommunities = async () => {
      const communitySnapshot = await firestore().collection("community").get();
      const communityData = await Promise.all(
        communitySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const formattedDate = data.reg_date
            ? new Date(data.reg_date.seconds * 1000)
                .toLocaleDateString("en-CA")
                .replace(/-/g, ".")
            : "날짜 없음";
          // Fetch members count
          const joinSnapshot = await firestore()
            .collection("join")
            .where("community_id", "==", doc.id)
            .get();

          // Fetch posts count
          const postSnapshot = await firestore()
            .collection("post")
            .where("community_id", "==", doc.id)
            .get();
          return {
            id: doc.id,
            title: data.name || "이름 없음",
            members: joinSnapshot.size,
            posts: postSnapshot.size,
            startDate: formattedDate,
            tag: data.tag || "code",
          };
        })
      );
      setCommunities(communityData);
    };

    fetchCommunities();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.communityCard}
      onPress={() =>
        navigation.navigate("CommunityPost", { communityId: item.id })
      }
    >
      <Text style={styles.communityTitle}>{item.title}</Text>
      <Image source={bookmark} style={styles.bookmarkIcon} />
      <Image source={tagImages[item.tag]} style={styles.tagIcon} />
      <View style={styles.memberInfoContainer}>
        <Text style={styles.label}>인원 </Text>
        <Text style={styles.memberCount}>{`${item.members}명`}</Text>
      </View>
      <View style={styles.startDateContainer}>
        <Text style={styles.startDateLabel}>시작일</Text>
        <Text style={styles.startDateValue}>{item.startDate}</Text>
      </View>
      <View style={styles.postInfoContainer}>
        <Text style={styles.postLabel}>게시글</Text>
        <Text style={styles.postCount}>{`${item.posts}개`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      <Header
        left={require("/assets/icons/Community/search.png")}
        leftClick={() => navigation.navigate("CommunitySearch")}
        title={"Community"}
        right={require("/assets/icons/Community/group_add.png")}
        rightClick={() => navigation.navigate("CommunityAdd")}
      />
      <FlatList
        data={communities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <Text style={styles.moreLink}>더보기</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  communityCard: {
    width: "90%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    alignSelf: "center",
    position: "relative", // 상대적 위치 설정
  },
  communityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FF7474",
  },
  bookmarkIcon: {
    position: "absolute",
    top: -6,
    right: 10,
    width: 52,
    height: 52,
  },
  tagIcon: {
    position: "absolute",
    top: 10,
    right: 26,
    width: 20,
    height: 20,
  },
  memberInfoContainer: {
    flexDirection: "row",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  memberCount: {
    fontSize: 14,
    marginLeft: 5,
  },
  startDateContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  startDateLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  startDateValue: {
    fontSize: 14,
    marginLeft: 5,
  },
  postInfoContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  postLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  postCount: {
    fontSize: 14,
    marginLeft: 5,
  },
  moreLink: {
    fontSize: 14,
    textAlign: "center",
    color: "#1167b1",
    marginTop: 10,
  },
});

export default Community;
