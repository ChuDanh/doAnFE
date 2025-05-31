import { useCallback, useContext, useEffect, useState } from 'react';
import { Box, Popover, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Iconify from '../../../shared/components/iconify';
import { TNavItem } from './types.ts';
import { DataContext } from '../../../context/DataContext.tsx';

type NavItemProps = {
  item: TNavItem;
  isLast?: boolean;
};

type RenderNavItemsProps = {
  items: TNavItem[];
  handleCloseAll: () => void;
  location: ReturnType<typeof useLocation>;
};

const RenderNavItems = ({ items, handleCloseAll, location }: RenderNavItemsProps) => {
  const [openPopovers, setOpenPopovers] = useState<Record<string, boolean>>({});
  const [anchorEls, setAnchorEls] = useState<Record<string, HTMLElement | null>>({});

  const handleItemClick = (event: React.MouseEvent<HTMLElement>, item: TNavItem) => {
    if (item.children && item.children.length > 0) {
      event.preventDefault();
      // Cập nhật trạng thái cho popover được click
      setAnchorEls((prev) => ({
        ...prev,
        [item.path]: event.currentTarget,
      }));
      setOpenPopovers((prev) => ({
        ...prev,
        [item.path]: !prev[item.path],
      }));
    } else {
      handleCloseAll();
    }
  };

  const handleClose = (path: string) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [path]: false,
    }));
    setAnchorEls((prev) => ({
      ...prev,
      [path]: null,
    }));
  };

  return (
    <>
      {items.map((item) => (
        <Box key={item.path}>
          <Link
            to={item.path}
            style={{ textDecoration: 'none' }}
            onClick={(e) => handleItemClick(e, item)}
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
                backgroundColor: location.pathname.startsWith(item.path)
                  ? '#e8ebed'
                  : 'transparent',
              }}
            >
              <Iconify icon={item.icon} color={'black'} width={22} sx={{ mr: 1.5 }} />
              <Typography fontSize={16} color="textPrimary" fontWeight={600}>
                {item.title}
              </Typography>
              {item.children && item.children.length > 0 && (
                <Iconify
                  icon="eva:arrow-ios-forward-fill"
                  color={'black'}
                  width={16}
                  sx={{ ml: 'auto' }}
                />
              )}
            </Box>
          </Link>

          {item.children && item.children.length > 0 && (
            <Popover
              open={openPopovers[item.path] || false}
              anchorEl={anchorEls[item.path]}
              onClose={() => handleClose(item.path)}
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
              <RenderNavItems
                items={item.children}
                handleCloseAll={handleCloseAll}
                location={location}
              />
            </Popover>
          )}
        </Box>
      ))}
    </>
  );
};

export const NavItem = ({ item, isLast = false }: NavItemProps) => {
  const { data } = useContext(DataContext) || {};

  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const hasChildren = Boolean(item.children && item.children.length > 0);

  const handleCloseAll = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (hasChildren) {
      event.preventDefault();
      // event.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
      setAnchorEl(event.currentTarget);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      handleCloseAll();
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleCloseAll]);

  const userRole = data?.role || 'guest';

  // Filter items based on roles
  if (item.roles && !item.roles.includes(userRole)) {
    return null; // Do not render if the role is not allowed
  }
  return (
    <Box
      sx={{
        m: 1,
        ...(!isLast && {
          borderBottom: '1px dashed #e8ebed',
        }),
        pb: 1,
      }}
      onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click lan ra ngoài
    >
      {hasChildren ? (
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
            <Iconify icon={'ri:arrow-right-double-fill'} color={'black'} width={18} />
          </Box>
        </Link>
      ) : (
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
      )}

      {hasChildren && (
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleCloseAll}
          onClick={(e) => e.stopPropagation()}
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
          {item.children && (
            <RenderNavItems
              items={item.children}
              handleCloseAll={handleCloseAll}
              location={location}
            />
          )}
        </Popover>
      )}
    </Box>
  );
};
