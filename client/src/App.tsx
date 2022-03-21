import {Layout} from "antd"
import GlobalFonts from "./style/fonts"
import {AudioBookGrid} from "./components/grid/AudioBookGrid"
import {EbookGrid} from "./components/grid/EbookGrid"
import {SiteHeader} from "./components/layout/SiteHeader"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import {Player} from "./components/player/Player"
import {RecoilRoot} from "recoil"

const {Content, Footer} = Layout

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <GlobalFonts />
        <Layout style={{minHeight: "100vh"}}>
          <SiteHeader />
          <Layout className="site-layout">
            <Content style={{margin: "0 16px"}}>
              <Routes>
                <Route path="/" element={<Navigate to="/e" />} />
                <Route path="/e" element={<EbookGrid />} />
                <Route path="/a" element={<AudioBookGrid />} />
              </Routes>
            </Content>
            <Footer style={{textAlign: "center"}}>©2022 Created by Matej Majtan</Footer>
          </Layout>
          <Player />
        </Layout>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
