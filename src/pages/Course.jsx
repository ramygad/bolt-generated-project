import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Course.css';

function Course() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then(res =&gt; res.json())
      .then(data =&gt; setCourse(data));
  }, [id]);

  if (!course) return &lt;div&gt;Loading...&lt;/div&gt;;

  return (
    &lt;div className="course-page"&gt;
      &lt;h1&gt;{course.title}&lt;/h1&gt;
      &lt;div className="video-container"&gt;
        &lt;video controls src={course.video_url}&gt;&lt;/video&gt;
      &lt;/div&gt;
      &lt;div className="course-details"&gt;
        &lt;h2&gt;About this course&lt;/h2&gt;
        &lt;p&gt;{course.description}&lt;/p&gt;
        &lt;div className="course-meta"&gt;
          &lt;span&gt;Instructor: {course.instructor}&lt;/span&gt;
          &lt;span&gt;Price: ${course.price}&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

export default Course;
