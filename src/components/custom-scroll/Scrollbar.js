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
  const simpleBarRef = useRef(null)

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
