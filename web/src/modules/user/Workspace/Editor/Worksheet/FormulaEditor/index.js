// Imports
import React, { useRef, useEffect, useState } from 'react'
import { useStoreActions } from 'easy-peasy'
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/mode/mathematica/mathematica'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-darker.css'

// UI imports
import Typography from 'ui/Typography'
import Button from 'ui/Button'

// App imports
import params from 'setup/config/params'
import { isDevelopment } from 'setup/helpers/utils'
import { save } from 'modules/formula/api/actions/mutation'

// Component
const FormulaEditor = ({ worksheetId, formulasInitial, onClose, refresh }) => {
  // state
  const [isSubmitting, isSubmittingToggle] = useState(false)
  const [formulas, setFormulas] = useState(formulasInitial || 'Mark(Dimension("Item1", "Item2") = Mark(Dimension("Item3", "Item4") + 10')

  // actions
  const messageShow = useStoreActions(actions => actions.common.messageShow)

  // onload
  useEffect(() => {

  }, [])

  const onSave = async () => {
    isSubmittingToggle(true)

    try {
      const { data } = await save({ worksheetId, formulas })

      messageShow({ success: data.success, message: data.message })

      if(data.success) {
        await refresh()
      }
    } catch (error) {
      console.log(error)

      messageShow({ success: false, message: 'There was some error. Please try again' })
    } finally {
      isSubmittingToggle(false)
    }
  }

  return (
    <div className='formula animation fade-in'>
      {/* title */}
      <div className='title'>
        <Typography size='h5' weight='medium' variant='secondary'>Formula Editor</Typography>
      </div>

      <div className='editor'>
        <CodeMirror
          value={formulas}
          options={{
            mode: 'mathematica',
            theme: 'material-darker',
            lineNumbers: true
          }}
          onBeforeChange={(editor, data, value) => {
            setFormulas(value)
          }}
          placeholder='Hello'
        />
      </div>

      <div className='actions'>
        <Button
          iconLeft='check'
          title='Apply'
          size='s'
          onClick={onSave}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        />

        <Button
          title='Close'
          size='s'
          variant='text'
          onClick={onClose}
        />
      </div>
    </div>
  )
}

export default FormulaEditor
