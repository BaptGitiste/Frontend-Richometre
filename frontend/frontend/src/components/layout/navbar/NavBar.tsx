import { FunctionComponent, useCallback, useMemo } from 'react';

import reactLogo from '../../../assets/react.svg';
import NavbarItem from './NavBarItem';
import { useAppDispatch, useAppSelector } from '../../../store/redux.hooks';
import { Button } from 'react-aria-components';
import { disconnect } from '../../../store/slices/authentication.slice';
import { useNavigate } from 'react-router-dom';

import './NavBar.css';

const NavBar: FunctionComponent = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authState = useAppSelector(state => state.authentication);

  const isAuthenticated = useMemo(() => authState.isAuthenticated && !!authState.token, [authState]);

  const logout = useCallback(() => {
      dispatch(disconnect());
      navigate('/')
  }, [dispatch, navigate]);

  return (
    <nav className='navbar'>
      <ul className='navbar__item-list'>
        <li>
          <NavbarItem label={"Home"} icon={<img src={reactLogo} alt='React Logo' />} to='/' />
        </li>
        <li>
          <NavbarItem label={"Demo"} icon={<img src={reactLogo} alt='React Logo' />} to='/demo/123' state={{ from: "HomePage" }}/>
        </li>
        <li>
          <NavbarItem label={"External Movie"} icon={<img src={reactLogo} alt='React Logo' />} to='/external-movie' />
        </li>
        {!isAuthenticated && 
          <li>
            <NavbarItem label={"Login"} icon={<img src={reactLogo} alt='React Logo' />} to='/login' replace={false} />
          </li>
        }
      </ul>
      <div className='navbar__logout'>
        {isAuthenticated && <Button onPress={logout}>Déconnexion</Button>}
      </div>
    </nav>
  );
};

export default NavBar;