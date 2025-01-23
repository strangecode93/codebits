import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { prisma } from '@/lib/prisma'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const CreateSnippetPage = () => {
    async function createSnippet(formData: FormData) {
        'use server'
        const title = formData.get('title')
        const code = formData.get('code')
        const snippet = await prisma.snippets.create({
            data: {
                title: title as string,
                code: code as string
            }
        })
        console.log(snippet)

        redirect("/")
    }
  return (
    <form action={createSnippet}>
        <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-semibold pb-10'>create-bits</h1>
        <Link href='/'>
        <Button variant={'outline'} className='font-bold rounded-full'><ArrowLeft /></Button>
        </Link>
        </div>
        <div className='flex flex-col gap-4 pb-4'>
            <Label>Title</Label>
            <Input type='text' name='title' id='title'/>
        </div>
        <div className='flex flex-col gap-4 pb-4'>
            <Label>Code</Label>
            <Textarea name='code' id='code'/>
        </div>
        <Button className='font-bold'>New</Button>
    </form>
  )
}

export default CreateSnippetPage