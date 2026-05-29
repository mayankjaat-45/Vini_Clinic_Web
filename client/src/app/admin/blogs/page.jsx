"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/lib/api";
import {
  ArrowLeft,
  Edit,
  FileText,
  ImagePlus,
  Loader2,
  Plus,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

const initialForm = {
  title: "",
  slug: "",
  category: "General",
  language: "English",
  author: "Dr. Vini Jhariya",
  seoTitle: "",
  metaTitle: "",
  pageTitle: "",
  metaDescription: "",
  focusKeyword: "",
  secondaryKeywords: "",
  schemaType: "",
  excerpt: "",
  content: "",
  faqSchema: "",
  tags: "",
  isFeatured: false,
  isPublished: true,
  publishedAt: "",
};

const categories = [
  "Autism",
  "ADHD",
  "Dyslexia",
  "Parenting",
  "Teen Mental Health",
  "Child Behaviour",
  "School & Exams",
  "Adult Mental Health",
  "General",
];

const languages = ["English", "Hindi", "Hinglish"];

export default function AdminBlogsPage() {
  const router = useRouter();

  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/api/blogs/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(data?.data || []);
    } catch (error) {
      console.log("BLOG FETCH ERROR:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
      } else {
        toast.error("Unable to fetch blogs");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const text = `
  ${blog.title || ""}
  ${blog.category || ""}
  ${blog.language || ""}
  ${blog.slug || ""}
  ${blog.focusKeyword || ""}
  ${Array.isArray(blog.secondaryKeywords) ? blog.secondaryKeywords.join(" ") : ""}
  ${Array.isArray(blog.tags) ? blog.tags.join(" ") : ""}
`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [blogs, search]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setImage(null);
    setEditingBlog(null);
    setShowForm(false);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);

    setFormData({
      title: blog.title || "",
      category: blog.category || "General",
      language: blog.language || "English",
      author: blog.author || "Dr. Vini Jhariya",
      slug: blog.slug || "",
      seoTitle: blog.seoTitle || "",
      metaTitle: blog.metaTitle || "",
      focusKeyword: blog.focusKeyword || "",
      secondaryKeywords: Array.isArray(blog.secondaryKeywords)
        ? blog.secondaryKeywords.join(", ")
        : "",
      schemaType: blog.schemaType || "",
      faqSchema: blog.faqSchema ? JSON.stringify(blog.faqSchema, null, 2) : "",
      pageTitle: blog.pageTitle || "",
      metaDescription: blog.metaDescription || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
      isFeatured: Boolean(blog.isFeatured),
      isPublished: Boolean(blog.isPublished),
      publishedAt: blog.publishedAt
        ? new Date(blog.publishedAt).toISOString().slice(0, 10)
        : "",
    });

    setImage(null);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) return "Blog title is required";
    if (!formData.excerpt.trim()) return "Blog excerpt is required";
    if (!formData.content.trim()) return "Blog content is required";

    if (formData.faqSchema.trim()) {
      try {
        JSON.parse(formData.faqSchema);
      } catch {
        return "FAQ Schema must be valid JSON";
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setSaving(true);

      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      if (image) {
        payload.append("image", image);
      }

      if (editingBlog) {
        await API.put(`/api/blogs/${editingBlog._id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Blog updated successfully");
      } else {
        await API.post("/api/blogs", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Blog created successfully");
      }

      resetForm();
      fetchBlogs();
    } catch (error) {
      console.log("SAVE BLOG ERROR:", error);
      toast.error(error.response?.data?.message || "Unable to save blog");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/api/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.log("DELETE BLOG ERROR:", error);
      toast.error(error.response?.data?.message || "Unable to delete blog");
    }
  };

  return (
    <main className="min-h-screen bg-[#F7FBFC] px-5 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <button
              onClick={() => router.push("/admin")}
              className="mb-5 inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E]"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
              <FileText size={16} className="text-[#2CB1A6]" />
              Blog Manager
            </div>

            <h1 className="text-4xl font-black text-[#102A43] md:text-5xl">
              Manage Blogs
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              Create, update, publish/unpublish and delete blog articles.
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15"
          >
            <Plus size={18} />
            Add New Blog
          </button>
        </div>

        {showForm && (
          <section className="mb-10 rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black text-[#102A43]">
                {editingBlog ? "Edit Blog" : "Add Blog"}
              </h2>

              <button
                onClick={resetForm}
                className="rounded-full bg-slate-100 p-3 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="Blog Title *"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Example: Signs of Autism in Toddlers"
                />

                <Input
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <Select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  options={categories}
                />

                <Select
                  label="Language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  options={languages}
                />

                <Input
                  label="Published Date"
                  name="publishedAt"
                  type="date"
                  value={formData.publishedAt}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Input
                    label="URL Slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="what-to-do-after-autism-diagnosis-autism-therapy-india"
                  />

                  <p className="mt-1 text-xs font-semibold text-slate-400">
                    Leave empty to auto-generate from title. Do not add / at the
                    start.
                  </p>
                </div>

                <Input
                  label="Schema Type"
                  name="schemaType"
                  value={formData.schemaType}
                  onChange={handleChange}
                  placeholder="MedicalWebPage + FAQPage"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="SEO Title"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  placeholder="My Child Was Diagnosed With Autism Last Week..."
                />

                <Input
                  label="Meta Title"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  placeholder="After Autism Diagnosis: What Indian Parents Should Do First"
                />
              </div>

              <Input
                label="Focus Keyword"
                name="focusKeyword"
                value={formData.focusKeyword}
                onChange={handleChange}
                placeholder="what to do after autism diagnosis India"
              />

              <Input
                label="Secondary Keywords"
                name="secondaryKeywords"
                value={formData.secondaryKeywords}
                onChange={handleChange}
                placeholder="autism therapy India, autism intervention India, early intervention autism India"
              />

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="Page Title"
                  name="pageTitle"
                  value={formData.pageTitle}
                  onChange={handleChange}
                  placeholder="Page/browser title"
                />

                <Input
                  label="Meta Description"
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  placeholder="Meta description"
                />
              </div>

              <Textarea
                label="Excerpt *"
                name="excerpt"
                rows={3}
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Short blog summary..."
              />

              <Textarea
                label="Content *"
                name="content"
                rows={12}
                value={formData.content}
                onChange={handleChange}
                placeholder="Write full blog content here..."
              />

              <Textarea
                label="FAQ Schema JSON"
                name="faqSchema"
                rows={8}
                value={formData.faqSchema}
                onChange={handleChange}
                placeholder='Paste FAQ schema JSON here, example: {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[]}'
              />
              <Input
                label="Tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="autism, parenting, child psychology"
              />

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Blog Image
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-[#F7FBFC] px-5 py-8 text-center transition hover:border-[#2CB1A6]">
                  <ImagePlus className="mb-3 text-[#0F3D5E]" />
                  <span className="text-sm font-black text-[#102A43]">
                    {image ? image.name : "Click to upload image"}
                  </span>
                  <span className="mt-1 text-xs font-semibold text-slate-500">
                    JPG, PNG, WEBP up to 5MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>

                {editingBlog?.image?.url && !image && (
                  <img
                    src={editingBlog.image.url}
                    alt={editingBlog.title}
                    className="mt-4 h-32 w-56 rounded-2xl object-cover"
                  />
                )}
              </div>

              <div className="flex flex-wrap gap-5">
                <label className="flex items-center gap-3 rounded-2xl bg-[#F7FBFC] px-5 py-4 text-sm font-black text-slate-700">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  Featured Blog
                </label>

                <label className="flex items-center gap-3 rounded-2xl bg-[#F7FBFC] px-5 py-4 text-sm font-black text-slate-700">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  Published
                </label>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    {editingBlog ? "Update Blog" : "Create Blog"}
                  </>
                )}
              </button>
            </form>
          </section>
        )}

        <section className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-black text-[#102A43]">
              All Blogs ({filteredBlogs.length})
            </h2>

            <div className="relative max-w-md flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search blogs..."
                className="w-full rounded-full border border-slate-200 bg-[#F7FBFC] py-3 pl-11 pr-5 text-sm outline-none focus:border-[#2CB1A6]"
              />
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />
              <p className="font-bold text-slate-500">Loading blogs...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="rounded-2xl bg-[#F7FBFC] p-10 text-center">
              <FileText className="mx-auto mb-4 text-[#0F3D5E]" size={40} />
              <h3 className="text-xl font-black text-[#102A43]">
                No blogs found
              </h3>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                Create your first blog from the button above.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog._id}
                  className="grid gap-5 rounded-3xl border border-slate-100 bg-[#F7FBFC] p-5 md:grid-cols-[170px_1fr_auto]"
                >
                  <div className="h-32 overflow-hidden rounded-2xl bg-white">
                    {blog.image?.url ? (
                      <img
                        src={blog.image.url}
                        alt={blog.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-300">
                        <FileText size={36} />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#E9F8F6] px-3 py-1 text-xs font-black text-[#0F766E]">
                        {blog.category}
                      </span>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0F3D5E]">
                        {blog.language}
                      </span>

                      {blog.isFeatured && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-black text-yellow-700">
                          Featured
                        </span>
                      )}

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          blog.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {blog.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-[#102A43]">
                      {blog.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-600">
                      {blog.excerpt}
                    </p>

                    <p className="mt-3 text-xs font-bold text-slate-400">
                      /blog/{blog.slug}
                    </p>
                  </div>

                  <div className="flex items-start gap-2 md:flex-col">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-4 py-3 text-xs font-black text-white"
                    >
                      <Edit size={14} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-3 text-xs font-black text-red-600"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

const Input = ({ label, ...props }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
      />
    </div>
  );
};

const Select = ({ label, options = [], ...props }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </label>
      <select
        {...props}
        className="w-full rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

const Textarea = ({ label, ...props }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </label>
      <textarea
        {...props}
        className="w-full resize-y rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
      />
    </div>
  );
};
