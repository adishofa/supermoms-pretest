import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import ButtonCSV from './components/ButtonConvert'
// import { documentDirectory, writeAsStringAsync, EncodingType } from 'expo-file-system'

export default function App() {
  const [sampleInput, setSampleInput] = useState('')
  const [outputTextOne, setOutputTextOne] = useState('')
  const [outputTextTwo, setOutputTextTwo] = useState('')
  const [outputCSVData, setOutputCSVData] = useState([['']])

  function handleInputChange(val) {
    setSampleInput(val)
    setOutputTextOne(val.toUpperCase())
    setOutputTextTwo(setAlternateData(val))
    setOutputCSVData([setAlternateData(val).split('')])
  }

  function setAlternateData(val) {
    // do convert
    const converted =  val.split(' ').map(word => {
      const words = word.split('').map((sn, id) => {
        if (id % 2 == 0) return sn.toLowerCase()
        return sn.toUpperCase()
      })
      return words.join('')
    }
    ).join(' ')
    return converted
  }

  function reverseWords(val) {
    return val.split(' ').map((word) => word.split('').reverse().join('')).join(' ')
  }

  async function createCSVFile(val) {
    // const dataToConvert = setAlternateData(val).split('')

    // const writeFile = await documentDirectory()
  }

  async function handleClickButton() {
    console.log(outputTextTwo.split('').join(','))
    // console.log(FileSystem.documentDirectory)
    // const resp = await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}test.csv`, 'g,r,t,h', FileSystem.EncodingType.UTF8)
    // console.log(resp)
  }

  return (
    <View testID='container' style={styles.container}>
        {/** Sample Input */}
        <Text testID='title-sample-input' style={styles.label}>Sample Input</Text>
        <TextInput
          testID='sample-input'
          style={styles.input}
          defaultValue={sampleInput}
          placeholder='Sample Input'
          autoCapitalize="none"
          placeholderTextColor='gray'
          onChangeText={handleInputChange}
        />
        
        {/** Sample Output */}
        <Text testID='title-simple-output' style={styles.label}>Sample Output</Text>
        <Text testID='output-uppercase' style={styles.textOutput}>{outputTextOne}</Text>
        <Text testID='output-alternate' style={styles.textOutput}>{outputTextTwo}</Text>

        <ButtonCSV label='CSV created!' onClick={handleClickButton} />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#F3F3F3',
    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 6,
    borderColor: '#42A5F5',
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20
  },
  label: {
    padding: 8,
    margin: 10,
    color: 'gray',
    fontSize: 24,
    fontWeight: '600'
  },
  textOutput: {
    padding: 2,
    margin: 4,
    color: 'black',
    fontSize: 18,
    fontWeight: '400'
  }  
})
