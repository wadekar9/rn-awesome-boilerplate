import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'

const IconButton: React.FC<TouchableOpacityProps> = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.65}
      {...props}
      accessibilityRole={props.accessibilityRole || 'button'}
      role={props.role || 'button'}
      accessibilityState={{ ...props.accessibilityState, disabled: !!props.disabled }}
    >
      {props.children}
    </TouchableOpacity>
  )
}

export default React.memo(IconButton);