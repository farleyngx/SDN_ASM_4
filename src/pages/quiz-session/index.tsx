import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { submitAnswer, restartQuiz } from '../../features/quiz-runner/quizSlice';

export default function QuizSessionPage() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { currentQuiz, currentQuestionIndex, score, isCompleted } = useSelector((state: any) => state.quiz);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  if (!currentQuiz) {
    return (
      <div className="container py-5 text-center">
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  const handleNext = () => {
    if (selectedOption === null) return alert('Vui lòng chọn 1 đáp án!');
    dispatch(submitAnswer(selectedOption));
    setSelectedOption(null);
  };

  if (isCompleted) {
    return (
      <div className="container py-5 text-center min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-4 fw-bold mb-3">Quiz Completed</h1>
        <p className="fs-4 text-secondary mb-4">Your score: {score}</p>
        <div className="d-flex gap-2">
          <button className="btn btn-primary px-4 py-2" onClick={() => dispatch(restartQuiz())}>Restart Quiz</button>
          <button className="btn btn-secondary px-4 py-2" onClick={() => navigate('/dashboard')}>Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="bg-white p-3 border rounded mb-5 d-flex gap-4">
        <button className="btn btn-link text-muted text-decoration-none px-0" onClick={() => navigate('/dashboard')}>Home</button>
        <button className="btn btn-link text-dark text-decoration-none fw-bold px-0">Quiz</button>
        <button className="btn btn-link text-muted text-decoration-none px-0">Article</button>
      </div>

      <div className="text-center mx-auto" style={{ maxWidth: '600px', marginTop: '80px' }}>
        <h2 className="display-5 fw-bold mb-4">Quiz</h2>
        <h3 className="h4 fw-semibold mb-4">{currentQuestion?.text}</h3>
        
        <div className="text-start mx-auto mb-4" style={{ width: 'fit-content' }}>
          {currentQuestion?.options.map((option: string, index: number) => (
            <div className="form-check mb-3 fs-5" key={index}>
              <input className="form-check-input" type="radio" name="quizOpt" id={`opt-${index}`} checked={selectedOption === index} onChange={() => setSelectedOption(index)} />
              <label className="form-check-label ps-2" htmlFor={`opt-${index}`}>{option}</label>
            </div>
          ))}
        </div>

        <button className="btn btn-primary px-5 py-2.5 fs-5 mt-3" onClick={handleNext}>Submit Answer</button>
      </div>
    </div>
  );
}
