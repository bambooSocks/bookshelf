import React from "react"
import {Layout, Menu} from "antd"
import {BookOutlined, AudioOutlined} from "@ant-design/icons"
import styled from "styled-components"
import BookSvg from "../../favicon.svg"
import {useLocation, useNavigate} from "react-router"
const {Header} = Layout

const Logo = styled.div`
  float: left;
  display: flex;
  align-items: center;
  height: 31px;
  margin: 16px 24px 16px 0;
  color: white;
  font-size: x-large;
  font-family: "Roboto Slab";
`

export const SiteHeader: React.FC = () => {
  const navigate = useNavigate()
  const loc = useLocation()

  return (
    <Header style={{position: "sticky", top: "0", zIndex: "50"}}>
      <Logo style={{cursor: "pointer"}}>
        <img src={BookSvg} width="25px" color="white" style={{marginRight: "0.5em"}} />
        Bookshelf
      </Logo>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[loc.pathname]}>
        <Menu.Item key="/e" icon={<BookOutlined />} onClick={() => navigate("/e")}>
          E-books
        </Menu.Item>
        <Menu.Item key="/a" icon={<AudioOutlined />} onClick={() => navigate("/a")}>
          Audiobooks
        </Menu.Item>
      </Menu>
    </Header>
  )
}
