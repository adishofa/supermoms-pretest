import { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import {
  documentDirectory,
  StorageAccessFramework,
  copyAsync
} from 'expo-file-system'
import { canOpenURL, openURL } from 'expo-linking'

import ButtonCSV from './components/ButtonConvert'
import {
  uploadFile,
  shareFile,
  getLinkList
} from './services/dropbox.services'

export default function App() {
  const [sampleInput, setSampleInput] = useState('')
  const [outputTextOne, setOutputTextOne] = useState('')
  const [outputTextTwo, setOutputTextTwo] = useState('')
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const bounceInput = setTimeout(() => {
      if (sampleInput.length > 0) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }, 2000)
    return () => clearTimeout(bounceInput)
  }, [sampleInput])

  function handleInputChange(val) {
    setSampleInput(val)
    setOutputTextOne(val.toUpperCase())
    setOutputTextTwo(setAlternateData(val))
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

  async function handleClickButton(ev) {
    ev.preventDefault()
    try {
      const dataCSV = outputTextTwo.split('').join(',')
      // Requests permissions for external directory
      const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync()

      if (permissions.granted) {
        // Gets SAF URI from response
        const uri = permissions.directoryUri
        
        // Gets all files inside of selected directory
        const files = await StorageAccessFramework.readDirectoryAsync(uri)

        // Check if file exist
        const exist = files.filter(f => f.includes('createcsv.csv'))
        if (exist[0]) await StorageAccessFramework.deleteAsync(exist[0])
        const pathFile = await StorageAccessFramework.createFileAsync(uri, 'createcsv.csv', 'text/csv')

        // Write or overwrite to file with updated array
        await StorageAccessFramework.writeAsStringAsync(pathFile, dataCSV, { encoding: 'utf8' })
        
        // Copy to local file storage
        const docDir = await documentDirectory
        await copyAsync({ from: pathFile, to: docDir })

        // Uploading to dropbox
        await uploadFile(docDir + 'createcsv.csv')

        // set file to share
        const linkList = await getLinkList()
        const urlSharedLink = linkList.links && linkList.links.length > 0 ?
          linkList.links[0] : await shareFile()
        
        const canOpen = await canOpenURL(urlSharedLink.url)
        if (canOpen) {
          openURL(urlSharedLink.url)
        } else {
          alert('Link can not be open')
        }
      } else {
        alert('Permission to access directory is not granted!')
      }
    } catch (err) {
      alert(err)
    }
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

        { showButton && <ButtonCSV label='CSV created!' onClick={handleClickButton} /> }
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
