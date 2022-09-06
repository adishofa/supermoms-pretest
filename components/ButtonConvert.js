import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function ButtonCSV({ onClick = () => {}, label = 'CSV created!' }) {

  return (
    <TouchableOpacity testID='output-csv' onPress={onClick}>
        <Text style={styles.textOutput}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  textOutput: {
    padding: 2,
    margin: 4,
    color: 'black',
    fontSize: 18,
    fontWeight: '400'
  }  
})
