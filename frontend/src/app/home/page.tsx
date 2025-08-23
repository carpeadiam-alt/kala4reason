"use client"
import React, { useState, useEffect, useMemo } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface Creator {
  address: string;
  age: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  state: string;
}

interface Comment {
  author: string;
  text: string;
}

interface Post {
  _id: string;
  comments: Comment[];
  creator: Creator;
  description: string;
  images: string[];
  likes: number;
  tags: string[];
  title: string;
}

function PostCard({ post, index }: { post: Post; index: number }) {
  const baseUrl = "https://thecodeworks.in/kalarasa";
  const imageUrl = post.images && post.images.length > 0 
    ? `${baseUrl}/${post.images[0]}`
    : null;

  // Calculate position based on index (3 columns)
  const row = Math.floor(index / 3);
  const col = index % 3;
  const leftPos = 62 + (col * 527); // Starting at 62px, then spacing by 527px
  const topPos = 789 + (row * 719); // Starting at 789px, then spacing by 719px

  return (
    <div className="absolute" style={{ left: `${leftPos}px`, top: `${topPos}px` }}>
      {/* Card Background */}
      <div 
        className="h-[663px] w-[462px] rounded-[10px] border border-black"
      />
      
      {/* Image */}
      {imageUrl && (
        <div 
          className="absolute bg-center bg-cover bg-no-repeat h-[347px] w-[277px] rounded-[15px] overflow-hidden" 
          style={{ 
            left: '92px', 
            top: '107px',
            backgroundImage: `url('${imageUrl}')`
          }}
        />
      )}
      
      {/* Title */}
      <div 
        className="absolute font-serif text-[37.5px] text-black text-center"
        style={{ left: '231px', top: '36px', transform: 'translateX(-50%)' }}
      >
        <p className="leading-normal whitespace-nowrap">{post.title}</p>
      </div>
      
      {/* Description and Details */}
      <div 
        className="absolute font-sans text-[25px] text-black max-w-[400px]"
        style={{ left: '37px', top: '489px' }}
      >
        <p className="mb-2 line-clamp-3 leading-normal">{post.description}</p>
        <div className="mt-2 text-[20px] text-gray-600">
          <p>By: {post.creator.first_name} {post.creator.last_name}</p>
          <p>❤️ {post.likes} likes</p>
          {post.tags.length > 0 && (
            <p>Tags: {post.tags.join(', ')}</p>
          )}
        </div>
      </div>
      
      {/* View Post Button */}
      <div 
        className="absolute bg-black h-[51px] w-[186px] rounded-[10px] flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors"
        style={{ left: '37px', top: '571px' }}
      >
        <span className="font-sans text-[25px] text-white">View Post</span>
      </div>
    </div>
  );
}

