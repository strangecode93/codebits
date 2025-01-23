
import EditSnippetForm from '@/components/EditSnippetForm'
import { prisma } from '@/lib/prisma'
import React from 'react'

const EditPageSnippet = async ({params}:{params:Promise<{id:string}>}) => {
    const id = parseInt((await params).id)
        const snippet = await prisma.snippets.findUnique({
            where: {
                id: id
            }
        })
        if(!snippet){
            return (
                <div>
                    <h1 className='text-3xl font-bold opacity-50'>bits not found... 😢️</h1>
                </div>
            )
        }
  return (
    <div>
        <EditSnippetForm snippet={snippet}/>
    </div>
  )
}

export default EditPageSnippet