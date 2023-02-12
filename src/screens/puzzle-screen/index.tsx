import { StyleSheet, Text, View, BackHandler, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors, FontSize, StorageKeys, strings } from '../../modules/constants'
import { IGameData } from '../../modules/types'
import Button from '../../components/button'
import HintButton from '../../components/hint-button'
import { isArrayEquals, shuffle } from '../../modules/utils'
import useNavigationService from '../../modules/hooks/navigation-service'
import useStorageService from '../../modules/hooks/storage-service'
const { pinkBackground, pinkBorder, success, black, grey } = colors

const PuzzleScreen = (props: any) => {
    const navigationService = useNavigationService()
    const storageService = useStorageService()

    const { gameData } = props.route.params
    const { next, skip, holdOn, puzzleQuit } = strings

    const relations = useRef<Array<number>>([])

    const [data] = useState<IGameData>(gameData)
    const isLastPuzzle = data.data.length == data.index + 1
    const lettersArray = data.data[data.index].answer.split('')

    const [puzzleComplete, setPuzzleComplete] = useState(false)
    const [hints, setHints] = useState<Array<string>>(shuffle(lettersArray))
    const [selections, setSelections] = useState<Array<string>>(Array(lettersArray.length).fill(''))

    useEffect(() => {
        const backAction = () => {
            Alert.alert(holdOn, puzzleQuit, [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                {
                    text: 'YES', onPress: () => {
                        navigationService.navigateToHome()
                        // BackHandler.exitApp()
                    }
                },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    const saveScore = (score: number) => {
        storageService.set(StorageKeys.gameScore, score)
    }
    const handleSkipClick = () => {
        const _gameData = { ...data }
        saveScore(_gameData.score)

        if (isLastPuzzle) {
            navigationService.navigateToResult(_gameData)
        }
        else {
            _gameData.index = _gameData.index + 1
            navigationService.navigateToPuzzle(_gameData)
        }
    }
    const handleNextClick = () => {
        const _gameData = { ...data }
        _gameData.score = _gameData.score + _gameData.data[data.index].score
        saveScore(_gameData.score)

        if (isLastPuzzle) {
            navigationService.navigateToResult(_gameData)
        }
        else {
            _gameData.index = _gameData.index + 1
            navigationService.navigateToPuzzle(_gameData)
        }
    }
    const handleHintClick = (index: number) => {
        const letter = hints[index]

        for (let _index = 0; _index < selections.length; _index++) {
            const _letter = selections[_index];
            if (!_letter) {
                const targetIndex = _index

                const updatedSelections = [...selections]
                updatedSelections[targetIndex] = letter

                const updatedHints = [...hints]
                updatedHints[index] = ''

                setSelections(updatedSelections)
                setHints(updatedHints)

                relations.current[index] = targetIndex

                const puzzleCompleted = isArrayEquals(lettersArray, updatedSelections)
                if (puzzleCompleted) {
                    setPuzzleComplete(true)
                }

                return
            }
        }


    }
    const handleSelectionClick = (index: number) => {
        const letter = selections[index]
        const targetIndex = relations.current.findIndex(rel => rel == index)

        const updatedSelections = [...selections]
        updatedSelections[index] = ''

        const updatedHints = [...hints]
        updatedHints[targetIndex] = letter

        setSelections(updatedSelections)
        setHints(updatedHints)

        delete relations.current[`${targetIndex}`]
    }

    return (
        <View style={styles.container}>
            <Text>{`${data.index + 1}/${data.data.length}`}</Text>
            <View style={styles.answerContainer}>
                <View style={styles.hintContainer}>
                    {selections.map((letter, index) =>
                        <HintButton
                            key={`letter-key-${index}`}
                            testId={`letter-${index}`}
                            disabled={puzzleComplete}
                            letter={letter}
                            onClick={() => { handleSelectionClick(index) }}
                            borderColor={puzzleComplete ? success : black}
                        />)}
                </View>
                <Text style={styles.questionContainer}>{(data.data[data.index].question)}</Text>
            </View>
            <View style={styles.hintContainer}>
                {hints.map((letter, index) =>
                    <HintButton
                        key={`input-key-${index}`}
                        testId={`input-${index}`}
                        disabled={puzzleComplete}
                        letter={letter}
                        onClick={() => { handleHintClick(index) }}
                    />)}
            </View>
            {puzzleComplete
                ? <Button
                    testId={`nextPuzzle`}
                    title={next}
                    backgroundColor={pinkBackground}
                    borderColor={pinkBorder}
                    borderRadius={0}
                    onClick={handleNextClick} />
                : <Button
                    testId={`skipThisPuzzle`}
                    title={skip}
                    backgroundColor={pinkBackground}
                    borderColor={pinkBorder}
                    borderRadius={0}
                    onClick={handleSkipClick} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    hintContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: '15%',
    },
    answerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
    },
    questionContainer: {
        fontSize: FontSize.xLarge,
        color: grey,
        fontWeight: '500',
        padding: 20,
        textAlign: 'center',
    }
})

export default PuzzleScreen