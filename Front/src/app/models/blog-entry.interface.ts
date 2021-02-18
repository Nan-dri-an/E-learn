import { User } from "./user.interface";


export interface BlogEntry{
    id?:number
    title?:string
    slug?:string
    description?:string
    body?:string
    created?:Date
    updated?:Date
    headerVideo?:string
    publishedDate?:Date
    isPublished?:boolean
    author?:User
}