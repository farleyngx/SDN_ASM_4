import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { fetchQuizzes, selectQuiz } from '../../features/quiz-runner/quizSlice';

export default function DashboardPage() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const { list: quizzes, loading } = useSelector((state: any) => state.quiz);

  useEffect(() => { 
    dispatch(fetchQuizzes()); 
  }, [dispatch]);

  const handleStartQuiz = (quiz: any) => {
    dispatch(selectQuiz(quiz));
    navigate('/dashboard/quiz');
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-5 fw-bold m-0">Dashboard</h1>
        <span className="text-muted">Welcome, {user?.username}</span>
      </div>
      <div className="bg-white p-3 border rounded mb-5 d-flex gap-4">
        <button className="btn btn-link text-dark text-decoration-none fw-bold px-0">Home</button>
        <button className="btn btn-link text-muted text-decoration-none px-0">Quiz</button>
        <button className="btn btn-link text-muted text-decoration-none px-0">Article</button>
        <button className="btn btn-link text-muted text-decoration-none px-0 ms-auto" onClick={() => dispatch(logout())}>Logout</button>
      </div>
      <div className="row g-4">
        {loading ? <p className="text-center">Loading quizzes...</p> : 
          quizzes && quizzes.map((quiz: any) => (
            <div className="col-md-4" key={quiz._id}>
              <div className="card shadow-sm h-100 p-3">
                <h5 className="fw-bold text-primary">{quiz.title}</h5>
                <p className="text-muted small flex-grow-1">{quiz.description || 'Không có mô tả cho đề trắc nghiệm này.'}</p>
                <button className="btn btn-outline-primary btn-sm mt-2 w-100" onClick={() => handleStartQuiz(quiz)}>Do Quiz</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
