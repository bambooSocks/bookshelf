import React from "react"
import {Layout, Menu} from "antd"
import {BookOutlined, AudioOutlined} from "@ant-design/icons"
import styled from "styled-components"
import BookSvg from "../../favicon.svg"
import {useRecoilState} from "recoil"
import {activeGridState, GridType} from "../../App"
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
  const [activeGrid, setActiveGrid] = useRecoilState(activeGridState)

  return (
    <Header style={{position: "sticky", top: "0", zIndex: "50"}}>
      <Logo style={{cursor: "pointer"}}>
        <img src={BookSvg} width="25px" color="white" style={{marginRight: "0.5em"}} />
        Bookshelf
      </Logo>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[activeGrid === GridType.Ebook ? "e" : "a"]}
      >
        <Menu.Item key="e" icon={<BookOutlined />} onClick={() => setActiveGrid(GridType.Ebook)}>
          E-books
        </Menu.Item>
        <Menu.Item
          key="a"
          icon={<AudioOutlined />}
          onClick={() => setActiveGrid(GridType.Audiobook)}
        >
          Audiobooks
        </Menu.Item>
      </Menu>
    </Header>
  )
}
