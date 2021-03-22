import React from 'react';
import { Spin } from 'antd';

interface IProps extends React.HTMLAttributes<HTMLElement> {
  height?: string | number;
  loadingText?: string;
}

const Loading: React.FC<IProps> = (props) => (
  <div 
    { ...props }
    style={{
      height: props.height || '50vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...(props.style || {}),
    }}
  >
    <Spin tip={props.loadingText || 'loading...'} />
  </div>
)

export default Loading;