"use client"
// Imports
import { useState } from "react";
import Typeinit from "typeinit";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import SpeechToElement from 'speech-to-element';
import 'react-loading-skeleton/dist/skeleton.css'

const { GoogleGenerativeAI } = require("@google/generative-ai");

export function Result_Box() {
    // State Variables and Important API
    const [prompty, setPrompty] = useState("");
    const [count,setCount] = useState(5);
    const [tog,setToggle] = useState(0);
    const genAI = new GoogleGenerativeAI("Your-Key");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    // getResults Function
    async function getResults() {
        const box: any = document.getElementById("res_box");
        box.innerText = "";
        const result = await model.generateContent(prompty);
        const data = formatAIText(result.response.text());
        setCount(data.length);
        new Typeinit("#res_box", { typingSpeed: 20 }).type(data).play();
    }
    // Regular Expressions for formating of data 
    function formatAIText(input: string): string {
        // Split text into lines
        const lines = input.split('\n');

        let formattedText = '';

        for (let line of lines) {
            line = line.trim();

            // Convert main headings
            if (/^\*\*(.*?)\*\*$/.test(line)) {
                formattedText += `\n# ${line.replace(/\*\*/g, '')}\n`;
            }
            // Convert subheadings
            else if (/^\* \*\*(.*?)\*\*:/.test(line)) {
                formattedText += `\n## ${line.replace(/\*\*|\*/g, '').replace(':', '')}\n`;
            }
            // Convert bullet points
            else if (/^\* /.test(line)) {
                formattedText += `- ${line.substring(2)}\n`;
            }
            // Convert sub-bullets
            else if (/^\s*\*\s+\*/.test(line)) {
                formattedText += `  - ${line.replace('* ', '')}\n`;
            }
            // Regular text
            else {
                formattedText += `${line}\n`;
            }
        }

        return formattedText.trim();
    }
    // Return Components
    return <div className="w-full h-screen flex flex-col items-center justify-center gap-y-4 bg-black p-3">
        <div className="w-4/5 h-svh border-2 rounded-md p-3 overflow-y-scroll">
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <pre><p className="text-white rounded-sm p-2 font-sans" id="res_box"><Skeleton count={count} /></p></pre>
            </SkeletonTheme>
        </div>
        <div className="w-2/4 flex gap-x-2 bg-gray-500 rounded-full p-2">
            <input id="prompt" type="text" onKeyPress={(e)=>{if(e.key=="Enter") {getResults(); blur;}}} onFocus={(e) => { e.target.value = '' }} placeholder="Enter Prompt" onChange={(e) => { setPrompty(e.target.value); }} className="outline-none w-full rounded-md p-2 overflow-y-auto bg-gray-500 text-white" />
            <button className="border-2 rounded-full p-2 text-white" onClick={getResults}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
</svg>
</button>
<button className={tog==0?"border-2 rounded-full p-2 text-white":"border-2 border-red-600 rounded-full p-2 text-white"} onClick={()=>{
    tog==0?setToggle(1):setToggle(0);
    if(tog==1) {const targetElement = document.getElementById('prompt');
        }
}

}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
</svg>
</button>
        </div>
    </div>

}
