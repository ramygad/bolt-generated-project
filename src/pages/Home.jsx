import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/api/courses')
      .then(res =&gt; res.json())
      .then(data =&gt; setCourses(data));
  }, []);

  return (
    &lt;div className="home"&gt;
      &lt;h1&gt;Featured Courses&lt;/h1&gt;
      &lt;div className="course-list"&gt;
        {courses.map(course =&gt; (
          &lt;div key={course.id} className="course-card"&gt;
            &lt;img src={course.thumbnail} alt={course.title} /&gt;
            &lt;div className="course-info"&gt;
              &lt;h2&gt;&lt;Link to={`/courses/${course.id}`}&gt;{course.title}&lt;/Link&gt;&lt;/h2&gt;
              &lt;p&gt;{course.description}&lt;/p&gt;
              &lt;div className="course-meta"&gt;
                &lt;span&gt;Instructor: {course.instructor}&lt;/span&gt;
                &lt;span&gt;${course.price}&lt;/span&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        ))}
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

export default Home;
