"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, CircleAlert } from 'lucide-react'
import Link from 'next/link'
// import { prisma } from '@/lib/prisma'
// import { redirect } from 'next/navigation'
import React, { useActionState } from 'react'
import * as actions from "@/actions"

const CreateSnippetPage = () => {
    const [formStateData, xyz] = useActionState(actions.createSnippet, {message:""})
    
  return (
    <form action={xyz}>
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
        {
            formStateData.message && <p className='text-red-500 mb-2 border border-red-500 rounded p-2 opacity-70'><span className='flex items-center gap-2'><CircleAlert size={20}/>{formStateData.message}</span></p>
        }
        <Button className='font-bold'>New</Button>
    </form>
  )
}

export default CreateSnippetPage