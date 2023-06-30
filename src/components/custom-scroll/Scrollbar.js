import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Box, styled } from '@mui/material';

const SimpleBarStyle = styled(SimpleBar)(() => ({
  maxHeight: '100%',
  '.simplebar-scrollbar:before': { backgroundColor: '#2e2d348f' },
}));

const Scrollbar = (props) => {
  const { children, sx, ...other } = props;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
  const simpleBarRef = useRef(null)

  if (isMobile) {
    return <Box sx={{ overflowX: 'auto' }}>{children}</Box>;
  }

  const scrollToBottom = () => {
    if (simpleBarRef.current) {
      simpleBarRef.current.getScrollElement().scrollTop = simpleBarRef.current.getScrollElement().scrollHeight;
    }
  };
  scrollToBottom()

  return (
    <SimpleBarStyle sx={sx} {...other} ref={simpleBarRef}>
      {children}
    </SimpleBarStyle>
  );
};

Scrollbar.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  other: PropTypes.any,
};

export default Scrollbar;
