import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

const CreateBlog = ({ onBlogCreated }) => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handlePublish = async () => {
    const content = editorRef.current ? editorRef.current.getContent() : "";

    if (!title || !content) {
      alert("Title and content cannot be empty!");
      return;
    }

    let imageUrl = "";

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

      const res = await axios.post("http://localhost:5000/api/blogs/create", {
        title,
        content,
        image: imageUrl, // send Cloudinary URL to backend
      });

      if (res.status === 201) {
        alert("Blog published successfully!");
        setTitle("");
        editorRef.current.setContent("");
        setImageFile(null);
        onBlogCreated(); // refresh dashboard
      }
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert("Error publishing blog!");
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
        onChange={(e) => setImageFile(e.target.files[0])}
        className="mb-4"
      />
      {imageFile && <p>Selected: {imageFile.name}</p>}

      <Editor
        apiKey="7brf8ztlz1jyzmepgamoajm9o4rcrtrjjrau7obxo3n4h1g5"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="Start writing your blog here..."
        init={{
          height: 500,
          menubar: true,
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

      <button
        onClick={handlePublish}
        disabled={uploading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {uploading ? "Uploading..." : "Publish Blog"}
      </button>
    </div>
  );
};

export default CreateBlog;
