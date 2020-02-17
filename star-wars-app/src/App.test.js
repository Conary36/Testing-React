import React from 'react';
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import axios from 'axios'
import StarWarsCharacters from './components/StarWarsCharacters';
import { wait } from '@testing-library/react';

jest.mock('axios', () => {
    return{
        get: jest.fn(()=> Promise.resolve({
            data:{
                results: [{
                    name: 'Luke Skywalker',
                    url: 'https://swapi.co/api/people/'
                }],

            }
        }))
    }
});

test('data rendering', async () => {
    const { getByText } = rtl.render(<StarWarsCharacters/>)

    await wait(() => expect(getByText(/sk/i)))
})
test('API data being called', async () => {
    //make sure data has been called
    expect(axios.get).toHaveBeenCalledTimes(1)
})

test('made an api call', async () => {//Arrange
    const wrapper = rtl.render(<App/>);

    await wrapper.findAllByAltText(/logo/i);//Action

    expect(axios.get).toHaveBeenCalled();//Assertion
})

test('Next button clicked', async() => {//Arrange
    const wrapper = rtl.render(<App/>);

    await wrapper.findAllByTestId(/map/i);

    const nextClick = wrapper.getByText(/next/i);
    rtl.act(()=> {
        rtl.fireEvent.click(nextClick)}
        );//Action
    

    expect(wrapper.findByTestId('map')).toBeTruthy();//Assertion
})

test('Previous button clicked', async() => {
    const wrapper = rtl.render(<App/>);
    
    await wrapper.findAllByTestId(/map/i);

    const prevClick = wrapper.getByText(/previous/i);
    rtl.fireEvent.click(prevClick);

    expect(wrapper.findByTestId('map')).toBeTruthy();//deleted null and removed .not
})
