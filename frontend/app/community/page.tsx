"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type CommunityPost = {
  id: number;
  user: string;
  initials: string;
  title: string;
  content: string;
  location: string;
  category: string;
  likes: number;
  comments: number;
  time: string;
};

const initialPosts: CommunityPost[] = [
  {
    id: 1,
    user: "Aditya",
    initials: "A",
    title: "A perfect weekend in Manali",
    content:
      "Just completed an amazing weekend trip to Manali. The mountains, local food and sunrise views were absolutely incredible.",
    location: "Manali, India",
    category: "Adventure",
    likes: 42,
    comments: 8,
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "Priyanshu",
    initials: "P",
    title: "Best places to visit in Dubai",
    content:
      "If you're planning a Dubai trip, don't miss the desert safari. The sunset experience was one of the best parts of my journey.",
    location: "Dubai, UAE",
    category: "Travel",
    likes: 67,
    comments: 14,
    time: "5 hours ago",
  },
  {
    id: 3,
    user: "Riya",
    initials: "R",
    title: "My first paragliding experience",
    content:
      "Finally tried paragliding! It was scary for the first few seconds, but the view from above was completely worth it.",
    location: "Bir Billing, India",
    category: "Adventure",
    likes: 91,
    comments: 21,
    time: "Yesterday",
  },
  {
    id: 4,
    user: "Rahul",
    initials: "R",
    title: "Budget travel tips for Goa",
    content:
      "You don't need to spend a fortune in Goa. Here are some things I learned while travelling on a student budget.",
    location: "Goa, India",
    category: "Budget",
    likes: 54,
    comments: 17,
    time: "Yesterday",
  },
  {
    id: 5,
    user: "Sneha",
    initials: "S",
    title: "Hidden cafes in Kyoto",
    content:
      "Found some beautiful little cafes away from the tourist areas. Sharing a few recommendations for anyone visiting Kyoto.",
    location: "Kyoto, Japan",
    category: "Food",
    likes: 76,
    comments: 12,
    time: "2 days ago",
  },
  {
    id: 6,
    user: "Karan",
    initials: "K",
    title: "A two-day itinerary for Jaipur",
    content:
      "Sharing my complete two-day Jaipur itinerary. It includes forts, local markets, food spots and some less crowded places.",
    location: "Jaipur, India",
    category: "Itinerary",
    likes: 38,
    comments: 9,
    time: "3 days ago",
  },
];

