import { BlogEntry } from "src/blog/model/blog-entry.interface";

export interface User{
    id?:number
    name?:string
    email?:string
    password?:string
    role?: UserRole
    blogEntries?:BlogEntry[]
}
export enum UserRole{
    ADMIN='admin',
    PROF='prof',
    ETUDIANT='etudiant'
}