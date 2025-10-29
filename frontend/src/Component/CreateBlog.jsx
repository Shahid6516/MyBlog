import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

const CreateBlog = ({
  onBlogCreated,
  editMode = false,
  existingPost = null,
  onCancel,
}) => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState(existingPost ? existingPost.title : "");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    existingPost ? existingPost.image : ""
  );

  // ✅ Ensure editor content updates when switching between edit/create
  useEffect(() => {
    setTitle(existingPost ? existingPost.title : "");
    setPreviewImage(existingPost ? existingPost.image : "");
    if (editorRef.current) {
      editorRef.current.setContent(existingPost ? existingPost.content || "" : "");
    }
  }, [existingPost]);

  // 🖼️ Preview image before upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 🧠 Create or Update Blog
  const handlePublish = async () => {
    const content = editorRef.current ? editorRef.current.getContent() : "";

    if (!title || !content) {
      alert("Title and content cannot be empty!");
      return;
    }

    let imageUrl = existingPost ? existingPost.image : "";

    try {
      if (imageFile) {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "blog_thumbnails");

        const cloudRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dixvkzsaa/image/upload",
          formData
        );

        imageUrl = cloudRes.data.secure_url;
        setUploading(false);
      }

      if (editMode && existingPost) {
        // ✏️ Update blog (PATCH request)
        const token = localStorage.getItem("token");
        const res = await axios.patch(
          `http://localhost:5000/api/blogs/${existingPost._id}`,
          { title, content, image: imageUrl },
          { headers: { Authorization: `Bearer ${token}` } } 

          
        );
        alert(res.data.message || "Blog updated successfully!");
      } else {
        // 🆕 Create new blog
        const res = await axios.post("http://localhost:5000/api/blogs/create", {
          title,
          content,
          image: imageUrl,
        });
        alert(res.data.message || "Blog published successfully!");
      }

      // ✅ Reset form
      setTitle("");
      setImageFile(null);
      setPreviewImage("");
      if (editorRef.current) editorRef.current.setContent("");
      onBlogCreated();
      onCancel && onCancel();
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert("Error saving blog!");
    }
  };

  return (
    <div className="bg-black rounded-xl shadow w-full mt-4 mx-auto p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter blog title..."
        className="w-full border px-3 py-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          className="w-48 h-32 object-cover rounded mb-3 border"
        />
      )}

      <Editor
        apiKey="7brf8ztlz1jyzmepgamoajm9o4rcrtrjjrau7obxo3n4h1g5"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={existingPost ? existingPost.content : ""}
        init={{
          height: 500,
          menubar: true,
          branding: false,
          plugins: [
            "advlist autolink lists link image charmap preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic underline strikethrough | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link image | removeformat | help",
        }}
      />

      <div className="flex gap-3 mt-5">
        <button
          onClick={handlePublish}
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {uploading
            ? "Uploading..."
            : editMode
            ? "Update Blog"
            : "Publish Blog"}
        </button>

        {editMode && (
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;
