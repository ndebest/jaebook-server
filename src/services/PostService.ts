import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Post } from "../entities/Post";
import { PostRepository } from "../repositories/PostRepository";

@Service()
export class PostService {
    constructor(@InjectRepository() private postRepository: PostRepository) {}

    public createPost(post: Partial<Post>): Promise<Post> {
        const newPost = this.postRepository.save(post);
        return newPost;
    }

    public getPosts(offset: number, limit: number): Promise<Post[]> {
        return this.postRepository.getPosts(offset, limit);
    }

    public getPostById(postId: string): Promise<Post> {
        return this.postRepository.getPostById(postId);
    }

    /**
     * 포스트의 조회수를 증가한다
     * @param post 포스트
     */
    public async incrementPostView(post: Post): Promise<void> {
        post.view = post.view + 1;
        await this.postRepository.save(post);
    }

    public async updatePost(postId: string, post: Partial<Post>, userId: string): Promise<Post> {
        const postToUpdate = await this.postRepository.getPostById(postId);

        if (postToUpdate.user.id === userId) {
            postToUpdate.title = post.title;
            postToUpdate.content = post.content;
            postToUpdate.previewContent = post.content.substring(0, 100);
            this.postRepository.save(postToUpdate);
            return postToUpdate;
        } else {
            return null;
        }
    }

    /**
     * 포스트가 존재하는지 확인한다
     * @param postId 포스트Id
     * @returns true는 포스트가 존재, false는 포스트가 존재하지 않음
     */
    public async isPostById(postId: string): Promise<boolean> {
        const post = await this.postRepository.findOne({
            where: {
                id: postId,
            },
        });

        if (post) {
            return true;
        }

        return false;
    }
}