import { mockStudentList } from "../MockData/mockStudent";
import "../Style/Mock.css";

const MockPage = () => {
  return (
    <div className="mock-page">
      <h1>Mock Page</h1>
      <div className="container">
        {mockStudentList.map((student, index) => (
          <div className="student" key={index}>
            <div className="profile-picture">
              {/* Placeholder for profile picture */}
              <img
                src={student.profilePicture || "/default-profile.png"}
                alt={`${student.name}'s profile`}
              />
            </div>
            <div className="details">
              <p className="name">{student.name}</p>
              <p className="age">Age: {student.age}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MockPage;
