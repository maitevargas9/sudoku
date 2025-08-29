import Header from "./components/Header";
import SudokuBoard from "./components/SudokuBoard";

export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center bg-slate-50">
      <Header />
      <div className="flex-1 flex items-start justify-center w-full">
        <div className="w-full max-w-[28rem] mt-20">
          <SudokuBoard />
        </div>
      </div>
    </div>
  );
}
