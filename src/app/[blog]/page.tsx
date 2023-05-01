import React from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const fetchBlogs = async () => {
  const response = await fetch(
    `https://cdn.contentful.com/spaces/${process.env.MY_SPACE_ID}/environments/master/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=blog2`,
    
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

const getSlugList = async () => {
  const blogs = await fetchBlogs();

  const slugList: string[] = blogs.items.map(
    (blog: { fields: { slug: string } }) => blog.fields.slug
  );
  return slugList;
};

export async function generateStaticParams() {
  const slugs = await getSlugList();
  // console.log('slugs',slugs)
  return slugs.map((blogSlug) => ({
    blog: blogSlug,
  }));
}

const Blogs = async ({ params }: { params: { blog: string } }) => {
  const blogs = await fetchBlogs();

  const availableBlog = blogs.items.find(
    (obj: { fields: { slug: string } }) => obj.fields.slug === params.blog
  );
  const blogImageUrl = blogs.includes.Asset.find(
    (obj: { sys: { id: any } }) =>
      obj.sys.id === availableBlog?.fields.image?.sys?.id
  )?.fields.file.url;

  const authorObj = blogs.includes.Entry.find(
    (obj: { sys: { id: any } }) =>
      obj.sys.id === availableBlog?.fields.author.sys.id
  );

  const authorImageUrl = blogs.includes.Asset.find(
    (obj: { sys: { id: any } }) =>
      obj.sys.id === authorObj?.fields.profileImage.sys.id
  )?.fields.file.url;

  const dateCreated: string = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(availableBlog?.fields.publishedDate));

  return (
    <div className="lg:w-11/12 p-8 lg:p-24 flex-col pt-24  font-extrabold sm:justify-start ">
      {/* Blog Title & Author Details */}
      <div className="mt-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl">
          {availableBlog.fields.title}
        </h1>
        <div className="flex lg:w-1/3 gap-4 items-center h-full ">
          <div className="pt-2 ">
            <Image
              src={`https:${authorImageUrl}`}
              alt={authorObj?.fields?.description}
              width="80"
              height="80"
              className="rounded-full"
              priority
            />
          </div>
          <div className="text-sm pt-2">
            <p>{authorObj.fields.name}</p>
            <p className="text-[#6E8098]">{dateCreated}</p>
          </div>
        </div>
      </div>

      {/* Blog Image & Body */}
      <div className="w-11/12  mt-4 ">
        <div className="sm:h-[700px]">
          <Image
            src={`https:${blogImageUrl}`}
            width="0"
            height="0"
            sizes="100vw"
            className="object-cover object-center  w-full h-full "
            alt="blogImage"
          />
        </div>
        <div className="text-black font-normal sm:font-semibold mt-4">
          <p>{documentToReactComponents(availableBlog.fields.body)}</p>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
