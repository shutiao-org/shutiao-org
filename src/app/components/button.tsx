'use client'

import { Button as AntdButton } from 'antd'

export const ButtonDemo = () => {
  return (
    <AntdButton
      type='primary'
      onClick={() => console.log('clicked')}
    >
      <span>Click me</span>
    </AntdButton>
  )
}
