import AddCommentForm from "../AddCommentForm/AddCommentForm"
import Comment from "../Comment/Comment"
import './CampaignComments.css'
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

export default function CampaignComments({addComment, comments, campaignId, deleteComment, user}) {
    return (
        <>
            <AnimatePresence mode='wait'>
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>Comments</h1>
                    { comments.length > 0 ?
                        <ul className="comments-list">
                            {comments.map((comment, idx) => (
                                <Comment comment={comment} campaignId={campaignId} deleteComment={deleteComment} key={idx} user={user} />
                            ))}
                        </ul>
                    :
                        <h3>No Comments Yet!</h3>
                    }
                    { user ?
                        <AddCommentForm addComment={addComment} campaignId={campaignId} />
                    :
                        <div className="comments-login-message">
                            Only logged in users can comment! <Link to="/auth" className="login-link">Log In</Link>
                        </div>
                    }
                </motion.div>
            </AnimatePresence>
        </>
    )
}