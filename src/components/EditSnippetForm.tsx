"use client"
import { Editor } from '@monaco-editor/react'
import React, { useState } from 'react'
import type { Snippets } from '@prisma/client'
import { Button } from './ui/button'
import {saveSnippets} from '@/actions'

const EditSnippetForm = ({snippet}:{snippet:Snippets}) => {
    const [code, setCode] = useState(snippet.code)
    const handleCodeChange = (value: string = "") => {
        setCode(value);
    }

    const saveSnippetAction = saveSnippets.bind(null, snippet.id, code)
  return (
    <div>
        <div>
        <form action={saveSnippetAction} className='flex items-center justify-between mb-3'>
        <h1 className='text-2xl font-bold'>codebits</h1>
        <Button type='submit' variant={'outline'} className='font-bold'>Save</Button>
        </form>
        </div>
        <Editor
        height="90vh"
        theme='vs-dark'
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={handleCodeChange}
      />
    </div>
  )
}

export default EditSnippetForm