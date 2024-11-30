const path = require('path')
const fs = require('fs')

const filePath = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-native-paper',
  'src',
  'components',
  'BottomNavigation',
  'BottomNavigationBar.tsx'
)

/**
 * This script is used to modify the BottomNavigationBar.tsx file in the react-native-paper package to fix the issue with the key prop warning.
 * TODO: Remove this script once the issue is fixed in the react-native-paper package.
 */
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err)
    return
  }

  const originalCode = `renderTouchable = (props: TouchableProps<Route>) => <Touchable {...props} />,`
  const modifiedCode = `renderTouchable = ({ key, ...props }: TouchableProps<Route>) => <Touchable key={key} {...props} />,`

  if (data.includes(modifiedCode)) {
    console.log('File already modified.')
    return
  }

  const updatedData = data.replace(originalCode, modifiedCode)

  fs.writeFile(filePath, updatedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing the file:', err)
      return
    }
    console.log('File successfully modified.')
  })
})