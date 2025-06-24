import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Card from '../components/ui/Card';
import extractPDFText from '../utils/extractPDFText';

const Home = () => {
  const [inputText, setInputText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('questionSessions') || '[]');
    setHistory(stored);
  }, []);

  const saveToHistory = (session) => {
    let updated = [session, ...history].slice(0, 5);
    localStorage.setItem('questionSessions', JSON.stringify(updated));
    setHistory(updated);
  };

  const handleGenerate = async () => {
    setLoading(true);
  
    const prompt = `Generate 5 two-mark and 10 one-mark questions from this content:\n${inputText}`;
  
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://your-vercel-site.vercel.app", // optional but recommended
        "X-Title": "AI Question Generator"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.2-24b-instruct-2506:free",  // or try "mistralai/mistral-7b-instruct"
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });
  
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "";
    const parsed = content.split(/\n(?=\d+\.)/).filter(Boolean);
  
    setQuestions(parsed);
    saveToHistory({
      title: inputText.slice(0, 30) + "...",
      content: parsed,
      date: new Date().toLocaleString()
    });

    console.log("API Key:", import.meta.env.VITE_OPENROUTER_API_KEY);

  
    setLoading(false);
  };
  
  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const text = await extractPDFText(file);
      setInputText(text);
    }
  };

  const filteredHistory = history.filter(h =>
    h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.content.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid md:grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl font-bold mb-2">AI Question Paper Generator</h1>
        <Textarea
          placeholder="Paste your chapter content here..."
          rows={8}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <label className="block text-sm mt-2 font-medium">Upload PDF</label>
        <Input type="file" accept="application/pdf" onChange={handlePDFUpload} />

        <Button className="mt-2" onClick={handleGenerate}>Generate Questions</Button>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Generated Questions:</h2>
          {questions.length === 0 ? <p>No questions yet.</p> : (
            <div className="space-y-2">
              {questions.map((q, idx) => (
                <Card key={idx}>{q}</Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="col-span-1">
        <Input placeholder="Search history..." className="mb-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <h2 className="text-md font-semibold mb-2">Saved Sessions</h2>
        {filteredHistory.length === 0 ? <p>No sessions found.</p> : (
          <div className="space-y-1">
            {filteredHistory.map((h, idx) => (
              <Card key={idx} onClick={() => setSelectedSession(h)}>
                <div className="font-bold text-sm">{h.title}</div>
                <div className="text-xs text-gray-500">{h.date}</div>
              </Card>
            ))}
          </div>
        )}

        {selectedSession && (
          <div className="mt-4 border-t pt-2">
            <h3 className="text-md font-semibold">Session Preview</h3>
            <div className="text-sm space-y-1">
              {selectedSession.content.map((q, i) => (
                <div key={i}>{q}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
