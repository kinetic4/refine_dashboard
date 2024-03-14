import { User } from '@/graphql/schema.types'
import { Button, Card, ConfigProvider, Dropdown, Tooltip, theme } from 'antd'
import { Text } from '@/component/text'
import React, { useMemo } from 'react'
import { EyeOutlined } from '@ant-design/icons'

type ProjectCardProps = {
    id: string,
    title: string,
    updatedAt: string,
    dueDate?: string,
    users?: {
        id: string,
        name: string,
        avatarUrl?: User['avatarUrl']
    }[] 
}

const ProjectCard = ({ id, title, dueDate, users }: ProjectCardProps) => {

    const { token } = theme.useToken();

    const edit =  () => {}

    const dropdownItems = useMemo(() => {
      const dropdownItems: MenuProps['items'] = [
        {
          label: 'View Card',
          key: '1',
          icon: <EyeOutlined />,
          onclick: () => {
            edit()
          }
        },
        {
          danger: true,
          label: 'Delete Card',
          key: '2',
          onclick: () => {}
        }
      ]

      return dropdownItems
    }, [])

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: token.colorTextSecondary,
          },
          Card: {
            headerBg: "transparent",
          },
        },
      }}
    >
      <Card
      size='small'
      title ={<Text ellipsis = {{tooltip: title}}>{title}</Text>}
      onClick={() => edit()}
      extra= {
        <Dropdown
        trigger={['click']}
        menu={{
          items: dropdownItems
        }}
        >
          <Button>
            
          </Button>
        </Dropdown>
      }
      >
        
      </Card>
    </ConfigProvider>
  )
}

export default ProjectCard