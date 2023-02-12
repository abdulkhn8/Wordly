import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '../../components/button'
import useNavigationService from '../../modules/hooks/navigation-service'
import useStorageService  from '../../modules/hooks/storage-service'
import { colors, FontSize, StorageKeys, strings } from '../../modules/constants'
const { blueBackground, blueBorder, grey, black } = colors

const LeadersBoard = () => {
    const navigationService = useNavigationService()
    const storageService = useStorageService()

    const { home, highScore } = strings

    const [score, setScore] = useState(0)

    const handleHomeClick = () => {
        navigationService.navigateToHome()
    }

    useEffect(() => {
        if (storageService.contains(StorageKeys.highScore)) {
            setScore(storageService.getNumber(StorageKeys.highScore) ?? 0)
        }
    }, [])

    return (
        <>
            <View style={styles.container}>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>{highScore}</Text>
                <Text style={styles.score}>{score}</Text>
            </View>
            <View style={styles.container}>
                <Button
                    testId={'navigateToHome'}
                    title={home}
                    backgroundColor={blueBackground}
                    borderColor={blueBorder}
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
        gap: 20
    },
    title: {
        fontSize: FontSize.xxxLarge,
        color: black
    },
    score: {
        fontSize: FontSize.xxxxxLarge,
        color: grey
    }
})

export default LeadersBoard