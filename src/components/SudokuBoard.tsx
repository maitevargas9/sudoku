export default function SudokuBoard() {
    return (
        <div className="grid grid-cols-9 grid-rows-9 w-full h-full">
            {Array.from({ length: 81 }).map((_, idx) => {
                const r = Math.floor(idx / 9);
                const c = idx % 9;

                const thickTop = r % 3 === 0 ? "border-t-4" : "border-t";
                const thickLeft = c % 3 === 0 ? "border-l-4" : "border-l";
                const thickRight = c === 8 ? "border-r-4" : "border-r";
                const thickBottom = r === 8 ? "border-b-4" : "border-b";

                return (
                    <div
                        key={`${r}-${c}`}
                        className={[
                            "flex items-center justify-center bg-white",
                            "border-slate-700",
                            thickTop,
                            thickLeft,
                            thickRight,
                            thickBottom,
                        ].join(" ")}
                        style={{ aspectRatio: "1 / 1" }}
                    ></div>
                );
            })}
        </div>
    );
}