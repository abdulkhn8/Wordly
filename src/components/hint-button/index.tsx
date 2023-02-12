import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { } from 'react'
import { IHintButton } from './types'
import { colors, FontSize } from '../../modules/constants'

const HintButton = (props: IHintButton) => {
    const { black } = colors

    const handleClick = () => {
        props.letter && props.onClick?.()
    }

    return (
        <TouchableOpacity
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
        fontSize: FontSize.xxLarge
    }
})

export default HintButton