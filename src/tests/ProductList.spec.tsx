import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomeScreen from '../pages/HomeScreen';
import {rest} from 'msw'
import {setupServer} from 'msw/node';
import mockData from './mock.json';
import { wait } from '@testing-library/user-event/dist/utils';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_API_URL}/benirvingplt/products/products`, (req, res, ctx) => {
        return res(ctx.json(mockData['products']));
    }),
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Product List', () => {
    test('Product list to be empty initially', async () => {
        render(<HomeScreen />);
        
        // initially, the preview should be empty initially.
        const component = screen.getByTestId('product-container');
        expect(component).toBeEmptyDOMElement();
    });
    
    test('Products loader show on page load', async () => {
        render(<HomeScreen />);
        
        // initially, the preview should be empty initially.
        const component = screen.getByTestId('loader');
        expect(component).toBeInTheDocument();
    });

    test('Products load on page load', async () => {
        render(<HomeScreen />);

        await waitFor(() => {
            expect(screen.getByTestId('product-container').childNodes.length)
                .toBeGreaterThan(0);
        });
        
    });

    test('Loader hidden on page load', async () => {
        render(<HomeScreen />);

        await waitFor(() => {
            expect(screen.queryByTestId('loader'))
            .not.toBeInTheDocument();
        });

    });

    test('Product list loads properly', async () => {
        render(<HomeScreen />);

        await waitFor(() => {
            const component = screen.getByTestId('product-container');

            for ( let i = 0; i < component.childNodes.length; i++ ) {
                const previewChild = component.childNodes[i];
        
                expect(previewChild).toHaveTextContent(mockData["products"][i]["name"])
            }
        });

    });
});

