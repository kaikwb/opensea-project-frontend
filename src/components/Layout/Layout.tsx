import React from "react";
import Header from "../Header/Header.tsx";
import Content from "../Content/Content.tsx";
import Footer from "../Footer/Footer.tsx";
import Body from "../Body/Body.tsx";
import backgroudImage from '../../assets/background.jpg';

interface LayoutProps {
    children?: React.ReactNode;
}

function Layout({children}: LayoutProps) {
    return (
        <Body backgroundImage={backgroudImage}>
            <Header/>
            <Content>
                {children}
            </Content>
            <Footer/>
        </Body>
    );
}

export default Layout;
