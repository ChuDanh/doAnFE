import { TNavItem } from './types.ts';

export const NAV_ITEMS: TNavItem[] = [
  {
    icon: 'ic:round-home',
    title: 'Trang chủ',
    path: '/courses',
  },
  {
    icon: 'ix:road-filled',
    title: 'Lộ trình',
    path: '/learning-path',
  },
  {
    icon: 'f7:book-fill',
    title: 'Khóa học của tôi',
    path: '/my-courses',
  },
  {
    icon: 'lsicon:manage-filled',
    title: 'Quản lý',
    path: '/manage',
    children: [
      {
        icon: 'material-symbols:dashboard',
        title: 'Khóa học',
        path: '/manage/courses',
        children: [
          {
            icon: 'material-symbols:list-rounded',
            title: 'Danh sách khóa học',
            path: '/manage/courses/list',
          },
          {
            icon: 'gridicons:new',
            title: 'Thêm khóa học',
            path: '/manage/courses/new',
          },
        ],
      },
      {
        icon: 'icon-park-solid:map-road-two',
        title: 'Lộ trình',
        path: '/manage/learning-path',
        children: [
          {
            icon: 'material-symbols:list-rounded',
            title: 'Danh sách lộ trình',
            path: '/manage/learning-path/list',
          },
          {
            icon: 'gridicons:new',
            title: 'Thêm lộ trình',
            path: '/manage-learning-path/new',
          },
        ],
      },
    ],
  },
  {
    icon: 'ri:todo-fill',
    title: 'Báo cáo',
    path: '/report',
    children: [
      {
        icon: 'mdi:report-box-multiple',
        title: 'Khóa học',
        path: '/report/course',
      },
      {
        icon: 'mdi:report-box-multiple',
        title: 'Doanh thu',
        path: '/report/revenue',
      },
    ],
  },
];
