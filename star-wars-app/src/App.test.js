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

test('made an api call', async () => {
    const wrapper = rtl.render(<App/>);

    await wrapper.findAllByAltText(/logo/i);

    expect(axios.get).toHaveBeenCalled();
})

test('Next button clicked', async() => {
    const wrapper = rtl.render(<App/>);

    await wrapper.findAllByTestId(/map/i);

    const nextClick = wrapper.getByText(/next/i);
    rtl.act(()=> rtl.fireEvent.click(nextClick));

    expect(wrapper.findByTestId('map')).not.toBeNull();
})
// test('Render of character name', async()=>{
//     const wrapper = rtl.render(<App/>);

//     const 
// })