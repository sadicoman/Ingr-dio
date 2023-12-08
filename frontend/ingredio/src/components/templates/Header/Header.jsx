import "./Header.scss";
import Logo from "../../templates/Menu/Logo";
import MenuResponsive from "../../templates/MenuResponsive/MenuResponsive";

const Header = () => {
    return (
        <>
            <header className="header">
                <Logo className="logo" />
                <MenuResponsive />
            </header>
        </>
    );
};

export default Header;
