import { render, fireEvent, waitFor } from '@testing-library/react-native'
import React from 'react'
import App from '../App'

describe('Main Screen', () => {
    it('should show title correctly', () => {
        const page = render(<App />)

        expect(page.getByTestId('container')).toBeTruthy()
        expect(page.getByText('Sample Input')).toBeTruthy()
        expect(page.getByText('Sample Output')).toBeTruthy()
    })

    it('should show result text converted correctly', async () => {
        const page = render(<App />)

        const inputSampleText = page.getByTestId('sample-input')

        fireEvent.changeText(inputSampleText, 'hello world')

        expect(page.getByText('HELLO WORLD')).toBeTruthy()
        expect(page.getByText('hElLo wOrLd')).toBeTruthy()
        await waitFor(() => expect(page.getByText('CSV created!')).toBeTruthy(), {timeout:3000})
    })
})
