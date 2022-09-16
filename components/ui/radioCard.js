import { Box, useRadio, getInputProps, getCheckboxProps } from '@chakra-ui/react'

// 1. Create a component that consumes the `useRadio` hook
export default function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()
  return (
    <Box as='label'>
      <input {...input} />
      <Box
        whiteSpace='nowrap'
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600'
        }}
        _focus={{
          boxShadow: 'outline'
        }}
        px={5}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  )
}
