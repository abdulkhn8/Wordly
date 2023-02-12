import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, FontSize, strings } from '../../modules/constants'
import { IGameData } from '../../modules/types'
import { shuffle } from '../../modules/utils'
import useNavigationService from '../../modules/hooks/navigation-service'
import Button from '../../components/button'

const { pinkBackground, pinkBorder, blueBackground, blueBorder, success } = colors

const HomeScreen = () => {
    const navigationService = useNavigationService()

    const puzzleRawData = require('../../modules/puzzle-data.json')
    const { start, leadersBoard, appTitle, cities, animals, food } = strings

    const [gameData, setGameData] = useState<IGameData>()
    const [puzzleDataType, setPuzzleDataType] = useState('')

    const handleAnimalClick = () => {
        const _gameData: IGameData = {
            data: shuffle(puzzleRawData.animals),
            index: 0,
            score: 0
        }
        setGameData(_gameData)
        setPuzzleDataType(animals)
    }
    const handleCitiesClick = () => {
        const _gameData: IGameData = {
            data: shuffle(puzzleRawData.cities),
            index: 0,
            score: 0
        }
        setGameData(_gameData)
        setPuzzleDataType(cities)
    }
    const handleFoodClick = () => {
        const _gameData: IGameData = {
            data: shuffle(puzzleRawData.foods),
            index: 0,
            score: 0
        }
        setGameData(_gameData)
        setPuzzleDataType(food)
    }
    const handleStartClick = () => {
        if (gameData) {
            navigationService.navigateToPuzzle(gameData)
            setPuzzleDataType('')
        }
    }
    const handleSLeaderBoardClick = () => {
        navigationService.navigateToLeadersBoard()
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.appTitle}>
                    <Text style={styles.appTitleText}>{appTitle}</Text>
                </View>
            </View>
            <View style={{ flex: 1.5 }}>
                <View style={{ gap: 20 }}>
                    <Button
                        testId={'selectCities'}
                        title={cities}
                        onClick={handleCitiesClick}
                        borderColor={puzzleDataType === cities ? success : undefined} />
                    <Button
                        testId={'selectFoods'}
                        title={food}
                        onClick={handleFoodClick}
                        borderColor={puzzleDataType === food ? success : undefined} />
                    <Button
                        testId={'selectAnimals'}
                        title={animals}
                        onClick={handleAnimalClick}
                        borderColor={puzzleDataType === animals ? success : undefined} />
                </View>
            </View>
            <View style={{ flex: .5 }}>
                {gameData ? <Button
                    testId={'startGame'}
                    title={start}
                    backgroundColor={pinkBackground}
                    borderColor={pinkBorder}
                    borderRadius={0}
                    onClick={handleStartClick} /> : null}
            </View>
            <View style={{ flex: .5 }}>
                <Button
                    testId={'navigateToLeadersBoard'}
                    title={leadersBoard}
                    borderWidth={0}
                    onClick={handleSLeaderBoardClick} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        rowGap: 20
    },
    appTitle: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderWidth: 2,
        backgroundColor: blueBackground,
        borderColor: blueBorder,
    },
    appTitleText: {
        fontSize: FontSize.xxxLarge
    }
})

export default HomeScreen