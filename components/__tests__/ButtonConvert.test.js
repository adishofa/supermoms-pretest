import { render, fireEvent } from '@testing-library/react-native'
import React from 'react'
import ButtonCSV from '../ButtonConvert'

describe('Button convert csv', () => {
    it('should render button correctly', () => {
        const buttonCsv = render(<ButtonCSV label='button test' />)

        expect(buttonCsv.getByText('button test')).toBeTruthy()
    })
    it('should clickable to download CSV created text', () => {
        const handleCSV = jest.fn()

        const buttonCsv = render(<ButtonCSV onClick={handleCSV} />)

        fireEvent.press(buttonCsv.getByTestId('output-csv'))
        expect(handleCSV).toHaveBeenCalledTimes(1)
    })
})
