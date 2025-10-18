import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { noteSchema } from "../schema/noteSchema";

const CreateNoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(noteSchema),
  });

  const sendToTheServer = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:3001/api/notes', data);
      navigate('/notes');
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Create Note</h1>
      <form onSubmit={handleSubmit(sendToTheServer)}>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          className="border p-2 w-full mb-2"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <textarea
          placeholder="Content"
          rows="5"
          {...register("content")}
          className="border p-2 w-full mb-2"
        />
        {errors.content && <p className="text-red-500">{errors.content.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSubmitting ? "Saving..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateNoteForm;
