import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomeScreen from '../pages/HomeScreen';
import {rest} from 'msw'
import {setupServer} from 'msw/node';
import mockData from './mock.json';
import { wait } from '@testing-library/user-event/dist/utils';
import { o } from 'msw/lib/glossary-297d38ba';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_API_URL}/benirvingplt/products/products`, (req, res, ctx) => {
        return res(ctx.json(mockData['products']));
    }),
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Product Filter', () => {
    test('Filters by color', async () => {
        render(<HomeScreen />);
        
        let colours = mockData['products'].map( p => p.colour );
        colours = [ ...new Set(colours) ];
        
        fireEvent.click(screen.getByTestId('fc-container'));
        
        await waitFor(() => {
            fireEvent.click(screen.getByTestId(`fc-${colours[0]}`));
        });

        await waitFor(() => {
            expect(screen.getByTestId('loader')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.queryByTestId('loader')).not.toBeInTheDocument();

        });

    });
});
