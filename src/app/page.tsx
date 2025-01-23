import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { MessageSquareQuote } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Home = async () => {
  const snippets = await prisma.snippets.findMany()
  return (
    <div>
      <div className='flex items-center justify-between pb-5'>
        <h1 className='text-3xl font-bold inline-flex items-center gap-2'><MessageSquareQuote />codebits</h1>
        <ModeToggle/>
      </div>
      <div className='flex items-center justify-between py-5'>
        <h1 className='text-2xl md:text-3xl font-semibold'>Home</h1>
        <Link href='/snippet/new'>
        <Button className='font-bold'>New</Button>
        </Link>
      </div>
      { (snippets.length > 0) ?
        snippets.map((snippet) => (
          <div key={snippet.id} className='flex items-center justify-between py-5 border rounded-lg px-5'>
            <h1 className='text-sm md:text-xl font-semibold'>{snippet.title}</h1>
            <Link href={`/snippet/${snippet.id}`}>
            <Button variant={'ghost'} className='font-bold text-sm md:text-base'>View</Button>
            </Link>
          </div>
        ))
        : (
          <div className='text-xl md:text-3xl font-bold opacity-50'>no bits yet... 😢️</div>
        )
      }
    </div>
  )
}

export default Home