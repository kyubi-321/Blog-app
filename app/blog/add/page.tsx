"use client";

import { Fragment , useRef } from "react"
import { Toaster , toast } from "react-hot-toast"
import { useRouter } from "next/navigation";

// The useRef Hook allows you to persist values between renders. It can be used to store a mutable value that does not cause a re-render when updated. It can be used to access a DOM element directly.
type props={
  title:string;
  description:string;
}

const postBlog =async({title,description}: props)=>{
  const res = fetch(`${process.env.BASE_URL}/api/blog`, {
    method: "POST",
    body: JSON.stringify({ title, description }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();

}

const AddBlog = () => {
   const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const handleSubmit=async(e:any)=>{
    e.preventDefault();
    if(titleRef.current && descriptionRef.current){
      toast.loading("sending the request...🐱‍🏍" , {id:"1"})
      await postBlog({title:titleRef.current?.value , description:descriptionRef.current?.value})

      toast.success("Blog added successfully" , {id:"1"})
      router.push("/");
    }

  }
  return (
    <Fragment>
        <Toaster/>
        <div className="w-2/3 mx-auto p-4 my-2  text-white   justify-center rounded-md ">
            <div className=" flex justify-center items-center font-bold text-2xl">
                <p>Add a beautiful blog🔰</p>
                

            </div>

            <form onSubmit={handleSubmit}>
                    <input
                    ref={titleRef}
                    placeholder="Type title here"
                    type="text"
                    className="w-full p-4 m-2 text-black rounded-md focus:border-teal-500"
                    />
                    <textarea
                    ref={descriptionRef}
                    placeholder="Type description here"
                    className="w-full p-4 m-2 text-black rounded-md focus:border-teal-500"
                    >

                    </textarea>

                    <button className="font-semibold m-auto ml-2 px-4 py-2 shadow-xl  bg-slate-400 hover:bg-blue-600 rounded-md ">Submit</button>
                </form>
        </div>
    </Fragment>
  )
}

export default AddBlog