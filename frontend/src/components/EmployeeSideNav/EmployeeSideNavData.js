import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

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
  },
  {
    title: 'Add Experience',
    path: '/employee/addexperience',
    icon: <FaIcons.FaCartPlus />,
  },
  {
    title: 'Jobs',
    path: '/employee/jobslist',
    icon: <IoIcons.IoMdPeople />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Complaints',
        path: '/employee/jobs/complaints',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
      {
        title: 'Completed',
        path: '/employee/jobslist/completed',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
    ],
  },
  {
    title: 'Schedules',
    path: '/employee/schedules',
    icon: <IoIcons.IoMdPeople />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Complaints',
        path: '/employee/jobs/complaints',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
      {
        title: 'Completed',
        path: '/employee/jobslist/completed',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
    ],
  },
];
