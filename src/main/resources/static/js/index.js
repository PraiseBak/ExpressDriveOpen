import {getTraceRemove} from "./Trace/TraceRemove.js";
import {getFollow} from "./User/follow.js";
import {getTraceCheck} from "./Trace/TraceCheck.js";
import {getEditProfile} from "./Trace/EditProfile.js";
import {getEditProfileFrontIndex} from "./Front/EditProfileFront.js";
import {getCommentIndex} from "./Comment/Comment.js";
import {getCommentEditFrontIndex} from "./Front/CommentEditFront.js";

traceRemoveIndex = getTraceRemove();
following = getFollow();
traceCheck = getTraceCheck();
editProfileIndex = getEditProfile();
editProfileFrontIndex = getEditProfileFrontIndex();
commentIndex = getCommentIndex();
commentEditFrontIndex = getCommentEditFrontIndex();