import { screen, fireEvent } from "@testing-library/react";
// import * as reactRedux from "react-redux";
import Navigation from "../navigation.component";
import { renderWithProviders } from "../../../utils/test/test.utils";
import { signOutStart } from "../../../store/user/user.action";

// Передбачувана функція useDispatch, яка буде використовуватися в нашому тесті
const mockDispatch = jest.fn();

// Мокаем функцію useDispatch в модулі react-redux
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch
}));

describe('Navigation tests', () => {
    beforeEach(() => {
        // Скидуємо стан мокування перед кожним тестом
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

    test('It should dispatch signOutStart when clicking on the sign out link', async () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {},
                },
            },
        });
        
        const signOutLinkElement = screen.getByText(/Sign out/i);
        expect(signOutLinkElement).toBeInTheDocument();

        await fireEvent.click(signOutLinkElement);
        expect(mockDispatch).toHaveBeenCalled();
        const signOutAction = signOutStart();
        expect(mockDispatch).toHaveBeenCalledWith(signOutAction);

        mockDispatch.mockClear();  
    });
});
