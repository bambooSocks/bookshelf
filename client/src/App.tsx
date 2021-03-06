import {Layout} from "antd"
import GlobalFonts from "./style/fonts"
import {AudioBookGrid} from "./components/grid/AudioBookGrid"
import {EbookGrid} from "./components/grid/EbookGrid"
import {SiteHeader} from "./components/layout/SiteHeader"
import {Player} from "./components/player/Player"
import {atom, useRecoilValue} from "recoil"

const {Content, Footer} = Layout

export enum GridType {
  Ebook,
  Audiobook
}

export const activeGridState = atom<GridType>({
  key: "activeGridState",
  default: GridType.Ebook
})

const App: React.FC = () => {
  const activeGrid = useRecoilValue(activeGridState)
  return (
    <>
      <GlobalFonts />
      <Layout style={{minHeight: "100vh"}}>
        <SiteHeader />
        <Layout className="site-layout">
          <Content style={{margin: "0 16px"}}>
            {activeGrid === GridType.Ebook && <EbookGrid />}
            {activeGrid === GridType.Audiobook && <AudioBookGrid />}
          </Content>
          <Footer style={{textAlign: "center"}}>©2022 Created by Matej Majtan</Footer>
        </Layout>
        <Player />
      </Layout>
    </>
  )
}

export default App
