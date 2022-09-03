import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomeScreen from '../pages/HomeScreen';
import {rest} from 'msw'
import {setupServer} from 'msw/node';
import mockData from './mock.json';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_API_URL}/benirvingplt/products/products`, (req, res, ctx) => {
        return res(ctx.json(mockData['products']));
    }),
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Cart', () => {
    test('Initially total is 0', async () => {
        render(<HomeScreen />);
        
        const component = screen.getByTestId('cart-total');
        expect(component).toHaveTextContent('$ 0.00');
    });

    test('Initially all products should be empty', async () => {
        render(<HomeScreen />);

        await waitFor(() => {
            const component = screen.getByTestId('product-container');

            for ( let i = 0; i < component.childNodes.length; i++ ) {
                const product = mockData["products"][i];
                expect(screen.getByTestId(`${product.id}-product-qty`)).toHaveTextContent('0')
            }
        });
    });

    test('Add to Cart', async () => {
        render(<HomeScreen />);
        
        await waitFor(() => {
            fireEvent.click(screen.getByTestId(`1-product-add`));
            expect(screen.getByTestId(`1-product-qty`)).toHaveTextContent('1');
        })
    });

    test('Delete from Cart', async () => {
        render(<HomeScreen />);

        await waitFor(() => {
            fireEvent.click(screen.getByTestId(`1-product-add`));
            expect(screen.getByTestId(`1-product-qty`)).toHaveTextContent('1')
            fireEvent.click(screen.getByTestId(`1-product-delete`));
            expect(screen.getByTestId(`1-product-qty`)).toHaveTextContent('0')
        })
    });

    test('Remove from Cart', async () => {
        render(<HomeScreen />);

        await waitFor(() => {
            fireEvent.click(screen.getByTestId(`1-product-add`));
            fireEvent.click(screen.getByTestId(`1-product-add`));
            expect(screen.getByTestId(`1-product-qty`)).toHaveTextContent('2')
            fireEvent.click(screen.getByTestId(`1-product-remove`));
            expect(screen.getByTestId(`1-product-qty`)).toHaveTextContent('0')
        })
    });

    test('Cart Total Updates', async () => {
        render(<HomeScreen />);
        
        let total = 0;
        const firstPrice = mockData['products'][0]['price'];

        await waitFor(() => {
            fireEvent.click(screen.getByTestId(`1-product-add`));
            total += firstPrice;
            const component = screen.getByTestId('cart-total');
            expect(component).toHaveTextContent(`$ ${total}`);

            fireEvent.click(screen.getByTestId(`1-product-delete`));
            total -= firstPrice;
            expect(component).toHaveTextContent(`$ ${total}`);

            fireEvent.click(screen.getByTestId(`1-product-add`));
            fireEvent.click(screen.getByTestId(`1-product-add`));
            total += firstPrice * 2;
            expect(component).toHaveTextContent(`$ ${total}`);
            
            fireEvent.click(screen.getByTestId(`1-product-remove`));
            total -= firstPrice * 2;
            expect(component).toHaveTextContent(`$ ${total}`);
        })
    });

});

