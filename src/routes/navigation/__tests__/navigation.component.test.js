import { screen, fireEvent } from "@testing-library/react";
import Navigation from "../navigation.component";
import { renderWithProviders } from "../../../utils/test/test.utils";
import { signOutStart } from "../../../store/user/user.action";
import * as reactRedux from 'react-redux';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch
}));

describe('Navigation tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('It should render a Sign in and not a sign out link if there is no currentUser', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: null,
                },
            },
        });

        const signInLinkElement = screen.getByText(/Sign in/i);
        expect(signInLinkElement).toBeInTheDocument(); 

        const signOutLinkElement = screen.queryByText(/Sign out/i);
        expect(signOutLinkElement).toBeNull();
    });

    test('It should render a sign out and not sign in if there is a currentUser', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {}
                }
            },
        });

        const signOutLinkElement = screen.getByText(/Sign out/i);
        expect(signOutLinkElement).toBeInTheDocument();

        const signInLinkElement = screen.queryByText(/Sign in/i);
        expect(signInLinkElement).toBeNull();
    });

    test('It should not render a cart dropdown if isCartOpen is false', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                cart: {
                    isCartOpen: false,
                    cartItems: []
                },
            },
        });

        const dropDownTextElement = screen.queryByText('Your cart is empty');
        expect(dropDownTextElement).toBeNull();
    });

    test('It should render a cart dropdown if isCartOpen is true', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                cart: {
                    isCartOpen: true,
                    cartItems: [],
                }
            }
        });

        const dropDownTextElement = screen.getByText(/your cart is empty/i);
        expect(dropDownTextElement).toBeInTheDocument();
    });

    test('It should dispatch signOutStart action when clicking on the sign out link', async () => {
            const spy = jest.spyOn(reactRedux, 'useDispatch');

            renderWithProviders(<Navigation />, {
                preloadedState: {
                    user: {
                        currentUser: {}
                    }
                }
            });
            
            const signOutLinkElement = screen.getByText(/Sign out/i);
            expect(signOutLinkElement).toBeInTheDocument();

            await fireEvent.click(signOutLinkElement);
            expect(mockDispatch).toHaveBeenCalled();
            const signOutAction = signOutStart();
            expect(mockDispatch).toHaveBeenCalledWith(signOutAction);

            spy.mockRestore();
        });
});