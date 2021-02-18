import { type } from "os";
import { UserEntity } from "src/user/models/user.entity";
import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('blog_entry')
export class BlogEntryEntity{
    @PrimaryGeneratedColumn({name:'idBlog'})//decoration de cle primaire avec une entete idPersonne en column dans le BD
    id:number

    @Column({type:'text', name:'nom',unique:true})//Decoration de column 
    title:string

    @Column({type:'text', name:'slug'})
    slug:string

    @Column({name:'Description',default:''})
    description:string

    @Column({name:'Body',default:''})
    body:string

    @Column({type:'time',default:()=>"CURRENT_TIMESTAMP"})
    created:Date

    
    @Column({type:'timestamp',default:()=>"CURRENT_TIMESTAMP"})
    updated:Date
    @BeforeUpdate()
    updateTimestamp(){
        this.updated = new Date
    }
    
    @Column()
    headerVideo:string
   
    @Column({type:'date',default:()=>"CURRENT_TIMESTAMP"})
    publishedDate:Date

    @Column({nullable:true})
    isPublished:boolean

    @ManyToOne(type=> UserEntity, user=>user.blogEntries)
    author:UserEntity

}