export default function CommunityPage() {
  const router = useRouter();

  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");

  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const [showCreatePost, setShowCreatePost] = useState(false);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    location: "",
    category: "Travel",
  });

  /*
   * FILTER + SEARCH + SORT
   */

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.location.toLowerCase().includes(query) ||
          post.user.toLowerCase().includes(query)
      );
    }

    if (filter !== "All") {
      result = result.filter((post) => post.category === filter);
    }

    if (sort === "Popular") {
      result.sort((a, b) => b.likes - a.likes);
    }

    if (sort === "Comments") {
      result.sort((a, b) => b.comments - a.comments);
    }

    return result;
  }, [posts, search, filter, sort]);

  /*
   * LIKE POST
   */

  function toggleLike(postId: number) {
    const alreadyLiked = likedPosts.includes(postId);

    setLikedPosts((current) =>
      alreadyLiked
        ? current.filter((id) => id !== postId)
        : [...current, postId]
    );

    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) {
          return post;
        }

        return {
          ...post,
          likes: alreadyLiked ? post.likes - 1 : post.likes + 1,
        };
      })
    );
  }

  /*
   * CREATE POST
   */

  function createPost() {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      return;
    }

    const post: CommunityPost = {
      id: Date.now(),
      user: "Aditya",
      initials: "A",
      title: newPost.title,
      content: newPost.content,
      location: newPost.location || "Travel",
      category: newPost.category,
      likes: 0,
      comments: 0,
      time: "Just now",
    };

    setPosts((current) => [post, ...current]);

    setNewPost({
      title: "",
      content: "",
      location: "",
      category: "Travel",
    });

    setShowCreatePost(false);
  }

  return (
    <main className="min-h-screen bg-[#f5f8fb] text-[#142033]">
      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-[#dce6ee] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 md:px-8">
          {/* LOGO */}

          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#08a8df] text-xl font-bold text-white">
              ◈
            </div>

            <span className="text-xl font-extrabold tracking-tight">
              Globe<span className="text-[#08a8df]">Trotter</span>
            </span>
          </button>

          {/* NAVIGATION */}

          <nav className="hidden items-center gap-1 lg:flex">
            <button
              onClick={() => router.push("/explore")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#66798b] hover:bg-[#eefaff] hover:text-[#08a8df]"
            >
              Explore
            </button>

            <button
              onClick={() => router.push("/destinations")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#66798b] hover:bg-[#eefaff] hover:text-[#08a8df]"
            >
              Destinations
            </button>

            <button
              onClick={() => router.push("/experiences")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#66798b] hover:bg-[#eefaff] hover:text-[#08a8df]"
            >
              Experiences
            </button>

            <button
              onClick={() => router.push("/inspiration")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#66798b] hover:bg-[#eefaff] hover:text-[#08a8df]"
            >
              Inspiration
            </button>

            <button
              className="rounded-full bg-[#eaf9fe] px-4 py-2 text-sm font-bold text-[#08a8df]"
            >
              Community
            </button>
          </nav>

          <button
            onClick={() => router.push("/profile")}
            className="rounded-full border border-[#dce6ee] bg-white px-5 py-2.5 text-sm font-bold shadow-sm hover:border-[#08a8df] hover:text-[#08a8df]"
          >
            My account
          </button>
        </div>
      </header>

      {/* ===================================================== */}
      {/* MAIN */}
      {/* ===================================================== */}

      <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-8 md:py-12">
        {/* PAGE TITLE */}

        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#08a8df]">
            GlobeTrotter community
          </p>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
                Community
              </h1>

              <p className="mt-2 max-w-2xl text-[#718497]">
                Share your travel experiences, discover recommendations and
                learn from fellow travellers.
              </p>
            </div>

            <button
              onClick={() => setShowCreatePost(true)}
              className="rounded-xl bg-[#08a8df] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(8,168,223,0.2)] transition hover:-translate-y-0.5 hover:bg-[#0798ca]"
            >
              + Share your experience
            </button>
          </div>
        </div>

        {/* ===================================================== */}
        {/* TWO COLUMN LAYOUT */}
        {/* ===================================================== */}

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_370px]">
          {/* ================================================= */}
          {/* LEFT COMMUNITY FEED */}
          {/* ================================================= */}

          <section>
            {/* SEARCH / FILTER */}

            <div className="mb-6 rounded-2xl border border-[#dce6ee] bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-3">
                {/* SEARCH */}

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-[#91a3b4]">
                    ⌕
                  </span>

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search community posts..."
                    className="h-12 w-full rounded-xl border border-[#dce6ee] bg-[#f8fafc] pl-11 pr-4 text-sm outline-none transition focus:border-[#08a8df] focus:ring-4 focus:ring-[#08a8df]/10"
                  />
                </div>

                {/* FILTERS */}

                <div className="flex flex-wrap gap-2">
                  {[
                    "All",
                    "Travel",
                    "Adventure",
                    "Budget",
                    "Food",
                    "Itinerary",
                  ].map((category) => (
                    <button
                      key={category}
                      onClick={() => setFilter(category)}
                      className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                        filter === category
                          ? "bg-[#08a8df] text-white"
                          : "border border-[#dce6ee] bg-white text-[#64788a] hover:border-[#08a8df] hover:text-[#08a8df]"
                      }`}
                    >
                      {category}
                    </button>
                  ))}

                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="ml-auto rounded-xl border border-[#dce6ee] bg-white px-4 py-2.5 text-sm font-bold text-[#64788a] outline-none"
                  >
                    <option>Newest</option>
                    <option>Popular</option>
                    <option>Comments</option>
                  </select>
                </div>
              </div>
            </div>

            {/* RESULTS */}

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-extrabold">
                Community posts
              </h2>

              <span className="text-sm font-semibold text-[#8293a3]">
                {filteredPosts.length} posts
              </span>
            </div>

            {/* POST LIST */}

            <div className="space-y-5">
              {filteredPosts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#cbd9e3] bg-white p-12 text-center">
                  <div className="text-4xl">⌕</div>

                  <h3 className="mt-4 text-lg font-extrabold">
                    No posts found
                  </h3>

                  <p className="mt-1 text-sm text-[#788b9d]">
                    Try changing your search or filter.
                  </p>
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const liked = likedPosts.includes(post.id);

                  return (
                    <article
                      key={post.id}
                      className="rounded-2xl border border-[#dce6ee] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg md:p-6"
                    >
                      {/* USER */}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eaf9fe] font-extrabold text-[#08a8df]">
                            {post.initials}
                          </div>

                          <div>
                            <p className="text-sm font-extrabold">
                              {post.user}
                            </p>

                            <p className="text-xs text-[#8798a8]">
                              {post.time}
                            </p>
                          </div>
                        </div>

                        <button className="text-xl text-[#899aaa]">
                          ⋯
                        </button>
                      </div>

                      {/* POST CONTENT */}

                      <div className="mt-5">
                        <h3 className="text-xl font-extrabold tracking-tight">
                          {post.title}
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-[#667a8d]">
                          {post.content}
                        </p>
                      </div>

                      {/* TAGS */}

                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#eefaff] px-3 py-1.5 text-xs font-bold text-[#078fbd]">
                          📍 {post.location}
                        </span>

                        <span className="rounded-full bg-[#f2f5f8] px-3 py-1.5 text-xs font-bold text-[#6c7f90]">
                          {post.category}
                        </span>
                      </div>

                      {/* ACTIONS */}

                      <div className="mt-5 flex items-center gap-6 border-t border-[#edf1f4] pt-4">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-2 text-sm font-bold transition ${
                            liked
                              ? "text-[#08a8df]"
                              : "text-[#788b9c] hover:text-[#08a8df]"
                          }`}
                        >
                          <span className="text-lg">
                            {liked ? "♥" : "♡"}
                          </span>

                          {post.likes}
                        </button>

                        <button className="flex items-center gap-2 text-sm font-bold text-[#788b9c] hover:text-[#08a8df]">
                          <span className="text-lg">○</span>

                          {post.comments}
                        </button>

                        <button className="ml-auto text-sm font-bold text-[#788b9c] hover:text-[#08a8df]">
                          Share
                        </button>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </section>

          {/* ================================================= */}
          {/* RIGHT INFORMATION PANEL */}
          {/* ================================================= */}

          <aside className="space-y-5">
            {/* COMMUNITY INFO */}

            <div className="rounded-3xl border border-[#dce6ee] bg-white p-7 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf9fe] text-2xl">
                🌍
              </div>

              <h2 className="text-2xl font-extrabold">
                Welcome to the community
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#718497]">
                This is a place where GlobeTrotter travellers can share their
                experiences about trips, destinations, activities and travel
                tips.
              </p>

              <p className="mt-3 text-sm leading-7 text-[#718497]">
                Use the search, group, filter and sort options to find exactly
                what you're looking for.
              </p>
            </div>

            {/* COMMUNITY STATS */}

            <div className="rounded-3xl border border-[#dce6ee] bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold">
                Community activity
              </h3>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#f5f9fc] p-4">
                  <p className="text-2xl font-extrabold">2.4K</p>
                  <p className="mt-1 text-xs font-semibold text-[#8293a3]">
                    Travellers
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f5f9fc] p-4">
                  <p className="text-2xl font-extrabold">8.7K</p>
                  <p className="mt-1 text-xs font-semibold text-[#8293a3]">
                    Experiences
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f5f9fc] p-4">
                  <p className="text-2xl font-extrabold">430</p>
                  <p className="mt-1 text-xs font-semibold text-[#8293a3]">
                    Destinations
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f5f9fc] p-4">
                  <p className="text-2xl font-extrabold">12K+</p>
                  <p className="mt-1 text-xs font-semibold text-[#8293a3]">
                    Comments
                  </p>
                </div>
              </div>
            </div>

            {/* POPULAR TOPICS */}

            <div className="rounded-3xl border border-[#dce6ee] bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold">
                Popular topics
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Budget Travel",
                  "Adventure",
                  "Solo Travel",
                  "Food",
                  "Weekend Trips",
                  "Itineraries",
                  "Hidden Gems",
                  "Photography",
                ].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setSearch(topic)}
                    className="rounded-full border border-[#dce6ee] px-3 py-2 text-xs font-bold text-[#718497] transition hover:border-[#08a8df] hover:bg-[#eefaff] hover:text-[#08a8df]"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* COMMUNITY RULES */}

            <div className="rounded-3xl bg-[#142033] p-6 text-white shadow-sm">
              <h3 className="text-lg font-extrabold">
                Be a great traveller
              </h3>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#c3ced8]">
                <li>✓ Share useful experiences</li>
                <li>✓ Respect other travellers</li>
                <li>✓ Keep recommendations genuine</li>
                <li>✓ Help others plan better trips</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* ===================================================== */}
      {/* CREATE POST MODAL */}
      {/* ===================================================== */}

      {showCreatePost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07111dcc] p-5 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl">
            {/* MODAL HEADER */}

            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-extrabold">
                  Share your experience
                </h2>

                <p className="mt-1 text-sm text-[#718497]">
                  Tell the community about your latest adventure.
                </p>
              </div>

              <button
                onClick={() => setShowCreatePost(false)}
                className="text-2xl text-[#788b9c]"
              >
                ×
              </button>
            </div>

            {/* TITLE */}

            <label className="mt-7 block text-sm font-bold">
              Title
            </label>

            <input
              value={newPost.title}
              onChange={(e) =>
                setNewPost({
                  ...newPost,
                  title: e.target.value,
                })
              }
              placeholder="Give your experience a title..."
              className="mt-2 h-12 w-full rounded-xl border border-[#dce6ee] px-4 text-sm outline-none focus:border-[#08a8df]"
            />

            {/* CONTENT */}

            <label className="mt-5 block text-sm font-bold">
              Your experience
            </label>

            <textarea
              value={newPost.content}
              onChange={(e) =>
                setNewPost({
                  ...newPost,
                  content: e.target.value,
                })
              }
              rows={5}
              placeholder="Tell other travellers about your trip..."
              className="mt-2 w-full resize-none rounded-xl border border-[#dce6ee] p-4 text-sm outline-none focus:border-[#08a8df]"
            />

            {/* LOCATION */}

            <label className="mt-5 block text-sm font-bold">
              Location
            </label>

            <input
              value={newPost.location}
              onChange={(e) =>
                setNewPost({
                  ...newPost,
                  location: e.target.value,
                })
              }
              placeholder="e.g. Goa, India"
              className="mt-2 h-12 w-full rounded-xl border border-[#dce6ee] px-4 text-sm outline-none focus:border-[#08a8df]"
            />

            {/* CATEGORY */}

            <label className="mt-5 block text-sm font-bold">
              Category
            </label>

            <select
              value={newPost.category}
              onChange={(e) =>
                setNewPost({
                  ...newPost,
                  category: e.target.value,
                })
              }
              className="mt-2 h-12 w-full rounded-xl border border-[#dce6ee] px-4 text-sm outline-none"
            >
              <option>Travel</option>
              <option>Adventure</option>
              <option>Budget</option>
              <option>Food</option>
              <option>Itinerary</option>
            </select>

            {/* SUBMIT */}

            <button
              onClick={createPost}
              className="mt-7 w-full rounded-xl bg-[#08a8df] py-3.5 text-sm font-extrabold text-white transition hover:bg-[#0798ca]"
            >
              Publish experience
            </button>
          </div>
        </div>
      )}
    </main>
  );
}