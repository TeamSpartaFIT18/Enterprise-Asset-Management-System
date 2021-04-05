import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'

export const EmployeeSideNavData = [
  {
    title: 'Dashboard',
    path: '/employee/dashboard',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Profile',
    path: '/employee/profile',
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
    title: 'Add Experience',
    path: '/employee/addexperience',
    icon: <FaIcons.FaCartPlus />,
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
