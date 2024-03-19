// Imports
import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy'

// UI imports
import Button from 'ui/Button'
import './style.css'

// App imports
import { URL_WEB } from 'setup/config/env'
import params from 'setup/config/params'
import { routes } from 'setup/routes'
import Typography from 'ui/Typography'

// Component
const Header = ({ }) => {
  // actions
  const worksheetCreateShowSet = useStoreActions(actions => actions.worksheet.worksheetCreateShowSet)

  // render
  return (
    <header className='header'>
      {/* left */}
      <div className='left'>
        <Link to={routes.pagesHome.path} className='logo'>
          <img src={URL_WEB + '/images/logo-card.svg'} alt='logo' />

          <Typography variant='secondary' weight='medium' className='text-muted'>{ params.site.name } Editor</Typography>
        </Link>

        <nav className='nav hidden'>
          <Button
            title='File'
            size='m'
            variant='text'
          />

          <Button
            title='Edit'
            size='m'
            variant='text'
          />

          <Button
            title='View'
            size='m'
            variant='text'
          />

          <Button
            title='Help'
            size='m'
            variant='text'
          />
        </nav>
      </div>

      {/* right */}
      <div className='right'>
        <Button
          title='Worksheet'
          iconLeft='add'
          size='s'
          variant='outlined'
          onClick={() => worksheetCreateShowSet(true)}
        />

        <Button
          title='Fork'
          iconLeft='call_split'
          size='s'
          variant='outlined'
          className='ml-3'
          onClick={() => window.alert('Fork feature coming soon!')}
        />

        <Button
          title='Share'
          iconLeft='share'
          size='s'
          className='ml-3'
          onClick={() => window.alert('Share feature coming soon!')}
        />
      </div>
    </header>
  )
}

export default Header
