'use client';

import {useState,useEffect} from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};


const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts,setPosts] = useState([]);

const handleSearchChange = (e) =>{
  setSearchText(e.target.value)

}

  useEffect(async () => {
    try {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, []);

  useEffect(async () => {
    try {
      const response = await fetch('/api/prompt');
      const rawData = await response.json();

      // Filter or modify the data based on certain conditions
      const filteredData = rawData.filter((item) => item.published);

      setPosts(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data = {posts}
        handleTagClick = { ( ) => {}}
      />
    </section>
  )
}

export default Feed