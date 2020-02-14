import React from 'react';
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import axios from 'axios'

jest.mock('axios', () => {
    return{
        get: jest.fn(()=> Promise.resolve({
            data:{
                results: ['Mike', '6ft']
            }
        }))
    }
});

test('made an api call', async () => {//Arrange
    const wrapper = rtl.render(<App/>);

    await wrapper.findAllByAltText(/logo/i);//Action

    expect(axios.get).toHaveBeenCalled();//Assertion
})

test('Next button clicked', async() => {//Arrange
    const wrapper = rtl.render(<App/>);

    await wrapper.findAllByTestId(/map/i);

    const nextClick = wrapper.getByText(/next/i);
    rtl.act(()=> rtl.fireEvent.click(nextClick));//Action

    expect(wrapper.findByTestId('map')).not.toBeNull();//Assertion
})

test('Previous button clicked', async() => {
    const wrapper = rtl.render(<App/>);
    
    await wrapper.findAllByTestId(/map/i);

    const prevClick = wrapper.getByText(/previous/i);
    rtl.act(()=> rtl.fireEvent.click(prevClick));

    expect(wrapper.findByTestId('map')).not.toBeNull();
})
