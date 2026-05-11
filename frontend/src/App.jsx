import { useState } from "react";
import axios from "axios";

export default function App() {

  const [file, setFile] = useState(null);

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("pdf");

  const uploadFile = async () => {

    if (!file) {
      alert("Please choose a file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      alert(response.data.message);

    } catch (error) {

      console.error(error);

      alert("Upload failed");

    } finally {

      setLoading(false);
    }
  };

  const askAI = async () => {

    if (!question) {
      alert("Please enter a question");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          question: question,
        }
      );

      console.log(response.data);

      setAnswer(response.data.answer);

    } catch (error) {

      console.error(error);

      setAnswer("AI request failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 p-6">

      <div className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-cyan-500 to-indigo-600 p-10 text-center text-white">

          <h1 className="text-6xl font-black mb-4">
            AI Multimedia Q&A
          </h1>

          <p className="text-xl opacity-90">
            Upload PDFs, Audio, or Videos and ask AI-powered questions
          </p>

        </div>

        <div className="p-10">

          <div className="flex gap-5 mb-10">

            <button
              onClick={() => setActiveTab("pdf")}
              className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all ${
                activeTab === "pdf"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                  : "bg-gray-100"
              }`}
            >
              PDF
            </button>

            <button
              onClick={() => setActiveTab("audio")}
              className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all ${
                activeTab === "audio"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                  : "bg-gray-100"
              }`}
            >
              Audio
            </button>

            <button
              onClick={() => setActiveTab("video")}
              className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all ${
                activeTab === "video"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                  : "bg-gray-100"
              }`}
            >
              Video
            </button>

          </div>

          <div className="bg-cyan-50 border-2 border-dashed border-cyan-300 rounded-[32px] p-10 mb-10">

            <div className="text-center">

              <div className="text-7xl mb-5">

                {activeTab === "pdf" && "📄"}
                {activeTab === "audio" && "🎵"}
                {activeTab === "video" && "🎬"}

              </div>

              <h2 className="text-4xl font-black text-slate-800 mb-3">

                Upload {activeTab.toUpperCase()} File

              </h2>

              <p className="text-gray-500 text-lg mb-10">

                {activeTab === "pdf" &&
                  "Supported: PDF documents"}

                {activeTab === "audio" &&
                  "Supported: MP3, WAV audio files"}

                {activeTab === "video" &&
                  "Supported: MP4, MOV video files"}

              </p>

              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full mb-8 text-lg text-gray-700
                file:mr-5 file:py-4 file:px-8
                file:rounded-2xl file:border-0
                file:font-bold
                file:bg-gradient-to-r
                file:from-cyan-500
                file:to-blue-600
                file:text-white
                file:cursor-pointer"
              />

              <button
                onClick={uploadFile}
                className="w-full py-5 rounded-2xl text-xl font-black text-white bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-xl hover:scale-[1.02] transition-all"
              >
                {loading ? "Processing..." : "Upload & Process File"}
              </button>

            </div>

          </div>

          <div className="mb-10">

            <h2 className="text-5xl font-black text-slate-800 mb-8">
              Ask AI Questions
            </h2>

            <textarea
              rows={6}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything about your uploaded multimedia file..."
              className="w-full border border-gray-300 rounded-[32px] p-8 text-xl resize-none focus:outline-none focus:ring-4 focus:ring-cyan-300"
            />

            <button
              onClick={askAI}
              className="mt-8 w-full py-5 rounded-2xl text-xl font-black text-white bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-xl hover:scale-[1.02] transition-all"
            >
              Ask AI
            </button>

          </div>

          <div className="bg-cyan-50 rounded-[32px] p-10 border border-cyan-200">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-5xl font-black text-slate-800">
                AI Response
              </h2>

              <span className="bg-green-200 text-green-800 px-5 py-2 rounded-full font-bold">
                Active
              </span>

            </div>

            <div className="text-lg text-gray-700 whitespace-pre-wrap leading-9">

              {loading
                ? "AI is thinking..."
                : answer || "AI-generated answers from PDFs, audio transcripts, or video subtitles will appear here."}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}