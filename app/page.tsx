import Link from "next/link"

async function fetchBlogs(){
  const res = await fetch("http://localhost:3000/api/blog" , {
    next:{
      revalidate: 10,
    }
  })

  const data = await res.json()
  return data.posts
}



export default async function Home() {

  const posts = await fetchBlogs()
  console.log(posts)

  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-4 rounded-lg bg-slate-800 drop-shadow-xl">
            <h1 className="text-slate-200 text-center text-2xl font-extrabold animate-bounce ">
              Your own Blog application😀
            </h1>
      </div>
      {/* LINK */}
      <div className="flex my-5">
        <Link 
         href={"/blog/add"}
         className="sm:w-2/6 md:1/6 text-white text-center text-xl font-semibold bg-gray-600 rounded-md p-4 m-auto  hover:bg-blue-600 duration-300"
         >
        Add New Blog ✨
        </Link>
      </div>
      
        {/* BLOG */}

      <div className="w-full flex flex-col items-center justify-center">
        {posts?.map((post:any)=>(
                 
                 <div key={post.id} className="w-3/4 flex flex-col  bg-slate-200 justify-center p-4 rounded-md m-auto my-2">
                 {/* Title and action */}
                 <div className="flex items-center my-3">
                   <div className="mr-auto">
                     <h2 className="mr-auto font-semibold text-black">
                       {post.title}
                     </h2>
                   </div>
   
                   <Link
                      href={`/blog/edit/${post.id}`}
                     className="px-4 py-1  text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200"
                     >
                       Edit
                     </Link>
   
                 </div>
                 {/* Date and description */}
                 <div className="mr-auto my-1">
                 <blockquote className="font-bold text-slate-700">
                 {new Date(post.date).toDateString()}
                 </blockquote>
               </div>
               <div className=" mr-auto my-1">
                 <h2>{post.description}</h2>
               </div>
   
               </div>
        ))

        }
          
        

      </div>
    </main>
    
  )
}
