import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'

const IconButton: React.FC<TouchableOpacityProps> = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.65}
      accessibilityRole={'button'}
      role={'button'}
      {...props}
    >
      {props.children}
    </TouchableOpacity>
  )
}

export default React.memo(IconButton);