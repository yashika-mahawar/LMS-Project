export const enrollCourse = (course) => {
  let myCourses = JSON.parse(localStorage.getItem("myCourses")) || [];

  // prevent duplicate
  const exists = myCourses.find((c) => c.id === course.id);

  if (!exists) {
    myCourses.push({
      ...course,
      progress: 0,
      enrolledAt: new Date().toISOString(),
    });

    localStorage.setItem("myCourses", JSON.stringify(myCourses));
  }
};