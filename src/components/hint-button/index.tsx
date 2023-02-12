import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { } from 'react'
import { IHintButton } from './types'
import { colors, FontSize } from '../../modules/constants'
import { testProps } from '../../modules/utils'
const { black } = colors

const HintButton = (props: IHintButton) => {

    const handleClick = () => {
        props.letter && props.onClick?.()
    }

    return (
        <TouchableOpacity
            {...testProps(props.testId)}
            style={{
                ...styles.container,
                borderColor: props.borderColor ?? black,
            }}
            disabled={props.disabled}
            onPress={handleClick}>
            <Text style={styles.text}>{props.letter}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 50,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: FontSize.xxLarge,
        color: black
    }
})

export default HintButton