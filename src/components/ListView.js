import React, { memo } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Image
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../core/theme';

const ListView = ({ data }) => {
    FlatListItemSeparator = () => {
        return (
            //Item Separator
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
        );
    };
    return (
        <View style={styles.container} behavior="padding">
            <FlatList
                data={data}
                ItemSeparatorComponent={FlatListItemSeparator}
                renderItem={({ item }) => {
                    const message = item.commit.message.split('\n\n')[0]
                    const commitDate = item.commit.committer.date
                    let agoAmount = Math.abs((new Date()).getTime() - (new Date(commitDate)).getTime()) / 3600000;
                    let timeString = ""
                    if (agoAmount <= 1) timeString = Math.floor(agoAmount * 60) + " mins ago"
                    else if (agoAmount <= 24) timeString = Math.floor(agoAmount) + " hours ago"
                    else if (agoAmount > 24) timeString = Math.floor(agoAmount / 24) + " days ago"
                    return (
                        <View style={styles.list}>
                            <Text style={styles.item}>
                                {message || "Commit"}
                            </Text>
                            <View style={styles.downView}>
                                <Image style={styles.image} source={{ uri: item.author.avatar_url }} />
                                <View style={styles.imageLeftView}>
                                    <View style={styles.textsView}>
                                        <Text style={styles.authorText}>{item.author.login + " authored and"}</Text>
                                        <Text style={styles.committerText}>{item.committer.login}</Text>
                                    </View>
                                    <Text style={styles.authorText}>{"commited " + timeString}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 25 + getStatusBarHeight(),
        width: "100%"
    },
    item: {
        width: "100%",
        fontSize: 14,
        fontWeight: "500"
    },

    downView: {
        paddingTop: 4,
        flex: 1,
        flexDirection: "row"
    },

    list: {
        position: "relative",
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 4,
        justifyContent: "flex-start"
    },
    image: {
        width: 32,
        height: 32,
    },
    textsView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    authorText: {
        marginLeft: 3,
        fontSize: 12
    },
    committerText: {
        marginLeft: 3,
        fontSize: 12,
        fontWeight: "500",
        color: theme.colors.secondary,
    },
    imageLeftView: {
        flex: 1,
        flexDirection: "column",
        // alignItems: "center"
    }
});

export default memo(ListView);
