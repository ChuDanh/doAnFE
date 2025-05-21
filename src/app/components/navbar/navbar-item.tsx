// components/Navbar/NavItem.tsx
import { useState } from 'react';
import { Box, Popover, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Iconify from '../../../shared/components/iconify';
import { TNavItem } from './types.ts';

type NavItemProps = {
  item: TNavItem;
  isLast?: boolean;
};

export const NavItem = ({ item, isLast = false }: NavItemProps) => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (hasChildren) {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        m: 1,
        ...(!isLast && {
          borderBottom: '1px dashed #e8ebed',
        }),
        pb: 1,
      }}
    >
      <Link to={item.path} style={{ textDecoration: 'none' }} onClick={handleClick}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            borderRadius: 3,
            p: 1,
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
            backgroundColor: location.pathname.startsWith(item.path) ? '#e8ebed' : 'transparent',
          }}
        >
          <Iconify icon={item.icon} color={'black'} width={25} />
          <Typography fontSize={14} align="center" fontWeight="bold" color="textPrimary">
            {item.title}
          </Typography>
        </Box>
      </Link>

      {hasChildren && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              width: 250,
              p: 1,
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              ml: 1.5,
            },
          }}
        >
          {item.children?.map((child) => (
            <Link
              key={child.path}
              to={child.path}
              style={{ textDecoration: 'none' }}
              onClick={handleClose}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 1.5,
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                  backgroundColor: location.pathname.startsWith(child.path)
                    ? '#e8ebed'
                    : 'transparent',
                }}
              >
                <Iconify icon={child.icon} color={'black'} width={22} sx={{ mr: 1.5 }} />
                <Typography fontSize={16} color="textPrimary" fontWeight={600}>
                  {child.title}
                </Typography>
              </Box>
            </Link>
          ))}
        </Popover>
      )}
    </Box>
  );
};
