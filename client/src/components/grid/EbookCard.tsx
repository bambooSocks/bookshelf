import React from "react"
import {Button, Card} from "antd"
import {DownloadOutlined} from "@ant-design/icons"
const {Meta} = Card

interface Props {
  title: string
  author: string
  cover: string
  filename: string
}

export const EbookCard: React.FC<Props> = ({title, author, cover, filename}) => {
  return (
    <div>
      <Card
        hoverable
        style={{width: 240}}
        cover={<img alt="example" src={`http://localhost:4000/${cover}`} />}
      >
        <Meta title={title} description={author} />
        <Button
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          size="middle"
          style={{marginTop: "15px"}}
          href={`http://localhost:4000/${filename}`}
        >
          Download
        </Button>
      </Card>
    </div>
  )
}
