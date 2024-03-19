// Imports
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

// UI imports
import Typography from 'ui/Typography';
import Button from 'ui/Button';
import Container from 'ui/Container';
import './style.css';

// App imports
import { URL_WEB } from 'setup/config/env';
import params from 'setup/config/params';
import { routes } from 'setup/routes';

// Component
const Header = () => {
  // state
  const { isAuthenticated } = useStoreState(state => state.user.auth);

  // render
  return (
    <header className="common-header">
      <Container>
        {/* left */}
        <div className="left">
          <Link to={routes.pagesHome.path}>
            <img
              src={URL_WEB + '/images/logo-card.svg'}
              className="logo"
              alt="logo"
            />
          </Link>

          <Link to={routes.pagesHome.path}>
            <Typography variant="secondary" size="h3" className="text-muted">
              {params.site.name}
            </Typography>
          </Link>
        </div>

        {/* right */}
        <div className="right">
          <div className="menu">
            {isAuthenticated && (
              <NavLink to={routes.userProfile.path} className="link">
                Profile
              </NavLink>
            )}
          </div>

          <div className="menu">
            {/* nav - learn */}
            <NavLink to={routes.pagesLearn.path} className="link">
              Learn
            </NavLink>

            {/* nav - about */}
            <NavLink to={routes.pagesAbout.path} className="link">
              About
            </NavLink>

            {/* nav - create worksheet */}
            {isAuthenticated ? (
              <Link to={routes.userWorkspace.path} className="ml-3">
                <Button
                  title="Open Editor"
                  iconRight="arrow_forward"
                  size="s"
                />
              </Link>
            ) : (
              <Link to={routes.userRegister.path} className="ml-3">
                <Button
                  title="Get Started"
                  iconRight="arrow_forward"
                  size="s"
                />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
