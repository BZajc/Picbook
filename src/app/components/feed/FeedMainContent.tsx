import ActivityPanel from "./ActivityPanel";
import FeedHeader from "./FeedHeader";
import FeedPost from "./feedpost/FeedPost";
import { getPosts } from "@/app/api/actions/getPosts";

export default async function FeedMainContent() {
  const posts= await getPosts()

  return (
    <div className="flex-1 overflow-hidden max-w-[900px] mx-auto">

      {/* Search input etc */}
      <FeedHeader />

      {/* Side panel to display notifications */}
      <ActivityPanel />

      {/* Display list of posts */}
      {posts.map((post) => (
      <FeedPost key={post.id} post={post}/>

      ))}
    </div>
  );
}
