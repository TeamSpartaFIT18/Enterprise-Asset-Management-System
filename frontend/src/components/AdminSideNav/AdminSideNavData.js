import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'

export const AdminSideNavData = [
  {
    title: 'Dashboard',
    path: '/dashboard-admin',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Inventory',
    path: '/admin/productslist',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Reports',
        path: '/reports/reports1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
      {
        title: 'Reports 2',
        path: '/reports/reports2',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
      {
        title: 'Reports 3',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: 'Users',
    path: '/admin/userslist',
    icon: <FaIcons.FaCartPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Admins',
        path: '/reports/reports1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
      {
        title: 'Employees',
        path: '/reports/reports2',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
      {
        title: 'All users',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: 'Orders',
    path: '/admin/orderslist',
    icon: <IoIcons.IoMdPeople />,
    subNav: [
      {
        title: 'Not paid orders',
        path: '/reports/reports1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
      {
        title: 'Not delivered orders',
        path: '/reports/reports2',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
      {
        title: 'All orders',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: 'Complaints',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
  },
]
