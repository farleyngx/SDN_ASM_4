/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { fetchAllQuestions, addQuestion, deleteQuestion } from '../../features/question-manager/managerSlice';

export default function AdminDashboardPage() {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: any) => state.auth);
  const { questions } = useSelector((state: any) => state.manager);

  const [text, setText] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState<number>(0);

  useEffect(() => { 
    dispatch(fetchAllQuestions()); 
  }, [dispatch]);

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredOptions = options.filter(opt => opt.trim() !== '');
    if (filteredOptions.length < 2) return alert('Vui lòng điền tối thiểu 2 phương án đáp án!');
    dispatch(addQuestion({ text, options: filteredOptions, correctAnswerIndex: Number(correctIndex) }));
    setText('');
    setOptions(['', '', '', '']);
    setCorrectIndex(0);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-5 fw-bold m-0">Admin Dashboard</h1>
        <span className="text-muted">Welcome, {user?.username}</span>
      </div>
      <div className="bg-white p-3 border rounded mb-5 d-flex gap-4">
        <button className="btn btn-link text-muted text-decoration-none px-0">Home</button>
        <button className="btn btn-link text-dark text-decoration-none fw-bold px-0">Manage Questions</button>
        <button className="btn btn-link text-muted text-decoration-none px-0">Manage Articles</button>
        <button className="btn btn-link text-muted text-decoration-none px-0 ms-auto" onClick={() => dispatch(logout())}>Logout</button>
      </div>

      <h2 className="h4 fw-bold mb-4">Questions</h2>
      <div className="card p-4 border rounded shadow-sm mb-5 bg-white">
        <form onSubmit={handleCreate}>
          <div className="row mb-3 align-items-center">
            <div className="col-md-2 fw-medium text-muted small">Question Text:</div>
            <div className="col-md-10"><input type="text" className="form-control" value={text} onChange={(e) => setText(e.target.value)} required /></div>
          </div>
          {options.map((opt, idx) => (
            <div className="row mb-2 align-items-center" key={idx}>
              {idx === 0 && <div className="col-md-2 fw-medium text-muted small">Options:</div>}
              <div className={`${idx > 0 ? 'offset-md-2' : ''} col-md-10`}>
                <input type="text" className="form-control" value={opt} onChange={(e) => handleOptionChange(idx, e.target.value)} required />
              </div>
            </div>
          ))}
          <div className="row mb-4 align-items-center mt-3">
            <div className="col-md-2 fw-medium text-muted small">Correct Answer Index:</div>
            <div className="col-md-10"><input type="number" className="form-control" min="0" max="3" value={correctIndex} onChange={(e) => setCorrectIndex(Number(e.target.value))} required /></div>
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2">Add Question</button>
        </form>
      </div>

      <div className="d-flex flex-column gap-4">
        {questions && questions.map((q: any) => (
          <div className="card p-4 border rounded bg-white shadow-sm" key={q._id}>
            <h4 className="fw-bold h5 mb-3">{q.text}</h4>
            <ul className="list-unstyled ps-3 mb-3 fs-6">
              {q.options.map((opt: string, idx: number) => (
                <li key={idx} className={idx === q.correctAnswerIndex ? 'text-success fw-bold' : 'text-dark'}>• {opt}</li>
              ))}
            </ul>
            <div className="d-flex gap-2">
              <button className="btn btn-warning btn-sm px-3 text-white">Edit</button>
              <button className="btn btn-danger btn-sm px-3" onClick={() => dispatch(deleteQuestion(q._id))}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
