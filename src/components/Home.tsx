import React, { useEffect, useState } from 'react'
import { api } from '../api/axiosInstance';

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
        <div>
            <div id='feedPosts'>
                {postagens.map((post: any) => {
                    const user = getUserById(post.userId);
                    return (
                        <div key={post.id} className='post_details-card'>

                            <div>
                                <div id='userInfo' className='flex'>
                                    {user && user.avatar && (
                                        <img
                                            src={user.avatar}
                                            alt={`${user.name}'s avatar`}
                                            style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                                        />
                                    )}
                                    <h4 className=''>{user ? user.name : 'Unknown User'}</h4>
                                </div>

                                <h3 className='h3-bold'>{post.title}</h3>
                                <h3 className=''>{post.description}</h3>
                                <h3 className=''>Likes: {post.likes}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Home