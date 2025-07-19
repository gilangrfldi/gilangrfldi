"use client";

export default function ScrollLineAnimation({ svgRef, pathRef }) {
    return (
        <div className='relative flex items-center justify-center pt-[15vh] z-10'>
            <svg ref={svgRef} width='1000' height='1000' viewBox='0 0 640 1000' preserveAspectRatio='xMidYMid meet' className='absolute'>
                <path
                    ref={pathRef}
                    d='M 331 15 C 315 79 370 35 387 72 C 400 126 256 57 224 104 C 201 158 448 91 431 139 C 451 175 192 135 201 178 C 191 239 471 154 455 209 C 444 260 219 205 226 247 C 216 306 421 195 347 335 C 338 381 374 326 323 338 '
                    stroke='white'
                    strokeWidth='6'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
        </div>
    );
}
