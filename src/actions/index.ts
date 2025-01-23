"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export const saveSnippets = async (id:number, code:string) => {
    await prisma.snippets.update({
        where: {
            id: id
        },
        data: {
            code: code
        }
    })

    redirect("/snippet/" + id)
}

export const deleteSnippet = async (id:number) => {
    await prisma.snippets.delete({
        where: {
            id: id
        }
    })
    redirect("/")
}