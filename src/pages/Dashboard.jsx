import { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/api/courses')
      .then(res =&gt; res.json())
      .then(data =&gt; setCourses(data));
  }, []);

  return (
    &lt;div className="dashboard"&gt;
      &lt;h1&gt;Your Courses&lt;/h1&gt;
      &lt;div className="course-list"&gt;
        {courses.map(course =&gt; (
          &lt;div key={course.id} className="course-card"&gt;
            &lt;img src={course.thumbnail} alt={course.title} /&gt;
            &lt;div className="course-info"&gt;
              &lt;h2&gt;{course.title}&lt;/h2&gt;
              &lt;p&gt;{course.description}&lt;/p&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        ))}
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

export default Dashboard;
