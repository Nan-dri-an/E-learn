import { type } from "os";
import { BlogEntryEntity } from "src/blog/model/blog-entry.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { UserRole } from "./user.interface";

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn({name:'idUser'})//decoration de cle primaire avec une entete idPersonne en column dans le BD
    id:number

    @Column({type:'text', name:'nom'})//Decoration de column 
    name:string

    @Column({type:'text', name:'mdpUser',select:false})
    password:string

    @Column({unique:true,name:'emailUser'})
    email:string
   
    @Column({ type:'enum', enum:UserRole, default:UserRole.ETUDIANT})
    role: UserRole
    
    @OneToMany(type=> BlogEntryEntity,blogEntryEntity=>blogEntryEntity.author)
    blogEntries:BlogEntryEntity[]

    @BeforeInsert()
    emailToLowerCase(){
        this.email = this.email.toLowerCase()
    }
}
 