// Imports
import React from 'react'
import Helmet from 'react-helmet'
import { Switch } from 'react-router-dom'

// App imports
import params from 'setup/config/params'
import { routes } from 'setup/routes'
import RoutePrivate from 'modules/auth/RoutePrivate'
import Body from 'modules/common/Body'

// Component
const Workspace = () => {
  return (
    <Body>
      {/* meta */}
      <Helmet>
        <title>{ `Workspace · ${ params.site.name }` }</title>
      </Helmet>

      {/* routes */}
      <Switch>
        {
          Object.values(routes.userWorkspace.routes).map((route, index) => (
            <RoutePrivate
              {...route}
              key={index}
              path={route.path}
            />
          ))
        }
      </Switch>
    </Body>
  )
}

export default Workspace
