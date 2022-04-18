import React from 'react';
import { Link as MUILink } from '@mui/material';
import NextLink from 'next/link';

const MyLink = ({ onClick, href , children, ...props}, ref) => {
  return (
    <MUILink href={href} onClick={onClick} ref={ref} {...props} >
      {children}
    </MUILink>
  )
}

const MyAnchor = React.forwardRef(MyLink);

export default function Link({children,...props}) {
    return (
        <NextLink href={props.href} passHref>
        <MyAnchor {...props}>{children}</MyAnchor>
        </NextLink>
    )
}
