import {getTraceWrite,changeMode} from "../Trace/TraceWrite.js";
traceWrite = getTraceWrite();
changeInputMode = changeMode;
let isPost = "[[${post != null}]]";
if(isPost === "true"){
    changeInputMode();
}