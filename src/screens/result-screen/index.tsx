import { Alert, BackHandler, StyleSheet, Text, View, Share } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, FontSize, StorageKeys, strings } from '../../modules/constants'
import { stringFormat } from '../../modules/utils'
import { IGameData } from '../../modules/types'
import useNavigationService from '../../modules/hooks/navigation-service'
import useStorageService from '../../modules/hooks/storage-service'
import Button from '../../components/button'
const { pinkBackground, pinkBorder, success, black, blueBackground, blueBorder } = colors

const ResultScreen = (props: any) => {
    const navigationService = useNavigationService()
    const storageService = useStorageService()

    const gameData = props.route.params.gameData as IGameData
    const haveSomeScore = gameData.score > 0
    const textColor = haveSomeScore ? success : black
    const { home, FailureMessage, successMessage, earnedPointsMessage, newHighScoreMessage, share, shareScore } = strings

    const [newHighScore, setNewHighScore] = useState(false)

    const handleShareClick = async () => {
        try {
            const result = await Share.share({ message: stringFormat(shareScore, gameData.score) });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    }
    const handleHomeClick = () => {
        navigationService.navigateToHome()
    }
    const saveScore = () => {
        let prevScore = 0
        if (storageService.contains(StorageKeys.highScore)) {
            prevScore = storageService.getNumber(StorageKeys.highScore) ?? 0
        }
        if (prevScore < gameData.score) {
            setNewHighScore(true)
            storageService.set(StorageKeys.highScore, gameData.score)
        }
    }

    useEffect(() => {
        saveScore()

        const backAction = () => {
            handleHomeClick()
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    return (
        <>
            <View style={styles.container}></View>
            <View style={styles.container}>
                <Text style={{ ...styles.title, color: textColor }}>{haveSomeScore ? successMessage : FailureMessage}</Text>
                {newHighScore ? <Text style={{ ...styles.title, color: textColor }}>{newHighScoreMessage}</Text> : null}
                <Text style={{ ...styles.subTitle, color: textColor }}>{stringFormat(earnedPointsMessage, gameData.score)}</Text>
            </View>
            <View style={styles.container}>
                <Button
                    testId={'navigateToHome'}
                    title={home}
                    backgroundColor={pinkBackground}
                    borderColor={pinkBorder}
                    borderRadius={0}
                    onClick={handleHomeClick} />
                <Button
                    testId={'shareResult'}
                    title={share}
                    backgroundColor={blueBackground}
                    borderColor={blueBorder}
                    borderRadius={0}
                    onClick={handleShareClick} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50
    },
    title: {
        fontSize: FontSize.xxxLarge,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: FontSize.xxLarge,
        textAlign: 'center',
    },
})

export default ResultScreen