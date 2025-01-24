/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import {revalidatePath} from "next/cache"

export const saveSnippets = async (id:number, code:string) => {
    await prisma.snippets.update({
        where: {
            id: id
        },
        data: {
            code: code
        }
    })
    revalidatePath("/snippet/" + id)
    redirect("/snippet/" + id)
}

export const deleteSnippet = async (id:number) => {
    await prisma.snippets.delete({
        where: {
            id: id
        }
    })
    revalidatePath("/")
    redirect("/")
}

export async function createSnippet(prevState: {message: string}, formData: FormData) {

    // 'use server'
    try {
        const title = formData.get('title')
        const code = formData.get('code')
        if(typeof title !== "string" || title.length < 4){ 
            return {message: "Title must be at least 4 characters"}
        }
        if(typeof code !== "string" || code.length < 4){ 
            return {message: "Code must be at least 4 characters"}
        }
        await prisma.snippets.create({
            data: {
                title: title,
                code: code
            }
        })
        // console.log(snippet)
        revalidatePath("/")
        // throw new Error("oops! something went wrong")
    } catch (error : any) {
        return {message: error.message}
    }
    
    redirect("/")
}