import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../services/courseServices";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getCourseById(id);
        setCourse(res.data);
      } catch (err) {
        console.error("Failed to load course", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!course) return <div className="p-6">Course not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => nav(-1)} className="text-sm text-blue-600 mb-4">
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex gap-6 flex-col md:flex-row">
          <img
            src={course.image || "/placeholder.png"}
            alt={course.title}
            className="w-full md:w-1/3 h-56 object-cover rounded-md"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-gray-600 mt-1">By {course.instructor}</p>
            <p className="mt-3 text-gray-800">{course.description}</p>

            <div className="mt-4 flex items-center gap-4">
              <div className="text-lg font-semibold">
                ₹{course.price ?? "Free"}
              </div>
              <div className="px-3 py-1 rounded-full text-sm bg-gray-100">
                {course.level || "Unknown"}
              </div>
            </div>
          </div>
        </div>

        {/* modules & lessons if available */}
        {course.modules && course.modules.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Modules</h3>
            <div className="mt-3 space-y-4">
              {course.modules.map((m) => (
                <div key={m._id} className="border p-3 rounded">
                  <div className="font-medium">{m.title}</div>
                  {m.lessons?.length > 0 && (
                    <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                      {m.lessons.map((lesson) => (
                        <li key={lesson._id}>{lesson.title}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
