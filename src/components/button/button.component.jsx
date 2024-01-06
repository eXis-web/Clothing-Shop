import { BaseButton,GoogleSignButton, InvertedButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: "google-sign-in",
    inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
    {
        [BUTTON_TYPE_CLASSES]: BaseButton,
        [BUTTON_TYPE_CLASSES]:GoogleSignButton,
        [BUTTON_TYPE_CLASSES]:InvertedButton,
    }[buttonType]
)

const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return <CustomButton{...otherProps }>{ children }</CustomButton >;
};

export default Button;