export default function App() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    const query = searchQuery.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query)) ||
      `${post.creator.first_name} ${post.creator.last_name}`.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://thecodeworks.in/kalarasa/retrieve_all_posts");
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Calculate minimum height based on filtered posts
  const totalRows = Math.ceil(filteredPosts.length / 3);
  const minHeight = 789 + (totalRows * 719) + 663; // Start position + (rows * spacing) + card height

  return (
    <>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <div className="bg-white relative w-full" style={{ minHeight: `${Math.max(minHeight, 1500)}px` }}>
      {/* Header */}
      <div className="absolute left-[25px] top-[31px] flex items-center">
        {/* Logo SVG */}
        <div className="w-[75px] h-[64px] mr-4">
            <img src="/left.svg" alt="Kalarasa Logo" className="block size-full" />
        </div>
        
        {/* Kalarasa Text */}
        <div className="font-sans text-[33.75px] text-black">
          <p className="leading-normal">Kalarasa</p>
        </div>
      </div>

      {/* Create Button */}
      <div className="absolute right-[73px] top-[42px]">
        <button 
          onClick={() => router.push('/post')}
          className="h-[42px] w-[120px] rounded-[25px] border-[2px] border-black flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <span className="font-sans text-[25px] text-black">+ Create</span>
        </button>
      </div>

      {/* Profile Icon */}
      <div className="absolute right-[25px] top-[45px]">
        <div className="w-[42.5px] h-[42.5px]">
          <a href="/profile" className="block w-[42.5px] h-[42.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 43">
            <g>
              <circle cx="21.25" cy="21.25" r="20.5" stroke="#B50000" strokeWidth="1.5" />
              <circle cx="21.25" cy="13.25" r="5.75" stroke="#B50000" />
              <path d="M12.6801 23.2186L30.7224 22.0507L22.6028 36.5616L12.6801 23.2186Z" stroke="#B50000" />
            </g>
          </svg>
          </a>
        </div>
      </div>
      
      {/* Green Background Section */}
      <div 
        className="absolute left-0 top-[133px] w-full h-[371px] overflow-hidden" 
        style={{ backgroundColor: '#A2FF9C' }}
        >
        <div className="relative w-full h-full">
            {/* Left Text */}
            <div className="absolute left-[50px] top-1/2 transform -translate-y-1/2 max-w-[500px] z-10">
            <h2 className="font-['Instrument_Serif'] text-5xl leading-tight text-black">
                Discover art from community<br />
                artists all over India.
            </h2>
            </div>

            {/* Right SVG */}
            <div className="absolute right-[20px] top-1/2 transform -translate-y-[30%] z-0">
            <img 
                src="/right.svg" 
                alt="Decoration" 
                className="h-[900px] w-auto"
                onLoad={() => console.log('Image loaded successfully')}
                onError={(e) => console.error('Image failed to load:', e)}
            />
            </div>
        </div>
        </div>

        {/* Navigation */}
        <div className="absolute top-[529px] left-1/2 transform -translate-x-1/2 flex items-center space-x-8">
        <div className="font-sans text-[25px] text-black relative">
            <p className="leading-normal">Discover</p>
            <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-[#B50000]" />
        </div>
        <div className="font-sans text-[25px] text-black">
            <p className="leading-normal">Explore</p>
        </div>
        </div>

      
      {/* Search Bar */}
      <div className="absolute top-[605px] left-1/2 transform -translate-x-1/2 w-[839px] h-[50px] rounded-[25px] border border-black flex items-center px-4">
        <div className="w-[27px] h-[27px] mr-4">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
            <path d="M22.05 23.625L14.9625 16.5375C14.4 16.9875 13.7531 17.3437 13.0219 17.6062C12.2906 17.8687 11.5125 18 10.6875 18C8.64375 18 6.91425 17.292 5.499 15.876C4.08375 14.46 3.37575 12.7305 3.375 10.6875C3.37425 8.6445 4.08225 6.915 5.499 5.499C6.91575 4.083 8.64525 3.375 10.6875 3.375C12.7298 3.375 14.4596 4.083 15.8771 5.499C17.2946 6.915 18.0023 8.6445 18 10.6875C18 11.5125 17.8688 12.2906 17.6063 13.0219C17.3438 13.7531 16.9875 14.4 16.5375 14.9625L23.625 22.05L22.05 23.625ZM10.6875 15.75C12.0938 15.75 13.2893 15.258 14.274 14.274C15.2588 13.29 15.7508 12.0945 15.75 10.6875C15.7493 9.2805 15.2573 8.08538 14.274 7.10213C13.2908 6.11888 12.0953 5.6265 10.6875 5.625C9.27975 5.6235 8.08463 6.11588 7.10213 7.10213C6.11963 8.08838 5.62725 9.2835 5.625 10.6875C5.62275 12.0915 6.11513 13.287 7.10213 14.274C8.08913 15.261 9.28425 15.753 10.6875 15.75Z" fill="black" />
          </svg>
        </div>
        <input 
          type="text" 
          placeholder="Search for art..." 
          className="flex-1 outline-none text-lg bg-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Community Art Section Title */}
      <div className="absolute left-[184px] top-[711px] transform -translate-x-1/2">
        <p className="font-sans text-[37.5px] text-black leading-normal">Community Art</p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute left-1/2 top-[900px] transform -translate-x-1/2 text-center">
          <p className="text-[25px] font-sans">Loading posts...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute left-1/2 top-[900px] transform -translate-x-1/2 text-center">
          <p className="text-[25px] font-sans text-red-600">Error: {error}</p>
        </div>
      )}

      {/* No Posts State */}
      {!isLoading && !error && filteredPosts.length === 0 && (
        <div className="absolute left-1/2 top-[900px] transform -translate-x-1/2 text-center">
          <p className="text-[25px] font-sans">No posts found.</p>
        </div>
      )}

      {/* Posts Grid */}
      {!isLoading && !error && filteredPosts.map((post, index) => (
        <PostCard key={post._id} post={post} index={index} />
      ))}
    </div>
    </>
  );
}