import SudokuBoard from "./components/SudokuBoard";

export default function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-[28rem]">
        <SudokuBoard />
      </div>
    </div>
  );
}
