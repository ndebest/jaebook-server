import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { User } from "./User";
import { PostComment } from "./PostComment";

@Entity({ name: "post" })
export class Post {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @ManyToOne(
        type => User,
        user => user.id,
        { cascade: true, onDelete: "CASCADE" },
    )
    @JoinColumn({ name: "user_id" })
    public user: User;

    @IsNotEmpty()
    @Column({ name: "title" })
    public title: string;

    @IsNotEmpty()
    @Column({ name: "content" })
    public content: string;

    @Column({ name: "preview_content", length: 100 })
    public previewContent: string;

    @Column({ default: 0 })
    public view: number;

    @Column({ default: 0 })
    public like: number;

    @OneToMany(
        type => PostComment,
        postComment => postComment.post,
    )
    public comments: PostComment[];

    @CreateDateColumn({ name: "created_at" })
    public createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    public updatedAt: Date;
}
