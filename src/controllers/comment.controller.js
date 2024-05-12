import Comment from '../models/Comment';

export const createComment = async (req, res) => {
    const { content, publicationId, userId } = req.body;

    try {
        const comment = new Comment({ content, publicationId, userId });
        await comment.save();

        res.status(201).json({ message: 'Comment created', comment });
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error });
    }
};

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};

export const getComment = async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ comment });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comment', error });
    }
};

export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const comment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment updated', comment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating comment', error });
    }
};


export const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
};