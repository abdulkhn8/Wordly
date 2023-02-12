import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { IButton } from './types'
import { colors, FontSize } from '../../modules/constants'
import { testProps } from '../../modules/utils'

const Button = (props: IButton) => {
    const { black } = colors
    const handleCitiesClick = (event: any) => {
        props.onClick?.()
    }
    return (
        <TouchableOpacity
            {...testProps(props.testId)}
            style={{
                backgroundColor: props.backgroundColor ?? '',
                borderWidth: props.borderWidth ?? 2,
                borderRadius: props.borderRadius ?? 4,
                borderColor: props.borderColor ?? black,
                ...styles.container
            }}
            onPress={handleCitiesClick}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 50,
        paddingVertical: 10,
        alignItems: 'center'
    },
    text: {
        fontSize: FontSize.xLarge
    }
})

export default Button