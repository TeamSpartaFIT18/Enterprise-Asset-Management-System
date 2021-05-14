import React from 'react'
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
    icon: <AiIcons.AiOutlineUser />,
  },
  {
    title: 'Add Experience',
    path: '/employee/addexperience',
    icon: <AiIcons.AiFillFileAdd />,
  },
  {
    title: 'Jobs',
    path: '/employee/jobs/complaints',
    icon: <AiIcons.AiFillSchedule />,
  },
  {
    title: 'Schedules',
    path: '/employee/schedules',
    icon: <AiIcons.AiFillSchedule />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Picked schedules',
        path: '/employee/schedules/myschedules',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
      {
        title: 'Completed Schedules',
        path: '/employee/schedules/completed',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
    ],
  },
]
