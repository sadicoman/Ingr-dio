import "./MenuResponsive.scss";
import Menu from "../../templates/Menu/Menu";
import MenuPc from "../../templates/Menu_pc/MenuPc";

const MenuResponsive = () => {
    return (
        <>
            <div className="menu-pc">
                <MenuPc />
            </div>
            <div className="menu-mobile">
                <Menu />
            </div>
        </>
    );
};

export default MenuResponsive;
