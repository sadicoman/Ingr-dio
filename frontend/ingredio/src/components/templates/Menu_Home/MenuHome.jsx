import Logo from "../Menu/Logo";
import Menu__register__login from "../Menu__register__login/Menu__register__login";
import "./MenuHome.scss";

const MenuHome = () => {
    return (
        <header className="header header--home">
            <Logo className="logo" />
            <Menu__register__login />
        </header>
    );
};

export default MenuHome;
