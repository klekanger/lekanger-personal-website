export function BlogListingPage({ items, page }) {
  return (
    <>
      <div className="p-4 w-full border-2 border-foreground my-8 uppercase font-heading">
        <div className="h-8 w-full mb-8 p-1 mt-2 border-2 border-foreground">
          <div className="h-full fill-pattern"></div>
        </div>
        <p className="uppercase">Directory listing – drive 8</p>
        <h1 className="text-2xl text-white py-2">Bloggen - side {page}</h1>
      </div>
      <ul>
        {items.map((item) => {
          const blogUrl = item.isExternalBlog
            ? item?.externalBlogUrl || "#"
            : `/blog-page/${item?.slug?.current}` || "#";

          return (
            <li key={item._id}>
              <a href={blogUrl}>{item.title}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
