interface HeaderProps {
    onNewSudoku?: () => void;
    onSolve?: () => void;
    onReset?: () => void;
    onHint?: () => void;
}

export default function Header({ onNewSudoku, onSolve, onReset, onHint }: HeaderProps) {
    return (
        <header className="w-full py-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg">
            <div className="max-w-[48rem] mx-auto flex items-center justify-between px-6">
                <h1 className="text-3xl font-extrabold tracking-wider">🧩 Sudoku</h1>
                <div className="flex gap-3">
                    <button onClick={onNewSudoku} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition text-sm font-medium shadow">New Sudoku</button>
                    <button onClick={onSolve} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition text-sm font-medium shadow">Solve</button>
                    <button onClick={onReset} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 transition text-sm font-medium shadow">Reset</button>
                    <button onClick={onHint} className="px-4 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-700 transition text-sm font-medium shadow">Hint</button>
                </div>
            </div>
        </header>
    );
}