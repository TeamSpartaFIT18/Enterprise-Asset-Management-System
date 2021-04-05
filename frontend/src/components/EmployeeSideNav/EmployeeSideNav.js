import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { EmployeeSideNavData } from './EmployeeSideNavData'
import EmployeeSideNavSubMenuData from './EmployeeSideNavSubMenuData'
import { IconContext } from 'react-icons/lib'
import './EmployeeSideNav.css'

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Div = styled.div`
  background: #001f33 !important;
  height: 60px;
  width: 80px;
  left: 0 !important;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  left: ${({ burg }) => (burg ? '0' : '-100%')};
  margin-top: 50px;
  margin-left: 0;
  z-index: 10;
  position: fixed;
  border-radius: 0px 40px 40px 0px;
`

const NavIcon = styled(Link)`
  /* margin-left: 2rem;
  font-size: 2rem;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center; */
`

const SidebarNav = styled.nav`
  margin-top: 65px;
  background: #001f33;
  width: 250px;
  height: auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`

const SidebarWrap = styled.div`
  width: 100%;
`

const EmployeeSideNav = () => {
  const [sidebar, setSidebar] = useState(true)
  const [burg, setBurg] = useState(true)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Div burg={burg}>
          <NavIcon className='openSide' to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Div>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon className='closeSide' to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {EmployeeSideNavData.map((item, index) => {
              return <EmployeeSideNavSubMenuData item={item} key={index} />
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  )
}

export default EmployeeSideNav
