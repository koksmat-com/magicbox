
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
interface IViewSourcecCodeProps {
  code: string;
  language: string;
}

export  function ViewSourceCode({ code, language }: IViewSourcecCodeProps) {

  return (      <pre className="text-green-600  bg-slate-800 text-sm p-4">
{code}
    {/* <SyntaxHighlighter language={language}>{code}</SyntaxHighlighter> */}

  </pre>)


}