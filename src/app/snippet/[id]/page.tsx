import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { deleteSnippet } from '@/actions'

const SnippetDetailPage = async ({params}:{params:Promise<{id:string}>}) => {
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
    const deleteSnippetAction = deleteSnippet.bind(null, snippet.id)
  return (
    <div>
      <div className='flex items-center justify-between'>
      <div className='flex items-center gap-2 my-5'>
        <Link href={`/snippet/${snippet.id}/edit`}>
        <Button variant={'outline'} className='font-bold'>Edit</Button>
        </Link>
        <form action={deleteSnippetAction}>
        <Button variant={'outline'} type='submit' className='font-bold'>Delete</Button>
        </form>
      </div>
      <Link href='/'>
        <Button variant={'outline'} className='font-bold rounded-full'><ArrowLeft /></Button>
        </Link>
      </div>
      
      <h1 className='text-3xl font-bold'>{snippet?.title}</h1>
      
      <div className='text-xl mt-5 border rounded-lg p-5 overflow-auto'>
        <pre>
            <code>
                {snippet?.code}
            </code>
        </pre>
        </div>
    </div>
  )
}

export default SnippetDetailPage

export const generateStaticParams = async () => {
    const snippets = await prisma.snippets.findMany()
    return snippets.map((snippet) => ({
        id: snippet.id.toString()
    }))
}