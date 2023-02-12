import { Alert, BackHandler, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '../../components/button'
import { colors, FontSize, StorageKeys, strings } from '../../modules/constants'
import useNavigationService from '../../modules/hooks/navigation-service'
import { stringFormat } from '../../modules/utils'
import { IGameData } from '../../modules/types'
import { useStorageService } from '../../modules/hooks/storage-service'
const { pinkBackground, pinkBorder, success } = colors

const ResultScreen = (props: any) => {
    const navigationService = useNavigationService()
    const storageService = useStorageService()

    const gameData = props.route.params.gameData as IGameData
    const haveSomeScore = gameData.score > 0
    const { home, FailureMessage, successMessage, earnedPointsMessage, newHighScoreMessage } = strings

    const [newHighScore, setNewHighScore] = useState(false)

    const handleHomeClick = () => {
        navigationService.navigateToHome()
    }
    const saveScore = () => {
        if (storageService.contains(StorageKeys.highScore)) {
            const prevScore = storageService.getNumber(StorageKeys.highScore) ?? 0
            if (prevScore < gameData.score) {
                setNewHighScore(true)
                storageService.set(StorageKeys.highScore, gameData.score)
            }
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
                <Text style={styles.title}>{haveSomeScore ? successMessage : FailureMessage}</Text>
                {newHighScore ? <Text style={styles.title}>{newHighScoreMessage}</Text> : null}
                <Text style={styles.subTitle}>{stringFormat(earnedPointsMessage, gameData.score)}</Text>
            </View>
            <View style={styles.container}>
                <Button
                    title={home}
                    backgroundColor={pinkBackground}
                    borderColor={pinkBorder}
                    borderRadius={0}
                    onClick={handleHomeClick} />
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
        color: success
    },
    subTitle: {
        fontSize: FontSize.xxLarge,
        textAlign: 'center',
        color: success
    },
})

export default ResultScreen