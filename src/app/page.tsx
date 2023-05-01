import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";

const fetchBlogs = async () => {
  const response = await fetch(
    `https://cdn.contentful.com/spaces/${process.env.MY_SPACE_ID}/environments/master/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=blog2`,
    { cache: "no-store" }
  );
  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    return error;
  }
};

export default async function Home() {
  const blogs = await fetchBlogs();
  if (!Array.isArray(blogs.items)) return 'undefined'

  return (
    <main className="pt-28  flex flex-wrap justify-center  min-h-screen  gap-4 sm:gap-6 mx-auto bg-[#ecf0f1]  p-2 sm:px-3 sm:pt-24 ">
      {blogs.items.map((blog: any) => {
        let blogImage = blogs.includes.Asset.find(
          (obj: { sys: { id: any } }) =>
            obj.sys.id === blog.fields.image?.sys?.id
        );
        let blogImageUrl = blogImage?.fields.file.url;
        // Right now there is only one object,don't need to find it will be needed in future.
        
        let authorObj = blogs.includes.Entry.find(
          (obj: { sys: { id: any } }) => obj.sys.id === blog.fields.author.sys.id
          );
        
        let authorImageUrl = blogs.includes.Asset.find(
          (obj: { sys: { id: any } }) =>
            obj.sys.id === authorObj?.fields.profileImage.sys.id
        )?.fields.file.url;
        
        const dateCreated: string = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }).format(new Date(blog.fields.publishedDate));

        return (
          <div
            key={blog.sys.id}
            className="shadow-2xl  flex flex-col  text-lg w-full sm:w-72 mb-9 pb-2  rounded-2xl  bg-white"
          >
            <Image
              src={`https:${blogImageUrl}`}
              width="400"
              height="400"
              alt={blogImage?.fields.description}
              className="object-cover rounded-t-2xl w-full sm:w-400"
            />

            <div className="px-4 ">
              <h2 className=" text-black font-extrabold  pt-5">
                {blog.fields.title}
              </h2>
              <p className="text-base pt-2">
                {blog.fields.summary?.split(" ").slice(0, 20).join(" ")}......
              </p>
            </div>

            <div className="flex justify-between items-center px-4 h-full ">
              <div className="pt-2 ">
                <Image
                  src={`https:${authorImageUrl}`}
                  alt={authorObj?.fields?.description}
                  width="50"
                  height="50"
                  className="rounded-full"
                />
              </div>
              <div className="text-sm">
                <p>{authorObj.fields.name}</p>
                <p className="text-[#6E8098]">{dateCreated}</p>
              </div>
              <div className="rounded-full bg-[#F3F4F6] h-8 w-8 flex items-center justify-center">
                <Link href={blog.fields.slug}>
                  <FiExternalLink size={24} color="#6E8098" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
}
