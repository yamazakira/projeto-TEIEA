import React, { useEffect, useState } from 'react'
import { api } from '../api/axiosInstance';
import '../globals.css';

const Home = () => {
    const [postagens, setPostagens] = useState([]);
    // const [postagem, setPostagem] = useState([]);
    const [users, setUsers] = useState<any[]>([]); // Store users info here

    const getPostagens = async () => {
        try {
            const response = await api.get("post");
            const data = response.data;
            setPostagens(data);
            getUsers(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getUsers = async (posts: any[]) => {
        try {
            const userIds = Array.from(new Set(posts.map(post => post.userId)));
            console.log(userIds);

            const userResponses = await Promise.all(userIds.map((userId: any) => api.get(`/user/${userId}`)));
            const usersData = userResponses.map(response => response.data);
            setUsers(usersData);
        } catch (error) {
            console.error(error);
        }
    };

    const getUserById = (userId: any) => {
        return users.find((user: any) => user.id === userId);
    };

    useEffect(() => {
        getPostagens();
        //console.log(users);
    }, []);

    return (

        <div className='feedPosts'>
            {postagens
                .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((post: any) => {
                    
                const user = getUserById(post.userId);
                return (
                    <div key={post.id} className='postIndividual'>
                            <div className='flex userInfo'>
                                {user && user.avatar && (
                                    <img
                                        src={user.avatar}
                                        alt={`${user.name}'s avatar`}
                                        style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                                    />
                                )}
                                <p className=''>{user ? user.name : 'Unknown User'}</p>
                            </div>

                            <h3 className='postTitulo'>{post.title}</h3>
                            <p className='postDesc'>{post.description}</p>
                            <div className='postDados'>
                                <p className='postLikes'>Likes: {post.likes}</p>
                                <p className='postComent'>Comentários: {post.likes}</p>
                            </div>
                            
                    </div>
                );
            })}
        </div>

    )
}

export default Home