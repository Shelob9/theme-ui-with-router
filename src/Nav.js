import React from 'react'
import { Flex, Box } from '@theme-ui/components'
import { Link, withRouter } from 'react-router-dom'
function Nav(props) {
  const { items, location } = props
  return (
    <Flex as={'nav'}>
      {items.map(item => (
        <Box
          p={2}
          bg={location.pathname === item.to ? 'primary' : ''}
          key={item.to}
        >
          <Link to={item.to}>{item.label}</Link>
        </Box>
      ))}

      <Box p={2} bg="secondary">
        {location.pathname}
      </Box>
    </Flex>
  )
}

export default withRouter(Nav)
